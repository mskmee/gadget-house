type NumberLikeArray = number[] | null | undefined;
type StringLikeArray = string[] | null | undefined;

export type BackendAttributeValue = {
  id: number;
  value: string;
};

export type BackendAttribute = {
  id: number;
  name: string;
  attributeValuesList: BackendAttributeValue[];
};

export type BackendBrand = {
  id: number;
  name: string;
};

export type LegacyFiltersMap = Record<
  string,
  { attributes: Record<string, number> }
>;

export type LegacyBrandIdMap = Record<string, number>;

export type SearchProductsPayload = {
  query: string;
  page: number;
  size: number;
  sort: string;
  brandIds?: number[];
  attributeValueIds?: number[];
  minPrice?: number;
  maxPrice?: number;
  minCameraMP?: number;
  maxCameraMP?: number;
};

export type FilterVisibilityFlags = {
  price: boolean;
  brand: boolean;
  builtInMemory: boolean;
  color: boolean;
  ram: boolean;
  memorySlot: boolean;
  camera: boolean;
  cores: boolean;
  screens: boolean;
};

const asArray = (value: unknown): unknown[] => {
  return Array.isArray(value) ? value : [];
};

const normalizeSpaces = (value: string): string => {
  return value.trim().replace(/\s+/g, ' ');
};

export const normalizeFilterValue = (value: string): string => {
  return normalizeSpaces(value)
    .toLowerCase()
    .replace(/\bgb\b/g, 'gb')
    .replace(/\bg\b/g, 'gb')
    .replace(/\bamoled\b/g, 'amoled')
    .replace(/\b2x\b/g, '2x');
};

const toUniqueSortedNumbers = (
  items: NumberLikeArray,
): number[] | undefined => {
  if (!items || items.length === 0) return undefined;

  return Array.from(
    new Set(items.filter((item) => Number.isFinite(item))),
  ).sort((a, b) => a - b);
};

const toOptionalRangeValue = (
  value: number | null | undefined,
): number | undefined => {
  if (value === null || value === undefined || value === 0) {
    return undefined;
  }

  return value;
};

const asBackendAttributes = (allAttributes: unknown): BackendAttribute[] => {
  return asArray(allAttributes).filter((item): item is BackendAttribute => {
    if (!item || typeof item !== 'object') return false;

    const candidate = item as Partial<BackendAttribute>;

    return (
      typeof candidate.id === 'number' &&
      typeof candidate.name === 'string' &&
      Array.isArray(candidate.attributeValuesList)
    );
  });
};

const asBackendBrands = (allBrands: unknown): BackendBrand[] => {
  if (Array.isArray(allBrands)) {
    return allBrands.filter((item): item is BackendBrand => {
      if (!item || typeof item !== 'object') return false;

      const candidate = item as Partial<BackendBrand>;
      return (
        typeof candidate.id === 'number' && typeof candidate.name === 'string'
      );
    });
  }

  if (allBrands && typeof allBrands === 'object') {
    const candidate = allBrands as Partial<BackendBrand>;
    if (
      typeof candidate.id === 'number' &&
      typeof candidate.name === 'string'
    ) {
      return [candidate as BackendBrand];
    }
  }

  return [];
};

const buildLookupKeys = (value: string): string[] => {
  const raw = normalizeSpaces(value);
  const normalized = normalizeFilterValue(value);

  return raw === normalized ? [raw] : [raw, normalized];
};

const getRouteScope = (pathname: string): string => {
  return (
    pathname.split('?')[0].split('#')[0].split('/').filter(Boolean)[0] ?? ''
  );
};

export const shouldResetFiltersOnRouteChange = (
  previousPathname: string,
  nextPathname: string,
): boolean => {
  if (!previousPathname || !nextPathname) {
    return false;
  }

  return getRouteScope(previousPathname) !== getRouteScope(nextPathname);
};

export const buildBackendValueIdIndex = (
  allAttributes: unknown,
): Map<string, number> => {
  const map = new Map<string, number>();

  asBackendAttributes(allAttributes).forEach((attribute) => {
    attribute.attributeValuesList.forEach((item) => {
      const raw = normalizeSpaces(item.value);
      const normalized = normalizeFilterValue(item.value);

      if (!map.has(raw)) {
        map.set(raw, item.id);
      }

      if (!map.has(normalized)) {
        map.set(normalized, item.id);
      }
    });
  });

  return map;
};

