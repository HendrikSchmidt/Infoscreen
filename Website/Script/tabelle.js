/*Veranstaltungsplan
*Daten werden durch JSON-Abfrage aus diesem Link entnommen :"http://guest41.mulf.tu-berlin.de/generated/courses_telefunken_building.json"
*Link wird täglich zwischen 4 und 5 generiert
*/
function Monat () { 
    var heute = new Date(); 
    var Monat = heute.getMonth() + 1; 
    return Monat;
}
        
function Wochentag() {
    var heute = new Date();
    var Wochentag = heute.getDay();
    var Woche = new Array("So", "Mo", "Di", "Mi", "Do", "Fr", "Sa");
    return Woche[Wochentag];
}
            
function Tag() {
    var heute = new Date();
    var Tag = heute.getDate();
    return Tag;
}

$(document).ready(function abc() {
    //Daten werden aufsteigend nach dem Zeitbeginn der Veranstaltungen sortiert
    $('#lv').find("tr:gt(0)").remove();
    function sortByKey(array, key) {
        return array.sort(function(a, b) {
        var x = a[key]; 
        var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    var url="http://guest41.mulf.tu-berlin.de/generated/courses_telefunken_building.json";
    $.getJSON(url, function (jsonData) {
        jsonData = sortByKey(jsonData, 'zeit_beginn');
        var tr;
        var count = 0;
        for(var i = 0; i < jsonData.length; i++) {
            var a = Wochentag();
            if(a == jsonData[i].wochentag_kurz) {
                if(jsonData[i].wiederholung == 'wöchentlich') {
                    if((jsonData[i].semester_id)% 10 == 1){ // wenn Sommersemester
                        var b = parseInt(jsonData[i].datum_beginn.substring(5,7));//Monat Datumbeginn
                        var c = parseInt(jsonData[i].datum_ende.substring(5,7));//Monat Datumende
                        var d1 = parseInt(jsonData[i].datum_beginn.substring(8,10));//Tag Datumbeginn
                        var d2 = parseInt(jsonData[i].datum_ende.substring(8,10));//Tag Datumende
                        var d = Monat();
                        var e = Tag();
                               
                        if(d > b && d< c) {
                            tr = $('<tr/>');
        
                            tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                            tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                            tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                            if(jsonData[i].lv_nr == null) {
                                tr.append('<td>' + "-" + '</td>');
                                tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                count++;
                            }else{
                                tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                count++;
                            }
                            
                        }else if(d == b && d== c) {
                               if(e >= d1 && e < d2 || e >= d1 && e == d2) {
                                   tr = $('<tr/>');
        
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }
                               }
                        }else if(d == b){
                            if(e >= d1) {
                                tr = $('<tr/>');
        
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }   
                            }
                        }else if(d == c) {
                            if(e <= d2) {
                                tr = $('<tr/>');
    
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;    
                                }
                            }
                        }
                                
                    }else{ //wenn Wintersemester
                        var b = parseInt(jsonData[i].datum_beginn.substring(5,7));//Monat Datumbeginn
                        var c = parseInt(jsonData[i].datum_ende.substring(5,7));//Monat Datumende
                        var d1 = parseInt(jsonData[i].datum_beginn.substring(8,10));//Tag Datumbeginn
                        var d2 = parseInt(jsonData[i].datum_ende.substring(8,10));//Tag Datumende
                        var d = Monat();
                        var e = Tag();
                        if(d >= 10){ //Oktober-Dezember
                            if(b == d && e >= d1) { 
                                tr = $('<tr/>');
    
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;    
                                }
                            }else if(b < d){
                                tr = $('<tr/>');
    
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;    
                                }
                            }
                        }else if(d >= 1){ //Januar-März
                            if(c == d && e <= d2) {
                                tr = $('<tr/>');
    
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;    
                                }
                            }else if(d < c){
                                tr = $('<tr/>');
    
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;    
                                }
                            }
                        }
                    }
                }else if(jsonData[i].wiederholung == 'Einzeltermin'){
                    var f = parseInt(jsonData[i].datum_beginn.substring(5,7)); //Monat Datumbeginn
                    var g = parseInt(jsonData[i].datum_ende.substring(5,7));//Monat Datumende
                    var h = parseInt(jsonData[i].datum_beginn.substring(8,10));//Tag Datumbeginn
                    var j = Monat();
                    var k = Tag();
                
                    if(j == f && j == g && k == h){
                        tr = $('<tr/>');
                                       
                        tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                        tr.append('<td>' + jsonData[i].zeit_ende + '</td>');                               
                        tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                        if(jsonData[i].lv_nr == null) {
                            tr.append('<td>' + "-" + '</td>');
                            tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            count++;
                        }else{
                            tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                            tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            count++;
                        }
                        
                    }
                }else if(jsonData[i].wiederholung == '14-täglich'){
                    var l = parseInt(jsonData[i].datum_beginn.substring(5,7)); //Monat Datumbeginn
                    var m = parseInt(jsonData[i].datum_ende.substring(5,7)); //Monat Datumende
                    var n = parseInt(jsonData[i].datum_beginn.substring(8,10)); // Tag Datumbeginn
                    var o = parseInt(jsonData[i].datum_ende.substring(8,10));//Tag Datumende
                    var mon = Monat();
                    var day = Tag();
                    var jahr1 = parseInt(jsonData[i].datum_beginn.substring(0,4));
                    var jahr2 =  parseInt(jsonData[i].datum_ende.substring(0,4));
                    var tmp = new Date(jahr1, l-1, n);
                    var tmp2 = new Date(jahr2, m-1, o);
                    while((tmp.getMonth() + 1) >= l && (tmp.getMonth() + 1) <= m) {
                        tmp = new Date(tmp.setTime(tmp.getTime() + 14*24*60*60*1000));
                        if((tmp.getMonth() + 1) > l && (tmp.getMonth() + 1) < m) {                                  
                            if(tmp.getDate() == day && (tmp.getMonth() + 1) == mon){
                                tr = $('<tr/>'); 
                                tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                tr.append('<td>' + jsonData[i].zeit_ende + '</td>');                               
                                tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                if(jsonData[i].lv_nr == null) {
                                    tr.append('<td>' + "-" + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }else{
                                    tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                    tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                    count++;
                                }
                            }
                        }else if(tmp.getMonth() + 1 == l) {
                            if(tmp.getDate() >= n) {
                                if(tmp.getDate() == day && (tmp.getMonth() + 1) == mon){
                                    tr = $('<tr/>'); 
                                    tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                    tr.append('<td>' + jsonData[i].zeit_ende + '</td>');                            
                                    tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                    if(jsonData[i].lv_nr == null) {
                                        tr.append('<td>' + "-" + '</td>');
                                        tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                        count++;
                                    }else{
                                        tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                        tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                        count++;
                                    }
                                }
                            }
                        }else if(tmp.getMonth() + 1 == m){   
                            if(tmp.getDate() <= o){
                                if(tmp.getDate() == day && (tmp.getMonth() + 1) == mon){
                                    tr = $('<tr/>'); 
                                    tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                                    tr.append('<td>' + jsonData[i].zeit_ende + '</td>');                            
                                    tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                                    if(jsonData[i].lv_nr == null) {
                                        tr.append('<td>' + "-" + '</td>');
                                        tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                        count++;
                                    }else{
                                        tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                                        tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                                        count++;
                                    }
                                }
                            }
                        }
                    }
                }
                        
            }else if(jsonData[i].wiederholung == 'Blockveranstaltung' || jsonData[i].wiederholung == 'Blockveanstaltung + Sa und So'){
                var b = parseInt(jsonData[i].datum_beginn.substring(5,7));//Monat Datumbeginn
                var c = parseInt(jsonData[i].datum_ende.substring(5,7));//Monat Datumende
                var d1 = parseInt(jsonData[i].datum_beginn.substring(8,10));//Tag Datumbeginn
                var d2 = parseInt(jsonData[i].datum_ende.substring(8,10));//Tag Datumende
                var d = Monat();
                var e = Tag();
                if((b == d && d1 == e) || (c == d && d2 == e)) {
                    tr = $('<tr/>'); 
                    if(jsonData[i].zeit_beginn == null){
                        tr.append('<td>' + "-" + '</td>');
                        tr.append('<td>' + "-" + '</td>');                            
                        tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                        if(jsonData[i].lv_nr == null) {
                            tr.append('<td>' + "-" + '</td>');
                            tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            count++;
                        }else{
                            tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                            tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            count++;
                        }
                    }else{
                        tr = $('<tr/>'); 
                        tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                        tr.append('<td>' + jsonData[i].zeit_ende + '</td>');                            
                        tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                        if(jsonData[i].lv_nr == null) {
                            tr.append('<td>' + "-" + '</td>');
                            tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            count++;
                        }else{
                            tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                            tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            count++;
                        }
                    }
                }   
            }
            $('#lv').append(tr);
        }
        if(count == 0){ //wenn keine Veranstaltungen stattfinden
            tr = $('<tr/>'); 
            tr.append('<td>' + "Heute" + '</td>');
            tr.append('<td>' + "finden" + '</td>');
            tr.append('<td>' + "keine" + '</td>');
            tr.append('<td>' + "Veranstaltungen" + '</td>');
            tr.append('<td>' + "statt" + '</td>');
            $('#lv').append(tr);
        }
            
    });
   
    var w = setTimeout(function () {
                abc();
            }, 3600000);   
});
 $(function scroll() { //Scrollfunktion
        var previous;
        var interval = setInterval(function () {
            if ($("#lv").scrollTop() != $("#lv")[0].scrollHeight) {
                previous = $("#lv").scrollTop();
                $("#lv").scrollTop($("#lv").scrollTop() + 1);
                if(previous == $("#lv").scrollTop()){
                     $("#lv").scrollTop(0); 
                }
            }else{
               $("#lv").scrollTop(0);
            }
        }, 100);
    });  
