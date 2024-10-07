import type {
  HTMLAttributes,
  DetailedHTMLProps,
  PropsWithChildren,
} from 'react';

export interface ContainerProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    PropsWithChildren {}
