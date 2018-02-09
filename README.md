## Overview

Shield Mill is a web application for designing and milling simple Arduino Shields and circuit boards with 0.063 inch thick FR-1 PCB material.
This app will export a file for machining a circuit board with a ShopBot, Roland Modela, and standard G-code file that will
work with many different CNC milling machines. This app works best in Firefox and Chrome. 

[LIVE DEMO](http://jw4rd.github.io/shieldMill/)  

I developed this app to easily prototype simple breakout boards and Shields to connect to other devices. 
The "MAKE" button will download a toolpath for a 1/32" endmill, and there is a checkbox to select an optional finishing pass with a 1/64" endmill.  
The toolpath is generated as the board is designed.

### screenshot

![shield](https://raw.github.com/jw4rd/shieldmill/master/img/screenshot.png)  

### circuit boards designed with Shield Mill

![shield](https://raw.github.com/jw4rd/shieldmill/master/img/fabisp1.png)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/fabisp2.jpg)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/fabisp3.jpg)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/44ftdi.png)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/44ftdi1.jpg)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/44ftdi2.jpg)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/5mil.jpg)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/t44_1.jpg)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/t44_2.jpg)  
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/pcbs.jpg)  

## Getting Started

The "setup" button in the uppler left corner will open a window that displays the current settings and keyboard shortcuts.
Clicking "setup" will also display dimensions of the circuit board.  

![shield](https://raw.github.com/jw4rd/shieldmill/master/img/setup.png)  

The size of the board can be changed by using the arrow keys to increase the 
board size by 0.1 inch in any direction. The board size can be reduced by
pressing and holding the "shift" key and pressing the arrow keys.  

The default circuit board is setup for an Arduino, but clicking on the board select menu below the "setup" button in the upper left will
allow you to change the template from an Arduino to a blank circuit board with a default size of 1x1 inch.  

![shield](https://raw.github.com/jw4rd/shieldmill/master/img/blank.png)  

A part can be added to the board design by clicking the "parts" menu in the upper right.
Parts can be deleted by clicking the part # menu in the uppler left and the delete button. Holding the "shift" key and pressing "z" will also delete
the last part created.  


![shield](https://raw.github.com/jw4rd/shieldmill/master/img/pcb_design.png)  


The mousewheel or a two finger motion on the track pad will zoom in and out. 
Pressing the "space" button will enable/disable pan. 
The "z" key will reset the zoom and pan by zooming out to the extents of the design and centering the board in the window.
Pressing the "c" key or refreshing the browser will delete all of the design and reset the board to the default size.  

![shield](https://raw.github.com/jw4rd/shieldmill/master/img/zoom.png)  

The "origin offset" inputs in the lower right corner will offset the cut file relative to the home position of the milling machine used
to cut the circuit board.

That's it!  
When the design is done select the machine you are using and click "MAKE". This will prompt you for a filename and download a file to the
downloads location of your device.  The cut file for the 1/32" endmill will be "filename_32" and if the 1/64" pass checkbox is selected
there will be a second downloaded "filename_64".  

<!---
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/pcb.png)  
-->

note: The 1/32" toolpath will clear and cutout the board, and it will leave small tabs holding the board in place. These tabs will hold the board in
place for the 1/64" finishing pass, and a small flat head screwdriver can be used for breaking the tabs to remove the circuit board.  

<!---
![shield](https://raw.github.com/jw4rd/shieldmill/master/img/tabs.png)  
-->



