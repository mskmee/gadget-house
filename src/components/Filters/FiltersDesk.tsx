import { useMemo, useState } from 'react';
import { Row, Col, InputNumber, Slider } from 'antd';

import { IProduct } from '@/interfaces/interfaces';
import { filters, smartData } from './consts';
import { Option } from './Option';

import styles from './filters.module.scss';

export const FiltersDesk = () => {
  const [selectedOptions, setSelectedOptions] = useState<
    Record<string, string[]>
  >({});
  const [priceRange, setPriceRange] = useState<number[]>([11770, 65500]);
  const [, setFilteredProducts] = useState<IProduct[]>([]);
  const [minPrice, setMinPrice] = useState<number>(11770);
  const [maxPrice, setMaxPrice] = useState<number>(65500);
  const [minCameraMP, setMinMP] = useState<number>(0);
  const [maxCameraMP, setMaxMP] = useState<number>(0);

  const handleOptionChange = (optionKey: string, value: string) => {
    setSelectedOptions((prev) => {
      const newOptions = { ...prev };
      if (!newOptions[optionKey]) newOptions[optionKey] = [];
      if (newOptions[optionKey].includes(value)) {
        newOptions[optionKey] = newOptions[optionKey].filter(
          (v) => v !== value,
        );
      } else {
        newOptions[optionKey].push(value);
      }
      return newOptions;
    });
  };

  const handleSliderChange = (value: number[]) => {
    setPriceRange(value);
    setMinPrice(value[0]);
    setMaxPrice(value[1]);
  };

  const handleMinPriceChange = (value: number | null) => {
    if (value) {
      setMinPrice(value);
      setPriceRange([value, maxPrice]);
    }
  };

  const handleMaxPriceChange = (value: number | null) => {
    if (value) {
      setMaxPrice(value);
      setPriceRange([minPrice, value]);
    }
  };

  const handleMinMPChange = (value: number | null) => {
    if (value) {
      setMinMP(value);
    }
  };

  const handleMaxMPChange = (value: number | null) => {
    if (value) {
      setMaxMP(value);
    }
  };

  const filteredProducts = useMemo(() => {
    return smartData.filter((product: IProduct) => {
      let isMatch = true;

      // Фильтр по диапазону цен
      if (priceRange.length === 2) {
        const [minPrice, maxPrice] = priceRange;
        isMatch = product.price >= minPrice && product.price <= maxPrice;
      }

      // Фильтр по мегапикселям камеры
      if (minCameraMP && maxCameraMP) {
        isMatch =
          isMatch &&
          product.cameraMP >= minCameraMP &&
          product.cameraMP <= maxCameraMP;
      }

      // Фильтр по выбранным опциям
      if (Object.keys(selectedOptions).length > 0 && product.options) {
        Object.keys(selectedOptions).forEach((optionKey) => {
          if (selectedOptions[optionKey].length > 0) {
            const productOption = product.options?.[optionKey];
            if (productOption) {
              isMatch =
                isMatch &&
                selectedOptions[optionKey].some((value) =>
                  productOption.includes(value),
                );
            }
          }
        });
      }

      return isMatch;
    });
  }, [selectedOptions, priceRange, minCameraMP, maxCameraMP]);

  const handleFilter = () => setFilteredProducts(filteredProducts);

  return (
    <aside className={styles.filtersDesk}>
      <h2 className={styles.filtersDesk__title}>Filters</h2>

      <div className={styles.filters__wrapper}>
        {/* Price Range */}
        <Col span={24} className={styles.filters__option}>
          <h4 className={styles.filters__optionName}>Price Range</h4>
          <Slider
            range
            min={50}
            max={100000}
            value={priceRange}
            onChange={handleSliderChange}
            className={styles.filters__sliderRange}
          />

          <Row gutter={16}>
            <Col span={12}>
              <span className={styles.filters__priceText}>From</span>
              <InputNumber
                min={50}
                max={99999}
                value={minPrice}
                controls={false}
                onChange={handleMinPriceChange}
                style={{
                  width: '70px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                }}
              />
              <span className={styles.filters__priceCurrency}>₴</span>
            </Col>

            <Col span={12}>
              <span className={styles.filters__priceText}>To</span>
              <InputNumber
                min={51}
                max={100000}
                value={maxPrice}
                controls={false}
                onChange={handleMaxPriceChange}
                style={{
                  width: '72px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                }}
              />
              <span className={styles.filters__priceCurrency}>₴</span>
            </Col>
          </Row>
        </Col>

        {/* Brands */}
        {filters.brands && (
          <Option
            data={filters.brands ?? []}
            option="brands"
            title="Brands"
            btnMore={true}
            optionChange={handleOptionChange}
          />
        )}

        {/* Built-in Memory */}
        {filters.builtInMemory && (
          <Option
            data={filters.builtInMemory ?? []}
            title="Built-in Memory"
            option="builtInMemory"
            btnMore={false}
            optionChange={handleOptionChange}
          />
        )}

        {/* RAM */}
        {filters.rams && (
          <Option
            data={filters.rams ?? []}
            title="RAM"
            option="rams"
            btnMore={false}
            optionChange={handleOptionChange}
          />
        )}

        {/* Separate Memory Slot */}
        <Option
          data={['Yes', 'No']}
          title="Separate Memory Slot"
          option="memorySlot"
          btnMore={false}
          optionChange={handleOptionChange}
        />

        {/* Color */}
        {filters.colors && (
          <Option
            data={filters.colors}
            title="Color"
            option="colors"
            btnMore={true}
            optionChange={handleOptionChange}
          />
        )}

        {/* Main Camera */}
        <div className={styles.filters__option}>
          <h4 className={styles.filters__optionName}>Main Camera, MP</h4>
          <Row gutter={16}>
            <Col span={12} className={styles.filters__camera}>
              <span className={styles.filters__priceText}>From</span>
              <InputNumber
                min={0}
                max={644}
                value={minCameraMP}
                defaultValue={0}
                controls={false}
                onChange={handleMinMPChange}
                style={{
                  width: '70px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                  textAlign: 'center',
                }}
              />
            </Col>
            <Col span={12} className={styles.filters__camera}>
              <span className={styles.filters__priceText}>To</span>
              <InputNumber
                min={0}
                max={644}
                value={maxCameraMP}
                defaultValue={0}
                controls={false}
                onChange={handleMaxMPChange}
                style={{
                  width: '70px',
                  border: '1px solid #1c1817',
                  borderRadius: '10px',
                  padding: '4px 0px',
                  backgroundColor: 'white',
                  fontSize: '16px',
                  color: '#1c1817',
                  textAlign: 'center',
                }}
              />
            </Col>
          </Row>
        </div>

        {/* Number of Cores */}
        {filters.cores && (
          <Option
            data={filters.cores}
            title="Number of Cores"
            option="cores"
            btnMore={false}
            optionChange={handleOptionChange}
          />
        )}

        {/* Screen Type */}
        {filters.screens && (
          <Option
            data={filters.screens}
            title="Screen Type"
            option="screens"
            btnMore={true}
            optionChange={handleOptionChange}
          />
        )}
      </div>

      <button
        className={styles.filters__apply}
        type="submit"
        onClick={() => handleFilter()}
        disabled={!selectedOptions}
      >
        Apply
      </button>
    </aside>
  );
};
