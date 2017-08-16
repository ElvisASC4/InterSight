var subtitles= ["Chess player","Activist" ,"Coin Collector"]
var subt1tles= ["Nerd","Future Bigshot","Anime Fan"]
var count = 0;

$(document).ready(function (){
    changeSubtitle();
      changeSubt1tle();
});

function changeSubtitle() {
    setInterval(function () {
        if (count < subtitles.length - 1) {
            $("#subtitle").html(subtitles[count]);
            count++;
        } else {
            $("#subtitle").html(subtitles[subtitles.length - 1]);
            count = 0;
        }
    }, 1500);
}

function changeSubt1tle() {
    setInterval(function () {
        if (count < subt1tles.length - 1) {
            $("#subtitles").html(subt1tles[count]);
            count++;
        } else {
            $("#subtitles").html(subt1tles[subt1tles.length - 1]);
            count = 0;
        }
    }, 1500);
}