$(function() {


//  Initializing: setting focus when page loaded, initializing input array
$("input[name=tweets").focus();
var inputArray = new Array();
for(var i=0; i < $("input").length; i++) {
    var name = $("input").eq(i).attr("name");   // .eq() gives me array element at index
    inputArray[name]=0;
}


// Handles Enter for inputs
// Calculates the effects of the new input
$("input").on("keyup", function(e) {
    if (e.keyCode === 13) {
        var name = $(this).attr("name");
        inputArray[name] = parseInt($(this).val());
    // move focus on Enter keypress
        if ($("input").index(this) == ($("input").length-1)) {
            $("input")[0].focus();  // move focus from last input to first input
        } else
            $('input')[$('input').index(this)+1].focus();   // makes Enter key move to next input like a tab
        calcRating();
    } 
});



// Handles an input losing focus (either pressing tab or clicking off input)
// Calculates effects of the new input
$("input").on("blur", function(e) {
    var name = $(this).attr("name");
    if (!($(this).val()) > 0) {     // stops NaN from occuring when input left blank
        inputArray[name] = 0;
        $(this).val(0);
    } else
        inputArray[name] = parseInt($(this).val());
    calcRating();
});



// Loops through all inputs to calculate their weighted sum.
// Calls meterControl() to change meter appearance.
// Called on Enter keypress or tab press or input losing focus
function calcRating() {
    var sum=0;
    for (var k in inputArray) {
        validateNumber(k);
        sum += setRatingValue(k);
    }
    meterControl(sum);
}


// Validates that the number for each input is positive, makes it zero
// if it is negative
function validateNumber(inputName) {
    if (inputArray[inputName] < 0) {
        inputArray[inputName] = 0;
        $("input[name="+inputName+"]").val("0");
    }
}


// Sets the rating value based on the user inputs
function setRatingValue(inputName) {
    if (inputName == "curses") {
        var curseWeight = 4;
        return -(inputArray[inputName]*curseWeight);
    } else {
        var inputWeight;
        switch(inputName) {
            case "tweets":
                inputWeight = 1;
                return checkMax(3, inputName, inputWeight);
            case "blogs":
                inputWeight = 6;
                return checkMax(1, inputName, inputWeight);
            case "questions":
                inputWeight = 3;
                return checkMax(2, inputName, inputWeight);
            case "linkedin":
                inputWeight = 1;
                return checkMax(10, inputName, inputWeight);
            case "apps":
                inputWeight = 8;
                return checkMax(2, inputName, inputWeight);
            case "pets":
                inputWeight = 0.5;
                return checkMax(14, inputName, inputWeight);
        }
    }
}


// If an input is over the max it adds the max for that input to the overall rating.
function checkMax(max, inputName, weight) {
    var meterAdjFactor = 3;
    if (inputArray[inputName] >= max)
        return max / meterAdjFactor * weight;
    else
        return inputArray[inputName] / meterAdjFactor * weight;
}


// Sets the meter display based on the rating.
function meterControl(rating) {
    $("#meter").animate({height:rating+"em"}, "fast");
// Doing switch(true) allows you to make comparisons in the case statement.
    switch(true) {
        case (rating == 16):
            $("#meter").css("background-color","green");
            $("#meter").css("border","5px solid gold");
            break;
        case (rating > 10):
            $("#meter").css("background-color","green");
            $("#meter").css("border","0");
            break;
        case (rating > 6):
            $("#meter").css("background-color","yellow");
            $("#meter").css("border","0");
            break;
        case (rating <= 6):
            $("#meter").css("background-color","red");
            $("#meter").css("border","0");
            break;
    }
}



});