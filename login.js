chrome.extension.sendRequest({
	request: "accounts"
},
function(response)
{
	showMSG("Init LazyCUHK");

	redirect_url = "https://cdn.rawgit.com/TangRufus/LazyCUHK/46244bdede0d53aaa761ad44dccf85c6a7f969d2/redirect.html";

	u_id = response.u_id || "";
	ergwave_id = response.ergwave_id || "";
	wifi_pw = response.wifi_pw || "";
	cwem_pw = response.cwem_pw || "";
	lib_pw = response.lib_pw || "";
	ergwave_pw = response.ergwave_pw || "";
	fqdn = response.fqdn || "";

	if (u_id != "") {
		com_id = makeComputerID(u_id);
	} else {
		com_id = "";
	}

	ergwave_stored = ((ergwave_id != "") && (ergwave_pw != "") && (fqdn != ""));
	com_stored = ((com_id != "") && (cwem_pw != ""));
	wifi_stored = ((com_id != "") && (wifi_pw != ""));
	lib_stored = ((com_id != "") && (lib_pw != ""));
	cwem_stored = ((u_id != "") && (cwem_pw != ""));
	iewave_stored = ((ergwave_id != "") && (ergwave_pw != "") && (fqdn == "IE"));

	processHTML();

});

function makeComputerID(u_id) {
	if (u_id.charAt(1) == "0") {
		//old student
		return "".concat("s", u_id.slice(2, 9));
	}
	else {
		//new student
		return "".concat("s", u_id);
	}
}

function showMSG(msgstr) {
	// Do nothing in production mode
	// var ndiv = document.createElement("div");
	// ndiv.innerHTML = "<font color=red><b>***" + msgstr + "***</b></font>";
	// document.body.appendChild(ndiv);
	// alert(msgstr);
}

function runScript(scriptstr) {
	var scriptNode = document.createElement("script");
	scriptNode.textContent = scriptstr;
	document.body.appendChild(scriptNode);
}

function redirectAfterLogin() {
	showMSG("Redirecting");
	runScript("window.location.href='" + redirect_url + "';");
}

function appectCUHKPolicy() {
	buttons = document.getElementsByTagName("input");
	for (i = 0; i < buttons.length; i++) {
		if (buttons[i].value.toLowerCase() == "accept") {
			buttons[i].click();
			showMSG("Accept is Automatically Clicked");
		}
	}
}

function loginCUHKWifi() {
	try {
		document.getElementsByName("user")[0].value = com_id;
		document.getElementsByName("password")[0].value = cwem_pw;
	}
	catch(err) {
	}
	document.getElementsByName("Login")[0].click();
	showMSG("Login is Automatically Clicked");
}

function loginCSLWifi() {
	showMSG("PCCW /CSL login page");
	document.getElementById("myLogin_tab_5").click();
	document.getElementById("others_uni_option")[4].selected = "1";
	runScript("MM_jumpMenu(document.getElementById('others_uni_option'));");
	document.getElementsByName("others_uni")[0].focus();
	document.getElementsByName("others_uni")[0].value = com_id;
	document.getElementsByName("others_pwd1")[1].focus();
	document.getElementsByName("others_pwd1")[1].value = wifi_pw;
	runScript("submitForm('login5a');");
	showMSG("Submit is Automatically Clicked");
}

function loginBlackboard() {
	showMSG("start Blackboard login");
	try {
		showMSG("try blackboard iframe");

		function inject() {
			showMSG("try blackboard inject");

			document.getElementsByName('user_id')[0].value = u_id;
			document.getElementsByName('password')[0].value = cwem_pw;
			document.querySelector('input.submit').click();
			showMSG("Login is Automatically Clicked");
		}

		setTimeout(inject, 3000);

	}
	catch(err) {
	}
}

