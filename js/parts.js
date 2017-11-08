var passB = []
var myBoard = new Object()

function parts(){

	arduino.push( [{X:-34+o,Y:-26.5},{X:31+o,Y:-26.5},{X:31+o,Y:-13.5},{X:34+o,Y:-10.5},{X:34+o,Y:21.5},{X:31+o,Y:24.5},{X:31+o,Y:26.5},{X:-34+o,Y:26.5},{X:-34+o,Y:22.5}] )

	arduino.push([])
	arduino.push([])
	arduino.push([])
	arduino.push([])

	arduino.push( [{X:-34+o,Y:13.5},{X:-34+o,Y:-5.5}] )
	arduino.push( [{X:-34+o,Y:-17.5},{X:-34+o,Y:-26.5}] )
	arduino.push( [{X:-40+o,Y:-17.5},{X:-23+o,Y:-17.5},{X:-23+o,Y:-5.5},{X:-40+o,Y:-5.5},{X:-40+o,Y:-17.5}] )
	arduino.push( [{X:-35+o,Y:13.5},{X:-22+o,Y:13.5},{X:-22+o,Y:22.5},{X:-35+o,Y:22.5},{X:-35+o,Y:13.5}] )

	makeGrid()	

	x = -17.8
	//top pins
	pin_outlines.push([{X:(x+o-0.635+0.42),Y:-20.32-0.42},{X:(x+o-0.635+0.42),Y:-21.86},{X:(x+o)+0.42,Y:-22.86},{X:(x+o)+0.42,Y:-25.4+0.4},{X:(x+o+2.54)+(2.54*9)-0.4,Y:-25.4+0.4},{X:(x+o+2.54)+(2.54*9)-0.4,Y:-23.6},{X:(x+o+3.175)+(2.54*9)-0.42-1.27,Y:-22.86},{X:(x+o+3.175)+(2.54*9)-0.42-1.27,Y:-20.32-0.42},{X:(x+o-0.635+0.42),Y:-20.32-0.42}])

	x = x + 2.54	

	for(i=0;i<9;i++){
		pins.push([{X:(x+o-0.635),Y:-20.32},{X:(x+o-0.635),Y:-21.86},{X:(x+o),Y:-22.86},{X:(x+o),Y:-25.4}])
	x = x + 2.54
	}

	x = 9.505
	
	pin_outlines.push([{X:(x+o+0.42),Y:-20.32-0.2},{X:(x+o+0.42),Y:-25.4+0.4},{X:(x+o+2.54*8-0.42),Y:-25.4+0.4},{X:(x+o+2.54*8-0.42),Y:-20.32-0.4},{X:(x+o+0.42),Y:-20.32-0.4}])

	x = x + 2.54
	for(i=0;i<7;i++){
		pins.push([{X:(x+o),Y:-20.32},{X:(x+o),Y:-25.4}])
	x = x + 2.54
	}
	//bottom pins

	x = 29.825

	pin_outlines.push([{X:(x+o)-0.42,Y:20.32+0.4},{X:(x+o)-0.42,Y:25.4-0.4},{X:(x+o-2.54*6)+0.42,Y:25.4-0.4},{X:(x+o-2.54*6)+0.42,Y:20.32+0.4},{X:(x+o)+0.42,Y:20.32+0.4}])

	x = x - 2.54
	for(i=0;i<5;i++){
		pins.push([{X:(x+o),Y:20.32},{X:(x+o),Y:25.4}])
	x = x - 2.54
	}

	x = 12.06

	pin_outlines.push([{X:(x+o)-0.42,Y:20.32+0.4},{X:(x+o)-0.42,Y:25.4-0.4},{X:(x+o-2.54*8)+0.42,Y:25.4-0.4},{X:(x+o-2.54*8)+0.42,Y:20.32+0.4},{X:(x+o)-0.42,Y:20.32+0.4}])

	x = x - 2.54
	for(i=0;i<7;i++){
		pins.push([{X:(x+o),Y:20.32},{X:(x+o),Y:25.4}])	
	x = x - 2.54
	}

	//console.log(outlines.length)

for(i=0;i<pin_outlines.length;i++){
	pin_outlines[i].reverse()
}


x=-17.10
for(i=0;i<10;i++){
	connect.push({X:(x+o),Y:(-21.61)})
	x = x +2.54
}

x=10.84
for(i=10;i<18;i++){
	connect.push({X:(x+o),Y:(-21.61)})
	x = x +2.54
}

x=28.575
for(i=18;i<24;i++){
	connect.push({X:(x+o),Y:(21.61)})
	x = x -2.54
}

x=10.84
for(i=24;i<31;i++){
	connect.push({X:(x+o),Y:(21.61)})
	x = x -2.54
}

	var x = 28.575
	for(i=0;i<8;i++){
		arduino_pins.push([])
		vias.push([])
			nodes.push({X:(x+o),Y:(-24)})
			for(j=0;j<=25;j++){
				arduino_pins[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.45),Y:((-24.15)+Math.cos((Math.PI*2)/25*j)*0.45)})
				vias[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.1),Y:((-24.15)+Math.cos((Math.PI*2)/25*j)*0.1)})
			}
		x = x -2.54
	}

	x = 6.34
	for(i=8;i<18;i++){
		arduino_pins.push([])
		vias.push([])
		nodes.push({X:(x+o),Y:(-24)})
			for(j=0;j<=25;j++){
				arduino_pins[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.45),Y:((-24.15)+Math.cos((Math.PI*2)/25*j)*0.45)})
				vias[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.1),Y:((-24.15)+Math.cos((Math.PI*2)/25*j)*0.1)})
			}
		x = x -2.54
	}

	var x = 28.575
	for(i=18;i<24;i++){
		arduino_pins.push([])
		vias.push([])
			nodes.push({X:(x+o),Y:(24)})
			for(j=0;j<=25;j++){
				arduino_pins[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.45),Y:((24.15)+Math.cos((Math.PI*2)/25*j)*0.45)})
				vias[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.1),Y:((24.15)+Math.cos((Math.PI*2)/25*j)*0.1)})
			}
		x = x -2.54
	}

	var x = 10.84
	for(i=24;i<32;i++){
		arduino_pins.push([])
		vias.push([])
			nodes.push({X:(x+o),Y:(24)})
			for(j=0;j<=25;j++){
				arduino_pins[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.45),Y:((24.15)+Math.cos((Math.PI*2)/25*j)*0.45)})
				vias[i].push({X:((x+o)+Math.sin((Math.PI*2)/25*j)*0.1),Y:((24.15)+Math.cos((Math.PI*2)/25*j)*0.1)})
			}
		x = x -2.54
	}



