const fs = require("fs");
/**
 *
 * @param {string} path
 * @param  {string[]} keys
 */
function excludeKeys(obj, keys) {
  for (const key of keys) delete obj[key];
}

/**
 * @param {string} path
 */
function trimRaydriumLiquidityPoolJson(path) {
  const file = JSON.parse(fs.readFileSync(path, "utf-8"));
  // const infos = [file.official, file.unOfficial].flat();
  const infos = file;
  const mints = [];
  for (const info of infos) {
    mints.push(info.lpMint);
  }
  fs.writeFileSync(path, JSON.stringify(mints));
}

function main() {
  trimRaydriumLiquidityPoolJson("./src/assets/json/raydium.mainnet.json");
}

main();
