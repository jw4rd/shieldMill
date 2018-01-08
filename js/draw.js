


function draw(){

	

	if((pan==true)&&(click==0)){
		document.getElementById('myCanvas').style.cursor = 'grab'
		document.getElementById('myCanvas').style.cursor = '-webkit-grab'
	}
	else if((pan==true)&&(click==1)){
		document.getElementById('myCanvas').style.cursor = 'move'
	}
	else if(select==true){
		document.getElementById('myCanvas').style.cursor = 'default'
	}
	else{
		document.getElementById('myCanvas').style.cursor = 'crosshair'
	}

	document.getElementById('board_width').innerHTML = (((xmax + Math.abs(xmin))/25.4).toFixed(2) + "\"")
	document.getElementById('board_height').innerHTML = (((ymax + Math.abs(ymin))/25.4).toFixed(2) + "\"")

	c = document.getElementById("myCanvas")
	ctx = c.getContext("2d")

	ctx.canvas.height = $(window).innerHeight()-30
	ctx.canvas.width = $(window).innerWidth()-30

	sf = ((ctx.canvas.height-(110-(yoffsetTop/sf)-(yoffsetBot/sf)))/(ymax+(Math.abs(ymin)))+zoom)

	if(sf<2){
		sf = 2
		zoom = 2-(ctx.canvas.height-(110-(yoffsetTop/sf)-(yoffsetBot/sf)))/(ymax+(Math.abs(ymin)))
	}

	yo=((parseFloat(document.getElementById("y-top").value)*1.27*sf)-(parseFloat(document.getElementById("y-bot").value)*1.27*sf))

	ctx.translate(panX*sf,yo+panY*sf)

	ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height)
	ctx.lineJoin="round"

	ctx.fillStyle="#8c8cff"
	ctx.strokeStyle="#000"
	ctx.lineWidth="1"

	if((document.getElementById("board").value)=="arduino"){
		for(i=0;i<arduino.length;i++){
			ctx.beginPath()
			for(j=0;j<arduino[i].length;j++){
				ctx.lineTo((ctx.canvas.width/2)+(arduino[i][j].X*sf),(ctx.canvas.height/2)+(arduino[i][j].Y*sf))
			}
			ctx.stroke()
			ctx.fill()
		}

		ctx.fillStyle="#aaa"
		for(i=7;i<arduino.length;i++){
		ctx.beginPath()

		if(i==7){
			ctx.fillStyle="#bbb"
		}

		for(j=0;j<arduino[i].length;j++){
			ctx.lineTo((ctx.canvas.width/2)+(arduino[i][j].X*sf),(ctx.canvas.height/2)+(arduino[i][j].Y*sf))
		}
		ctx.fill()
		ctx.stroke()
		}
	}

//ctx.fillStyle="#ccccff"
ctx.fillStyle="rgba(204, 204, 255, 0.7)"
ctx.beginPath()
	for(i=0;i<frame1.length;i++){
		ctx.lineTo((frame1[i].X*sf)+ctx.canvas.width/2,(frame1[i].Y*sf)+ctx.canvas.height/2)
	}
ctx.fill()
		ctx.strokeStyle="#fff"
		ctx.lineWidth=0.7
for(i=0;i<grid.length;i++){
	ctx.beginPath()
	for(j=0;j<grid[i].length;j++){
		ctx.lineTo((ctx.canvas.width/2)+(grid[i][j].X*sf),(ctx.canvas.height/2)+(grid[i][j].Y*sf))
	}
	ctx.stroke()
}

if(document.getElementById('side').value=="top"){
	ctx.fillStyle="#666"
}
else{
	ctx.fillStyle="#888"
}
ctx.lineWidth="2"
ctx.strokeStyle="#ff0000"
if((document.getElementById("board").value)=="arduino"){
	for(i=0;i<pin_outlines.length;i++){
		ctx.beginPath()
		for(j=0;j<pin_outlines[i].length;j++){
			ctx.lineTo((ctx.canvas.width/2)+(pin_outlines[i][j].X*sf),(ctx.canvas.height/2)+(pin_outlines[i][j].Y*sf))
		}
		ctx.fill()
	}
}