export const buildBackendBrandIdIndex = (
  allBrands: unknown,
): Map<string, number> => {
  const map = new Map<string, number>();

  asBackendBrands(allBrands).forEach((brand) => {
    const keys = buildLookupKeys(brand.name);

    keys.forEach((key) => {
      if (!map.has(key)) {
        map.set(key, brand.id);
      }
    });
  });

  return map;
};

export const resolveBrandIdsBackendFirst = (
  selectedBrands: StringLikeArray,
  allBrands: unknown,
  legacyBrandIds?: LegacyBrandIdMap,
): number[] => {
  if (!selectedBrands || selectedBrands.length === 0) {
    return [];
  }

  const backendIndex = buildBackendBrandIdIndex(allBrands);
  const resolved = new Set<number>();

  selectedBrands.forEach((brand) => {
    const keys = buildLookupKeys(brand);
    const backendId = keys
      .map((key) => backendIndex.get(key))
      .find((id) => id !== undefined);

    if (backendId !== undefined) {
      resolved.add(backendId);
      return;
    }

    if (!legacyBrandIds) {
      return;
    }

    const legacyId = keys
      .map((key) => legacyBrandIds[key])
      .find((id) => id !== undefined);

    if (legacyId !== undefined) {
      resolved.add(legacyId);
    }
  });

  return [...resolved];
};

export const resolveAttributeValueIdsByAttributeNameBackendFirst = (
  selectedValues: StringLikeArray,
  allAttributes: unknown,
  attributeName: string,
  attributeNameAliases: string[] = [],
  legacyValuesMap?: Record<string, number>,
): number[] => {
  if (!selectedValues || selectedValues.length === 0) {
    return [];
  }

  const namesToMatch = [attributeName, ...attributeNameAliases].map((name) =>
    normalizeFilterValue(name),
  );

  const scopedAttribute = asBackendAttributes(allAttributes).find((attribute) =>
    namesToMatch.includes(normalizeFilterValue(attribute.name)),
  );

  const scopedValueIndex = new Map<string, number>();

  scopedAttribute?.attributeValuesList.forEach((item) => {
    buildLookupKeys(item.value).forEach((key) => {
      if (!scopedValueIndex.has(key)) {
        scopedValueIndex.set(key, item.id);
      }
    });
  });

  const resolved = new Set<number>();

  selectedValues.forEach((value) => {
    const keys = buildLookupKeys(value);

    const backendId = keys
      .map((key) => scopedValueIndex.get(key))
      .find((id) => id !== undefined);

    if (backendId !== undefined) {
      resolved.add(backendId);
      return;
    }

    if (!legacyValuesMap) {
      return;
    }

    const legacyId = keys
      .map((key) => legacyValuesMap[key])
      .find((id) => id !== undefined);

    if (legacyId !== undefined) {
      resolved.add(legacyId);
    }
  });

  return [...resolved];
};

export const resolveAttributeValueIdsBackendFirst = (
  selectedValues: StringLikeArray,
  allAttributes: unknown,
  legacyFilters?: LegacyFiltersMap,
): number[] => {
  if (!selectedValues || selectedValues.length === 0) {
    return [];
  }

  const backendIndex = buildBackendValueIdIndex(allAttributes);
  const resolved = new Set<number>();

  selectedValues.forEach((value) => {
    const raw = normalizeSpaces(value);
    const normalized = normalizeFilterValue(value);

    const backendId = backendIndex.get(raw) ?? backendIndex.get(normalized);

    if (backendId !== undefined) {
      resolved.add(backendId);
      return;
    }

    if (!legacyFilters) {
      return;
    }

    for (const group of Object.values(legacyFilters)) {
      const direct = group.attributes[raw];
      if (direct !== undefined) {
        resolved.add(direct);
        return;
      }

      for (const [legacyValue, legacyId] of Object.entries(group.attributes)) {
        if (normalizeFilterValue(legacyValue) === normalized) {
          resolved.add(legacyId);
          return;
        }
      }
    }
  });

  return [...resolved];
};

