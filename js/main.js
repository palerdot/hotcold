//canvas related stuff

//canvas resizing

window.onload = window.onresize = function() {

    var C = 0.32;        // canvas width to viewport width ratio
    
    var ctx_a; var ctx_b;
    
    var el = document.getElementById("a");

    
    var viewportWidth = window.innerWidth;
    var viewportHeight = window.innerHeight;

    var canvasWidth = viewportWidth * C;
    var canvasHeight = viewportHeight * 0.175;
    //el.style.position = "absolute";
    el.setAttribute("width", canvasWidth);
    el.setAttribute("height", canvasHeight);
    
    Hotcold.canvas_a.width = canvasWidth;
    Hotcold.canvas_a.height = canvasHeight;
    
    //draw the canvas_a reference lines
    
    //initiate canvas a 
    
    ctx_a = document.getElementById('a').getContext('2d');
    
    	ctx_a.beginPath();
    	
    	for(var i = 1; i <= 10; i++){
    		
    		ctx_a.moveTo(0, (i*Hotcold.canvas_a.height)/10);
    		ctx_a.lineTo(Hotcold.canvas_a.width, (i*Hotcold.canvas_a.height)/10);
    		
    	}
    	
    	ctx_a.strokeStyle = Hotcold.canvas_normal_line;
	ctx_a.stroke();
    	
    	ctx_a.closePath();
    	
    	ctx_a.save();	
    	ctx_a.beginPath();
    	
    		ctx_a.moveTo(0, 0.1*Hotcold.canvas_a.height);
    		ctx_a.lineTo(Hotcold.canvas_a.width, 0.1*Hotcold.canvas_a.height);
    	
    	
    	ctx_a.lineWidth = 2;
    	ctx_a.strokeStyle = Hotcold.canvas_ref_line;
	ctx_a.stroke();
    	
    	ctx_a.closePath();
    	ctx_a.restore();
    	
    	//finish canvas a 
    	
    	//start initiating canvas b
    
    var el_b = document.getElementById("b");
    
    canvasHeight = viewportHeight * 0.15;
    
    el_b.setAttribute("width", canvasWidth);
    el_b.setAttribute("height", canvasHeight);
    
    Hotcold.canvas_b.width = canvasWidth;
    Hotcold.canvas_b.height = canvasHeight;
    
    Hotcold.canvas_b.old_gross_y = Hotcold.canvas_b.height;
    Hotcold.canvas_b.old_net_y = Hotcold.canvas_b.height;
    
    if(Hotcold.course_completed){
    		ctx_a.save();
		ctx_a.globalAlpha = 0.6;
    		ctx_a.beginPath();
		
			ctx_a.fillStyle = "#f7f7f7";
			ctx_a.fill();
		
			ctx_a.fillRect(Hotcold.canvas_a.old_x, 0, (Hotcold.canvas_a.width - Hotcold.canvas_a.old_x), Hotcold.canvas_a.height);

		ctx_a.closePath();
		ctx_a.restore();
    }
    
    ctx_b = document.getElementById('b').getContext('2d');
    
    	ctx_b.save();
    	ctx_b.beginPath();
    	
    		ctx_b.moveTo(0, 0.6*Hotcold.canvas_b.height);
    		ctx_b.lineTo(Hotcold.canvas_b.width, 0.6*Hotcold.canvas_b.height);
    	
    		
    	ctx_b.lineWidth = 2;
    	ctx_b.strokeStyle = "#bfbfbf";
	ctx_b.stroke();
    	
    	ctx_b.closePath();
    	ctx_b.restore();
    
      //finish canvas b
      
      //redraw the canvas
      redraw_canvas();
      
      //take care of the canvas if window is resized when timer is running; init variables for smooth graph line
      
     var length = Hotcold.canvas_b.arr_gross_y.length;
	Hotcold.canvas_b.old_gross_y = Hotcold.canvas_b.arr_gross_y[length - 1];
	
	length = Hotcold.canvas_b.arr_net_y.length;
	Hotcold.canvas_b.old_net_y = Hotcold.canvas_b.arr_net_y[length - 1];
	
	if(Hotcold.course_completed){
	
		ctx_b.save();
		ctx_b.globalAlpha = 0.6;
	
		ctx_b.beginPath();
		
			ctx_b.fillStyle = "#f7f7f7";
			ctx_b.fill();
		
			ctx_b.fillRect(Hotcold.canvas_b.old_x, 0, (Hotcold.canvas_b.width - Hotcold.canvas_b.old_x), Hotcold.canvas_b.height);
	
		ctx_b.closePath();
		ctx_b.restore();
	
	}
	
	//load the finger canvas
	
	var finger_canvas; var ctx_f; var f_div; 
	
	
	finger_canvas = document.getElementById("f");
	
	
	
	ctx_f = finger_canvas.getContext("2d");
	

	    viewportWidth = window.innerWidth;
	    viewportHeight = window.innerHeight;

	    canvasWidth = viewportWidth * 0.18;
	    canvasHeight = viewportHeight * 0.11;
	    
	    $('#finger_canvas').width(canvasWidth);
	    $('#finger_canvas').height(canvasHeight);
	    
	    $('#fin_spans').width(canvasWidth);
	    $('#fin_spans').height(canvasHeight);
	    
	    finger_canvas.setAttribute("width", canvasWidth);
	    finger_canvas.setAttribute("height", canvasHeight);
	    
	    
	    
	    
	    
	    var fin_image = new Image();
	    
	    fin_image.src = "images/viral-copy.gif";
	    
	    fin_image.onload = function(){
	    
	    		ctx_f.drawImage(fin_image, 0, 0, canvasWidth, canvasHeight);

      	};
      	
      	
      	
    
};



