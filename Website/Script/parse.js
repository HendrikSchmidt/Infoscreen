$(document).ready(function parse(){
	var container = $('#bvg');//find the bvg div
	//get the html of the mobile bvg website through yahoo yql
	$.getJSON("https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D'http%3A%2F%2Ffahrinfo.bvg.de%2FFahrinfo%2Fbin%2Fstboard.bin%2Fdox%3Fld%3D0.1%26input%3D9023101%26boardType%3Ddep%26time%3D%26productsFilter%3D1111111111111111%26maxJourneys%3D10%26date%3D%26start%3Dyes'&format=xml&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys&callback=?",
		function datas(data){
			if(data.results[0]){
				var dat = filterData(data.results[0]);//filter html
				container.html(dat);//fill data in our site
			} else {
				var errormsg = '<p>Error: could not load the page.</p>';//in case we cant load the html
				container.html(errormsg);
			}
			setTimeout(parse, 30000);//reloads every 30s
		}
		);
	function filterData(data){//deletes the html elements of the bvg website we dont want in our site or replaces them
		data = data.replace(/<?\/body[^>]*>/g,'');
		data = data.replace(/[\r|\n]+/g,'');
		data = data.replace(/<--[\S\s]*?-->/g,'');
		data = data.replace(/<noscript[^>]*>[\S\s]*?<\/noscript>/g,'');
		data = data.replace(/<script[^>]*>[\S\s]*?<\/script>/g,'');
		data = data.replace(/<script.*\/>/,'');
		data = data.replace(/<strong>/g,'');
		data = data.replace(/<\/strong>/g,'');
		data = data.replace(/<p[^>]*>[\S\s]*?<\/p>/g,'');
		data = data.replace(/<div id=\"header\"[^>]*>[\S\s]*?<\/div>/g,'');
		data = data.replace(/<div id=\"ivu_overview_input\"[^>]*>[\S\s]*?<\/div>/g,'');
		data = data.replace(/<div id=\"ivu_footer\"[^>]*>[\S\s]*?<\/div>/g,'<div id=\"footer\">Alle Angaben ohne Gewähr &nbsp;|&nbsp; powered by &nbsp;<img src=\"pics\/bvg.jpg\" /><\/div>');
		data = data.replace(/Abf./g,'Zeit');
		data = data.replace(/Fahrt\//g,'');
		data = data.replace(/<h1[^>]*>[\S\s]*?<\/h1>/g,'');
		data = data.replace(/<thead[^>]*>[\S\s]*?<\/thead>/g,'<thead><tr><th colspan="3"><img src=\"pics\/bvg.jpg\"\/> <span>&nbsp;&nbsp;Abfahrtszeiten U Ernst-Reuter-Platz</span><\/div></th></tr><tr><th>Zeit</th><th>Linie</th><th>Richtung</th></tr></thead>');
		data = data.replace(/Bus/g,'<img src=\"pics/bus.png\">');
		data = data.replace(/U12/g,'<img src=\"pics/u.png\"> 12');
		data = data.replace(/U2/g,'<img src=\"pics/u.png\"> 2');
		return data;
	}
});	