if((seg==1)&&(line==true)&&(pan==false)&&(document.getElementById("type").value.substring(0,5)=="route")){
	ctx.beginPath()
	ctx.strokeStyle="#999"
	ctx.moveTo((ctx.canvas.width/2)+(endX*sf),(ctx.canvas.height/2)+(endY*sf))
	ctx.lineTo((ctx.canvas.width/2)+(mouseX*sf),(ctx.canvas.height/2)+(mouseY*sf))

	if(document.getElementById("type").value=="routeB"){
		ctx.lineWidth=0.3*sf
	}
	else if(document.getElementById("type").value=="routeC"){
		ctx.lineWidth=0.2*sf
	}
	else if(document.getElementById("type").value=="routeD"){
		ctx.lineWidth=0.1*sf
	}
	else{
		ctx.lineWidth=0.6*sf
	}
	ctx.stroke()
}

if(document.getElementById('side').value=="top"){
	ctx.fillStyle="#666"
}
else{
	ctx.fillStyle="#888"
}

for(i=0;i<trace.length;i++){
	ctx.beginPath()

	for(j=0;j<trace[i].length;j++){
		ctx.lineTo((ctx.canvas.width/2+(trace[i][j].X*sf)),(ctx.canvas.height/2+(trace[i][j].Y*sf)))
	}
	ctx.fill()

}

//

if((document.getElementById("board").value)=="arduino"){

ctx.lineWidth=0.4*sf
	//ctx.strokeStyle="#ccccff"
	ctx.strokeStyle="rgba(204, 204, 255, 0.7)"
	for(i=0;i<pins.length;i++){
		ctx.beginPath()
		for(j=0;j<pins[i].length;j++){
			ctx.lineTo((pins[i][j].X*sf)+ctx.canvas.width/2,(pins[i][j].Y*sf)+ctx.canvas.height/2)
		}
		ctx.stroke()
	}

ctx.lineWidth="1"
ctx.strokeStyle="#ffff00"
ctx.fillStyle="#ffff00"

for(i=0;i<connect.length;i++){
	ctx.beginPath()
	ctx.arc(ctx.canvas.width/2+((connect[i].X)*sf),ctx.canvas.height/2+((connect[i].Y)*sf),0.2*sf,0,(Math.PI*2))
	ctx.fill()
	ctx.stroke()
}

	ctx.lineWidth="1"
	ctx.strokeStyle="#000"
	ctx.fillStyle="#fff"

for(i=0;i<arduino_pins.length;i++){
		ctx.beginPath()
	for(j=0;j<arduino_pins[i].length;j++){
		ctx.lineTo((ctx.canvas.width/2)+(arduino_pins[i][j].X*sf),(ctx.canvas.height/2)+(arduino_pins[i][j].Y*sf))
	}
	ctx.fill()
}

}

ctx.beginPath()
ctx.lineWidth="2"
ctx.strokeStyle="#333"

	for(i=0;i<frame1.length;i++){
		ctx.lineTo((frame1[i].X*sf)+ctx.canvas.width/2,(frame1[i].Y*sf)+ctx.canvas.height/2)
	}
	ctx.stroke()

	ctx.lineWidth="1"
	ctx.fillStyle="#fff"
	ctx.strokeStyle="#999"

