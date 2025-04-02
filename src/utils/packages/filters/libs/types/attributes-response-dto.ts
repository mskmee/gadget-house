
type ValuesResponseDto = {
  id: number;
  value: string;
};

type AttributesResponseDto = {
  id: number;
  name: string;
  attributeValuesList: ValuesResponseDto[];
};

export type { AttributesResponseDto };
