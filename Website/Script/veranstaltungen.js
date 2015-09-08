$(document).ready(function () {
	var tr;
	
	for(var i = 0; i < jsonData.length; i++) {
		var a = Wochentag();
		if(a == jsonData[i].wochentag_kurz) {
			if(jsonData[i].wiederholung == 'wöchentlich') {
				if(jsonData[i].semester_id == 20151){
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
                            	tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                            	tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                            	tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            	
                            }else if(d == b){
                            	if(e >= d1) {
                            		tr = $('<tr/>');
                            		
                            		tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                            		tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                            		tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                            		tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                            		tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            	}
                            }else if(d == c) {
                            	if(e <= d2) {
                            		tr = $('<tr/>');
                            		
                            		tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                            		tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                            		tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                            		tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                            		tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                            	}
                            }
                            
                        }
                    }else if(jsonData[i].wiederholung == 'Einzeltermin'){
                    	var f = parseInt(jsonData[i].datum_beginn.substring(5,7));
                    	var g = parseInt(jsonData[i].datum_ende.substring(5,7));
                    	var h = parseInt(jsonData[i].datum_beginn.substring(8,10));
                    	var j = Monat();
                    	var k = Tag();
                    	
                    	if(j == f && j == g && k == h){
                    		tr = $('<tr/>');
                    		
                    		tr.append('<td>' + jsonData[i].zeit_beginn + '</td>');
                    		tr.append('<td>' + jsonData[i].zeit_ende + '</td>');
                    		tr.append('<td>' + jsonData[i].lv_nr + '</td>');
                    		tr.append('<td>' + jsonData[i].lv_titel + '</td>');  
                    		tr.append('<td>' + jsonData[i].raum_titel_mittel + '</td>');
                    		
                    	}
                    }
                    
                }
                $('table').append(tr);
                
            }
            
        });