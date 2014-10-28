$(function() {

$("input[name=tweets").focus();
var inputArray = new Array();
for(var i=0; i < $("input").length; i++) {
    var name = $("input").eq(i).attr("name");   // .eq() gives me array element at index
    inputArray[name]=0;
}
console.log(inputArray);



$("input").on("keyup", function(e) {
    // console.log($(this).val());
    if (e.keyCode === 13) {
        var name = $(this).attr("name");
        inputArray[name] = parseInt($(this).val());
    // move focus on Enter keypress
        if ($("input").index(this) == ($("input").length-1)) {
            alert("alert");
            $("input")[0].focus();
        } else
            $('input')[$('input').index(this)+1].focus();   // makes Enter key move to next input like a tab
        calcRating();
    }
    
});

$("input").on("blur", function(e) {
    var name = $(this).attr("name");
    if (!($(this).val()) > 0) {
        inputArray[name] = 0;
        $(this).val(0);
    } else
        inputArray[name] = parseInt($(this).val());
    console.log(inputArray);
    calcRating();
});



function calcRating() {
    var sum=0;
    for (var k in inputArray) {
        validateNumber(k);
        // console.log("k: "+k);
        console.log(k+"-> "+inputArray[k]);
        // debugger;
        sum += setRatingValue(k);
    }
    console.log("sum: "+sum);
    meterControl(sum);
}

function validateNumber(inputName) {
    if (inputArray[inputName] < 0) {
        inputArray[inputName] = 0;
        $("input[name="+inputName+"]").val("0");
    }
}


function setRatingValue(inputName) {
    console.log("name: " +inputName);
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


function checkMax(max, inputName, weight) {
    console.log("max: " + max + " name: " + inputName);
    console.log("->: " +inputArray[inputName]);
    var meterAdjFactor = 3;
    if (inputArray[inputName] >= max)
        return max / meterAdjFactor * weight;
    else
        return inputArray[inputName] / meterAdjFactor * weight;
}

function meterControl(rating) {
    // $("#meter").css("height",rating+"em");
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