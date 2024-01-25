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
    name: "Token Lock",
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
