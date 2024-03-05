import Image from "next/image";

import { MdQuestionMark } from "react-icons/md";

import { join } from "@/lib/utils";

type OverlapCoinIconProps = {
  icons: {
    src?: string;
    alt: string;
  }[];
  className?: string;
};

export const getCoinProps = function (metadata: any) {
  return {
    src: metadata
      ? metadata.jsonMetadata
        ? metadata.jsonMetadata.image
        : `https://img.raydium.io/icon/${metadata.mint}.png`
      : null,
    alt: metadata ? metadata.name : "",
  };
};

export default function OverlapCoinIcon({
  icons,
  className,
}: OverlapCoinIconProps) {
  return (
    <div className="flex">
      {icons.map((icon, index) =>
        icon.src ? (
          <Image
            key={index}
            className={join(
              "border border-dark rounded-full",
              index > 0 ? "-ml-2" : undefined,
              className ? className : "w-8 h-8",
            )}
            src={icon.src}
            alt={icon.alt}
            width={24}
            height={24}
          />
        ) : (
          <div
            key={index}
            className={join(
              "flex items-center justify-center bg-white/20 border border-dark rounded-full",
              index > 0 ? "-ml-2" : undefined,
              className ? className : "w-8 h-8",
            )}
          >
            <MdQuestionMark className="text-lg text-white" />
          </div>
        ),
      )}
    </div>
  );
}
