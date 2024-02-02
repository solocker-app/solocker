import Image from "next/image";

import { MdQuestionMark } from "react-icons/md";

import { join } from "@/lib/utils";

type OverlapCoinIconProps = {
  icons: {
    src?: string;
    alt: string;
  }[];
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

export default function OverlapCoinIcon({ icons }: OverlapCoinIconProps) {
  return (
    <div className="flex">
      {icons.map((icon, index) =>
        icon.src ? (
          <Image
            className={join(
              "w-8 h-8 border border-dark rounded-full",
              index > 0 ? "-ml-2" : undefined,
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
              "w-8 h-8 flex items-center justify-center bg-white/20 border border-dark rounded-full",
              index > 0 ? "-ml-2" : undefined,
            )}
          >
            <MdQuestionMark className="text-lg text-white" />
          </div>
        ),
      )}
    </div>
  );
}
