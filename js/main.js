$(function() {

var inputArray = new Array();
for(var i=0; i < $("input").length; i++) {
    var name = $("input").eq(i).attr("name");   // .eq() gives me array element at index
    inputArray[name]=0;
}
console.log(inputArray);


$("#meter").css({"height":"0em"});

$("input").on("keyup", function(e) {
    // console.log($(this).val());
    if (e.keyCode === 13) {
        var name = $(this).attr("name");
        inputArray[name] = parseInt($(this).val());
        // console.log(inputArray);
        $('input')[$('input').index(this)+1].focus();   // makes Enter key move to next input like a tab
    }
    // calcRating();
});

$("input").on("blur", function(e) {
    var name = $(this).attr("name");
    if (!($(this).val()) > 0)
        inputArray[name] = 0;
    else
        inputArray[name] = parseInt($(this).val());
    console.log(inputArray);
});



// function calcRating() {
//     var sum=0;
//     for 

//     if (inputArray.tweets >= 3)
//         sum += 3;
//     else
//         sum += inputArray.tweets;
//     console.log("sum: "+sum);
// }

// function setRatingValue(inputName) {
//     switch(inputName) {
//         case "tweets":
//             break;
//     }
// }



});