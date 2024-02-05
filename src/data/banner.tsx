import { IlUserCheck, IlBarChart, IlEcosystem } from "@/assets";

type BannerInfo = {
  image: typeof import("*.svg");
  title: string;
  subtitle: string;
};

export const homeHeroBannerInfos: BannerInfo[] = [
  {
    image: IlUserCheck,
    title: "for founders",
    subtitle:
      "Have peace of mind that you're following the gold-standard for token management. Easy respond to questions from investors and your community about your token.",
  },
  {
    image: IlEcosystem,
    title: "For Solana Ecosystem",
    subtitle:
      "Administer payments and grants to employees or contributors. See how your token supply is distributed in real time.",
  },
  {
    image: IlBarChart,
    title: "for investors and traders",
    subtitle:
      "Assist your founders by helping them use a solution that reduces their stress and time spent on admin.",
  },
];
