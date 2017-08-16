var database = firebase.database().ref();
var replied = false;

function updateDB(elem){
    if(replied == false){
        var thename = $("#name").val();
        var newMessage = $("#comment").val();
        console.log(thename + " : " + newMessage);

        //Update database here
        var value = {name: thename, comment: newMessage, parent: null};
        database.push(value);
    }
    if(replied == true){
        console.log("replied true");
        var thename2 = $("#name2").val();
        var newMessage2 = $("#comment2").val();
        console.log(thename2 + " : " + newMessage2);

        //Update database here
        var parentId = $(elem).prev().prev().prev().prev().prev().prev().attr("id");
        var value2 = {name: thename2, comment: newMessage2, parent: parentId};
        database.push(value2);
    }
}

database.on("child_added", function(rowData){
    if(replied == false){
        console.log(rowData.val());
        var name = rowData.val().name;
        var comment = rowData.val().comment;
        var html = "<p style=' color: white;' class='userText' id='" + rowData.key +"'>" + name + ": " + comment + "</p>"
        console.log(html)
        $(".actualComments").append(html);
        $(".actualComments").append("<button type='button' class='replyButtons hvr-bubble-float-left' onclick='reply(this)'> Reply </button><br>");
    }
    if(replied == true){
        console.log('child add reply true');
        console.log(rowData.val());
        console.log(rowData.val());
        var name2 = rowData.val().name;
        var comment2 = rowData.val().comment;
        var html2 = "<p style=' color: white;' class='userText'>" + name2 + ": " + comment2 + "</p>"
        $(".replybox").append(html2);
    }
})

function AnswerButtonRespond(elem){
    console.log("works");
    replied = false;
    updateDB(elem);
}


function show() { // reveals comment thingy
    if ($('#answerText').css('display') == 'none') {
        $('#answerText').css('display', 'block');
    } else {
        $('#answerText').css('display', 'none');
    }
}
////////////////// reply boxes ///////////////////////////

// var showReply = false;
// var divPresent = false;
// var replyBoxes = document.getElementsByClassName('replybox');

// function reply(elem){
//     console.log("works")
//     if(showReply == false){
//         console.log("works1")
//         makeDiv(elem);
//         showReply = true;
//     }else{
//         console.log("works4")
//         for (var i=0;i<replyBoxes.length;i+=1){
//             replyBoxes[i].style.display = 'none';
//         }
//         showReply = false;
//     }
// }

// function makeDiv(elem){
//     console.log("works2")
//     if(divPresent == false){
//         console.log("works3")
//         var div = $(elem).after("<div class='replybox'> <h1> cats </h1> </div>");
//         divPresent = false;
//     } else if(replyBoxes.style.display = 'none') {
//         for (var i=0;i<replyBoxes.length;i+=1){
//             replyBoxes[i].style.display = 'block';
//         }
//     }
// }

//////////////////////////// DISCONTINUED ^^^^^^^^^^^^^^^///////////////////////////

if ($('#answerText').css('display') == 'none') {
        $('#answerText').css('display', 'block');
} else {
        $('#answerText').css('display', 'none');
}


var made = false; // stops from creating a new reply box when one is open untill there is a respond
var replyAgain = false; //when reply button pressed again

function reply(elem){
    console.log("reply");
    console.log(made);

    if(replyAgain == false){
        replyAgain = true;
    }else if(replyAgain == true){
        replyAgain = false;
    }

    if(made == false){
        var divtext = $(elem).after("<div class='replybox'></div>");
        var divinput = $(elem).after("<div class='replyInput'> </div>");
        var form = $(divinput).after("<p class='text'>Name:</p><input class='comment2' id='name2' type='text'><p class='text'>Response:</p><input class='comment2' id='comment2' type='text'><input type='reset' onclick='replyToComment(this)' value='Respond' class='replySubmitClass' id='replySubmit'>");
        made = true;
    }
    else{
        console.log($(elem).nextAll('.replybox'));
        if ($(elem).nextAll('.replybox').eq(0).css('display') == 'none') {
            $(elem).nextAll('.replybox').eq(0).css('display', '');
            $(elem).nextAll('.text').eq(0).css('display', '');  // Name
            $(elem).nextAll('.text').eq(1).css('display', '');  // Comment
            $(elem).nextAll('.comment2').eq(0).css('display','');
             $(elem).nextAll('.comment2').eq(1).css('display', '');
            $(elem).nextAll('.replySubmitClass').eq(0).css('display', '');
            made = true;

        } else {
            $(elem).nextAll('.replybox').eq(0).css('display', 'none');
            $(elem).nextAll('.text').eq(0).css('display', 'none');   // Name
            $(elem).nextAll('.text').eq(1).css('display', 'none');   // Comment
            $(elem).nextAll('.comment2').eq(0).css('display', 'none');  
            $(elem).nextAll('.comment2').eq(1).css('display', 'none');
            $(elem).nextAll('.replySubmitClass').eq(0).css('display', 'none');
            made = false;
        }
    }
}

function replyToComment(elem){
    replied = true;
    made = false;
    $('.replybox').append("<br>");
    updateDB(elem);
}