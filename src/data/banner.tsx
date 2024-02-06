import { IlUserCheck, IlBarChart, IlEcosystem } from "@/assets";

type BannerInfo = {
  image: typeof import("*.svg");
  title: string;
  subtitle: string;
};

export const homeHeroBannerInfos: BannerInfo[] = [
  {
    image: IlUserCheck,
    title: "for teams",
    subtitle:
      "Have peace of mind that you're following the gold-standard for token management.",
  },
  {
    image: IlEcosystem,
    title: "For foundations",
    subtitle:
      "Administer payments and grants to employees or contributors. See how your token supply is distributed in real time.",
  },
  {
    image: IlBarChart,
    title: "for investors",
    subtitle:
      "Invest in projects with real vesting and sound tokenomics",
  },
];
