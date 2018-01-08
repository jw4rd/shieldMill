
function make(){

	var material = {feed:150,plunge:100}  
	var pass_depth = 0.425

	var dip = true

	var tabs = true

	var filetype = ""

	var filename = prompt("Filename?")
	
	console.log(filetype)

	filename += "_"

	if(filename=="_"){

		if((document.getElementById("board").value)=="arduino"){
			filename="shield_"
		}
		else if((document.getElementById("board").value)=="blank"){
			filename="pcb_"
		}


	}

	

	if((document.getElementById("file").value)=="gcode"){
		filetype = "gcode"
	}
	else if((document.getElementById("file").value)=="sbp"){
		filetype = "sbp"
	}
	else if((document.getElementById("file").value)=="rml01"){
		filetype = "rml01"
	}
	else if((document.getElementById("file").value)=="rml025"){
		filetype = "rml025"
	}
	else if((document.getElementById("file").value)=="hpgl"){
		filetype = "hpgl"
	}


	//xy cut offset
	var y0 = parseFloat(document.getElementById("y-origin").value)
	var x0 = parseFloat(document.getElementById("x-origin").value)

	//console.log(x0)
	//console.log(y0)
	//
	var millDepth=0.005

	var plunge = (material.plunge/25.4).toFixed(0)
	var feed = (material.feed/25.4).toFixed(0)
	var retract = 0.2
	var sfx = 25.4
	var fixed = 4

	if((document.getElementById("file").value)=="gcode_mm"){
		filetype = "gcode"
		x0=parseFloat((x0*25.4).toFixed(2))
		y0=parseFloat((y0*25.4).toFixed(2))	
		plunge = material.plunge
		feed = material.feed
		retract= (0.2*25.4).toFixed(2)
		alert(retract)
		sfx = 1
		fixed = 2
		millDepth=0.125	
	}


	g=""

	//pins.reverse()

	if(document.getElementById('side').value=="top"){
		flip()
	}	
	else{
		flipCutout()
		tempMax = ymax
		ymax = Math.abs(ymin)
	}



	for(i=0;i<net.length;i++){
		for(j=0;j<net[i].length;j++){
			if(net[i][j].D==true){
				for(k=0;k<net.length;k++){
					for(l=0;l<net[k].length;l++){
						if( (net[i][j].X.toFixed(2)==net[k][l].X.toFixed(2)) && (net[i][j].Y.toFixed(2)==net[k][l].Y.toFixed(2)) && (net[k][l].D==true) ){
							if((i!=k)||(l!=j)){
								net[k][l].D=false
							}
						}
					}
				}
			}
		}
	}




	pass_depth = 0.0175

	if(filetype=="sbp"){
		g+="MS," + (material.feed/25.4/60).toFixed(1) + "," + (material.plunge/25.4/60).toFixed(1) + "\n"
		g+="JZ,0.2\n"
		g+="TR,12000\n"
		g+="SO,1,1\n"
		g+="PAUSE 5\n"
	}
	else if(filetype=="gcode"){
		if((document.getElementById("file").value)=="gcode_mm"){
			pass_depth = (pass_depth*25.4).toFixed(2)
			g+="g21\n"
		}
		else{
			g+="g20\n"
		}
		g+="g0z"+retract+"\n"
		g+="s12000\n"
		g+="m3\n"
		g+="g4p3\n"
	}
	else if(filetype=="rml01"){

		var rmlOffset = 140

		var rmlXYOffset = 45

		x0 = parseInt(x0*2540)
		y0 = parseInt(y0*2540)

		var rmlF = "V" + 6 + ";\n"
		var rmlP = "V" + 2 + ";\n"

		g += "PA;!VZ;!PZ0," + rmlOffset + ";\n"
	
		g += "PU" + x0 + "," + y0 + ";\n"
		g += "!RC15;\n"
		g += "!MC1;\n"

		g += rmlF
		g += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
		g += "!DW3000;\n"
		g += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
		g += "!DW;\n"

		pass_depth = 0.021
		rmlD=-22	

	}
	else if(filetype=="rml025"){

		var rmlOffset = 60

		var rmlXYOffset = 20

		x0 = parseInt(x0*1016)
		y0 = parseInt(y0*1016)

		var rmlF = "V" + 6 + ";\n"
		var rmlP = "V" + 2 + ";\n"

		g += "PA;!VZ;!PZ0," + rmlOffset + ";\n"
	
		g += "PU" + x0 + "," + y0 + ";\n"
		g += "!RC15;\n"
		g += "!MC1;\n"

		g += rmlF
		g += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
		g += "!DW3000;\n"
		g += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
		g += "!DW;\n"

		pass_depth = 0.021
		rmlD=-9	

	}
	else if(filetype=="hpgl"){


		var rmlOffset = 0
		var rmlXYOffset = 0
		x0 = parseInt(x0*1016)
		y0 = parseInt(y0*1016)

		//console.log(filetype)
		g="IN;\n"
		g+="SP1;\n"
		g+="!MF50;\n"
		g+="VS3;\n"
		g+="PU0,0;\n"
	}   

	if((document.getElementById("board").value)=="arduino"){

   	for(i=0;i<vias.length;i++){

			pass_no = 4
			pass = 1
			
			if(filetype=="sbp"){
				g+="J2,"+(((vias[i][0].X+Math.abs(xmin))/25.4)+x0).toFixed(4)+","+ (((vias[i][0].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
			}
			else if(filetype=="gcode"){
				g+="g0x"+(((vias[i][0].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed)+"y"+ (((vias[i][0].Y+ymax)/25.4)+sfx).toFixed(fixed) + "\n"			
			}
			else if(filetype=="rml01"){
				g+="PU"+(((vias[i][0].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0)+","+ (((vias[i][0].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ";\n"			
			}
			else if(filetype=="rml025"){
				g+="PU"+(((vias[i][0].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0)+","+ (((vias[i][0].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"			
			}

			while(pass<=pass_no){
				if(filetype=="sbp"){
					g+="MZ,-"+ (pass_depth*pass).toFixed(4) + "\n"
					for(j=0;j<vias[i].length;j++){
	   	   		g+="M2,"+(((vias[i][j].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ (((vias[i][j].Y+(ymax))/25.4)+y0).toFixed(4) + "\n"
					}
				}
				else if(filetype=="gcode"){
					g+="g1z-"+ (pass_depth*pass).toFixed(fixed) + "f" + plunge + "\n"
					for(j=0;j<vias[i].length;j++){
	   	   		g+="g1x"+(((vias[i][j].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) + "y" + (((vias[i][j].Y+(ymax))/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
					}
				}
				else if(filetype=="rml01"){
					for(j=0;j<vias[i].length;j++){
	   	   		g+="Z"+(((vias[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) + "," + (((vias[i][j].Y+(ymax))*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
					}
				}
				else if(filetype=="rml025"){
					for(j=0;j<vias[i].length;j++){
	   	   		g+="Z"+(((vias[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) + "," + (((vias[i][j].Y+(ymax))*40)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
					}
				}
			pass++
	   	}
			if(filetype=="sbp"){
				g+="JZ,0.1\n"
			}
			else if(filetype=="gcode"){
				g+="g0z"+retract+"\n"
			}
		}
   	for(i=0;i<pins.length;i++){
			if(filetype=="sbp"){
				g+="J2,"+(((pins[i][0].X+Math.abs(xmin))/25.4)+x0).toFixed(4)+","+ (((pins[i][0].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
			   g+="MZ,-"+ millDepth + "\n"
				g+="PAUSE 0.1\n"
					for(j=1;j<pins[i].length;j++){
						g+="M2,"+(((pins[i][j].X+Math.abs(xmin))/25.4)+x0).toFixed(4)+","+ (((pins[i][j].Y+ymax)/25.4)+y0).toFixed(4) + "\n"		
					}
				g+="JZ,0.1\n"
			}
			else if(filetype=="gcode"){
				g+="g0x"+(((pins[i][0].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed)+"y"+ (((pins[i][0].Y+ymax)/sfx)+y0).toFixed(fixed) + "\n"
			   g+="g1z-"+ millDepth + "f" + plunge + "\n"
				g+="g4p0.1\n"
					for(j=1;j<pins[i].length;j++){
						g+="g1x"+(((pins[i][j].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed)+"y"+ (((pins[i][j].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"		
					}
				g+="g0z"+retract+"\n"
			}
			else if(filetype=="rml01"){
				g+="PU"+(((pins[i][0].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0)+","+ (((pins[i][0].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ";\n"
					for(j=0;j<pins[i].length;j++){
						g+="Z"+(((pins[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0)+","+ (((pins[i][j].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + "," + rmlD + ";\n"		
					}
			}
			else if(filetype=="rml025"){
				g+="PU"+(((pins[i][0].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0)+","+ (((pins[i][0].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"
					for(j=0;j<pins[i].length;j++){
						g+="Z"+(((pins[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0)+","+ (((pins[i][j].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + "," + rmlD + ";\n"		
					}
			}
		}

	}

	for(i=0;i<hole.length;i++){

		pass_no = 4
		pass = 1
		if(filetype=="sbp"){
			g+="J2,"+(((hole[i][0].X+Math.abs(xmin))/25.4)+x0).toFixed(4)+","+ (((hole[i][0].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
			while(pass<=pass_no){
	   	g+="MZ,-"+ (pass_depth*pass).toFixed(4) + "\n"
				for(j=0;j<hole[i].length;j++){
   	   		g+="M2,"+(((hole[i][j].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ (((hole[i][j].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
				}
			pass++
   		}
			g+="JZ,0.1\n"
		}
		else if(filetype=="gcode"){//holes
			g+="g0x"+(((hole[i][0].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed)+"y"+ (((hole[i][0].Y+ymax)/sfx)+y0).toFixed(fixed) + "\n"
			while(pass<=pass_no){
	   	g+="g1z-"+ (pass_depth*pass).toFixed(fixed) + "f" + plunge + "\n"
				for(j=0;j<hole[i].length;j++){
   	   		g+="g1x"+(((hole[i][j].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ (((hole[i][j].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
				}
			pass++
   		}
			g+="g0z"+retract+"\n"
		}
		else if(filetype=="rml01"){ //holes
			g+="PU"+(((hole[i][0].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0)+","+ (((hole[i][0].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ";\n"
			while(pass<=pass_no){
				for(j=0;j<hole[i].length;j++){
   	   		g+="Z"+(((hole[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ (((hole[i][j].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
				}
			pass++
   		}
		}
		else if(filetype=="rml025"){ //holes
			g+="PU"+(((hole[i][0].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0)+","+ (((hole[i][0].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"
			while(pass<=pass_no){
				for(j=0;j<hole[i].length;j++){
   	   		g+="Z"+(((hole[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ (((hole[i][j].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
				}
			pass++
   		}
		}
	}

   for(i=0;i<net.length;i++){
   	for(j=0;j<net[i].length;j++){
			pass_no = 5
			pass = 1
			if(filetype=="sbp"){
				if(net[i][j].D==true){
					g+="J2,"+(((net[i][j].X+Math.abs(xmin))/25.4)+x0).toFixed(4)+","+ (((net[i][j].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
						while(pass<=pass_no){
	   					g+="MZ,-"+ (pass_depth*pass).toFixed(4) + "\n"
							g+="JZ,0.05\n"

							pass++
						}
					g+="JZ,0.1\n"
				}
			}
			else if(filetype=="gcode"){
				if(net[i][j].D==true){
					g+="g0x"+(((net[i][j].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) + "y" + (((net[i][j].Y+ymax)/sfx)+y0).toFixed(fixed) + "\n"
						while(pass<=pass_no){
	   					g+="g1z-"+ (pass_depth*pass).toFixed(fixed) + "f" + plunge + "\n"
							g+="g0z" + (retract/4).toFixed(fixed) + "\n"
							pass++
						}
					g+="g0z"+retract+"\n"
				}
			}
			else if(filetype=="rml01"){//through hole
				if(net[i][j].D==true){
					g+="PU"+(((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) + "," + (((net[i][j].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ";\n"
						while(pass<=pass_no){
							g += "Z"+(((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) + "," + (((net[i][j].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
							if(dip==true){
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0)+7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*100)+rmlXYOffset+y0)+7).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0)+7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*100)+rmlXYOffset+y0)-7).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0)-7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*100)+rmlXYOffset+y0)-7).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0)-7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*100)+rmlXYOffset+y0)+7).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0)+7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*100)+rmlXYOffset+y0)+7).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
							}
							g += "Z"+(((net[i][j].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) + "," + (((net[i][j].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"	
							g+="PU;\n"
							pass++

						}
				}
			}
			else if(filetype=="rml025"){//through hole
				if(net[i][j].D==true){
					g+="PU"+(((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) + "," + (((net[i][j].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"
						while(pass<=pass_no){
							g += "Z"+(((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) + "," + (((net[i][j].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
							if(dip==true){
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0)+7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*40)+rmlXYOffset+y0)+7).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0)+7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*40)+rmlXYOffset+y0)-7).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0)-7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*40)+rmlXYOffset+y0)-7).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0)-7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*40)+rmlXYOffset+y0)+7).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
								g += "Z"+((((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0)+7).toFixed(0) + "," + ((((net[i][j].Y+ymax)*40)+rmlXYOffset+y0)+7).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
							}
							g += "Z"+(((net[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) + "," + (((net[i][j].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"	
							g+="PU;\n"
							pass++

						}
				}
			}

		}
	}

	outlines.reverse()


   for(i=0;i<outlines.length;i++){

		if(document.getElementById('side').value=="back"){
			outlines[i].reverse()
		}

		if(filetype=="sbp"){
			g+="J2,"+(((outlines[i][0].X/scale/25.4)+Math.abs(xmin)/25.4)+x0).toFixed(4)+","+ ((((outlines[i][0].Y/scale)+ymax)/25.4)+y0).toFixed(4) + "\n"
	   	g+="MZ,-"+ millDepth + "\n"
			g+="PAUSE 0.1\n"
				for(j=1;j<outlines[i].length;j++){
					g+="M2,"+(((outlines[i][j].X/scale/25.4)+Math.abs(xmin)/25.4)+x0).toFixed(4)+","+ ((((outlines[i][j].Y/scale)+ymax)/25.4)+y0).toFixed(4) + "\n"		
				}
			g+="JZ,0.1\n"
		}
		else if(filetype=="gcode"){
			g+="g0x"+(((outlines[i][0].X/scale/sfx)+Math.abs(xmin)/sfx)+x0).toFixed(fixed)+"y"+ ((((outlines[i][0].Y/scale)+ymax)/sfx)+y0).toFixed(fixed) + "\n"
	   	g+="g1z-"+ millDepth + "f" + plunge + "\n"
			g+="g4p0.1\n"
				for(j=1;j<outlines[i].length;j++){
					g+="g1x"+(((outlines[i][j].X/scale/sfx)+Math.abs(xmin)/sfx)+x0).toFixed(fixed) + "y" + ((((outlines[i][j].Y/scale)+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"		
				}
			g+="g0z"+retract+"\n"
		}
		else if(filetype=="rml01"){
			g+="PU"+(((outlines[i][0].X/scale*100)+Math.abs(xmin)*100)+rmlXYOffset+x0).toFixed(0)+","+ ((((outlines[i][0].Y/scale)+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ";\n"
				for(j=0;j<outlines[i].length;j++){
					g+="Z"+(((outlines[i][j].X/scale*100)+Math.abs(xmin)*100)+rmlXYOffset+x0).toFixed(0) + "," + ((((outlines[i][j].Y/scale)+ymax)*100)+rmlXYOffset+y0).toFixed(0) + "," + rmlD + ";\n"			
				}
		}
		else if(filetype=="rml025"){
			g+="PU"+(((outlines[i][0].X/scale*40)+Math.abs(xmin)*40)+rmlXYOffset+x0).toFixed(0)+","+ ((((outlines[i][0].Y/scale)+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"
				for(j=0;j<outlines[i].length;j++){
					g+="Z"+(((outlines[i][j].X/scale*40)+Math.abs(xmin)*40)+rmlXYOffset+x0).toFixed(0) + "," + ((((outlines[i][j].Y/scale)+ymax)*40)+rmlXYOffset+y0).toFixed(0) + "," + rmlD + ";\n"			
				}
		}
	}

	pass_no = 4
	pass = 1

	if(document.getElementById('side').value=="back"){
		ymax=tempMax
	}

	if((filetype=="sbp")&&(tabs==true)){
		g+="J2,"+(((path1[0].X+Math.abs(xmin))/25.4)+x0).toFixed(4)+","+ (((path1[0].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
			while(pass<=pass_no){   
	   		g+="MZ,-"+ (pass_depth*pass).toFixed(4) + "\n"
	   	for(i=1;i<path1.length;i++){
				//tabs
				if(((i==path1.length-1)||(i==path1.length-51))&&(pass>pass_no-2)){
					if(i==path1.length-1){
						g+="M2,"+((((path1[i].X+Math.abs(xmin))/25.4)-0.1)+x0).toFixed(4) +","+ (((path1[i].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
						g+="JZ,-"+(pass_depth*(pass_no-1.5)).toFixed(4)+"\n"
						g+="M2,"+((((path1[i].X+Math.abs(xmin))/25.4))+x0).toFixed(4) +","+ (((path1[i].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
					}
					else if(i==path1.length-51){
						g+="M2,"+((((path1[i].X+Math.abs(xmin))/25.4)+0.1)+x0).toFixed(4) +","+ (((path1[i].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
						g+="JZ,-"+(pass_depth*(pass_no-1.5)).toFixed(4)+"\n"
						g+="M2,"+((((path1[i].X+Math.abs(xmin))/25.4))+x0).toFixed(4) +","+ (((path1[i].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
					}
					g+="MZ,-"+ (pass_depth*pass).toFixed(4) + "\n"
	   	   	g+="M2,"+(((path1[i].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ (((path1[i].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
				}
				else if(((i==path1.length-26)||(i==path1.length-76))&&(pass>pass_no-2)){
					if(i==path1.length-26){
						g+="M2,"+(((path1[i].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ ((((path1[i].Y+ymax)/25.4)+0.1)+y0).toFixed(4) + "\n"
						g+="JZ,-"+(pass_depth*(pass_no-1.5)).toFixed(4)+"\n"
						g+="M2,"+(((path1[i].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ ((((path1[i].Y+ymax)/25.4))+y0).toFixed(4) + "\n"
					}
					else if(i==path1.length-76){
						g+="M2,"+(((path1[i].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ ((((path1[i].Y+ymax)/25.4)-0.1)+y0).toFixed(4) + "\n"
						g+="JZ,-"+(pass_depth*(pass_no-1.5)).toFixed(4) + "\n"
						g+="M2,"+(((path1[i].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ ((((path1[i].Y+ymax)/25.4))+y0).toFixed(4) + "\n"
					}
					g+="MZ,-"+ (pass_depth*pass).toFixed(4) + "\n"
	   	   	g+="M2,"+(((path1[i].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ (((path1[i].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
					
				}
				//
				else{
	   	   	g+="M2,"+(((path1[i].X+Math.abs(xmin))/25.4)+x0).toFixed(4) +","+ (((path1[i].Y+ymax)/25.4)+y0).toFixed(4) + "\n"
				}
	   	   
			}
   		pass++
		}
	}
	else if((filetype=="gcode")&&(tabs==true)){

		if((document.getElementById("file").value)=="gcode_mm"){
			tabLength=3
		}
		else{
			tabLength=0.1
		}


		g+="g0x"+(((path1[0].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) + "y" + (((path1[0].Y+ymax)/sfx)+y0).toFixed(fixed) + "\n"
			while(pass<=pass_no){   
	   		g+="g1z-"+ (pass_depth*pass).toFixed(fixed) + "f" + plunge + "\n"
	   	for(i=1;i<path1.length;i++){
				//tabs
				if(((i==path1.length-1)||(i==path1.length-51))&&(pass>pass_no-2)){
					if(i==path1.length-1){
						g+="g1x"+((((path1[i].X+Math.abs(xmin))/sfx)-tabLength)+x0).toFixed(fixed) +"y"+ (((path1[i].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
						g+="g0z-"+(pass_depth*(pass_no-1.5)).toFixed(fixed)+"\n"
						g+="g1x"+((((path1[i].X+Math.abs(xmin))/sfx))+x0).toFixed(fixed) +"y"+ (((path1[i].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
					}
					else if(i==path1.length-51){
						g+="g1x"+((((path1[i].X+Math.abs(xmin))/sfx)+tabLength)+x0).toFixed(fixed) +"y"+ (((path1[i].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
						g+="g0z-"+(pass_depth*(pass_no-1.5)).toFixed(fixed)+"\n"
						g+="g1x"+((((path1[i].X+Math.abs(xmin))/sfx))+x0).toFixed(fixed) +"y"+ (((path1[i].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
					}
					g+="g1z-"+ (pass_depth*pass).toFixed(fixed) + "f" + plunge + "\n"
	   	   	g+="g1x"+(((path1[i].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ (((path1[i].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
					
				}
				else if(((i==path1.length-26)||(i==path1.length-76))&&(pass>pass_no-2)){
					if(i==path1.length-26){
						g+="g1x"+(((path1[i].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ ((((path1[i].Y+ymax)/sfx)+tabLength)+y0).toFixed(fixed) + "f" + feed + "\n"
						g+="g0z-"+(pass_depth*(pass_no-1.5)).toFixed(fixed)+"\n"
						g+="g1x"+(((path1[i].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ ((((path1[i].Y+ymax)/sfx))+y0).toFixed(fixed) + "f" + feed + "\n"
					}
					else if(i==path1.length-76){
						g+="g1x"+(((path1[i].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ ((((path1[i].Y+ymax)/sfx)-tabLength)+y0).toFixed(fixed) + "f" + feed + "\n"
						g+="g0z-"+(pass_depth*(pass_no-1.5)).toFixed(fixed)+"\n"
						g+="g1x"+(((path1[i].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ ((((path1[i].Y+ymax)/sfx))+y0).toFixed(fixed) + "f" + feed + "\n"
					}
					g+="g1z-"+ (pass_depth*pass).toFixed(fixed) + "f" + plunge + "\n"
	   	   	g+="g1x"+(((path1[i].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ (((path1[i].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
					
				}
				//
				else{
	   	   	g+="g1x"+(((path1[i].X+Math.abs(xmin))/sfx)+x0).toFixed(fixed) +"y"+ (((path1[i].Y+ymax)/sfx)+y0).toFixed(fixed) + "f" + feed + "\n"
				}
				
			}
   		pass++
		}
	}
	else if((filetype=="rml01")&&(tabs==false)){
		g+="PU"+(((path1[0].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) + "," + (((path1[0].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ";\n"
			while(pass<=pass_no){   
	   	for(i=0;i<path1.length;i++){

				g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) + "," + (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
			}
   		pass++
		}
	}
	else if((filetype=="rml01")&&(tabs==true)){


		g+="PU"+(((path1[0].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) + "," + (((path1[0].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + "\n"
			while(pass<=pass_no){   
	   		//g+="g1z-"+ (pass_depth*pass).toFixed(4) + "f" + plunge + "\n"
	   	for(i=1;i<path1.length;i++){
				//tabs
				if(((i==path1.length-1)||(i==path1.length-51))&&(pass>pass_no-2)){
					if(i==path1.length-1){
						g+="Z"+((((path1[i].X+Math.abs(xmin))*100)-250)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
					if(pass<4){
							g+="Z"+((((path1[i].X+Math.abs(xmin))*100)-250)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"

							g+="Z"+((((path1[i].X+Math.abs(xmin))*100))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"
						
							g+="Z"+((((path1[i].X+Math.abs(xmin))*100))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*2540).toFixed(0) + ";\n"
						}
					}
					else if(i==path1.length-51){
						g+="Z"+((((path1[i].X+Math.abs(xmin))*100)+250)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
						g+="Z"+((((path1[i].X+Math.abs(xmin))*100)+250)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"
					
						g+="Z"+((((path1[i].X+Math.abs(xmin))*100))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"
						g+="Z"+((((path1[i].X+Math.abs(xmin))*100))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*2540).toFixed(0) + ";\n"
					}
					//g+="g1z-"+ (pass_depth*pass).toFixed(4) + "f" + plunge + "\n"
	   	   	//g+="g1x"+((path1[i].X+Math.abs(xmin))/25.4).toFixed(4) +"y"+ ((path1[i].Y+ymax)/25.4).toFixed(4) + "f" + feed + "\n"
					
				}
				else if(((i==path1.length-26)||(i==path1.length-76))&&(pass>pass_no-2)){
					if(i==path1.length-26){
						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100)+250)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100)+250)+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"

						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100))+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"
						//
						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100))+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*2540).toFixed(0) + ";\n"
					}
					else if(i==path1.length-76){

						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100)-250)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100)-250)+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"

						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100))+rmlXYOffset+y0).toFixed(0) + ",-" + 110 + ";\n"
						g+="Z"+(((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*100))+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*2540).toFixed(0) + ";\n"

					}
					
				}

				else{
	   	   	g+= "Z" + (((path1[i].X+Math.abs(xmin))*100)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*2540).toFixed(0) + ";\n"
				}
				
			}
   		pass++
		}
	}

	else if((filetype=="rml025")&&(tabs==true)){


		g+="PU"+(((path1[0].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) + "," + (((path1[0].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + "\n"
			while(pass<=pass_no){   
	   		//g+="g1z-"+ (pass_depth*pass).toFixed(4) + "f" + plunge + "\n"
	   	for(i=1;i<path1.length;i++){
				//tabs
				if(((i==path1.length-1)||(i==path1.length-51))&&(pass>pass_no-2)){
					if(i==path1.length-1){
						g+="Z"+((((path1[i].X+Math.abs(xmin))*40)-100)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
					if(pass<4){
							g+="Z"+((((path1[i].X+Math.abs(xmin))*40)-100)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"

							g+="Z"+((((path1[i].X+Math.abs(xmin))*40))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"
						
							g+="Z"+((((path1[i].X+Math.abs(xmin))*40))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*1016).toFixed(0) + ";\n"
						}
					}
					else if(i==path1.length-51){
						g+="Z"+((((path1[i].X+Math.abs(xmin))*40)+100)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
						g+="Z"+((((path1[i].X+Math.abs(xmin))*40)+100)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"
					
						g+="Z"+((((path1[i].X+Math.abs(xmin))*40))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"
						g+="Z"+((((path1[i].X+Math.abs(xmin))*40))+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*1016).toFixed(0) + ";\n"
					}
					//g+="g1z-"+ (pass_depth*pass).toFixed(4) + "f" + plunge + "\n"
	   	   	//g+="g1x"+((path1[i].X+Math.abs(xmin))/25.4).toFixed(4) +"y"+ ((path1[i].Y+ymax)/25.4).toFixed(4) + "f" + feed + "\n"
					
				}
				else if(((i==path1.length-26)||(i==path1.length-76))&&(pass>pass_no-2)){
					if(i==path1.length-26){
						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40)+100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40)+100)+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"

						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40))+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"
						//
						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40))+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*1016).toFixed(0) + ";\n"
					}
					else if(i==path1.length-76){

						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40)-100)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40)-100)+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"

						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40))+rmlXYOffset+y0).toFixed(0) + ",-" + 45 + ";\n"
						g+="Z"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ ((((path1[i].Y+ymax)*40))+rmlXYOffset+y0).toFixed(0) + ",-" + ((pass_depth)*pass*1016).toFixed(0) + ";\n"

					}
					
				}

				else{
	   	   	g+= "Z" + (((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) +","+ (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + (pass_depth*pass*1016).toFixed(0) + ";\n"
				}
				
			}
   		pass++
		}
	}



	if(filetype=="hpgl"){


		if((document.getElementById("board").value)=="arduino"){

		for(i=0;i<vpins.length;i++){
			g+="PU"+(((vpins[i][0].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0)+","+ (((vpins[i][0].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"
			for(j=0;j<vpins[i].length;j++){
				g+="PD"+(((vpins[i][j].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0)+","+ (((vpins[i][j].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"		
			}
		}

		}

		for(i=0;i<vcut.length;i++){
			g+="PU"+(((vcut[i][0].X/scale*40)+Math.abs(xmin)*40)+rmlXYOffset+x0).toFixed(0)+","+ ((((vcut[i][0].Y/scale)+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"
			for(j=0;j<vcut[i].length;j++){
				g+="PD"+(((vcut[i][j].X/scale*40)+Math.abs(xmin)*40)+rmlXYOffset+x0).toFixed(0) + "," + ((((vcut[i][j].Y/scale)+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"			
			}
			g+="PD"+(((vcut[i][0].X/scale*40)+Math.abs(xmin)*40)+rmlXYOffset+x0).toFixed(0) + "," + ((((vcut[i][0].Y/scale)+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ";\n"			

		}

		//cutout
		g+="PU"+(((path1[0].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) + "," + (((path1[0].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + "\n"
		for(i=0;i<path1.length;i++){
			g+="PD"+(((path1[i].X+Math.abs(xmin))*40)+rmlXYOffset+x0).toFixed(0) + "," + (((path1[i].Y+ymax)*40)+rmlXYOffset+y0).toFixed(0) + "\n"
		}


	}



	if(filetype=="sbp"){
		g+="JZ,0.2\n"
		g+="SO,1,0\n"
		if((document.getElementById("board").value)=="arduino"){
			g+="J3," + x0 + "," + (((ymax+Math.abs(ymin)+0.2)/25.4)+y0).toFixed(4) + ",0.4\n"
		}
		if((document.getElementById("board").value)=="blank"){
			g+="J3," + (((xmax+Math.abs(xmin)+0.2)/25.4)+x0).toFixed(4) + ","+y0+",0.4\n"
		}
	}
	else if(filetype=="gcode"){
		g+="g0z"+retract+"\n"
		g+="m5\n"
		if((document.getElementById("board").value)=="arduino"){
			g+="g0x" + x0 + "y" + (((ymax+Math.abs(ymin)+0.2)/sfx)+y0).toFixed(fixed) + "\n"
		}
		if((document.getElementById("board").value)=="blank"){
			g+="g0x" + (((xmax+Math.abs(xmin)+0.2)/sfx)+x0).toFixed(fixed) + "y" + y0 + "\n"
		}
	}

	if(filetype=="rml01"){

		g+="PU;\n"
		g+="!MC0;\n"
		g+="V30;\n"	
		//g+="Z15240,10160,3000;\n"

		link = document.getElementById("downloadLink")

		link.setAttribute("href", "data:text/plain;base64," + btoa(g))
		link.setAttribute("download", filename + "32.rml")
		link.click()
	}
	else if(filetype=="rml025"){

		g+="PU;\n"
		g+="!MC0;\n"
		g+="V30;\n"	
		//g+="Z6096,4046,1200;\n"

		link = document.getElementById("downloadLink")

		link.setAttribute("href", "data:text/plain;base64," + btoa(g))
		link.setAttribute("download", filename + "32.rml")
		link.click()
	}
	else if(filetype=="sbp"){

		link = document.getElementById("downloadLink")

		link.setAttribute("href", "data:text/plain;base64," + btoa(g))
		link.setAttribute("download", filename + "32.sbp")
		link.click()
	}
	else if(filetype=="gcode"){

		link = document.getElementById("downloadLink")

		link.setAttribute("href", "data:text/plain;base64," + btoa(g))
		link.setAttribute("download", filename + "32.nc")
		link.click()
	}
	else if(filetype=="hpgl"){

		g+="PU0,0;"

		link = document.getElementById("downloadLink")

		link.setAttribute("href", "data:text/plain;base64," + btoa(g))
		link.setAttribute("download", filename + "vinlyCutter.hpgl")
		link.click()
	}

	g=""

	if(document.getElementById('side').value=="back"){
		ymax=Math.abs(ymin)
	}

	
	if(finishPass==true){
		var g2 = ""

		if(filetype=="gcode"){

			if((document.getElementById("file").value)=="gcode_mm"){
				g2+="g21\n"
			}
			else{
				g2+="g20\n"
			}


			g2+="g0z"+retract+"\n"
			g2+="m3\n"
			g2+="g4p3\n"
	
			for(i=0;i<passB.length;i++){
				g2+="g0x"+(((passB[i][0].X/scale/sfx)+Math.abs(xmin)/sfx)+x0).toFixed(fixed)+"y"+ ((((passB[i][0].Y/scale)+ymax)/sfx)+y0).toFixed(fixed) + "\n"
	   		g2+="g1z-"+ millDepth + "f" + (plunge/2).toFixed((fixed/2)) + "\n"
				g2+="g4p0.1\n"
					for(j=1;j<passB[i].length;j++){
						g2+="g1x"+(((passB[i][j].X/scale/sfx)+Math.abs(xmin)/sfx)+x0).toFixed(fixed) + "y" + ((((passB[i][j].Y/scale)+ymax)/sfx)+y0).toFixed(fixed) + "f" + (feed/2).toFixed((fixed/2)) + "\n"		
					}
				g2+="g1x"+(((passB[i][0].X/scale/sfx)+Math.abs(xmin)/sfx)+x0).toFixed(fixed)+"y"+ ((((passB[i][0].Y/scale)+ymax)/sfx)+y0).toFixed(4) + "f" + (feed/2).toFixed((fixed/2)) + "\n"
				g2+="g0z"+ (retract/2).toFixed(fixed) +"\n"
			}

			g2+="g0z"+retract+"\n"
			g2+="m5\n"

			link.setAttribute("href", "data:text/plain;base64," + btoa(g2))
			link.setAttribute("download", filename + "64.nc")
			link.click()

		}
		else if(filetype=="sbp"){

			g2+="MS," + ((material.feed/25.4/60)/2).toFixed(2) + "," + ((material.plunge/25.4/60)/2).toFixed(2) + "\n"
			g2+="JZ,0.2\n"
			g2+="SO,1,1\n"
			g2+="PAUSE 5\n"
	
			for(i=0;i<passB.length;i++){
				g2+="J2,"+(((passB[i][0].X/scale/25.4)+Math.abs(xmin)/25.4)+x0).toFixed(4)+","+ ((((passB[i][0].Y/scale)+ymax)/25.4)+y0).toFixed(4) + "\n"
	   		g2+="MZ,-" + millDepth + "\n"
				g2+="PAUSE 0.1\n"
					for(j=1;j<passB[i].length;j++){
						g2+="M2,"+(((passB[i][j].X/scale/25.4)+Math.abs(xmin)/25.4)+x0).toFixed(4) + "," + ((((passB[i][j].Y/scale)+ymax)/25.4)+y0).toFixed(4) + "\n"		
					}
				g2+="M2,"+(((passB[i][0].X/scale/25.4)+Math.abs(xmin)/25.4)+x0).toFixed(4) + "," + ((((passB[i][0].Y/scale)+ymax)/25.4)+y0).toFixed(4) + "\n"
				g2+="JZ,0.1\n"
			}

			g2+="JZ,0.2\n"
			g2+="SO,1,0\n"
			

			link.setAttribute("href", "data:text/plain;base64," + btoa(g2))
			link.setAttribute("download", filename + "64.sbp")
			link.click()

		}

		else if(filetype=="rml01"){

			g2 += "PA;!VZ;!PZ0," + rmlOffset + ";\n"
	
			g2 += "PU" + x0 + "," + y0 + ";\n"
			g2 += "!RC15;\n"
			g2 += "!MC1;\n"

			g2 += "V3;"
			g2 += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
			g2 += "!DW3000;\n"
			g2 += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
			g2 += "!DW10;\n"


			for(i=0;i<passB.length;i++){
				g2+="PU"+(((passB[i][0].X/scale*100)+Math.abs(xmin)*100)+rmlXYOffset+x0).toFixed(0)+","+ ((((passB[i][0].Y/scale)+ymax)*100)+rmlXYOffset+y0).toFixed(0) + "\n"
					for(j=0;j<passB[i].length;j++){
						g2+="Z"+(((passB[i][j].X/scale*100)+Math.abs(xmin)*100)+rmlXYOffset+x0).toFixed(0) + "," + ((((passB[i][j].Y/scale)+ymax)*100)+rmlXYOffset+y0).toFixed(0) + ",-" + 20 + "\n"		
					}

			}

			g2+="PU;\n"
			g2+="!MC0;\n"
			g2+="V30;\n"	
			//g2+="Z15240,10160,3000;\n"

			link.setAttribute("href", "data:text/plain;base64," + btoa(g2))
			link.setAttribute("download", filename + "64.rml")
			link.click()

		}
		else if(filetype=="rml025"){

			g2 += "PA;!VZ;!PZ0," + rmlOffset + ";\n"
	
			g2 += "PU" + x0 + "," + y0 + ";\n"
			g2 += "!RC15;\n"
			g2 += "!MC1;\n"

			g2 += "V3;"
			g2 += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
			g2 += "!DW3000;\n"
			g2 += "Z" + x0 + "," + y0 + "," + rmlOffset + ";\n"
			g2 += "!DW10;\n"


			for(i=0;i<passB.length;i++){
				g2+="PU"+(((passB[i][0].X/scale*40)+Math.abs(xmin)*40)+rmlXYOffset+x0).toFixed(0)+","+ ((((passB[i][0].Y/scale)+ymax)*40)+rmlXYOffset+y0).toFixed(0) + "\n"
					for(j=0;j<passB[i].length;j++){
						g2+="Z"+(((passB[i][j].X/scale*40)+Math.abs(xmin)*40)+rmlXYOffset+x0).toFixed(0) + "," + ((((passB[i][j].Y/scale)+ymax)*40)+rmlXYOffset+y0).toFixed(0) + ",-" + 20 + "\n"		
					}

			}

			g+="PU;\n"
			g+="!MC0;\n"
			g+="V30;\n"	
			//g+="Z6096,4046,1200;\n"

			link.setAttribute("href", "data:text/plain;base64," + btoa(g2))
			link.setAttribute("download", filename + "64.rml")
			link.click()

		}

	}

	if(document.getElementById('side').value=="top"){
		flip()
	}
	else{
		flipCutout()
		ymax=tempMax
	}

}

function flip(){


	pins.reverse()

   for(i=0;i<vcut.length;i++){
		for(j=0;j<vcut[i].length;j++){
			if((vcut[i][j].Y)<0){
				vcut[i][j]={X:vcut[i][j].X,Y:(Math.abs(vcut[i][j].Y))}
			}
			else{
				vcut[i][j]={X:vcut[i][j].X,Y:(0-(vcut[i][j].Y))}	
			}
		}
	}

   for(i=0;i<vpins.length;i++){
		for(j=0;j<vpins[i].length;j++){
			if(vpins[i][j].Y<0){
				vpins[i][j].Y=Math.abs(vpins[i][j].Y)
			}
			else{
				vpins[i][j].Y=(0-vpins[i][j].Y)	
			}
		}
	}



	
   for(i=0;i<outlines.length;i++){
		for(j=0;j<outlines[i].length;j++){
			if((outlines[i][j].Y)<0){
				outlines[i][j]={X:outlines[i][j].X,Y:(Math.abs(outlines[i][j].Y))}
			}
			else{
				outlines[i][j]={X:outlines[i][j].X,Y:(0-(outlines[i][j].Y))}	
			}
		}
	}

   for(i=0;i<passB.length;i++){
		for(j=0;j<passB[i].length;j++){
			if((passB[i][j].Y)<0){
				passB[i][j]={X:passB[i][j].X,Y:(Math.abs(passB[i][j].Y))}
			}
			else{
				passB[i][j]={X:passB[i][j].X,Y:(0-(passB[i][j].Y))}	
			}
		}
	}

   for(i=0;i<pins.length;i++){
		for(j=0;j<pins[i].length;j++){
			if(pins[i][j].Y<0){
				pins[i][j].Y=Math.abs(pins[i][j].Y)
			}
			else{
				pins[i][j].Y=(0-pins[i][j].Y)	
			}
		}
	}

   for(i=0;i<vias.length;i++){
		for(j=0;j<vias[i].length;j++){
			if(vias[i][j].Y<0){
				vias[i][j].Y=Math.abs(vias[i][j].Y)
			}
			else{
				vias[i][j].Y=(0-vias[i][j].Y)	
			}
		}
	}

   for(i=0;i<hole.length;i++){
		for(j=0;j<hole[i].length;j++){
			if(hole[i][j].Y<0){
				hole[i][j].Y=Math.abs(hole[i][j].Y)
			}
			else{
				hole[i][j].Y=(0-hole[i][j].Y)	
			}
		}
	}


   for(i=0;i<net.length;i++){
		for(j=0;j<net[i].length;j++){
			if(net[i][j].Y<0){
				net[i][j].Y=Math.abs(net[i][j].Y)
			}
			else{
				net[i][j].Y=(0-net[i][j].Y)	
			}
		}
	}	

   for(i=0;i<path1.length;i++){	
		if(path1[i].Y<0){
			path1[i]={X:path1[i].X,Y:(Math.abs(path1[i].Y))}
		}
		else{
			path1[i]={X:path1[i].X,Y:(0-(path1[i].Y))}	
		}
	}

}



function flipCutout(){

	
   for(i=0;i<path1.length;i++){	
		if(path1[i].Y<0){
			path1[i]={X:path1[i].X,Y:(Math.abs(path1[i].Y))}
		}
		else{
			path1[i]={X:path1[i].X,Y:(0-(path1[i].Y))}	
		}
	}
	

}

