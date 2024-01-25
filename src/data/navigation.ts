type Navigation = {
  name: string;
  href: string;
  external?: boolean,
};

export const layoutNavigation: Navigation[] = [
  {
    name: "Liquidity",
    href: "/liquidity",
    external: true,
  },
  {
    name: "Lock LP Token",
    href: "/liquidity",
  },
  {
    name: "Locked Assets",
    href: "/locked",
  },
  {
    name: "Faq",
    href: "/faq",
  },
];
