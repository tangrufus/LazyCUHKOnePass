//check first run?
 function onInstall() {
    //console.log("Extension Installed");
	chrome.tabs.create({url: "options.html"});
	chrome.tabs.create({url: "update.html"});
  }

  function onUpdate() {
    //console.log("Extension Updated");
	chrome.tabs.create({url: "options.html"});
	chrome.tabs.create({url: "update.html"});
  }

  function getVersion() {
    var details = chrome.app.getDetails();
    return details.version;
  }

  // Check if the version has changed.
  var currVersion = getVersion();
  var prevVersion = localStorage['version'];
  if (currVersion != prevVersion) {
    // Check if we just installed this extension.
    if (typeof prevVersion == 'undefined') {
      onInstall();
    } else {
      onUpdate();
    }
    localStorage['version'] = currVersion;
  }
//end check first run?

//check enable status
if (localStorage['enabled'] == "false") {
  chrome.browserAction.setIcon({path:"icon/icon48_gray.png"});
}

//diable or enable
chrome.browserAction.onClicked.addListener(function () {
	if (localStorage['enabled'] == "true") {
		localStorage['enabled'] = "false";
		chrome.browserAction.setIcon({path:"icon/icon48_gray.png"});
	} else {
		localStorage['enabled'] = "true";
		chrome.browserAction.setIcon({path:"icon/icon48.png"});
	}
});

//send localhost
chrome.extension.onRequest.addListener( function(request, sender, sendResponse) {
	if (request.request == "accounts") {
		sendResponse({
			"enabled": localStorage["enabled"],
			"u_id": localStorage["u_id"],
			"wifi_pw": localStorage["wifi_pw"],
			"lib_pw": localStorage["lib_pw"],
			"cwem_pw": localStorage["cwem_pw"],
			"ergwave_id": localStorage["ergwave_id"],
			"ergwave_pw": localStorage["ergwave_pw"],
			"fqdn": localStorage["fqdn"]
		});
    } else {
    	sendResponse({}); // snub them.
    }
});
