// const borsh = require("borsh");
const { PublicKey } = require("@solana/web3.js");
const base58 = require("bs58");



const data2 = "1Nfwur6BvSXNEYEW4xKHPCcLgLgdwwmL2F3ppUJi7qYM7ypX43";
const data =
  "zJa1kcbqsBRjwg26kdsMEqUDoGsYHgYLCPsdTEaSetaH2pHzoUV2aR9ymTTWH39FL4aM2poxePKE7tGarx5H2LNmCbQLdvuqMDLwYvfFHNPnuCM1tWidrF6GSe8UWdPkvaJKY3eatP3bzxxwtxQYNxBh1";

const buf = Buffer.from(data);
const buf2 = Buffer.from(data2);

const a = buf.slice(0, 32);
const seed = Buffer.from("1511312979136742628337534380651869247563347998703551268508924183").slice(0, 31)

console.log(base58.encode(seed))

// const b = buf.slice(18, 64);
// const c = buf.slice(64, 96);
// const d = buf.slice(96);

console.log(a);
console.log(base58.encode(a));
// console.log(Buffer.from(b).toString('utf-8'));

// console.log(Buffer.concat([a, b, c, d]))
// console.log(buf)
