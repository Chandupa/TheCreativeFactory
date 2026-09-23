import Image, { type StaticImageData } from "next/image";

interface BackgroundImageProps {
  src: StaticImageData;
  className: string;
}

/**
 * Fixed full-screen photo layer (the legacy `.image-background`). Uses
 * next/image with object-fit: cover — identical to `background-size: cover;
 * background-position: center` — so the multi-MB originals are served as
 * viewport-sized AVIF/WebP instead.
 */
export default function BackgroundImage({ src, className }: BackgroundImageProps) {
  return (
    <div className={className} aria-hidden="true">
      <Image src={src} alt="" fill sizes="100vw" preload quality={75} style={{ objectFit: "cover" }} />
    </div>
  );
}