draw()
load()

}

////

function add_trace(){

	var traces = []

	if((document.getElementById("board").value)=="arduino"){
		for(i=0;i<pin_outlines.length;i++){
			traces.push([])
			for(j=0;j<pin_outlines[i].length;j++){
				traces[traces.length-1].push({X:parseInt(pin_outlines[i][j].X*scale),Y:parseInt(pin_outlines[i][j].Y*scale)})
			}
		}
	}

	for(i=0;i<trace.length;i++){
		traces.push([])
		for(j=0;j<trace[i].length;j++){
			traces[traces.length-1].push({X:parseInt(trace[i][j].X*scale),Y:parseInt(trace[i][j].Y*scale)})
		}
	}

	var cpr = new ClipperLib.Clipper()
	cpr.AddPaths(traces, ClipperLib.PolyType.ptSubject, true)

	var solution_paths = new ClipperLib.Paths()
	cpr.Execute(ClipperLib.ClipType.ctUnion, solution_paths, ClipperLib.PolyFillType.pftNonZero, ClipperLib.PolyFillType.pftNonZero);

	for(i=0;i<solution_paths.length;i++){
		//solution_paths[i].reverse()
		solution_paths[i].push(solution_paths[i][0])
	}

	//solution_paths.push([])
	//for(i=0;i<frame1.length;i++){
	//	solution_paths[solution_paths.length-1].push({X:parseInt(frame1[i].X*scale),Y:parseInt(frame1[i].Y*scale)})
	//}

	var co = new ClipperLib.ClipperOffset(scale*0.4, 0.25)

	//co.ArcTolerance = 1.23
	//co.MiterLimit = 0.7

	co.AddPaths(solution_paths, ClipperLib.JoinType.jtMiter, ClipperLib.EndType.etClosedPolygon, 0.25)

	var oset = []

	//console.log(finishPass)
	
	//
	if(finishPass==true){
		passB = []
		offset = new ClipperLib.Paths()
		co.Execute(offset, (scale*0.2))

		for(i=0;i<offset.length;i++){
			//offset[i].reverse()
		}
		passB=offset
	}
	//

	i=1
	var toolOffset = 0.41

	while(i<3){

		offset = new ClipperLib.Paths()
		co.Execute(offset, (scale*toolOffset)*i)
		i++
		for(j=0;j<offset.length;j++){
			oset.push(offset[j])
		}
		if(i==2){
			if(passB.length<=offset.length){
				finishPass=false
			}

			if(passB.length==offset.length){
				for(k=0;k<passB.length;k++){
					if((passB[k].length>(offset[k].length+10))||(passB[k].length<(offset[k].length-10))){
						finishPass=true
					}
				}
			}

		}
	}



	if(document.getElementById("finish").checked==true){
		finishPass=true
	}
	else{
		finishPass=false
	}


	offset=oset

	for(i=0;i<offset.length;i++){
		offset[i].reverse()
		offset[i].push(offset[i][0])
	}
	outlines = offset

	draw()
}