for(i=0;i<net.length;i++){
	for(j=0;j<net[i].length;j++){

		ctx.beginPath()
		if(net[i][j].D==true){
			ctx.fillStyle="#fff"
			ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),0.4*sf,0,(Math.PI*2))
		}
		else if(net[i][j].D=="hole"){
			ctx.fillStyle="#fff"
			ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),1.27*sf,0,(Math.PI*2))
			ctx.moveTo(ctx.canvas.width/2+((net[i][j].X-0.8)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf))
			ctx.lineTo(ctx.canvas.width/2+((net[i][j].X+0.8)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf))
			ctx.moveTo(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y-0.8)*sf))
			ctx.lineTo(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y+0.8)*sf))
		}
		if( (i==net.length-1) && (j==(net[i].length-1)) ){
			ctx.beginPath()
			ctx.fillStyle="#00ff00"
			if((document.getElementById("type").value=="route")||(document.getElementById("type").value=="routeB")){

				if(document.getElementById("type").value=="routeB"){
					ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),0.15*sf,0,(Math.PI*2))
				}
				else if(document.getElementById("type").value=="routeC"){
					ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),0.11*sf,0,(Math.PI*2))
				}
				else if(document.getElementById("type").value=="routeD"){
					ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),0.06*sf,0,(Math.PI*2))
				}
				else{			
					ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),0.25*sf,0,(Math.PI*2))
				}
			}
			else if(net[i][j].D=="hole"){
				ctx.fillStyle="#fff"			
				ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),1.27*sf,0,(Math.PI*2))
				ctx.moveTo(ctx.canvas.width/2+((net[i][j].X-0.8)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf))
				ctx.lineTo(ctx.canvas.width/2+((net[i][j].X+0.8)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf))
				ctx.moveTo(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y-0.8)*sf))
				ctx.lineTo(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y+0.8)*sf))
			}
			else if(net[i][j].D==true){
				ctx.fillStyle="#fff"			
				ctx.arc(ctx.canvas.width/2+((net[i][j].X)*sf),ctx.canvas.height/2+((net[i][j].Y)*sf),0.4*sf,0,(Math.PI*2))
			}
		}
		ctx.fill()
		ctx.stroke()
	}
	if( (net[i].length==0) && (net.length>1) ){
		ctx.beginPath()
		if(seg==1){
			ctx.fillStyle="#00ff00"
		}
		else{
			ctx.fillStyle="#ff0000"
		}

		if((document.getElementById("type").value=="route")||(document.getElementById("type").value=="routeB")&&(seg>0)){
			//ctx.fillStyle="#fff000"
			//ctx.arc(ctx.canvas.width/2+((net[i-1][net[i-1].length-1].X)*sf),ctx.canvas.height/2+((net[i-1][net[i-1].length-1].Y)*sf),0.25*sf,0,(Math.PI*2))
		}

		ctx.fill()		
	}
}

if(pad==0){
ctx.fillStyle="#666"
}
else if((document.getElementById("type").value)=="resistor"){
	
ctx.fillStyle="#999"

}

for(i=0;i<temp.length;i++){
	
	ctx.beginPath()
	for(j=0;j<temp[i].length;j++){
		ctx.lineTo((ctx.canvas.width/2+(temp[i][j].X*sf)),(ctx.canvas.height/2+(temp[i][j].Y*sf)))
	}
	ctx.fill()

}

/*
ctx.strokeStyle="#fff"
ctx.fillStyle="#fff"
ctx.lineWidth=0.8*sf
for(i=0;i<hole.length;i++){
	ctx.beginPath()
	for(j=0;j<hole[i].length;j++){
		ctx.lineTo((ctx.canvas.width/2+(hole[i][j].X*sf)),(ctx.canvas.height/2+(hole[i][j].Y*sf)))
	}
	ctx.fill()
	ctx.stroke()
}
*/

ctx.lineWidth=0.1*sf
ctx.fillStyle="rgba(255, 255, 0, 0.45)"
ctx.strokeStyle="rgba(200, 200, 0, 0.6)"

for(i=0;i<pkgOutlines.length;i++){
	ctx.beginPath()
		for(j=0;j<pkgOutlines[i].length;j++){
			ctx.lineTo((ctx.canvas.width/2)+(pkgOutlines[i][j].X*sf),(ctx.canvas.height/2)+(pkgOutlines[i][j].Y*sf))
		}
	ctx.fill()
	ctx.stroke()
}

if(((document.getElementById("type").value)=="resistor")&&(pad==1)){
	ctx.fillStyle="#fff"
	ctx.beginPath()
	ctx.arc(ctx.canvas.width/2+(origin.X*sf),ctx.canvas.height/2+(origin.Y*sf),0.15*sf,0,(Math.PI*2))
	ctx.fill()
}

ctx.fillStyle="#999"
ctx.strokeStyle="#999"

ctx.beginPath()

