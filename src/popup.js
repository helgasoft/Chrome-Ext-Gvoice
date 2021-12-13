
document.addEventListener('DOMContentLoaded', function() {
   //  var checkPageButton = document.getElementById('findPhotos');  <button id="findPhotos">Find all photos</button>
   //  checkPageButton.addEventListener('click', function() {

   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.executeScript( tabs[0].id, {file: 'script.js'}, function (result) {
         if (result.length==0) {
            document.getElementById('msg').innerHTML = "No photos found"
         }
         else {
            document.getElementById('msg').innerHTML = result[0].length + " photos found. Click a thumbnail to download individual photos."

            rslt = result[0]
            downloadList = [];

            for (i = 0; i < rslt.length; i++) {
               // Read in date string as a date object, then reformat it to
               // something a bit more standard. We are doing this work here
               // because we have loaded the dayjs library in this script.
               rslt[i].title = rslt[i].datestr
               rslt[i].datestr = dayjs(rslt[i].datestr, 'MMMM DD YYYY H:mm A').format('YYYY-MM-DD')
               rslt[i].filename = rslt[i].datestr + '.jpg'
               downloadList.push({url: rslt[i].url, filename: rslt[i].filename, conflictAction: "uniquify"})
            }
            console.log(rslt)

            // I tried to download them all in parallel, but it seemed like
            // Google was detecting this as a potential attack, and was actively
            // preventing it. So, I switched to downloading them sequentially.
            var link = document.createElement('a')
            link.href = "#"
            link.title = 'Download All Photos'
            link.text = 'Download All'
            link.onclick = function(){
               downloadSequentially(downloadList, () => console.log('Download completed.'));
               return false
            }
            document.body.appendChild(link)


            // As of Dec 2021, the commented-out code is not needed as far as I can tell.
            // var skipd = 0;   // number of own uploaded imgs
            for (i = 0; i < rslt.length; i++) {
               //if (result[0][i].endsWith('jpg')) {
               //   skipd = skipd + 1
               //   continue
               //}
               
               var l = document.createElement('a')
               l.id = "download-photo-google-voice-" + i;

               l.href = rslt[i].url
               l.title = rslt[i].title
               // As of Dec 2021, the download option of <a> is only a very gentle suggestion. The actual work is done via the download api in the onclick function below.
               l.download = rslt[i].filename
               l.onclick = function(){
                  chrome.downloads.download({url: this.href, filename: this.download, conflictAction: "uniquify"},function(id) {})
                  return false
               }
               var ig = new Image(); ig.src=rslt[i].thumb; ig.style.maxHeight='128px'; ig.style.maxWidth='128px'
               l.appendChild(ig)
               document.body.appendChild(l)
            }
            //if (skipd>0) {
            //   var t = document.createTextNode('Skipped '+skipd+' uploaded photos')
            //   document.body.appendChild(t)
            //}
         }
      })
   })
}, false)

