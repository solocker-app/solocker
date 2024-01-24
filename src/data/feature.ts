import {
  IlSecureLiquidity,
  IlUserFriendly,
  IlTransparency,
  IlCommunity,
} from "@/assets";

type Feature = {
  image: typeof import("*.svg");
  title: string;
  description: string;
};

export const homeFeatures: Feature[] = [
  {
    image: IlSecureLiquidity,
    title: "Secured Liquidity Locked",
    description:
      "Ensuring the safety of your assets through rigorous security measures and protocols.",
  },
  {
    image: IlUserFriendly,
    title: "User-Friendly Interface",
    description:
      "Streamlined and intuitive design for an effortless user experience.",
  },
  {
    image: IlTransparency,
    title: "Transparent Governance",
    description:
      "A clear and open decision making process that allows users to have a say in the platform's development.",
  },
  {
    image: IlCommunity,
    title: "Community Driven",
    description:
      "A platform built by the community, for the community, with a focus on collaboration and growth.",
  },
];