if((on_grid==true)&&(pan==false)){
	
	if(document.getElementById("type").value=="dip"){
		ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.85*sf,0,(Math.PI*2) )
		ctx.fill()
		ctx.beginPath()
		ctx.fillStyle="#fff"
		ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.4*sf,0,(Math.PI*2) )
		ctx.fill()	
	}
	else if(document.getElementById("type").value=="via"){
		ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.55*sf,0,(Math.PI*2) )
		ctx.fill()
		ctx.beginPath()
		ctx.fillStyle="#fff"
		ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.4*sf,0,(Math.PI*2) )
		ctx.fill()	
	}
	else if(document.getElementById("type").value.substring(1,4)=="pad"){

		if(document.getElementById("type").value=="Rpad1"){	
			ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.117*sf,0,(Math.PI*2) )
		}	
		else if(document.getElementById("type").value=="Rpad3"){	
			ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.4*sf,0,(Math.PI*2) )
		}
		else if(document.getElementById("type").value=="Rpad5"){	
			ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.585*sf,0,(Math.PI*2) )
		}		

	ctx.fill()
	}
	else if(document.getElementById("type").value=="hole"){
		ctx.fillStyle="#eee"
		ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),1.27*sf,0,(Math.PI*2) )
		ctx.fill()
		ctx.stroke()
	}
	else if(document.getElementById("type").value.substring(0,3)=="pad"){

		if(document.getElementById("type").value=="pad0310"){
			padRect = {x:0.425,y:1.27}
		}
		else if(document.getElementById("type").value=="pad1003"){
			padRect = {x:1.27,y:0.425}
		}
		else if(document.getElementById("type").value=="pad0106"){
			padRect = {x:0.116,y:0.58}
		}
		else if(document.getElementById("type").value=="pad0601"){
			padRect = {x:0.58,y:0.116}
		}
		else{
			padRect = {x:0.425,y:0.425}
		}

		//ctx.fillStyle="#eee"
		//ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),1.27*sf,0,(Math.PI*2) )
		ctx.moveTo((ctx.canvas.width/2)+((mouseX-padRect.x)*sf),(ctx.canvas.height/2)+((mouseY-padRect.y)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX-padRect.x)*sf),(ctx.canvas.height/2)+((mouseY+padRect.y)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX+padRect.x)*sf),(ctx.canvas.height/2)+((mouseY+padRect.y)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX+padRect.x)*sf),(ctx.canvas.height/2)+((mouseY-padRect.y)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX-padRect.x)*sf),(ctx.canvas.height/2)+((mouseY-padRect.y)*sf))
		ctx.fill()
	}
	else if(document.getElementById("type").value=="smd"){
		
		padSize = 0.85
		if(padType=="0.03"){
			padSize = 0.425
		}
		ctx.moveTo((ctx.canvas.width/2)+((mouseX-padSize)*sf),(ctx.canvas.height/2)+((mouseY-padSize)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX-padSize)*sf),(ctx.canvas.height/2)+((mouseY+padSize)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX+padSize)*sf),(ctx.canvas.height/2)+((mouseY+padSize)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX+padSize)*sf),(ctx.canvas.height/2)+((mouseY-padSize)*sf))
		ctx.lineTo((ctx.canvas.width/2)+((mouseX-padSize)*sf),(ctx.canvas.height/2)+((mouseY-padSize)*sf))
		ctx.fill()
	}

ctx.beginPath()
	
	if((seg==1)&&(line==true)){
		ctx.fillStyle="#ff0000"
	}
	else{
		ctx.fillStyle="#00ff00"
	}

	if(on_grid==false){
		ctx.fillStyle="#FFA500"
	}

	//ctx.stroke()

	if((document.getElementById("type").value=="dip")||(document.getElementById("type").value=="smd")){
		//ctx.fillStyle="#ffff00"
	}
	if((document.getElementById("type").value.substring(0,5)=="route")||(document.getElementById("type").value=="resistor")){
		if(document.getElementById("type").value=="routeB"){
			ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.15*sf,0,(Math.PI*2) )
			ctx.lineWidth=0.2*sf
		}
		else if(document.getElementById("type").value=="routeC"){
			ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.11*sf,0,(Math.PI*2) )
			ctx.lineWidth=0.12*sf
		}
		else{
			ctx.arc(	(ctx.canvas.width/2+(mouseX)*sf),(ctx.canvas.height/2+(mouseY)*sf),0.25*sf,0,(Math.PI*2) )
			ctx.lineWidth=0.4*sf
		}
		//ctx.stroke()
		ctx.fill()
	}

}

ctx.lineWidth="0.6"
//ctx.strokeStyle="#6600cc"
ctx.strokeStyle="rgba(0, 0, 0, 0.4)"

