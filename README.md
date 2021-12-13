Google Voice photo download
=====================
Chrome browser extension

## Problem
Your platform is Windows with the latest Chrome browser and you have a [Google Voice](https://voice.google.com/messages) phone number.
Google Voice supports send/receive text messages with image/photo attachments. Downloading received photos, however, is inconvenient. You can download one image at a time with minimum 5 clicks (one to open, right-click, Save image as, Save, return arrow).
See discussions 
[here](https://productforums.google.com/forum/#!topic/voice/1jWD3JB9p-E),
[here](https://productforums.google.com/forum/#!topic/voice/6AB1v7nryTY),
[here](https://productforums.google.com/forum/#!topic/voice/o0SaZtTsXtk) and
[here](https://productforums.google.com/forum/#!topic/voice/O-R0duG2Xjo)
.

_Update:_ An additional issue is that any date information has to be manually
associated with the photos, as that information is neither included in the
filename nor the metadata.

## Solution

This extension shows all photos of a thread(*conversation*) in a compact, easy-to-scroll list. It provides a quick one-click download for each image.
To install:
 * [download files](https://helgasoft.github.io/Chrome-Ext-Gvoice/gvphoto.zip) ►  unzip to a local folder
 * Chrome ►  Menu ![3 dots](three-dots.png?raw=true) ►  More Tools ►  Extensions (or just copy link *chrome://extensions/* into the address bar)
 * Set "Developer Mode" to On and keep it that way
 * Click button "Load Unpacked"
 * Select the folder with the files and hit Ok ► Chrome will show icon ![blue icon](gvphoto16.png?raw=true) in extensions menu

## Result

Downloading photos and images sent to your Google Voice number becomes much easier.

<!-- JFIF issue has been fixed.
*Note:* If your photo files download automatically with extension *.jfif*, here is a [fix for Windows 10](https://www.cnet.com/forums/discussions/jpeg-to-jfif-automatically-help):
<br />Hit the Windows key ►  enter 'regedit' ►  regedit opens ►
HKEY_CLASSES_ROOT ►  MIME ►  DATABASE ►  Content type ►  image/jpeg ►  change
"extension" value from *.jfif* to *.jpg* -->

*Note:* The extension can only download photos that are currently loaded in the
current tab. To get old photos, you need to scroll back to the older photos
before hitting the extension button.

*Note:* Legacy Google Voice cannot use this extension

*Note:* Chrome on Mobile Devices does not support extensions


&emsp;
