const APIs = require('./APIs');

let timeout = 60; // s
let critical = 1; // %

let old = {
  btc: null,
  eth: null
};

run();
setInterval(run, timeout * 1000);

async function run() {
  let USDTWD = await APIs.getUSDRate();

  let btc = await APIs.getDigitalRate('BTC');
  let eth = await APIs.getDigitalRate('ETH');
  let btc_p = old.btc ? (btc - old.btc) / old.btc * 100 : 0;
  let eth_p = old.eth ? (eth - old.eth) / old.eth * 100 : 0;
  let btc_twd = btc * USDTWD;
  let eth_twd = eth * USDTWD;
  let btc_warning = btc_p > critical || btc_p < -critical;
  let eth_warning = eth_p > critical || eth_p < -critical;
  old.btc = btc;
  old.eth = eth;

  let btc_str =
    `${btc_warning ? '**' : ''}` +
    `BTC: ${btc} USD ` +
    `(${btc_twd.toFixed(2)} TWD) ` +
    `| ${btc_p.toFixed(2)}%`;
  let eth_str =
    `${eth_warning ? '**' : ''}` +
    `ETH: ${eth} USD ` +
    `(${eth_twd.toFixed(2)} TWD) ` +
    `| ${eth_p.toFixed(2)}%`;

  console.log(new Date().toLocaleString());
  console.log(btc_str);
  console.log(eth_str);
  console.log('----------');

  if (btc_warning || eth_warning) {
    process.stdout.write('\x07');
    process.stdout.write('\x07');
    process.stdout.write('\x07');
    process.stdout.write('\x07');
  }
}