if(document.getElementById("file").value=="hpgl"){

	
	for(i=0;i<vcut.length;i++){
		ctx.beginPath()
		ctx.moveTo(((ctx.canvas.width/2)+(vcut[i][0].X/scale*sf)).toFixed(3),((ctx.canvas.height/2)+(vcut[i][0].Y/scale*sf)).toFixed(3))
		for(j=0;j<vcut[i].length;j++){
			ctx.lineTo(((ctx.canvas.width/2)+(vcut[i][j].X/scale*sf)).toFixed(3),((ctx.canvas.height/2)+(vcut[i][j].Y/scale*sf)).toFixed(3))
		}
		ctx.lineTo(((ctx.canvas.width/2)+(vcut[i][0].X/scale*sf)).toFixed(3),((ctx.canvas.height/2)+(vcut[i][0].Y/scale*sf)).toFixed(3))		
		ctx.stroke()
	}

	if((document.getElementById("board").value)=="arduino"){

	for(i=0;i<vpins.length;i++){
		ctx.beginPath()
		for(j=0;j<vpins[i].length;j++){
			ctx.lineTo((vpins[i][j].X*sf)+ctx.canvas.width/2,(vpins[i][j].Y*sf)+ctx.canvas.height/2)
		}
		ctx.stroke()
	}

	}

}
else{

	//if(millAll==false){
	ctx.strokeStyle="#333"
	//}

	for(i=0;i<outlines.length;i++){
	ctx.beginPath()
	for(j=0;j<outlines[i].length;j++){
		ctx.lineTo(((ctx.canvas.width/2)+(outlines[i][j].X/scale*sf)).toFixed(3),((ctx.canvas.height/2)+(outlines[i][j].Y/scale*sf)).toFixed(3))
	}

	if(document.getElementById("tp").checked==true){
		ctx.stroke()
	}

	}

	if(finishPass==true){
	ctx.strokeStyle="#0000ff"
	for(i=0;i<passB.length;i++){
		ctx.beginPath()
		ctx.moveTo(((ctx.canvas.width/2)+(passB[i][0].X/scale*sf)).toFixed(3),((ctx.canvas.height/2)+(passB[i][0].Y/scale*sf)).toFixed(3))
		for(j=0;j<passB[i].length;j++){
			ctx.lineTo(((ctx.canvas.width/2)+(passB[i][j].X/scale*sf)).toFixed(3),((ctx.canvas.height/2)+(passB[i][j].Y/scale*sf)).toFixed(3))
		}
		ctx.lineTo(((ctx.canvas.width/2)+(passB[i][0].X/scale*sf)).toFixed(3),((ctx.canvas.height/2)+(passB[i][0].Y/scale*sf)).toFixed(3))		
		ctx.stroke()
	}
	}

}


ctx.strokeStyle="#ffff00"
ctx.lineWidth=(0.1*sf)

for(i=0;i<traceNum.length;i++){
	for(j=0;j<traceNum[i].node.length;j=j+2){
		ctx.fillStyle="#fff000"
		ctx.beginPath()
		ctx.arc((ctx.canvas.width/2)+(traceNum[i].node[j]*sf),(ctx.canvas.height/2)+(traceNum[i].node[j+1]*sf),1,0,Math.PI*2)
		ctx.fill()
		if(document.getElementById("part-list").value==traceNum[i].part){
			ctx.fillStyle="#ff00ff"
			ctx.beginPath()
			ctx.arc((ctx.canvas.width/2)+(traceNum[i].node[j]*sf),(ctx.canvas.height/2)+(traceNum[i].node[j+1]*sf),0.15*sf,0,Math.PI*2)
			ctx.fill()

			ctx.fillStyle="#ffff00"
			ctx.beginPath()
			ctx.arc((ctx.canvas.width/2)+(traceNum[i].node[j]*sf),(ctx.canvas.height/2)+(traceNum[i].node[j+1]*sf),0.05*sf,0,Math.PI*2)
			ctx.fill()

			if((j==0)&&(traceNum[i].node.length>2)){
				ctx.beginPath()		
				ctx.moveTo((ctx.canvas.width/2)+(traceNum[i].node[j]*sf),(ctx.canvas.height/2)+(traceNum[i].node[j+1]*sf))
				ctx.lineTo((ctx.canvas.width/2)+(traceNum[i].node[j+2]*sf),(ctx.canvas.height/2)+(traceNum[i].node[j+3]*sf))
				ctx.stroke()
			}			
		}
	}	

}


	//center

	ctx.lineWidth= 0.02*sf

	ctx.strokeStyle="#666"

	ctx.beginPath()
	ctx.moveTo(ctx.canvas.width/2,ctx.canvas.height/2-(0.3*sf))
	ctx.lineTo(ctx.canvas.width/2,ctx.canvas.height/2+(0.3*sf))
	ctx.moveTo(ctx.canvas.width/2-(0.3*sf),ctx.canvas.height/2)
	ctx.lineTo(ctx.canvas.width/2+(0.3*sf),ctx.canvas.height/2)
	ctx.stroke()

	ctx.fillStyle="#666"
	ctx.beginPath()
	ctx.arc(ctx.canvas.width/2,ctx.canvas.height/2,0.04*sf,0,(Math.PI*2))
	//ctx.fill()

