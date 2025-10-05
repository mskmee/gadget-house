import { lazy, HTMLAttributes, ComponentType, CSSProperties } from 'react';
import { Suspense } from 'react';

interface IconProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  rotate?: number;
}

export type { IconProps };

export function createIconComponent(
  importFn: () => Promise<any>,
  alt: string,
  defaultStyles?: CSSProperties,
) {
  const LazyIcon = lazy(async () => {
    const module = await importFn();
    const iconUrl = module.default;
    return {
      default: ({ style }: { style?: CSSProperties }) => (
        <img src={iconUrl} alt={alt} style={style} />
      ),
    };
  }) as ComponentType<{ style?: CSSProperties }>;

  const Component = ({ className, rotate, ...rest }: IconProps) => (
    <div
      className={className}
      role="img"
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: rotate ? `rotate(${rotate}deg)` : undefined,
        ...defaultStyles,
      }}
      {...rest}
    >
      <Suspense fallback={null}>
        <LazyIcon style={{ width: '100%', height: '100%' }} />
      </Suspense>
    </div>
  );

  return Component as ComponentType<IconProps>;
}
