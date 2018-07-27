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
"			arr.push('https://' + window.location.hostname + photoDivs[j].getElementsByTagName('div')[0].style.backgroundImage.split('\"')[1].split('?')[0] );" +
//"	        	console.log('photo %s = %s', j, photoDivs[j].getElementsByTagName('div')[0].style.backgroundImage.split('\"')[1].split('?')[0]); " +
"	}; }; " + 
"	arr; "
//      });
//    });

      }, function (result) {
	for (i = 0; i < result[0].length; i++) { 
	    var link = document.createElement('a');
	    link.href = result[0][i] + '?s=4';
	    link.download = 'gvoice-'+i;
	    var ig = new Image(); ig.src=result[0][i];
	    link.appendChild(ig);
	    document.body.appendChild(link);
	};
      });
    });


//  }, false);
}, false);

