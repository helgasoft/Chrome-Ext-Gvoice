document.addEventListener('DOMContentLoaded', function() {
//  var checkPageButton = document.getElementById('findPhotos');  <button id="findPhotos">Find all photos</button>
//  checkPageButton.addEventListener('click', function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 
"	d = document; var arr=[];" + 
"	msgs = d.getElementsByTagName('gv-photo-mms'); " +
"	for(var i in msgs) { if (!msgs[i].getElementsByClassName) continue; " +
"		photoDivs = msgs[i].getElementsByClassName('md-body-1'); " +
"		for(var j in photoDivs) { if (!photoDivs[j].getElementsByTagName) continue;" +
"			if (photoDivs[j].getElementsByTagName('img').length>0)" +
"		        	arr.push(photoDivs[j].getElementsByTagName('img')[0].src);" +
"			else if (photoDivs[j].getElementsByTagName('div').length>0)" +
"				arr.push('https://' + window.location.hostname + photoDivs[j].getElementsByTagName('div')[0].style.backgroundImage.split('\"')[1].split('?')[0] );" +
//"			arr.push('https://' + window.location.hostname + photoDivs[j].getElementsByTagName('div')[0].style.backgroundImage.split('\"')[1].split('?')[0] );" +
"	}; }; " + 
"	arr "

      }, function (result) {
      	if (result[0].length==0) {
      		var b = document.createElement("b");
		var t = document.createTextNode("No photos found");
    		b.appendChild(t);
    		document.body.appendChild(b);
      	}
      	else {
		var skipd = 0;	// number of own imgs
		for (i = 0; i < result[0].length; i++) {
		    if (result[0][i].endsWith('jpg')) {
		    	skipd = skipd + 1;
		    	continue;
		    }
		    var link = document.createElement('a');
		    link.href = result[0][i] + '?s=4';	// it's a div
		    link.download = 'gvoice-'+i;
		    var ig = new Image(); ig.src=result[0][i]; ig.style.maxHeight='128px'; ig.style.maxWidth='128px';
		    link.appendChild(ig);
		    document.body.appendChild(link);
		};
		if (skipd>0) {
			var t = document.createTextNode('Skipped '+skipd+' uploaded photos');
			document.body.appendChild(t);
		};
	};
      });
    });

}, false);

