import Image from "next/image";

import { join } from "@/lib/utils";
import EmptyIcon from "./EmptyIcon";

type OverlapIconProps = {
  images: { alt?: string; src?: string }[];
};

export function getCoinImageProps(metadata) {
  return {
    alt: metadata ? metadata.name : null,
    src: metadata
      ? metadata.network?.image ??
        `https://img.raydium.io/icon/${metadata.mint}.png`
      : null,
  };
}

export default function OverlapIcon({ images }: OverlapIconProps) {
  return (
    <div className="flex items-center">
      {images.map((image, index) =>
        image && image.src ? (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            className={join(
              "w-6 h-6 rounded-full border border-highlight/50",
              index > 0 ? "-ml-2" : null,
            )}
            width={24}
            height={24}
          />
        ) : (
          <EmptyIcon
            key={index}
            className={index > 0 ? "-ml-2" : " "}
          />
        ),
      )}
    </div>
  );
}
