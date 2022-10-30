
async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

// Got this from https://stackoverflow.com/questions/14790389/return-value-from-chrome-tabs-executescript
const executeScript = (tabId, func) => new Promise(resolve => {
  chrome.scripting.executeScript({ target: { tabId }, func }, resolve)
});

function getImageURLs(){
	arr=[];
  d = document;
  
	var msgs = d.getElementsByTagName('gv-text-message-item')
  //console.log("Found " + msgs.length + " messages");
	for(msg of msgs){
	   if (!msg.getElementsByTagName) continue

	   // Get the date. This method may be brittle, since it uses a hidden div that
	   // appears to be for accessibility purposes. Then again, the entire reason
	   // this extension exists is because Google provides no API for Voice.
	   divs = msg.getElementsByTagName('div')
	   dtstr = "photo"
      dt = [new Date()];
	   for(dv of divs){
	   	 mat = dv.outerText.match(/^[ ]*Message from .*[aA]ttachment.*, *([^,]+), *([^,\.]+)[ \.]*/);
	      if(mat){
           console.log("MATCH: "+mat[1]+", "+mat[2])
	        dt.push(new Date(mat[1]+", "+mat[2]));
	        // I don't break here because I would like to get the last date, not the first.
	      }
	   }
      // Get the last date. If no date was found, use the current date.
      dt = dt[dt.length - 1];

	   // Get the images.
	   imgs = msg.getElementsByTagName('gv-image-attachment')
	   for(im of imgs){
	   	  imgs2 = im.getElementsByTagName('img');
        for(im2 of imgs2){
        	mat2 = im2.src.match(/^(.+)\?s=3$/)
        	if(mat2){
        		url = mat2[1];
            // s=1 is the largest size, I think. s=2 (or nothing) is the smallest, s=3 is a preview size, and s=4 is a medium size.
            
	         dtstr = dt.getFullYear() + "-" + (""+(dt.getMonth()+1)).padStart(2,'0') + "-" + (""+(dt.getDate())).padStart(2,'0');
            console.log(dtstr+".jpg");
            itm = {fullsize: url+"?s=1", thumbnail: url+"?s=2", date: dt.toISOString(), filename: dtstr+".jpg"};
            arr.push(itm);
        	}
        }
	   }
	}
   return(arr);
}

function makeThumbnails(urls){
   for(u of urls){
      const l = document.createElement('a')
      l.href = u.fullsize
      l.title = "Photo sent on "+u.date
      l.download = u.filename; // a.download is just a suggestion
      l.onclick = function(){
         chrome.downloads.download({url: u.fullsize, filename: u.filename, conflictAction: "uniquify"});
         return false
      }
      var ig = new Image();
      ig.crossOrigin = 'Anonymous';
      ig.src = u.thumbnail;
      ig.style.maxHeight = '128px'; ig.style.maxWidth = '128px'
      l.appendChild(ig)
      document.body.appendChild(l)
   }
}

async function downloadAll(urls){
   for(u of urls){
      console.log(u);
      const downloadID = await chrome.downloads.download({url: u.fullsize, filename: u.filename, conflictAction: "uniquify"});
   }
}

document.addEventListener('DOMContentLoaded', async function() {
   let msg = document.getElementById('msg');
   let tab = await getCurrentTab();
   const [{result: urls}] = await executeScript(tab.id, getImageURLs);

   msg.innerHTML = "<b>" + urls.length + " photos found.</b> <br/>Click a thumbnail to download individual photos."

   // I tried to download them all in parallel, but it seemed like
   // Google was detecting this as a potential attack, and was actively
   // preventing it. So, I switched to downloading them sequentially.
   var link = document.createElement('a')
   link.href = "#"
   link.title = 'Download All Photos'
   link.text = 'Download All'
   link.onclick = async function(){
      downloadAll(urls);
      return false
   }
   document.body.appendChild(link);
   makeThumbnails(urls);
})
