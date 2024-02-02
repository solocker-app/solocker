type Feature = {
  image: string;
  title: string;
  description: string;
  subtitle: string;
  href: string;
};

export const homeFeatures: Feature[] = [
  {
    image: "/assets/images/lp_list.png",
    title: "Create and Deploy a SOL SPL token",
    description:
      "Design and launch a token on Solana, Customize your token by adding, burn, mint and reflection functionality.",
    subtitle: "Learn More",
    href: "/",
  },
  {
    image: "/assets/images/lock_list.png",
    title: "Token Security",
    description:
      "Increase your token security and trust. Create a liquidity lock to help immediately increase community and investor trust",
    subtitle: "Learn More",
    href: "/",
  },
  {
    image: "/assets/images/date.png",
    title: "Create a Vesting Plan That Works",
    description:
      "Reach the gold standard of token management by configuring investor and employee vesting schedules to make sure they receive the correct amount of token at the right time.",
    subtitle: "Learn More",
    href: "/",
  },
  {
    image: "/assets/images/lp_list.png",
    title: "Increase Project's Visibility & Engagement",
    description:
      "The best web3 companies know how to keep people engaged. Create a staking pool to improve community engagement and reduce token sell pressure.",
    subtitle: "Learn More",
    href: "/",
  },
];
