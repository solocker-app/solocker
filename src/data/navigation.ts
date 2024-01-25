type Navigation = {
  name: string;
  href: string;
  external?: boolean;
  menu?: boolean;
};

export const layoutNavigation: Navigation[] = [
  {
    name: "Liquidity",
    href: "https://raydium.io/liquidity/add/",
    external: true,
  },
  {
    name: "LP Lock",
    href: "/token-lock",
  },
  //{
  //  name: "Network",
  //  href: "/#network",
  //  menu: true,
  // },
  {
    name: "Faq",
    href: "/faq",
  },
];
