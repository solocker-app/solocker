import { safeBN, unsafeBN, unsafeBnToNumber } from "../src/lib/utils";
import { BN } from "bn.js";

console.log(
  unsafeBnToNumber(unsafeBN(safeBN(31463.263888000000000008).mul(new BN(10).pow(new BN(9))))),
);