////

function add(){
	//console.log(pad);

	if((temp2!=undefined)&&(pad==1)){

	var deltaX = mouseX - origin.X
	var deltaY = mouseY - origin.Y
	var angle = (Math.atan2(deltaY, deltaX))

	//console.log(angle)
		
	angle = ((Math.round(angle/(Math.PI/2)))*(Math.PI/2))

		for(j=0;j<pkgOutlines[pkgOutlines.length-1].length;j++){
			pkgOutlines[pkgOutlines.length-1][j]={X:(((resistorOutline[j].X)*(Math.cos(angle)))-((resistorOutline[j].Y)*(Math.sin(angle)))),Y:(((resistorOutline[j].Y)*(Math.cos(angle)))+((resistorOutline[j].X)*(Math.sin(angle))))}

			pkgOutlines[pkgOutlines.length-1][j]={X:(pkgOutlines[pkgOutlines.length-1][j].X+origin.X),Y:(pkgOutlines[pkgOutlines.length-1][j].Y+origin.Y),part:partNum}
		}

		for(j=0;j<temp.length;j++){
			for(k=0;k<temp[j].length;k++){

				temp[j][k]={X:(((temp2[j][k].X)*(Math.cos(angle)))-((temp2[j][k].Y)*(Math.sin(angle)))),Y:(((temp2[j][k].Y)*(Math.cos(angle)))+((temp2[j][k].X)*(Math.sin(angle))))}

				temp[j][k]={X:(temp[j][k].X+origin.X).toFixed(2),Y:(temp[j][k].Y+origin.Y).toFixed(2)}

			}
		}

	}
}

////



