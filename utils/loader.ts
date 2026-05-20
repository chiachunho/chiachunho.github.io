import type { ImageLoaderProps } from 'next/image';

export default function customImageLoader({ src }: ImageLoaderProps) {
  return `${src}`;
}
