export interface PhoneCharacteristics {
  ram: string;
  brand: string;
  memory: string;
  cores: string;
  camera_mp: string;
  memory_card_slot: boolean;
  colors: string[];
}

export interface Phone {
  href: string;
  name: string;
  code: string;
  price: string;
  rating: number;
  characteristics: PhoneCharacteristics;
}
