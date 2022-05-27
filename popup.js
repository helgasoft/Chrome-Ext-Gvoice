document.addEventListener('DOMContentLoaded', function() {

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      if (tabs[0].url.substr(0,4) != 'http') return;
      chrome.tabs.executeScript(
          tabs[0].id,
          {code: 
"	var d=document, arr=[];" + 
"	var imgs = d.getElementsByTagName('gv-image-attachment'); " +
"	for(var i in imgs) { if (!imgs[i].getElementsByClassName) continue; " +
"		photoDivs = imgs[i].getElementsByClassName('md-body-1'); " +
"		for(var j in photoDivs) { if (!photoDivs[j].getElementsByTagName) continue;" +
"			if (photoDivs[j].getElementsByTagName('img').length>0)" +
"		        	arr.push(photoDivs[j].getElementsByTagName('img')[0].src);" +
"			else if (photoDivs[j].getElementsByTagName('div').length>0)" +
"				arr.push('https://' + window.location.hostname + photoDivs[j].getElementsByTagName('div')[0].style.backgroundImage.split('\"')[1].split('?')[0] );" +
"	}; }; " + 
"	arr "

      }, function (result) { 
      	document.getElementById('msg').innerHTML = "No photos found";
      	if (result!=null && result.length>0 && result[0].length>0) {
      		document.getElementById('msg').innerHTML = "Click a photo to download instantly:";
		var skipd = 0;	// number of own uploaded imgs
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

