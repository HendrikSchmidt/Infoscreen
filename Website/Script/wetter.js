//Wetterdaten werden aus der openweather API entnommen
$(document).ready(function weather() {
  $.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=52.51284&lon=13.32002&APPID=d28bd45e2032a003c978ca3c9893eac2', function(data){
    var wetter = $('#wetter');
    var temp = (data.main.temp-273.15).toFixed(0); //Umwandlung in Celsius
    var code = data.weather[0].id + "";
    if(code.substring(0,3) === '800'){ //Code "800" entspricht sonnigem Wetter
        wetter.html("<img src =\"pics\/sun.png\"/>" + "<span>" + temp +"°" + "</span>");
    } else if (code[0] === '5' ||code[0] === '3') { //Regen oder Nieselregen
        if(data.clouds.all == 0) { 
            wetter.html("<img src =\"pics\/sun.png\"/>" + "<span>" + temp +"°" + "</span>");
        }else{
            wetter.html("<img src =\"pics\/rain1.png\"/>" + "<span>" + temp +"°" + "</span>");
        }
    }else if (code[0] === '6'){ //Schnee
        wetter.html("<img src =\"pics\/snow1.png\"/>" + "<span>" + temp +"°" + "</span>");
    } else if(code.substring(0,3) === '801'){
         wetter.html("<img src =\"pics\/cloud.png\"/>" + "<span>" + temp +"°" + "</span>");
    } else if (code[0] === '8') { //Sonne-Wolken-Mix
         wetter.html("<img src =\"pics\/sun_and_cloud.png\"/>" + "<span>" + temp +"°" + "</span>");
    } else if (code[0] === '2') { //wolkig
        wetter.html("<img src =\"pics\/Storm.png\"/>" + "<span>" + temp +"°" + "</span>");
    } else {
        wetter.html("<span>" + temp +"°" + "</span>");
    }
  });
    var w = setTimeout(function () {
                weather();
            }, 60000);   
});