var size_font = (14)
ctx.font = (size_font + "px Arial")

if(((document.getElementById("help-div").style.display)=='block')||(document.getElementById("board").value=="blank")){

if((document.getElementById("help-div").style.display)=='block'){
	ctx.lineWidth=(0.1*sf)
	ctx.strokeStyle="#333"
	ctx.fillStyle="#ffff00"

	ctx.beginPath()
	ctx.arc(ctx.canvas.width/2+(xmin*sf),ctx.canvas.height/2+(ymax*sf),(0.5*sf),0,(Math.PI*2))
	ctx.moveTo(ctx.canvas.width/2+(xmin*sf),ctx.canvas.height/2+(ymax*sf)+(0.5*sf))
	ctx.lineTo(ctx.canvas.width/2+(xmin*sf),ctx.canvas.height/2+(ymax*sf)-(0.5*sf))
	ctx.moveTo(ctx.canvas.width/2+(xmin*sf)+(0.5*sf),ctx.canvas.height/2+(ymax*sf))
	ctx.lineTo(ctx.canvas.width/2+(xmin*sf)-(0.5*sf),ctx.canvas.height/2+(ymax*sf))
	ctx.fill()
	ctx.stroke()

}

	ctx.strokeStyle="#666"
	ctx.lineWidth="1"
	ctx.fillStyle="#888"

	ctx.beginPath()
	ctx.moveTo((ctx.canvas.width/2)+(34),(ctx.canvas.height)-10-yo-(panY*sf))
	ctx.lineTo((ctx.canvas.width/2)+(xmax*sf),(ctx.canvas.height)-yo-10-(panY*sf))
	ctx.moveTo((ctx.canvas.width/2)-(3),(ctx.canvas.height)-10-yo-(panY*sf))
	ctx.lineTo((ctx.canvas.width/2)+(xmin*sf),(ctx.canvas.height)-10-yo-(panY*sf))
	ctx.stroke()

	ctx.fillText( ((Math.abs(ymin/25.4))+(ymax/25.4)).toFixed(2)  + "\"",ctx.canvas.width/2+(xmax*sf)+(4.4*sf),ctx.canvas.height/2)
	ctx.fillText( ((Math.abs(xmin/25.4))+(xmax/25.4)).toFixed(2)  + "\"",ctx.canvas.width/2,(ctx.canvas.height)-6-yo-(panY*sf))

	ctx.beginPath()
	ctx.moveTo((ctx.canvas.width/2)+(xmax*sf)+(5*sf),(ctx.canvas.height/2)+(5))
	ctx.lineTo((ctx.canvas.width/2)+(xmax*sf)+(5*sf),(ctx.canvas.height/2)+(ymax*sf))
	ctx.moveTo((ctx.canvas.width/2)+(xmax*sf)+(5*sf),(ctx.canvas.height/2)-(15))
	ctx.lineTo((ctx.canvas.width/2)+(xmax*sf)+(5*sf),(ctx.canvas.height/2)+(ymin*sf))
	ctx.stroke()

	ctx.beginPath()
	ctx.arc(ctx.canvas.width/2+(xmax*sf)+(5*sf),(ctx.canvas.height/2)+(ymax*sf),(0.3*sf),0,(Math.PI*2))
	ctx.fill()

	ctx.beginPath()
	ctx.arc(ctx.canvas.width/2+(xmax*sf)+(5*sf),(ctx.canvas.height/2)+(ymin*sf),(0.3*sf),0,(Math.PI*2))
	ctx.fill()

	ctx.beginPath()
	ctx.arc((ctx.canvas.width/2)+(xmax*sf),(ctx.canvas.height)-10-yo-(panY*sf),(0.3*sf),0,(Math.PI*2))
	ctx.fill()

	ctx.beginPath()
	ctx.arc((ctx.canvas.width/2)+(xmin*sf),(ctx.canvas.height)-10-yo-(panY*sf),(0.3*sf),0,(Math.PI*2))
	ctx.fill()
}

