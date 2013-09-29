// When the DOM is ready...
$(function() {

    // Hide stuff with the JavaScript. If JS is disabled, the form will still be useable.
    // NOTE:
    // Sometimes using the .hide(); function isn't as ideal as it uses display: none;
    // which has problems with some screen readers. Applying a CSS class to kick it off the
    // screen is usually prefered, but since we will be UNhiding these as well, this works.

    // init
    loadData();
	ergwaveTest();
    stepOne();
    stepTwoTest();
    stepOneTest();
	
	function ergwaveTest(){
		if ($("#fqdn").val() != ""){
			$("#ergwave_id_wrap").slideDown();
			$("#ergwave_pw_wrap").slideDown();
		}
		else{
			$("#ergwave_id_wrap").slideUp();
			$("#ergwave_pw_wrap").slideUp();
		}
	}
	

    // Fade out steps 2 and 3 until ready
    function stepOne() {
        $("#step_1").css({
            "background-image": "none"
        });
        $("#step_2").css({
            opacity: 0.3,
            "background-image": "none"
        });
        $("#step_3").css({
            opacity: 0.3,
            "background-image": "none"
        });
    }
    function stepTwo() {
        $("#step_2").css({
            opacity: 1.0,
            "background-image": "none"
        });
        $("#step_2 legend").css({
            opacity: 1.0
        });
        $("#step_3").css({
            opacity: 0.3,
            "background-image": "none"
        });
    }

	//step 1 test
    function stepOneTest() {
        var u_id_complete = false;
		var ergwave_id_complete = false;
		$(".upw").attr('disabled', true);
		$(".ergpw").attr('disabled', true);
		
        if ($("#u_id").val() != '' && $("#u_id").val().length == 10) {
            u_id_complete = true;
			$(".upw").attr('disabled', false);
        }

		if ($("#fqdn").val() != ""){
			if ($("#ergwave_id").val() != '' && $("#ergwave_id").val().length > 3) {
            ergwave_id_complete = true;
			$(".ergpw").attr('disabled', false);
			}
        }


        if (u_id_complete || ergwave_id_complete) {
            $("#step_1")
            .animate({
                paddingBottom: "120px"
            })
            .css({
                "background-image": "url(images/check.png)",
                "background-position": "bottom center",
                "background-repeat": "no-repeat"
            });
            $("#step_2").css({
                opacity: 1.0
            });
            $("#step_2 legend").css({
                opacity: 1.0
            });
        } else
        stepOne();
    }

    function stepTwoTest() {
        //if at least a password is entered
        if ($("#ergwave_pw").val() != "" || $("#cwem_pw").val() != "" || $("#wifi_pw").val() != "" || $("#lib_pw").val() != "") {
            //then step two completed
            $("#step_2")
            .animate({
                paddingBottom: "120px"
            })
            .css({
                "background-image": "url(images/arrow.png)",
                "background-position": "bottom center",
                "background-repeat": "no-repeat"
            });
            $("#step_3").css({
                opacity: 1.0
            });
            $("#step_3 legend").css({
                opacity: 1.0
                // For dumb Internet Explorer
            });

            stepThreeComplete();
        } else
        stepTwo();
    };

    function stepThreeComplete() {
        $("#step_3")
        .animate({
            paddingBottom: "120px"
        })
        .css({
            "background-image": "url(images/arrow.png)",
            "background-position": "bottom center",
            "background-repeat": "no-repeat"
        });
    }

    $("#u_id").keyup(function() {
        localStorage["u_id"] = $("#u_id").val();
        stepOneTest();
    });

    $("#ergwave_id").keyup(function() {
        localStorage["ergwave_id"] = $("#ergwave_id").val();
        stepOneTest();
    });

    $(".upw").keyup(function() {
        store();
        stepTwoTest();
    });

    $(".ergpw").keyup(function() {
        store();
        stepTwoTest();
    });

	// When a dropdown selection is made
	$("#fqdn").change(function() {
		store();
		$("#ergwave_id_wrap").slideUp();
		
		if ($("#fqdn").val() != ""){
			$("#ergwave_id_wrap").slideDown();
			$("#ergwave_pw_wrap").slideDown();
		}
		else{
			$("#ergwave_id_wrap").slideUp();
			$("#ergwave_pw_wrap").slideUp();
		}
		stepOneTest();
	});

    function loadData() {

        u_id = localStorage["u_id"];
        wifi_pw = localStorage["wifi_pw"];
        cwem_pw = localStorage["cwem_pw"];
        lib_pw = localStorage["lib_pw"];
		ergwave_id = localStorage["ergwave_id"];
		ergwave_pw = localStorage["ergwave_pw"];
		fqdn = localStorage["fqdn"];
		
        if (!u_id) u_id = "";
        if (!wifi_pw) wifi_pw = "";
        if (!cwem_pw) cwem_pw = "";
        if (!lib_pw) lib_pw = "";
        if (!ergwave_id) ergwave_id = "";
		if (!ergwave_pw) ergwave_pw = "";
		if (!fqdn) fqdn = "";
		
        $("#u_id").val(u_id);
        $("#wifi_pw").val(wifi_pw);
        $("#cwem_pw").val(cwem_pw);
        $("#lib_pw").val(lib_pw);
		$("#ergwave_id").val(ergwave_id);
		$("#ergwave_pw").val(ergwave_pw);
		$("#fqdn").val(fqdn);
    }

    function store() {
        wifi_pw = $("#wifi_pw").val();
        cwem_pw = $("#cwem_pw").val();
        lib_pw = $("#lib_pw").val();
		ergwave_pw = $("#ergwave_pw").val();
		fqdn = $("#fqdn").val();

        localStorage["wifi_pw"] = wifi_pw;
        localStorage["cwem_pw"] = cwem_pw;
        localStorage["lib_pw"] = lib_pw;
		localStorage["ergwave_pw"] = ergwave_pw;
		localStorage["fqdn"] = fqdn;
    }

});