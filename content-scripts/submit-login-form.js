function onLoginPage() {
  const pageHTML = (document.getElementsByTagName('html')[0].innerHTML);
  return (pageHTML.indexOf('Welcome to OnePass') > 0 &&
      pageHTML.indexOf('CADS Reference Number: 246') > 0) ||
    (pageHTML.indexOf('歡迎使用 OnePass') > 0 &&
      pageHTML.indexOf('CADS 參考編號: 246') > 0);
}

function hasLoginForm() {
  const pageHTML = (document.getElementsByTagName('html')[0].innerHTML);
  return pageHTML.indexOf('<form name="loginForm" ') > 0;
}

function hasFormError() {
  const pageHTML = (document.getElementsByTagName('html')[0].innerHTML);
  return (pageHTML.indexOf('Incorrect Login ID or Password') > 0 ||
    pageHTML.indexOf('密碼不正確') > 0);
}

function submitLoginForm(username, password) {
  document.getElementsByName('username')[0].value = username;
  document.getElementsByName('password')[0].value = password;
  document.getElementsByName('loginForm')[0].submit();
}

function checkCredentialsAndSubmitLoginForm() {
  chrome.storage.local.get(['username', 'password'], (credentials) => {
    if (!credentials.hasOwnProperty('username') || !credentials.hasOwnProperty('password')) {
      return;
    }

    submitLoginForm(credentials.username, credentials.password);
  });
}

if (onLoginPage() && hasLoginForm() && !hasFormError()) {
  checkCredentialsAndSubmitLoginForm();
}