size_font = (17)
ctx.font = (size_font + "px Arial")
ctx.fillStyle="#777"
ctx.translate( (ctx.canvas.width/2)-xo,ctx.canvas.height/2)

	if((document.getElementById("grid").value)=="0.05"){
		var space = 1.27
	}
	else if((document.getElementById("grid").value)=="0.025"){
		var space = 0.635
	}
	else if((document.getElementById("grid").value)=="1mm"){
		var space = 1
	}
	else{
		var space=2.54
	}

if((document.getElementById("file").value)=="gcode_mm"){
	sfx=1
	fixed=1
}
else{
	sfx=25.4
	fixed=3
}


if((document.getElementById("board").value)=="arduino"){
	var droX= ((((parseFloat(mouseX)+25.4-2.54+(parseInt(document.getElementById('x-left').value)*space))/sfx)).toFixed(fixed))
	var droY= (Math.abs((parseFloat(mouseY)-24.15-(parseInt(document.getElementById('y-bot').value)*space))/sfx).toFixed(fixed))
}
else if((document.getElementById("board").value)=="blank"){
	droX=((((parseFloat(mouseX)+11.43+(parseInt(document.getElementById('x-left').value)*space))/sfx)).toFixed(fixed))
	droY=(Math.abs((parseFloat(mouseY)-11.43-(parseInt(document.getElementById('y-bot').value)*space))/sfx).toFixed(fixed))
}

ctx.fillText("x: "+droX,ctx.canvas.width/2-(103)-(panX*sf),-ctx.canvas.height/2+(15)-yo-(panY*sf))
ctx.fillText("y: "+droY,ctx.canvas.width/2-(103)-(panX*sf),-ctx.canvas.height/2+(40)-yo-(panY*sf))

var size_font = (12)
ctx.font = (size_font + "px Arial")

if((document.getElementById("file").value)=="gcode_mm"){
	ctx.fillText("mm",ctx.canvas.width/2-(35)-(panX*sf),-ctx.canvas.height/2+(40)-yo-(panY*sf))
}
else{
	ctx.fillText("inch",ctx.canvas.width/2-(35)-(panX*sf),-ctx.canvas.height/2+(40)-yo-(panY*sf))
}

//
size_font = (1.5*sf)
ctx.font = (size_font + "px Arial")

//console.log(o)
ctx.translate(((-11.45+o)*sf)+(1.5*sf)+xo,-27*sf)

ctx.rotate(-Math.PI/2);

yoffsetTop = (parseFloat(document.getElementById("y-top").value)*2.54*sf)
yoffsetBot = (parseFloat(document.getElementById("y-bot").value)*2.54*sf)

