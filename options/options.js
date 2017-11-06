document.addEventListener("DOMContentLoaded", function(event) {
  document.getElementById("form-config").addEventListener("submit", function(evt) {
    evt.preventDefault();

    const config = {
      "username": document.getElementById("username").value,
      "password": document.getElementById("password").value,
    };

    chrome.storage.local.set(config, function() {
      document.getElementById("form-saved-alert").style.display = "block";
    });
  });

  chrome.storage.local.get(["username", "password"], function(config) {
    if (config.hasOwnProperty("username")) {
      document.getElementById("username").value = config.username;
    }

    if (config.hasOwnProperty("password")) {
      document.getElementById("password").value = config.password;
    }
  });
});
