Google Voice photo download
=====================
Chrome browser extension

## Problem
Your platform is Windows with the latest Chrome browser and you have a [Google Voice](https://voice.google.com/messages) phone number.
Google Voice supports send/receive text messages with image/photo attachments. Downloading received photos, however, is inconvenient. You can download one image at a time with minimum 5 clicks (one to open, right-click, Save image as, Save, return arrow).
See discussions 
[here](https://productforums.google.com/forum/#!topic/voice/1jWD3JB9p-E) and
[here](https://productforums.google.com/forum/#!topic/voice/6AB1v7nryTY) and
[here](https://productforums.google.com/forum/#!topic/voice/o0SaZtTsXtk) and
[here](https://productforums.google.com/forum/#!topic/voice/O-R0duG2Xjo)
.


## Solution

This extension shows all photos of a thread(*conversation*) in a compact, easy-to-scroll list. It provides a quick one-click download for each image.
To install:
 * [download files](https://github.com/helgasoft/Chrome-Ext-Gvoice/archive/master.zip) ► open .zip file ►  open the folder inside ►  delete 3 files starting with '.' and '_' ►  unzip the folder
 * Chrome ►  Menu(3 dots) ►  More Tools ►  Extensions <br />
	or just copy link *chrome://extensions/* into the address bar
 * Set "Developer Mode" to On and keep it that way
 * Click "LOAD UNPACKED" 
 * select the folder with the files from your drive and hit Ok ► Chrome shows icon ![blue icon](gvoice.png?raw=true)

## Result

Downloading photos and images sent to your Google Voice number becomes much easier.

*Note:* If your photo files download automatically with extension *.jfif*, here is a [fix for Windows 10](https://www.cnet.com/forums/discussions/jpeg-to-jfif-automatically-help):
<br />Hit the Windows key ►  enter 'regedit' ►  regedit opens ►  HKEY_CLASSES_ROOT ►  MIME ►  DATABASE ►  Content type ►  image/jpeg ►  change "extension" value from *.jfif* to *.jpg*

*Note:* Legacy Google Voice cannot use this extension
*Note:* Chrome on Mobile Devices does not support extensions

&emsp;