if((document.getElementById("board").value)=="arduino"){

ctx.fillStyle="#ff00ff"
	if(pinNum==15){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText(" SCL",yoffsetTop,(-5.06*sf)-(sf*1.1))
	if(pinNum==16){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText(" SDA",yoffsetTop,(-2.54*sf)-(sf*1.1))
	if(pinNum==17){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText(" AREF",yoffsetTop,0-(sf*1.1))
	if(pinNum==18){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText(" GND",yoffsetTop,(2.54*sf)-(sf*1.1))
	if(pinNum==19){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText(" 13",yoffsetTop,(2.54*2*sf)-(sf*1.1))
	if(pinNum==20){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText(" 12",yoffsetTop,(2.54*3*sf)-(sf*1.1))
	if(pinNum==21){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("~11",yoffsetTop,(2.54*4*sf)-(sf*1.1))
	if(pinNum==22){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("~10",yoffsetTop,(2.54*5*sf)-(sf*1.1))
	if(pinNum==23){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("  9",yoffsetTop,(2.54*6*sf)-(sf*1.1))
	if(pinNum==24){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("  8",yoffsetTop,(2.54*7*sf)-(sf*1.1))
	if(pinNum==25){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("  7",yoffsetTop,(2.54*8*sf)+(0.8*sf))
	if(pinNum==26){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("~6",yoffsetTop,(2.54*9*sf)+(0.8*sf))
	if(pinNum==27){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("~5",yoffsetTop,(2.54*10*sf)+(0.8*sf))
	if(pinNum==28){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("  4",yoffsetTop,(2.54*11*sf)+(0.8*sf))
	if(pinNum==29){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("~3",yoffsetTop,(2.54*12*sf)+(0.8*sf))
	if(pinNum==30){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("  2",yoffsetTop,(2.54*13*sf)+(0.8*sf))
	if(pinNum==31){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("  1 TX",yoffsetTop,(2.54*14*sf)+(0.8*sf))
	if(pinNum==32){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("  0 RX",yoffsetTop,(2.54*15*sf)+(0.8*sf))


	if(pinNum==14){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("A5",(-56*sf)-yoffsetBot,(2.54*15*sf)+(0.9*sf))
	if(pinNum==13){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("A4",(-56*sf)-yoffsetBot,(2.54*14*sf)+(0.9*sf))
	if(pinNum==12){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("A3",(-56*sf)-yoffsetBot,(2.54*13*sf)+(0.9*sf))
	if(pinNum==11){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("A2",(-56*sf)-yoffsetBot,(2.54*12*sf)+(0.9*sf))
	if(pinNum==10){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("A1",(-56*sf)-yoffsetBot,(2.54*11*sf)+(0.9*sf))
	if(pinNum==9){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("A0",(-56*sf)-yoffsetBot,(2.54*10*sf)+(0.9*sf))

	if(pinNum==8){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("VIN",(-56.5*sf)-yoffsetBot,(2.54*9*sf)-(1.6*sf))
	if(pinNum==7){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("GND",(-57.3*sf)-yoffsetBot,(2.54*8*sf)-(1.6*sf))
	if(pinNum==6){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("GND",(-57.3*sf)-yoffsetBot,(2.54*7*sf)-(1.6*sf))
	if(pinNum==5){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("5V",(-56*sf)-yoffsetBot,(2.54*6*sf)-(1.6*sf))
	if(pinNum==4){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("3.3V",(-57.3*sf)-yoffsetBot,(2.54*5*sf)-(1.6*sf))
	if(pinNum==3){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("RST",(-57.2*sf)-yoffsetBot,(2.54*4*sf)-(1.6*sf))
	if(pinNum==2){
		ctx.fillStyle="#000"
	}
	else{
		ctx.fillStyle="#ff00ff"
	}
ctx.fillText("IOREF",(-58.5*sf)-yoffsetBot,(2.54*3*sf)-(1.6*sf))
	if(pinNum==1){
		ctx.fillStyle="#888"
	}
	else{
		ctx.fillStyle="#bbb"
	}
	ctx.fillText("NC",(-56.5*sf)-yoffsetBot,(2.54*2*sf)-(1.6*sf))
}

}


function undo(){

	//console.log(net)

	temp=[]
	pad=0

	$("#undo").blur()

	if(net.length>1){
		if((seg==0)&&(net[net.length-1].length==0)){
			net.pop()
			if(net[net.length-1][0].T=="res"){
				pkgOutlines.pop()
				net[net.length-1].pop()
			}
			else{
				net[net.length-1].pop()
			}
			trace.pop()
			trace.pop()
		}
	else if((net[net.length-1].length==0)&&(net[net.length-2].length==3)){
		pkgOutlines.pop()
		net.pop()
		net[net.length-1].pop()
		net[net.length-1].pop()
		trace.pop()
		trace.pop()
		seg=0
	}
	
	else{
		net[net.length-1].pop()
		trace.pop()
	}
	if((net[net.length-1].length==0)){
		

	}
	else{
		endX=(net[net.length-1][net[net.length-1].length-1].X)
		endY=(net[net.length-1][net[net.length-1].length-1].Y)
		
	}
	}
	else{
		trace.pop()
		net = [[]]
		seg = 1
	}

	if(seg==0){
		seg=1
	}
	else{
		seg=0
	}
	if((net[net.length-1].length==1)&&((net[net.length-1][0].T=="res"))){
		net[net.length-1].pop()
		seg=0
	}

	add_trace()

}



