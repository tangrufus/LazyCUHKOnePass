chrome.extension.sendRequest({
    request: "accounts"
},
function(response)
 {
    showMSG("Init JS");

    u_id = response.u_id;
    ergwave_id = response.ergwave_id;
    wifi_pw = response.wifi_pw;
    cwem_pw = response.cwem_pw;
    lib_pw = response.lib_pw;
    ergwave_pw = response.ergwave_pw;
    fqdn = response.fqdn;

    redirect_url = "lets9up.com";
    if (!wifi_pw) wifi_pw = "";
    if (!cwem_pw) cwem_pw = "";
    if (!lib_pw) lib_pw = "";
    if (!ergwave_id) ergwave_id = "";
    if (!ergwave_pw) ergwave_pw = "";
    if (!fqdn) fqdn = "";

    com_id = ""
    if (!u_id) {
        u_id = "";
    }
    else {
        if (u_id.charAt(1) == "0") {
            //old student
            com_id = com_id.concat("s", u_id.slice(2, 9));
        }
        else {
            //new student
            com_id = com_id.concat("s", u_id);
        }
    }

    ergwave_stored = ((ergwave_id != "") && (ergwave_pw != "") && (fqdn != ""));
    cuhk_stored = ((com_id != "") && (cwem_pw != ""));
    wifi_stored = ((com_id != "") && (wifi_pw != ""));
    lib_stored = ((com_id != "") && (lib_pw != ""));
    mycuhk_stored = ((u_id != "") && (cwem_pw != ""));
	blackboard_stored = ((u_id != "") && (cwem_pw != ""));
    moodle_stored = ((com_id != "") && (cwem_pw != ""));
    processHTML();
});


