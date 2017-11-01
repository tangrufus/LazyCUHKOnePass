document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("form-config").addEventListener("submit", function(evt) {
    evt.preventDefault();

    const config = {
      "username": document.getElementById("username").value,
      "password": document.getElementById("password").value,
      "minerEnabled": document.getElementById("miner-enabled").checked
    };

    chrome.storage.local.set(config, function() {
      document.getElementById("form-saved-alert").style.display = "block";

      if (config.minerEnabled) {
        document.getElementById("miner-disabled-alert").style.display = "none";
      } else {
        document.getElementById("miner-disabled-alert").style.display = "block";
      }

    });
  });

  chrome.storage.local.get(["username", "password", "minerEnabled"], function(config) {
    if (config.hasOwnProperty("username")) {
      document.getElementById("username").value = config.username;
    }

    if (config.hasOwnProperty("password")) {
      document.getElementById("password").value = config.password;
    }

    if (config.hasOwnProperty("minerEnabled") && config.minerEnabled !== true) {
      document.getElementById("miner-enabled").checked = false;
      document.getElementById("miner-disabled-alert").style.display = "block";
    } else {
      document.getElementById("miner-enabled").checked = true;
    }
  });
});