function makeFrame(radius) {

	if(document.getElementById("board").value=="arduino"){
		var fo = 0
	}	
	else{
		fo = 0.2
	}
	frame1=[]
	path1=[]

	for (i=0;i<=verts;i++) {
   	if(i<=25){
   	   frame1.push({X:((xmax+fo-radius)+Math.sin((Math.PI*2)/verts*i)*radius),Y:((ymax+fo-radius)+Math.cos((Math.PI*2)/verts*i)*radius)})
      
   	   path1.push({X:((xmax-radius)+Math.sin((Math.PI*2)/verts*i)*(radius+tool)),Y:((ymax-radius)+Math.cos((Math.PI*2)/verts*i)*(radius+tool))})
		}
   	else if((i>25)&&(i<=50)){
      	frame1.push({X:((xmax+fo-radius)+Math.sin((Math.PI*2)/verts*i)*radius),Y:((ymin-fo+radius)+Math.cos((Math.PI*2)/verts*i)*radius)})
      
      	path1.push({X:((xmax-radius)+Math.sin((Math.PI*2)/verts*i)*(radius+tool)),Y:((ymin+radius)+Math.cos((Math.PI*2)/verts*i)*(radius+tool))}) 
   	}
   	else if((i>50)&&(i<=75)){
   	   frame1.push({X:((xmin-fo+radius)+Math.sin((Math.PI*2)/verts*i)*radius),Y:((ymin-fo+radius)+Math.cos((Math.PI*2)/verts*i)*radius)})
      
   	   path1.push({X:((xmin+radius)+Math.sin((Math.PI*2)/verts*i)*(radius+tool)),Y:((ymin+radius)+Math.cos((Math.PI*2)/verts*i)*(radius+tool))})     
   	}
   	else if((i>75)&&(i<=100)){
   	   frame1.push({X:((xmin-fo+radius)+Math.sin((Math.PI*2)/verts*i)*radius),Y:((ymax+fo-radius)+Math.cos((Math.PI*2)/verts*i)*radius)})
      
   	   path1.push({X:((xmin+radius)+Math.sin((Math.PI*2)/verts*i)*(radius+tool)),Y:((ymax-radius)+Math.cos((Math.PI*2)/verts*i)*(radius+tool))})  
           
   	   if(i==100){
   	   	frame1.push(frame1[0])
   	   	path1.push(path1[0])
   	   }      
   	}   
	}

	if(radius==0){
		frame1=[]
		frame1.push({X:xmax,Y:ymax})
		frame1.push({X:xmax,Y:ymin})
		frame1.push({X:xmin,Y:ymin})
		frame1.push({X:xmin,Y:ymax})
		frame1.push({X:xmax,Y:ymax})
	}

	else if(radius+tool<=0){
		path1=[]
		path1.push({X:-xmax-tool,Y:-ymax-tool})
		path1.push({X:-xmax-tool,Y:-ymin+tool})
		path1.push({X:-xmin+tool,Y:-ymin+tool})
		path1.push({X:-xmin+tool,Y:-ymax-tool})
		path1.push({X:-xmax-tool,Y:-ymax-tool})
	}
		frame1.reverse()
		draw()
}

//
//