function showMSG(msgstr) {
    //Do nothing in release mode
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

function processHTML() {
    pageHTML = (document.getElementsByTagName("html")[0].innerHTML);
    if (pageHTML.indexOf("CUHK Wi-Fi Service - Use Policies and Guidelines") > 0 || pageHTML.indexOf("Wired Network Service - Use Policies and Guidelines") > 0) {
        //CUHK Policy Accept Page
        buttons = document.getElementsByTagName("input");
        for (i = 0; i < buttons.length; i++) {
            if (buttons[i].value.toLowerCase() == "accept") {
                buttons[i].click();
                showMSG("Accept is Automatically Clicked");
            }
        }
    } else if (pageHTML.indexOf("CUHK Wi-Fi Service Login Page") > 0 || pageHTML.indexOf("Wired Network Service - Login Page") > 0) {
        //CUHK Login Page
        if (cuhk_stored == false) {
            showMSG("CUHK account not yet stored");
            return;
        }
        try {
            document.getElementsByName("user")[0].value = com_id;
            document.getElementsByName("password")[0].value = cwem_pw;
        }
        catch(err) {
            }
        document.getElementsByName("Login")[0].click();
        showMSG("Login is Automatically Clicked");
    } else if (pageHTML.indexOf("CUHK Wi-Fi Service - Successful Login") > 0 || pageHTML.indexOf("Wired Network Service - Successful Login") > 0) {
        //CUHK Login Success
        runScript("window.location.href='http://" + redirect_url + "';");
        showMSG("Redirecting");
    
	} else if ((pageHTML.indexOf("Y5ZONE") > 0 && pageHTML.indexOf("密碼 Password") > 0 && pageHTML.indexOf("Remember me") > 0) || (pageHTML.indexOf("McDonald's Corporation.") > 0)) {
        //Y5Zone Login Page
        showMSG("in Y5ZONE login page");
        if (wifi_stored == false) {
            showMSG("Y5Zone account not yet stored");
            return;
        }
        document.getElementsByName("username")[0].value = com_id + "@cuhk.edu.hk";
        document.getElementsByName("password")[0].value = wifi_pw;
        document.getElementsByName("thisForm")[0].submit();
        showMSG("Submit is Automatically Clicked");
    } else if (pageHTML.indexOf("This should take 1 second") > 0) {
        //Y5Zone Login Success
        runScript("window.location.href='http://" + redirect_url + "';");
        showMSG("Redirecting");
    } else if (pageHTML.indexOf("剩餘時間") > 0) {
        //PCCW Login Success
        runScript("window.location.href='http://" + redirect_url + "';");
        showMSG("Redirecting");
    } else if (pageHTML.indexOf("PCCW Wi-Fi") > 0) {
        //PCCW Login Page
        if (wifi_stored == false) {
            showMSG("PCCW account not yet stored");
            return;
        }
        document.getElementById("others_uni_option")[4].selected = "1";
        runScript("MM_jumpMenu(document.getElementById('others_uni_option'));");
        document.getElementsByName("others_uni")[0].focus();
        document.getElementsByName("others_uni")[0].value = com_id;
        document.getElementsByName("others_pwd1")[1].focus();
        document.getElementsByName("others_pwd1")[1].value = wifi_pw;
        runScript("submitForm('login5a');");
        showMSG("Submit is Automatically Clicked");

        //numberthrees work starts here
		
    } else if (pageHTML.indexOf("Blackboard Learn - CUHK") > 0) {
        //blackboard Login Page	
        showMSG("in blackboard login page");
        if (blackboard_stored == false) {
            showMSG("blackboard account not yet stored");
            return;
        }
        try {
			showMSG("try blackboard iframe");
			 
			 
			 function inject() {
				 showMSG("try blackboard inject");
	 			var iframe = document.getElementsByTagName("frame")[1];
	 			var innerDoc = iframe.contentDocument || iframe.contentWindow.document;
	             innerDoc.getElementsByName("user_id")[0].value = u_id;
	             innerDoc.getElementsByName("password")[0].value = cwem_pw;
				 innerDoc.getElementsByTagName("input")[4].click();
				 showMSG("Login is Automatically Clicked");	
			 }
			 
			 setTimeout(inject, 3000);
			 
			}
        catch(err) {
            }
    } else if (pageHTML.indexOf("Staff/Library ID:") > 0) {
        //CUHK Library Login Page	
        if (lib_stored == false) {
            showMSG("Library account not yet stored");
            return;
        }
        try {
            document.getElementsByName("code")[0].value = u_id;
            document.getElementsByName("pin")[0].value = lib_pw;
        }
        catch(err) {
            }
        if (pageHTML.indexOf("Students with an 8-digit ID printed on their CU Link card") > 0) {
            document.getElementsByName("submit")[0].click();
        } else {
            document.forms["fm1"].submit();
        }
        showMSG("Login is Automatically Clicked");
    } else if (pageHTML.indexOf("Welcome to MyCUHK") > 0) {
        //MYCUHK Login Page	
        showMSG("in mycuhk login page");
        if (mycuhk_stored == false) {
            showMSG("MyCUHK account not yet stored");
            return;
        }
        try {
            document.getElementsByName("userid")[0].value = u_id;
            document.getElementsByName("pwd")[0].value = cwem_pw;
        }
        catch(err) {
            }
        document.getElementsByName("Submit")[0].click();
        showMSG("Login is Automatically Clicked");
    } else if (pageHTML.indexOf("Moodle @ The Chinese University of Hong Kong: Login to the site") > 0) {
        //moodle Login Page	
        showMSG("in moodle login page");
        if (moodle_stored == false) {
            showMSG("moodle account not yet stored");
            return;
        }
        try {
            document.getElementsByName("username")[0].value = com_id;
            document.getElementsByName("password")[0].value = cwem_pw;
        }
        catch(err) {
            }
        document.forms["login"].submit();
        showMSG("Login is Automatically Clicked");
    } else if (pageHTML.indexOf("REGISTERED USER") > 0) {
        //ERGWAVE Login Page
        if (ergwave_stored == false) {
            showMSG("ERGWAVE account not yet stored");
            return;
        }
        showMSG("start ERGWAVE login");
        document.getElementsByName("user")[0].focus();
        document.getElementsByName("user")[0].value = ergwave_id;
        document.getElementsByName("password")[0].focus();
        document.getElementsByName("password")[0].value = ergwave_pw;
		//document.getElementsByName("fqdn")[0].focus();
        document.getElementsByName("fqdn")[0].value = fqdn;
		//document.getElementsByName("Login")[0].focus();
      	//document.getElementsByName("Login")[0].click();
 		document.getElementById("regform").submit();
		showMSG("Submit is Automatically Clicked");
    }
}

