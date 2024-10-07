import { Pagination as AntdPagination } from 'antd';
import type { PaginationProps } from '@/types/catalog.types';

export default function Pagination({ ...props }: PaginationProps) {
  return <AntdPagination {...props} />;
}