function loginCUHKLibrary() {
	showMSG("start CUHK Library login");
	try {
		if (pageHTML.indexOf("bor_id") > 0 && pageHTML.indexOf("bor_verification") > 0) {
			document.getElementsByName("bor_id")[0].value = u_id;
			document.getElementsByName("bor_verification")[0].value = lib_pw;

		} else if (pageHTML.indexOf("Logon to your Library record") > 0) {
			document.getElementsByName("code")[0].value = u_id;
			document.getElementsByName("pin")[0].value = lib_pw;
		} else {
			document.getElementById("username").value = u_id;
			document.getElementById("passwd").value = lib_pw;
		}
	}
	catch(err) {
	}
	if (pageHTML.indexOf("bor_id") > 0 && pageHTML.indexOf("bor_verification") > 0) {
		document.getElementsByName("form1")[0].submit();
	} else if (pageHTML.indexOf("Logon to your Library record") > 0) {
		document.getElementsByName("submit")[0].click();
	} else {
		document.getElementsByName(".save")[0].click();
	}
	showMSG("Login is Automatically Clicked");
}

function loginMyCUHK() {
	showMSG("start MyCUHK login");
	try {
		document.getElementsByName("userid")[0].value = u_id;
		document.getElementsByName("pwd")[0].value = cwem_pw;
	}
	catch(err) {
	}
	document.getElementsByName("Submit")[0].click();
	showMSG("Login is Automatically Clicked");
}

function loginERGWAVE() {
	showMSG("start ERGWAVE login");
	document.getElementsByName("user")[0].focus();
	document.getElementsByName("user")[0].value = ergwave_id;
	document.getElementsByName("password")[0].focus();
	document.getElementsByName("password")[0].value = ergwave_pw;
	document.getElementsByName("fqdn")[0].value = fqdn;
	document.getElementById("regform").submit();
	showMSG("Submit is Automatically Clicked");
}

function loginUHS() {
	showMSG("start UHS login");
	document.getElementsByName('txtLoginID')[0].value = u_id;
	document.getElementsByName('txtPW')[0].value = cwem_pw;
	document.getElementsByName('btnLogin')[0].click();
	showMSG("Submit is Automatically Clicked");
}

function loginY5Zone() {
	showMSG("start Y5Zone login");
	document.getElementsByName("username")[0].value = com_id + "@cuhk.edu.hk";
	document.getElementsByName("password")[0].value = wifi_pw;
	document.getElementsByName("thisForm")[0].submit();
	showMSG("Submit is Automatically Clicked");
}

function loginIEWAVE() {
	showMSG("start IEWAVE login");
	document.getElementsByName("username")[0].value = ergwave_id;
	document.getElementsByName("password")[0].value = ergwave_pw;
	document.getElementsByName("form")[0].submit();
	showMSG("Submit is Automatically Clicked");
}

function loginOffice365() {
	showMSG("start Office365 login");
	document.getElementsByName("UserName")[0].value = u_id + "@link.cuhk.edu.hk";
	document.getElementsByName("Password")[0].value = cwem_pw;
	document.getElementById("loginForm").submit();
	showMSG("Submit is Automatically Clicked");
}

function loginWorkshopRegSys() {
	showMSG("start Workshop Registration System login");
	document.getElementById("txtLoginName").value = u_id;
	document.getElementById("txtPassword").value = cwem_pw;
	document.getElementById("btnSubmit").click();
	showMSG("Submit is Automatically Clicked");
}

function loginSportsBookingSys() {
	showMSG("start Sports Facilities Booking System login");
	document.getElementsByName("id")[0].value = com_id;
	document.getElementsByName("password")[0].value = cwem_pw;
	document.getElementsByName("submit")[0].click();
	showMSG("SUbmit is Automatically Clicked");
}

