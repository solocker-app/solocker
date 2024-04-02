const BN = require("bn.js");

export const safeBN = function (...params) {
  const [decimals, value, type, ...rest] = params;
  let input = undefined;

  switch (typeof value) {
    case "number":
      input = Number(value * Math.pow(10, decimals)).toString(16);
      break;
    default:
      if (type === "hex")
        input = new BN(value, "hex").mul(new BN(10).pow(new BN(decimals)));
      else throw new Error("unsupported BN input");
  }

  return new BN(input, "hex", ...rest);
};

export const unsafeBN = function (value, decimals) {
  return value.div(new BN(10).pow(new BN(decimals)));
};

export const unsafeBnToNumber = function (value, decimals) {
  return value.toNumber() / Math.pow(10, decimals);
};

// console.log(new BN(0.5).mul(new BN(10).pow(new BN(9))).toNumber())
// console.log(new BN(0.5).mul(new BN(10).pow(new BN(9))).toNumber());
// console.log(BigInt(0.5) * Math.pow(10, 9))

// function safeBN(value, decimals){
//     const toRepresentation = value <
// }

// console.log(new BN(BigInt(9999999999 * Math.pow(10, 18))).toString())

const input = unsafeBN(
  safeBN(3, 999999999999.597).mul(new BN(10).pow(new BN(9))),
  3,
).toString("hex");
console.log(
  unsafeBnToNumber(safeBN(3, input, "hex").div(new BN(10).pow(new BN(9))), 3),
);