export const buildSearchProductsPayload = (params: {
  query: string;
  page: number;
  size: number;
  sort: string;
  brandIds?: NumberLikeArray;
  attributeValueIds?: NumberLikeArray;
  selectedPriceRange?: number[] | null;
  // selectedCameraRange?: number[] | null;
}): SearchProductsPayload => {
  const {
    query,
    page,
    size,
    sort,
    brandIds,
    attributeValueIds,
    selectedPriceRange,
    // selectedCameraRange,
  } = params;

  const payload: SearchProductsPayload = {
    query,
    page,
    size,
    sort,
  };

  const preparedBrandIds = toUniqueSortedNumbers(brandIds);
  const preparedAttributeIds = toUniqueSortedNumbers(attributeValueIds);

  if (preparedBrandIds) {
    payload.brandIds = preparedBrandIds;
  }

  if (preparedAttributeIds) {
    payload.attributeValueIds = preparedAttributeIds;
  }

  if (selectedPriceRange && selectedPriceRange.length === 2) {
    const [minPrice, maxPrice] = selectedPriceRange;

    const min = toOptionalRangeValue(minPrice);
    const max = toOptionalRangeValue(maxPrice);

    if (min !== undefined) payload.minPrice = min;
    if (max !== undefined) payload.maxPrice = max;
  }

  // Camera range is temporarily excluded from search payload.
  // if (selectedCameraRange && selectedCameraRange.length === 2) {
  //   const [minCameraMP, maxCameraMP] = selectedCameraRange;

  //   const min = toOptionalRangeValue(minCameraMP);
  //   const max = toOptionalRangeValue(maxCameraMP);

  //   if (min !== undefined) payload.minCameraMP = min;
  //   if (max !== undefined) payload.maxCameraMP = max;
  // }

  return payload;
};

export const buildSearchRequestKey = (
  payload: SearchProductsPayload,
): string => {
  return JSON.stringify({
    ...payload,
    brandIds: payload.brandIds
      ? [...payload.brandIds].sort((a, b) => a - b)
      : [],
    attributeValueIds: payload.attributeValueIds
      ? [...payload.attributeValueIds].sort((a, b) => a - b)
      : [],
  });
};

export const buildSearchQueryParams = (
  payload: SearchProductsPayload,
): string => {
  const params = new URLSearchParams();

  params.set('query', payload.query);
  params.set('page', String(payload.page));
  params.set('size', String(payload.size));
  params.set('sort', payload.sort);

  if (payload.brandIds?.length) {
    params.set('brandIds', payload.brandIds.join(','));
  }

  if (payload.attributeValueIds?.length) {
    params.set('attributeValueIds', payload.attributeValueIds.join(','));
  }

  if (payload.minPrice !== undefined)
    params.set('minPrice', String(payload.minPrice));
  if (payload.maxPrice !== undefined)
    params.set('maxPrice', String(payload.maxPrice));
  if (payload.minCameraMP !== undefined)
    params.set('minCameraMP', String(payload.minCameraMP));
  if (payload.maxCameraMP !== undefined)
    params.set('maxCameraMP', String(payload.maxCameraMP));

  return params.toString();
};

export const getTemporaryFilterVisibility = (options?: {
  allowColor?: boolean;
}): FilterVisibilityFlags => {
  const allowColor = options?.allowColor ?? false;

  return {
    price: true,
    brand: true,
    builtInMemory: true,
    color: allowColor,
    ram: false,
    memorySlot: false,
    camera: false,
    cores: false,
    screens: false,
  };
};

export const collectVisibleAttributeValues = (
  selectedOptions: Record<string, string[]>,
  visibility: FilterVisibilityFlags,
): string[] => {
  const values: string[] = [];

  if (visibility.builtInMemory) {
    values.push(...(selectedOptions.builtInMemory || []));
  }

  if (visibility.color) {
    values.push(...(selectedOptions.colors || []));
  }

  if (visibility.ram) {
    values.push(...(selectedOptions.rams || []));
  }

  if (visibility.memorySlot) {
    values.push(...(selectedOptions.memorySlot || []));
  }

  if (visibility.cores) {
    values.push(...(selectedOptions.cores || []));
  }

  if (visibility.screens) {
    values.push(...(selectedOptions.screens || []));
  }

  return values;
};

export const createSearchSmokeCases = (baseUrl: string, query = 'phone') => {
  const common = `${baseUrl}/products/search?query=${encodeURIComponent(query)}&page=0&size=20&sort=price,asc`;

  return [
    { name: 'Base search', url: common },
    { name: 'Search + brandIds=1', url: `${common}&brandIds=1` },
    { name: 'Search + brandIds=2', url: `${common}&brandIds=2` },
    {
      name: 'Search + attributeValueIds=1',
      url: `${common}&attributeValueIds=1`,
    },
    { name: 'Search + minPrice=50000', url: `${common}&minPrice=50000` },
    { name: 'Search + maxPrice=25000', url: `${common}&maxPrice=25000` },
  ];
};