function animate(){
	
		var ctx; var ctx_g; var ctx_n;
	
		
		var can_height = Hotcold.canvas_a.height;
		
		var y_val = parseInt(Hotcold.accuracy, 10);
		
		ctx = document.getElementById('a').getContext('2d');
		
		//point_x = parseInt(scale_x, 10);
		Hotcold.canvas_a.y = parseInt(can_height - (can_height * (y_val / 100)), 10);
		

		
		//try to push them to an array to be redrawn later
		
		Hotcold.canvas_a.arr_x.push(Hotcold.canvas_a.x);
		Hotcold.canvas_a.arr_y.push(Hotcold.canvas_a.y);
		
		ctx.save();
		ctx.beginPath();
		
			ctx.lineWidth = 3;
			
			ctx.moveTo(Hotcold.canvas_a.old_x, Hotcold.canvas_a.old_y);
			ctx.lineTo(Hotcold.canvas_a.x, Hotcold.canvas_a.y);
			
			
			ctx.strokeStyle = "#0066FF";
			ctx.stroke();
			
		ctx.closePath();
		ctx.restore();
			
			Hotcold.canvas_a.old_x = Hotcold.canvas_a.x; 
			Hotcold.canvas_a.old_y = Hotcold.canvas_a.y;
			
		ctx_g = document.getElementById('b').getContext('2d');
		
		var gross_y = parseInt(Hotcold.gross_speed, 10);
		
		Hotcold.canvas_b.y = parseInt(Hotcold.canvas_b.height - (Hotcold.canvas_b.height * (gross_y / 100)), 10);
		
		Hotcold.canvas_b.arr_gross_x.push(Hotcold.canvas_b.x);
		Hotcold.canvas_b.arr_gross_y.push(Hotcold.canvas_b.y);
		
		ctx_g.beginPath();
		
			ctx_g.lineWidth = 3;
		
			ctx_g.moveTo(Hotcold.canvas_b.old_x, Hotcold.canvas_b.old_gross_y);
			ctx_g.lineTo(Hotcold.canvas_b.x, Hotcold.canvas_b.y);
			
			ctx_g.strokeStyle = "orange";
		
		ctx_g.closePath();
		
		ctx_g.stroke();
		
		
		Hotcold.canvas_b.old_gross_y = Hotcold.canvas_b.y;
		
		ctx_n = document.getElementById('b').getContext('2d');
		
		var net_y = parseInt(Hotcold.net_speed, 10);
		
		Hotcold.canvas_b.y = parseInt(Hotcold.canvas_b.height - (Hotcold.canvas_b.height * (net_y / 100)), 10);
		
		Hotcold.canvas_b.arr_net_x.push(Hotcold.canvas_b.x);
		Hotcold.canvas_b.arr_net_y.push(Hotcold.canvas_b.y);
		
		ctx_n.beginPath();
		
			ctx_n.lineWidth = 3;
		
			ctx_n.moveTo(Hotcold.canvas_b.old_x, Hotcold.canvas_b.old_net_y);
			ctx_n.lineTo(Hotcold.canvas_b.x, Hotcold.canvas_b.y);
			
			
			ctx_n.strokeStyle = "#00FF00";
			ctx_n.stroke();
		
		ctx_n.closePath();
		
		Hotcold.canvas_b.old_x = Hotcold.canvas_b.x; 
		Hotcold.canvas_b.old_net_y = Hotcold.canvas_b.y;
		
		//move the x axis
		
		Hotcold.canvas_a.x += 5; Hotcold.canvas_b.x += 5;
	
	}
	
	
	//redraw method
	
	function redraw_canvas(){
	
		var ctx; var ctx_g; var ctx_n;
		
		ctx = document.getElementById('a').getContext('2d');
		
		ctx.save();
		ctx.beginPath();
		
		ctx.lineWidth = 3;
		
		for(var i = 0; i < Hotcold.canvas_a.arr_x.length; i++){
		
			ctx.moveTo(Hotcold.canvas_a.arr_x[i], Hotcold.canvas_a.arr_y[i]);
			ctx.lineTo(Hotcold.canvas_a.arr_x[i+1], Hotcold.canvas_a.arr_y[i+1]);
		
		}
		
			ctx.strokeStyle = "#0000FF";
			ctx.stroke();
			
			ctx.closePath();	
			ctx.restore();
			
		//redraw gross speed
		
		
		ctx_g = document.getElementById('b').getContext('2d');
		ctx_g.save();
		ctx_g.beginPath();
		
		ctx_g.lineWidth = 3;
		
		for(var i = 0; i < Hotcold.canvas_b.arr_gross_x.length; i++){
		
			ctx_g.moveTo(Hotcold.canvas_b.arr_gross_x[i], Hotcold.canvas_b.arr_gross_y[i]);
			ctx_g.lineTo(Hotcold.canvas_b.arr_gross_x[i+1], Hotcold.canvas_b.arr_gross_y[i+1]);
		
		}
		
			ctx_g.strokeStyle = "#FFA826";
			ctx_g.stroke();
			
			ctx_g.closePath();
			ctx_g.restore();
		//redraw net speed
		
		
		ctx_n = document.getElementById('b').getContext('2d');
			ctx_n.save();
			ctx_n.beginPath();
			
			ctx_n.lineWidth = 3;
		
			for(var i = 0; i < Hotcold.canvas_b.arr_net_x.length; i++){
		
				ctx_n.moveTo(Hotcold.canvas_b.arr_net_x[i], Hotcold.canvas_b.arr_net_y[i]);
				ctx_n.lineTo(Hotcold.canvas_b.arr_net_x[i+1], Hotcold.canvas_b.arr_net_y[i+1]);
		
			}
		
			ctx_n.strokeStyle = "#26FF26";
			ctx_n.stroke();
			
			ctx_n.closePath();
			ctx_n.restore();
			
	
	}//end of redraw canvas
	






