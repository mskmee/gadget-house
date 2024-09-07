import type { Phone } from '@/types/generateFakeData.types';
import type { ReactNode, PropsWithChildren, SVGProps } from 'react';
import { type PaginationProps as AntdPaginationProps } from 'antd';

export interface FilterProps {
  title: string;
  options: string[];
  afterOption?: ReactNode;
  hasColor?: boolean;
  handleChange: () => void;
}

export interface ArrowButtonProps {
  isOpen: boolean;
}

export interface FilterWrapperProps extends PropsWithChildren {
  title: string;
}

export interface LikeIconProps extends SVGProps<SVGSVGElement> {}

export interface PaginationProps extends AntdPaginationProps {}

export interface PhoneFiltersProps {
  paginatedPhones: Phone[];
}
