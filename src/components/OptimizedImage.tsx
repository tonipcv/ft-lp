import Image, { ImageProps } from 'next/image';

interface OptimizedImageProps extends Omit<ImageProps, 'quality' | 'loading'> {
  priority?: boolean;
}

export function OptimizedImage({ priority = false, ...props }: OptimizedImageProps) {
  return (
    <Image
      {...props}
      quality={90}
      loading={priority ? 'eager' : 'lazy'}
      style={{
        ...props.style,
        maxWidth: '100%',
        height: 'auto'
      }}
    />
  );
}
