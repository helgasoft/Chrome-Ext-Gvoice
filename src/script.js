var d = document, arr=[];

var msgs = d.getElementsByTagName('gv-message-item')

for(msg of msgs){
   if (!msg.getElementsByTagName) continue

   // Get the date. This method may be brittle, since it uses a hidden div that
   // appears to be for accessibility purposes. Then again, the entire reason
   // this extension exists is because Google provides no API for Voice.
   divs = msg.getElementsByTagName('div')
   dtstr = ""
   for(dv of divs){
      if(dv.outerText.match(/^Message by .*:/)){
         dtstr = dv.outerText.split(',').slice(-2).join(',')
         continue
      }
   }

   // Get the images.
   imgs = msg.getElementsByTagName('gv-image-attachment')
   for(im of imgs){
      if (!im.getElementsByClassName) continue

      divs = im.getElementsByClassName('md-body-1')
      for(dv of divs) {
         if (!dv.getElementsByTagName) continue

         // As of Dec 2021, this commented-out code doesn't do anything as far as I can tell.
         //if (photoDivs[j].getElementsByTagName('img').length > 0)
         //   arr.push(photoDivs[j].getElementsByTagName('img')[0].src)

         divs2 = dv.getElementsByTagName('div')
         for(dv2 of divs2){

            // Get the base image URL
            imgUrl = dv2.style.backgroundImage.match(/^url\("(.+)\?s=3"\)$/);
            
            if(imgUrl){
               thm = 'https://' + window.location.hostname + imgUrl[1]
               // s=1 is the largest size, I think. s=2 (or nothing) is the smallest, s=3 is a preview size, and s=4 is a medium size.
               arr.push({datestr: dtstr, thumb: thm, url: thm + '?s=1'} )
            }
         }
      }
   }
}

arr
