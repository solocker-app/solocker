type Navigation = {
  name: string;
  href: string;
  external?: boolean;
  menu?: boolean;
};

export const layoutNavigation: Navigation[] = [
  {
    name: "Liquidity",
    href: "/liquidity",
    external: true,
  },
  {
    name: "Liquidity Pool Lock",
    href: "/token-lock",
  },
  {
    name: "Network",
    href: "/#network",
    menu: true,
  },
  {
    name: "Faq",
    href: "/faq",
  },
];
