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
    title: "Lock your LP Tokens on Solana.",
    description:
      "Create a liquidity lock to help increase investor trust on SOLocker. Get discounts in the cost of locking by staking your $LOCK tokens.",
    subtitle: "Learn More",
    href: "/",
  },
  {
    image: "/assets/images/date.png",
    title: "Presale tokens distributions with a press of a button.",
    description:
      "SOLocker manages your presale distributions to seamlessly airdrop your KOLs in a single bundled transaction.",
    subtitle: "Learn More",
    href: "/",
  },
  {
    image: "/assets/images/lp_list.png",
    title: "Deploy safe token contracts, with all the bells and whistles.",
    description:
      "We support the regular SPL token standard and the Token2022 standard to allow limitless flexibility on how you want to operate on Solana.",
    subtitle: "Learn More",
    href: "/",
  },
  {
    image: "/assets/images/lock_list.png",
    title: "Execute your team vesting plans.",
    description:
      "Provide peace of mind to your tokenomic distribution with secure non-custodial smart vesting. Stake $LOCK to generate a real time dashboard of your vesting schedules.",
    subtitle: "Learn More",
    href: "/",
  },
];