function processHTML() {

	showMSG("processHTML");

	pageHTML = (document.getElementsByTagName("html")[0].innerHTML);

	if (pageHTML.indexOf("CUHK Wi-Fi Service - Use Policies and Guidelines") > 0 || pageHTML.indexOf("Wired Network Service - Use Policies and Guidelines") > 0) {

		//CUHK Policy Accept Page
		appectCUHKPolicy();

	} else if (pageHTML.indexOf("CUHK Wi-Fi Service Login Page") > 0 || pageHTML.indexOf("Wired Network Service - Login Page") > 0) {

		//CUHK Login Page
		if (com_stored == false) {
			showMSG("CUHK account not yet stored");
		} else {
			loginCUHKWifi();
		}

	} else if (pageHTML.indexOf("CUHK Wi-Fi Service - Successful Login") > 0 || pageHTML.indexOf("Wired Network Service - Successful Login") > 0) {

		//CUHK Login Success
		redirectAfterLogin();

	} else if (pageHTML.indexOf("剩餘時間") > 0) {

		//PCCW / CSL Login Success
		redirectAfterLogin();

	} else if (pageHTML.indexOf("歡迎使用csl Wi-Fi服務") > 0) {

		//PCCW / CSL Login Page
		if (wifi_stored == false) {
			showMSG("PCCW / CSL account not yet stored");
		} else {
			loginCSLWifi();
		}

	} else if (pageHTML.indexOf("Blackboard Learn") > 0) {

		//blackboard Login Page
		if (cwem_stored == false) {
			showMSG("blackboard account not yet stored");
		} else {
			loginBlackboard();
		}

	} else if (pageHTML.indexOf("Staff/Library ID") > 0 || pageHTML.indexOf("Student / Staff / Library ID") > 0) {

		//CUHK Library Login Page
		if (lib_stored == false) {
			showMSG("Library account not yet stored");
		} else {
			loginCUHKLibrary();
		}

	} else if (pageHTML.indexOf("Welcome to MyCUHK") > 0) {

		//MYCUHK Login Page
		if (cwem_stored == false) {
			showMSG("MyCUHK account not yet stored");
		} else {
			loginMyCUHK();
		}

	} else if (pageHTML.indexOf("REGISTERED USER") > 0) {

		//ERGWAVE Login Page
		if (ergwave_stored == false) {
			showMSG("ERGWAVE account not yet stored");
		} else {
			loginERGWAVE();
		}

	}else if (pageHTML.indexOf("CADS Ref. No.: 147") > 0 && pageHTML.indexOf("Invalid Login.") <= 0 ) {

		//University Health Service - Internet Booking System
		if (cwem_stored == false) {
			showMSG("UHS account not yet stored");
		} else {
			loginUHS();
		}

	} else if ( pageHTML.indexOf("Copyright Y5ZONE Limited") > 0 && pageHTML.indexOf("WI-FI LOGIN") > 0 ) {

		//Y5Zone Login Page
		if (wifi_stored == false) {
			showMSG("Y5Zone account not yet stored");
		} else {
			loginY5Zone();
		}

	} else if (pageHTML.indexOf("Thank you for using Y5ZONE FREE WiFi Service") > 0 && pageHTML.indexOf("You are now connected to the Internet") > 0) {

		//Y5Zone Login Success
		redirectAfterLogin();

	} else if (pageHTML.indexOf("IE Wireless LAN Login Portal") > 0 && pageHTML.indexOf("login.chi") > 0 && pageHTML.indexOf("was not valid") < 0) {

		//IEWAVE Login Page
		if (iewave_stored == false) {
			showMSG("IEWAVE account not yet stored");
		} else {
			loginIEWAVE();
		}

	} else if (pageHTML.indexOf("IE Wireless LAN Login Portal") > 0 && pageHTML.indexOf("You are about to be redirected to") > 0) {

		//IEWAVE Login Success
		redirectAfterLogin();

	} else if (pageHTML.indexOf("Registered for CUHK Office 365") > 0 && document.getElementById("errorText").innerHTML == "") {

		//CUHKLink Login Page
		if (cwem_stored == false) {
			showMSG("CUHK Office 365 link account not yet stored");
		} else {
			loginOffice365();
		}
	} else if (pageHTML.indexOf("CADS Reference Number: 035") > 0 && pageHTML.indexOf("University ID or Password Incorrect !!") <= 0) {

		//Workshop Registration System
		if (cwem_stored == false) {
			showMSG("CWEM account not yet stored");
		} else {
			loginWorkshopRegSys();
		}
	} else if (pageHTML.indexOf("CADS Reference number: 015") > 0) {

		//Sports Facilities Booking System
		if (com_stored == false) {
			showMSG("Computer ID account not yet stored");
		} else {
			loginSportsBookingSys();
		}
	}

}
