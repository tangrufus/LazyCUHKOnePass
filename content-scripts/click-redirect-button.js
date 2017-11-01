function onRedirectPage() {
  const pageHTML = (document.getElementsByTagName("html")[0].innerHTML);
  return pageHTML.indexOf("This will log you in via the CUHK Central Authentication System") > 0 ||
    pageHTML.indexOf("經中大認證系統登入");
}

function hasRedirectButton() {
  return document.querySelector("a[href^=\"./?languageCd=\"]") !== null;
}

function clickRedirectButton() {
  document.querySelector("a[href^=\"./?languageCd=\"]").click();
}

if (onRedirectPage() && hasRedirectButton()) {
  clickRedirectButton();
}