function makeGrid(){

	pts = []
	grid = []

	document.getElementById('gridSpacing').innerHTML = document.getElementById('grid').value + "\""

	if((document.getElementById("board").value)=="arduino"){
	pinNum = 0


	if((document.getElementById("grid").value)=="0.025"){
		var space = 0.635
		var rows = 77
		var columns = 73
		var gridScale = 4
		pinNum=0

		y=2.54+(parseInt(document.getElementById("y-bot").value*gridScale)*space)

		for(i=0;i<rows+(parseInt(document.getElementById("y-top").value*gridScale))+(parseInt(document.getElementById("y-bot").value*gridScale));i++){
			x=2.54-(parseInt(document.getElementById("x-left").value*gridScale)*space)
			for(j=0;j<columns+(parseInt(document.getElementById("x-right").value*gridScale))+(parseInt(document.getElementById("x-left").value*gridScale));j++){

				//pins
				if((j>=8+(parseInt(document.getElementById("x-left").value*gridScale)))&&(i<3+(parseInt(document.getElementById("y-bot").value*gridScale)))&&(i>=(parseInt(document.getElementById("y-bot").value*gridScale))) ){
					if((j%2==0)&&(j<24+(parseInt(document.getElementById("x-left").value*gridScale)))){
						pinNum++
					}
					else if((j%2==0)&&(j>24+(parseInt(document.getElementById("x-left").value*gridScale)))&&(j<37+(parseInt(document.getElementById("x-left").value*gridScale)))){
						pinNum++
					}
					else if(j>=37+(parseInt(document.getElementById("x-left").value*gridScale))){
						pinNum=0
					}
				}
				else if((j>=0+(parseInt(document.getElementById("x-left").value*gridScale)))&&(i<39+(parseInt(document.getElementById("y-bot").value*gridScale)))&&(i>=(parseInt(document.getElementById("y-bot").value*gridScale+36))) ){
					if(j==0+(parseInt(document.getElementById("x-left").value*gridScale)) ){
						pinNum=15
					}
					else if(j==22+(parseInt(document.getElementById("x-left").value*gridScale))){
						pinNum=25
					}
					else if((j%2==0)&&(j>(parseInt(document.getElementById("x-left").value*gridScale))) ){
						pinNum++
					}
				}
				else{
					pinNum=0
				}
				//

				pts.push({X:-19.685+o+x,Y:21.61+y,PIN:pinNum})
				x+=space
			}
			y-=space
		}		
		
	}



	if((document.getElementById("grid").value)=="0.05"){
		var space = 1.27
		var rows = 39
		var columns = 37
		var gridScale = 2
		pinNum=0

		y=2.54+(parseInt(document.getElementById("y-bot").value*gridScale)*space)

		for(i=0;i<rows+(parseInt(document.getElementById("y-top").value*gridScale))+(parseInt(document.getElementById("y-bot").value*gridScale));i++){
			x=2.54-(parseInt(document.getElementById("x-left").value*gridScale)*space)
			for(j=0;j<columns+(parseInt(document.getElementById("x-right").value*gridScale))+(parseInt(document.getElementById("x-left").value*gridScale));j++){

				//pins
				if((j>=8+(parseInt(document.getElementById("x-left").value*gridScale)))&&(i<3+(parseInt(document.getElementById("y-bot").value*gridScale)))&&(i>=(parseInt(document.getElementById("y-bot").value*gridScale))) ){
					if((j%2==0)&&(j<24+(parseInt(document.getElementById("x-left").value*gridScale)))){
						pinNum++
					}
					else if((j%2==0)&&(j>24+(parseInt(document.getElementById("x-left").value*gridScale)))&&(j<37+(parseInt(document.getElementById("x-left").value*gridScale)))){
						pinNum++
					}
					else if(j>=37+(parseInt(document.getElementById("x-left").value*gridScale))){
						pinNum=0
					}
				}
				else if((j>=0+(parseInt(document.getElementById("x-left").value*gridScale)))&&(i<39+(parseInt(document.getElementById("y-bot").value*gridScale)))&&(i>=(parseInt(document.getElementById("y-bot").value*gridScale+36))) ){
					if(j==0+(parseInt(document.getElementById("x-left").value*gridScale)) ){
						pinNum=15
					}
					else if(j==22+(parseInt(document.getElementById("x-left").value*gridScale))){
						pinNum=25
					}
					else if((j%2==0)&&(j>(parseInt(document.getElementById("x-left").value*gridScale))) ){
						pinNum++
					}
				}
				else{
					pinNum=0
				}
				//

				pts.push({X:-19.685+o+x,Y:21.61+y,PIN:pinNum})
				x+=space
			}
			y-=space
		}		
		
	}
	else if((document.getElementById("grid").value)=="0.1"){
		var space = 2.54
		var rows = 20
		var columns = 19
		var gridScale = 1
	}


	if((document.getElementById("grid").value)=="0.1"){

		y=space+(parseInt(document.getElementById("y-bot").value)*space)

		for(i=0;i<rows+(parseInt(document.getElementById("y-top").value))+(parseInt(document.getElementById("y-bot").value));i++){
			x=0-(parseInt(document.getElementById("x-left").value)*space)
			for(j=0;j<rows+(parseInt(document.getElementById("x-right").value))+(parseInt(document.getElementById("x-left").value));j++){
				if( ((i==(parseInt(document.getElementById("y-bot").value))) || (i==(parseInt(document.getElementById("y-bot").value)+1))) && (j>4+(parseInt(document.getElementById("x-left").value))) & (j<20+(parseInt(document.getElementById("x-left").value)))){
					if(j==13){
						k=pinNum
						pinNum=0
					}
					else if(j==14){
						pinNum=k+1
					}
					else{
						pinNum++
					}
				}
				else if( ((i==(parseInt(document.getElementById("y-bot").value)+18)) || (i==(parseInt(document.getElementById("y-bot").value)+19))) && (j>0+(parseInt(document.getElementById("x-left").value))) && (j<20+(parseInt(document.getElementById("x-left").value)))){
					if((j==11)&&(i==(parseInt(document.getElementById("y-bot").value)+18))){
						pinNum=0
					}
					else{
						k++
						pinNum=k
					}
				}
				else{
					k=14
					pinNum=0
				}
				if(j>0){
					pts.push({X:-19.685+o+x,Y:21.61+y,PIN:pinNum})
				}
				if( (i==19+(parseInt(document.getElementById("y-bot").value))) && (j==(parseInt(document.getElementById("x-left").value))) ){
					x = x + space+0.635
				}
				else if( (i==19+(parseInt(document.getElementById("y-bot").value))) && (j==(10+(parseInt(document.getElementById("x-left").value)))) ){
					x = x + space+1.27+0.635
					j++
				}
				else{
					x = x+space
				}
			}
		y = y-space
		}
	}
	y = 3.79
		for(i=0;i<rows+(parseInt(document.getElementById("y-top").value)*gridScale)+(parseInt(document.getElementById("y-bot").value)*gridScale);i++){
			grid.push([{X:-19.685+2.54-(parseInt(document.getElementById("x-left").value)*2.54)+o,Y:25.4+2.54+(parseInt(document.getElementById("y-bot").value)*2.54)-y},{X:29.845-2.54+o+1.27+(parseFloat(document.getElementById("x-right").value)*2.54),Y:25.4+2.54+(parseInt(document.getElementById("y-bot").value)*2.54)-y}])
			y = y + space
		}
		x = 0
		for(i=0;i<columns+(parseInt(document.getElementById("x-right").value*gridScale))+(parseInt(document.getElementById("x-left").value)*gridScale);i++){
			grid.push([{X:-19.685+2.54-(parseInt(document.getElementById("x-left").value)*2.54)+o+x,Y:21.61+2.54+(parseInt(document.getElementById("y-bot").value)*2.54)},{X:-19.685+2.54-(parseInt(document.getElementById("x-left").value)*2.54)+o+x,Y:-21.61-2.54-(parseInt(document.getElementById("y-top").value)*2.54)}])
			x = x + space
		}	
	}
	else if(document.getElementById("board").value=="blank"){


		if((document.getElementById("grid").value)=="0.1"){

			for(i=0;i<(Math.round(((Math.abs(ymin))+ymax)/2.54));i++){
				for(j=0;j<(Math.round(((Math.abs(xmin))+xmax)/2.54));j++){
					pts.push({X:(xmin+1.27+(j*2.54)),Y:(ymax-1.27-(i*2.54))})
				}
			}

			for(i=0;i<(Math.round(((Math.abs(ymin))+ymax)/2.54));i++){
				grid.push([{X:xmin+1.27,Y:(ymax-1.27-(i*2.54))},{X:xmax-1.27,Y:(ymax-1.27-(i*2.54))}])
			}

			for(i=0;i<(Math.round(((Math.abs(xmin))+xmax)/2.54));i++){
				grid.push([{X:(xmin+1.27+(i*2.54)),Y:(ymax-1.27)},{X:(xmin+1.27+(i*2.54)),Y:(ymin+1.27)}])
			}
		}
		else if((document.getElementById("grid").value)=="0.05"){

			for(i=0;i<(Math.round(((Math.abs(ymin))+ymax)/1.27))-1;i++){
				for(j=0;j<(Math.round(((Math.abs(xmin))+xmax)/1.27))-1;j++){
					pts.push({X:(xmin+1.27+(j*1.27)),Y:(ymax-1.27-(i*1.27))})
				}
			}


			for(i=1;i<(Math.round(((Math.abs(ymin))+ymax)/1.27));i++){
				grid.push([{X:xmin+1.27,Y:(ymax-(i*1.27))},{X:xmax-1.27,Y:(ymax-(i*1.27))}])
			}
			for(i=1;i<(Math.round(((Math.abs(xmin))+xmax)/1.27));i++){
				grid.push([{X:(xmin+(i*1.27)),Y:(ymax-1.27)},{X:(xmin+(i*1.27)),Y:(ymin+1.27)}])
			}	
		}
		else if((document.getElementById("grid").value)=="0.025"){

			for(i=0;i<(Math.round(((Math.abs(ymin))+ymax)/0.635))-1;i++){
				for(j=0;j<(Math.round(((Math.abs(xmin))+xmax)/0.635))-1;j++){
					pts.push({X:(xmin+0.635+(j*0.635)),Y:(ymax-0.635-(i*0.635))})
				}
			}


			for(i=1;i<(Math.round(((Math.abs(ymin))+ymax)/0.635));i++){
				grid.push([{X:xmin+0.635,Y:(ymax-(i*0.635))},{X:xmax-0.635,Y:(ymax-(i*0.635))}])
			}
			for(i=1;i<(Math.round(((Math.abs(xmin))+xmax)/0.635));i++){
				grid.push([{X:(xmin+(i*0.635)),Y:(ymax-0.635)},{X:(xmin+(i*0.635)),Y:(ymin+0.635)}])
			}	
		}

	}

	draw()

}




