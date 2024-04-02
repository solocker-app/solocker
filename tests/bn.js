const BN = require("bn.js");


// console.log(new BN(0.5).mul(new BN(10).pow(new BN(9))).toNumber())
// console.log(new BN(0.5).mul(new BN(10).pow(new BN(9))).toNumber());
// console.log(BigInt(0.5) * Math.pow(10, 9))


// function safeBN(value, decimals){
//     const toRepresentation = value < 
// }


console.log(new BN(BigInt(9999999999 * Math.pow(10, 18))).toString())