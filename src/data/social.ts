import { IcTelegram, IcDiscord, IcX } from "@/assets";

type Social = {
  name: string;
  href: string;
  icon: typeof import("*.svg") | typeof import("*.png");
};

export const layoutSocials: Social[] = [
  {
    name: "Telegram",
    icon: IcTelegram,
    href: "/",
  },
  {
    name: "Discord",
    icon: IcDiscord,
    href: "/",
  },
  {
    name: "X",
    icon: IcX,
    href: "/",
  },
];
