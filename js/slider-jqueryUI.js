$(function() {
	$( "#slider-range-min" ).slider({
		range: "min",
		value: 50,
		min: 20,
		max: 500,
		slide: function( event, ui ) {
			$( "#amount" ).val( "HKD $" + ui.value );
			$( "#paypalAmount" ).val(ui.value);
		}
	});
	$( "#amount" ).val( "HKD $" + $( "#slider-range-min" ).slider( "value" ) );
	$( "#paypalAmount" ).val($( "#slider-range-min" ).slider( "value" ) );});