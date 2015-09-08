$(document).ready(function () {
    startTime();

    function startTime() {
        var cont = $("#time");
        var date = $("#date");
        var today = new Date();
        var h = today.getHours();
        var m = today.getMinutes();
        var s = today.getSeconds();
        m = checkTime(m);
        s = checkTime(s);
        h = checkTime(h);
        cont.html(h + ":" + m + "<span> " + s + "</span>");
        var days = new Array("So", "Mo", "Di", "Mi", "Do", "Fr", "Sa");
        var mon = new Array("Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember");

        date.html(days[today.getDay()] + ", " + today.getDate() + ". " + mon[today.getMonth()] + " " + today.getFullYear());
        var t = setTimeout(function () {
            startTime();
        }, 500);
    }

    function checkTime(i) {
        if (i < 10) {
            i = "0" + i;
        } // add zero in front of numbers < 10
        return i;
    }
});