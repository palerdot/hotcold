//start of Hotcold object

var Hotcold = {

	key_interval : 0,
	hits : 0,
	correct : 0,
	seconds_elapsed : 0,
	course_started : false,
	course_init : false,
	course_first_time : true,
	course_completed : false,
	timer_id : 0,
	key_gap_timer_id : 0,
	word_speed : 0,
	gross_speed : 0,
	net_speed : 0,
	accuracy : 100,
	prev_pattern : 0,
	prev_key : 0,
	right_shift : false,
	left_shift : false,
	curr_course : 0,
	canvas_normal_line : '#f2f2f2',
	canvas_ref_line : '#bfbfbf',
	canvas_a : {
		x : 0,
		y : 0,
		old_x : 0,
		old_y : 0,
		timer : 0,
		width : 0,
		height : 0,
		arr_x : [],
		arr_y : []			
	},
	canvas_b : {
		x : 0,
		y : 0,
		old_x : 0,
		old_gross_y : 0,
		old_net_y : 0,
		timer : 0,
		width : 0,
		height : 0,
		arr_gross_x : [],
		arr_gross_y : [],
		arr_net_x : [],
		arr_net_y : []
	},
	canvas_c : {
		width : 0,
		height : 0
	},
	reset : function(){
				this.key_interval = 0; this.hits = 0; this.correct = 0; this.seconds_elapsed = 0;
				this.course_started = false; this.course_init = false; this.course_first_time = true; this.course_completed = false;
				this.timer_id = 0; this.key_gap_timer_id = 0; this.word_speed = 0; this.gross_speed = 0; this.net_speed = 0;
				this.accuracy = 100; this.prev_pattern = 0; this.prev_key = 0; this.right_shift = false; this.left_shift = false;
				this.canvas_a.x = 0; this.canvas_a.y = 0; this.canvas_a.old_x = 0; this.canvas_a.old_y = 0;
				this.canvas_a.timer = 0; this.canvas_a.arr_x = []; this.canvas_a.arr_y = [];
				this.canvas_b.x = 0; this.canvas_b.y = this.canvas_b.height; 
				this.canvas_b.old_x = 0; this.canvas_b.old_gross_y = this.canvas_b.height; this.canvas_b.old_net_y = this.canvas_b.height;
				this.canvas_b.timer = 0; this.canvas_b.arr_gross_x = []; this.canvas_b.arr_gross_y = [];
				this.canvas_b.arr_net_x = []; this.canvas_b.arr_net_y = [];
			}
};


//end of Hotcold object




$(document).ready(function(){

	//disable cache
	
	$.ajaxSetup({ cache: false });
	
	

	var c_home = $('#back_to_course_button');
	var lv = $('#lesson_view');
	var c_win = $('#course_window');
	var c_tab = $('#course_tab');
	var c_course = $('#create_course_tab');
	var d_theme = $('#day_theme');
	var n_theme = $('#night_theme');
	var keys = $('.keys');
	var f_canvas = $('#finger_canvas');
	var backlit = $('.backlit');
	var s_block = $('#saved_block');
	var course_time = $('#course_time');
	var cli = $('#custom_lesson_input');
	var canvas_a = $('#a'); var canvas_b = $('#b');
	var dtp = $('#day_theme_preview');
	var ntp = $('#night_theme_preview');
	
	var lc_temp = $('#launch_course_temp');
	var jl = $('#junk_launch');
	var lc1 = $('#launch_course_1'); var lc2 = $('#launch_course_2');
	var lc3 = $('#launch_course_3'); var lc4 = $('#launch_course_4');
	var lc5 = $('#launch_course_5'); var lc6 = $('#launch_course_6');
	var lc7 = $('#launch_course_7'); var lc8 = $('#launch_course_8');
	var lc9 = $('#launch_course_9'); var lc10 = $('#launch_course_10');
	var lc11 = $('#launch_course_11'); var lc12 = $('#launch_course_12');
	var lc13 = $('#launch_course_13'); var lc14 = $('#launch_course_14');
	var lc15 = $('#launch_course_15'); var lc16 = $('#launch_course_16');
	var lc17 = $('#launch_course_17'); var lc18 = $('#launch_course_18');
	
	var lp = $('#launch_poem');
	var lq1 = $('#launch_quote_1'); var lq2 = $('#launch_quote_2'); var lq3 = $('#launch_quote_3');
	
	
	
	dtp.click(function(){
		$('#myModal').modal();
		return false;
	});
	
	ntp.click(function(){
		$('#nModal').modal();
		return false;
	});
	
	
	d_theme.click(function(){
		//console.log('day theme selected');
		$('body').css({'background-color' : 'rgba(255, 255, 255, 1)'});
		c_win.css({'background-color' : 'rgba(255, 255, 255, 1)'});
		s_block.css({'background-color' : '#f7f7f7'});
		cli.css({'background-color' : 'rgba(255, 255, 255, 1)', 'color' : '#000000'});
		
		course_time.css('color', '#000000');
		lv.css('color', '#000000');
		
			Hotcold.canvas_normal_line = '#f2f2f2';
			canvas_a.css('border-color', '#f2f2f2'); canvas_b.css('border-color', '#f2f2f2');
			
			var ctx_a = document.getElementById('a').getContext('2d');
			ctx_a.clearRect(0, 0, Hotcold.canvas_a.width, Hotcold.canvas_a.height);
		
			ctx_a.beginPath();
			
			ctx_a.lineWidth = 1;
    	
		    	for(var i = 1; i <= 10; i++){
		    		
		    		ctx_a.moveTo(0, (i*Hotcold.canvas_a.height)/10);
		    		ctx_a.lineTo(Hotcold.canvas_a.width, (i*Hotcold.canvas_a.height)/10);
		    		
		    	}
		    	
		    	ctx_a.save();
		    	ctx_a.strokeStyle = Hotcold.canvas_normal_line;
			ctx_a.stroke();
			ctx_a.restore();
		    	
		    	ctx_a.closePath();
		    	
		    	ctx_a.beginPath();
    	
	    		ctx_a.moveTo(0, 0.1*Hotcold.canvas_a.height);
	    		ctx_a.lineTo(Hotcold.canvas_a.width, 0.1*Hotcold.canvas_a.height);
	    	
		    	ctx_a.save();	
		    	ctx_a.lineWidth = 2;
		    	ctx_a.strokeStyle = Hotcold.canvas_ref_line;
			ctx_a.stroke();
			ctx_a.restore();
		    	
		    	ctx_a.closePath();
		
		
	});
	
	n_theme.click(function(){
		//console.log('night theme selected');
		$('body').css({'background-color' : 'rgba(0, 0, 0, 1)'});
		Hotcold.canvas_normal_line = '#333333';
		canvas_a.css('border-color', '#333333'); canvas_b.css('border-color', '#333333');
		c_win.css({'background-color' : 'rgba(0, 0, 0, 1)'});
		cli.css({'background-color' : 'rgba(0, 0, 0, 1)', 'color' : '#ffffff'});
		
		course_time.css('color', '#ffffff');
		lv.css('color', '#ffffff');
		s_block.css({'background-color' : '#999999'});
		
		
			var ctx_a = document.getElementById('a').getContext('2d');
			ctx_a.clearRect(0, 0, Hotcold.canvas_a.width, Hotcold.canvas_a.height);
		
			ctx_a.beginPath();
			
			ctx_a.lineWidth = 1;
    	
		    	for(var i = 1; i <= 10; i++){
		    		
		    		ctx_a.moveTo(0, (i*Hotcold.canvas_a.height)/10);
		    		ctx_a.lineTo(Hotcold.canvas_a.width, (i*Hotcold.canvas_a.height)/10);
		    		
		    	}
		    	
		    	ctx_a.save();
		    	ctx_a.strokeStyle = Hotcold.canvas_normal_line;
			ctx_a.stroke();
			ctx_a.restore();
		    	
		    	ctx_a.closePath();
		    	
		    	ctx_a.beginPath();
    	
	    		ctx_a.moveTo(0, 0.1*Hotcold.canvas_a.height);
	    		ctx_a.lineTo(Hotcold.canvas_a.width, 0.1*Hotcold.canvas_a.height);
	    	
		    	ctx_a.save();	
		    	ctx_a.lineWidth = 2;
		    	ctx_a.strokeStyle = Hotcold.canvas_ref_line;
			ctx_a.stroke();
			ctx_a.restore();
		    	
		    	ctx_a.closePath();
		
	});
	
	n_theme.click();
	
	//clean the window before leaving the course window
	c_home.click(function(){
		Hotcold.reset();
		c_win.hide();
		Hotcold.curr_course.clean_window();
		c_tab.show();
		
	});
	
	//course preparation
	
	jl.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init('junk');
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc1.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(1);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc2.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(2);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc3.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(3);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc4.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(4);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc5.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(5);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc6.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(6);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc7.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(7);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc8.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(8);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc9.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(9);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc10.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(10);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc11.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(11);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc12.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(12);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc13.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(13);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc14.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(14);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc15.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(15);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc16.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(16);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc17.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(17);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lc18.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(18);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lp.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(19);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lq1.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(20);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lq2.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(21);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	lq3.click(function(){
		Hotcold.curr_course = new Course();
		Hotcold.curr_course.init(22);
		c_tab.hide();
		c_win.fadeIn();
	});
	
	
	//course preparation ends
	
	var pause_button = $('#pause_button');
	
	pause_button.click(function(){
	
		pauseTimer();
	
	});
	
	var redo_course = $('#redo_button');
	
	redo_course.click(function(){
		Hotcold.curr_course.redo();
	});
	
	var abort = $('#abort_button');
	
	abort.click(function(){
		Hotcold.curr_course.end_course();
		Hotcold.curr_course.clean_window();
		c_win.hide();
		c_tab.show();
	});
	
	var custom_lesson = $('#custom_lesson_input');
	var char_length = $('#total_characters');
	var no_input = $('#no_input_error');
	
	custom_lesson.keyup(function(){
		if($(this).val().length > 0){
			no_input.hide();
		}
		char_length.html($(this).val().length);
	});
	
	var prepare_lesson = $('#custom_lesson_launch');
	
	prepare_lesson.click(function(){
		
		if(custom_lesson.val().length == 0){
			no_input.show();
		}else{
			//there is an input; prepare custom lesson
			Hotcold.curr_course = new Course();
			Hotcold.curr_course.init(0);
			//$('#custom_lesson_form').hide();
			c_tab.hide();
			c_win.fadeIn();
		}
		
	});
	
	//toggle all key pages
	
	var sp1 = $('#show_all_key_page_1'); 
	var sp2 = $('#show_all_key_page_2');
	var akp1 = $('#all_key_page_1'); 
	var akp2 = $('#all_key_page_2');
	
	sp1.click(function(e){
		e.preventDefault();
		akp2.fadeOut('fast');
		akp1.delay(250).fadeIn();
	});
	
	sp2.click(function(e){
		e.preventDefault();
		akp1.fadeOut('fast');
		akp2.delay(250).fadeIn();
	});
	

});



		//code to get the course from the json file

							


function Course(){
	
	// the main data structure to hold the all the lines of the course
	var lesson = [];
	
	// specifies the current index of the current line
	var curr_index = 0; 
	
	//specifies the current line that is being processed
	var curr_line = 0; 
	
	//denotes the length of the current line
	var curr_line_length = 0;
	
	//total lines in the course
	var course_length = 0;
	
	//contains the span wrapped screen texts
	var screen_text = '';
	
	//time for the course
	var minutes = 0;
	
	this.get_time = function(){ return minutes; };
	
	//get a handle for lesson window; it will be used multiple times
	
	var lesson_window = $('#lesson_view');
	
	var completed = $('#completed_button'); var redo = $('#redo_button'); var space_to_start = $('#space_to_start');
	var bc = $('#back_to_course_button'); 

	// Our Helper
	
	var helper;
	
	var keys = [];
	
		for(var i = 32; i < 127; i++){
		
			var temp = '#key_'+i;
			keys[i] = $(temp);
			
				if(i >= 65 && i <=90){
				
				//we have caps letters; assign them appropriate divs of small letters in the virtual keyboard;
			
				var code = String.fromCharCode(i).toLowerCase().charCodeAt(0);
				temp = '#key_'+code;
				keys[i] = $(temp);			
					
				}
		
				if(i >=48 && i<= 57){
			
					//we have numbers (top row) assign them the appropriate divs	
					var code = get_numeric_div(i);
					temp = '#key_'+code;
					keys[i] = $(temp);
				}
		
				if(i == 91 || i == 93 || i == 59 || i == 39 || i == 92 || i == 44 || i == 46 || i == 47 || i == 95 || i == 43){
					var code = get_numeric_div(i);
					temp = '#key_'+code;
					keys[i] = $(temp);
				}
			
			
		}
		
	
	
		
		
		
	//initialize the course; get the contents from the json file and prepare the local variables;	
	
	this.init = function(course_no){
	
		switch(course_no){
		
			case 0:
			lesson = convertJson();
			//console.log(lesson);
			minutes = $("input:radio[name=custom_time]:checked").val();
			prepare();
			break;

			case 1:

				$.getJSON('lessons/lesson1.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 1;
						

			break;
			
			case 2:

				$.getJSON('lessons/lesson2.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 3:

				$.getJSON('lessons/lesson3.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 4:

				$.getJSON('lessons/lesson4.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 5:

				$.getJSON('lessons/lesson5.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 6:

				$.getJSON('lessons/lesson6.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 7:

				$.getJSON('lessons/lesson7.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 8:

				$.getJSON('lessons/lesson8.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 9:

				$.getJSON('lessons/lesson9.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 10:

				$.getJSON('lessons/lesson10.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 11:

				$.getJSON('lessons/lesson11.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 12:

				$.getJSON('lessons/lesson12.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 13:

				$.getJSON('lessons/lesson13.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 14:

				$.getJSON('lessons/lesson14.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 15:

				$.getJSON('lessons/lesson15.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 16:

				$.getJSON('lessons/lesson16.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 17:

				$.getJSON('lessons/lesson17.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 18:

				$.getJSON('lessons/lesson18.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 3;
						

			break;
			
			case 19:

				$.getJSON('lessons/poem.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 5;
						

			break;
			
			case 20:

				$.getJSON('lessons/quotes1.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 5;
						

			break;
			
			case 21:

				$.getJSON('lessons/quotes2.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 5;
						

			break;
			
			case 22:

				$.getJSON('lessons/quotes3.json', function(data){
					
								$.each(data, function(key, val){
									 					
			 						lesson[key] = {};
			 						lesson[key].code = val.code;
			 						lesson[key].text = val.text;
			 						lesson[key].pattern = val.pattern;
						
									});
								
							}).done(function(){ prepare(); }).fail(function(data){ /*console.log("error");*/  });
						
							minutes = 5;
						

			break;
					
		} //end of switch case
											

		}; //end of init

		//**** END of init ****
		
	//prepares the course on successful getjson	
	function prepare(){
	
		clean_canvas();
		//initiate the worker 
		
		helper = new Worker('js/helper.js');
		
			helper.addEventListener('message', function(event) {
		 	
		 	 var result = JSON.parse(event.data);
		 	 
		 	 $(result.highlight.div_id).removeClass();
		 	 $(result.highlight.div_id).addClass('keys')
		 	 $(result.highlight.div_id).addClass(result.highlight.div_class); 
		 	  
		 	 keys[result.highlight.code].removeClass();
		 	 keys[result.highlight.code].addClass('keys');
		 	 keys[result.highlight.code].addClass(result.highlight.div_class); 
		 	 
		 	 if(result.highlight.format == 2){
			 	 //$(result.highlight.div_id).children('.bottom').addClass('u_line');
			 	 keys[result.highlight.code].children('.bottom').addClass('u_line');
		 	 }else{
		 	 	keys[result.highlight.code].children('.bottom').removeClass('u_line');
		 	 }
		 	 
		 	 $('#c').html(result.update);
		 	 
		 	 
		 		
			}, false);
			
			helper.addEventListener('error', function(e){
			//console.log('Worker error info: message '+e.message);
			}, false);
	
		course_length = lesson.length;
		curr_line_length = lesson[curr_line].code.length;
		
			for(var i = 32; i < 127; i++){
						keys[i].removeClass().addClass('keys');
					}
					

							lesson_window.html('');
							var live_update = $('#c');
							live_update.html('');
							var c_label = $('#c_label');
							c_label.hide();
							
							var min_div = $('#min');
							var sec_div = $('#sec');
							
							min_div.html(minutes); sec_div.html('00');
							
							var ci = $('#completion_indicator');
							ci.hide();
							
							var completed_div = $('#completed');
							completed_div.html('');
							
							var gross_speed = $('#type_speed'); gross_speed.html(''); 
							var net_speed = $('#net_type_speed'); net_speed.html('');
							var accuracy = $('#accuracy'); accuracy.html('');
							
							$.each(lesson[curr_line].text, function(key, val){
								var span_text = '<span>'+val+'</span>';
								screen_text += span_text;
							});
							
							highlight(lesson[curr_line].pattern[curr_index]);
							
							highlight_key(lesson[curr_line].code[curr_index]);
							
							lesson_window.html(screen_text);
							
							var temp = curr_index+1;
							
							$("#lesson_view span:nth-child("+temp+")").addClass("key_before");
							
						

				Hotcold.course_init = true;
				
				keys[32].addClass('space_start');
				
				var abort = $('#abort_button'); abort.show();
				var space_to_resume = $('#space_to_resume'); space_to_resume.hide();
	
	}//end of prepare
	
	//redo function
	this.redo = function(){
	
		//reset the hotcold object variables
		
		Hotcold.reset();
	
		//reset the variables
		curr_index = 0; curr_line = 0; curr_line_length = 0; course_length = 0; screen_text = '';
		
		//var completed = $('#completed_button'); var redo = $('#redo_button'); var space_to_start = $('#space_to_start');
		//var bc = $('#back_to_course_button');
		completed.hide(); redo.hide(); space_to_start.show(); bc.hide();
		
		prepare();
		
	
	};
	
	function clean_canvas(){
	
		//reset the canvas
		var ctx_a = document.getElementById('a').getContext('2d');
		ctx_a.clearRect(0, 0, Hotcold.canvas_a.width, Hotcold.canvas_a.height);
		
		//draw the reference line
		
			ctx_a.beginPath();
			
			ctx_a.lineWidth = 1;
    	
		    	for(var i = 1; i <= 10; i++){
		    		
		    		ctx_a.moveTo(0, (i*Hotcold.canvas_a.height)/10);
		    		ctx_a.lineTo(Hotcold.canvas_a.width, (i*Hotcold.canvas_a.height)/10);
		    		
		    	}
		    	
		    	ctx_a.strokeStyle = Hotcold.canvas_normal_line;
			ctx_a.stroke();
		    	
		    	ctx_a.closePath();
		    	
		    	ctx_a.beginPath();
    	
	    		ctx_a.moveTo(0, 0.1*Hotcold.canvas_a.height);
	    		ctx_a.lineTo(Hotcold.canvas_a.width, 0.1*Hotcold.canvas_a.height);
	    	
		    	ctx_a.save();	
		    	ctx_a.lineWidth = 2;
		    	ctx_a.strokeStyle = Hotcold.canvas_ref_line;
			ctx_a.stroke();
			ctx_a.restore();
		    	
		    	ctx_a.closePath();
		    	
		
		var ctx_b = document.getElementById('b').getContext('2d');
		ctx_b.clearRect(0, 0, Hotcold.canvas_b.width, Hotcold.canvas_b.height);
		
		//draw the reference line
		
			ctx_b.beginPath();
	    	
	    		ctx_b.moveTo(0, 0.6*Hotcold.canvas_b.height);
	    		ctx_b.lineTo(Hotcold.canvas_b.width, 0.6*Hotcold.canvas_b.height);
	    		
		    	ctx_b.strokeStyle = "#bfbfbf";
			ctx_b.stroke();
		    	
		    	ctx_b.closePath();
		    	
	
	}
	
	this.clean_window = function(){
	
		lesson_window.html('');
		
		//reset the hotcold object variables
		
		Hotcold.reset();
	
		//reset the variables
		curr_index = 0; curr_line = 0; curr_line_length = 0; course_length = 0; screen_text = '';
		
		//reset the canvas
		var ctx_a = document.getElementById('a').getContext('2d');
		ctx_a.clearRect(0, 0, Hotcold.canvas_a.width, Hotcold.canvas_a.height);
		
		//draw the reference line
		
			ctx_a.beginPath();
			
			ctx_a.lineWidth = 1;
    	
		    	for(var i = 1; i <= 10; i++){
		    		
		    		ctx_a.moveTo(0, (i*Hotcold.canvas_a.height)/10);
		    		ctx_a.lineTo(Hotcold.canvas_a.width, (i*Hotcold.canvas_a.height)/10);
		    		
		    	}
		    	
		    	ctx_a.strokeStyle = "#f2f2f2";
			ctx_a.stroke();
		    	
		    	ctx_a.closePath();
		    	
		    	ctx_a.beginPath();
    	
	    		ctx_a.moveTo(0, 0.1*Hotcold.canvas_a.height);
	    		ctx_a.lineTo(Hotcold.canvas_a.width, 0.1*Hotcold.canvas_a.height);
	    	
		    	ctx_a.save();	
		    	ctx_a.strokeStyle = "#bfbfbf";
			ctx_a.stroke();
			ctx_a.restore();
		    	
		    	ctx_a.closePath();
		    	
		
		var ctx_b = document.getElementById('b').getContext('2d');
		ctx_b.clearRect(0, 0, Hotcold.canvas_b.width, Hotcold.canvas_b.height);
		
		//draw the reference line
		
			ctx_b.beginPath();
	    	
	    		ctx_b.moveTo(0, 0.6*Hotcold.canvas_b.height);
	    		ctx_b.lineTo(Hotcold.canvas_b.width, 0.6*Hotcold.canvas_b.height);
	    		
		    	ctx_b.strokeStyle = "#bfbfbf";
			ctx_b.stroke();
		    	
		    	ctx_b.closePath();
		    	
		//var completed = $('#completed_button'); var redo = $('#redo_button'); var space_to_start = $('#space_to_start');
		//var bc = $('#back_to_course_button');
		completed.hide(); redo.hide(); space_to_start.show(); bc.hide();
	
	};
	

	this.manage_screen = function (key_typed){
	
		if(key_typed == lesson[curr_line].code[curr_index]){
			
			//now send a message to our helper (worker) so that it can start working :)
			
			helper.postMessage({"status" : "right", "code" : lesson[curr_line].code[curr_index], "close" : false});
			
			
			$("#lesson_view span:nth-child("+curr_index+")").removeClass("key_before");
			var temp = curr_index+1;
			$("#lesson_view span:nth-child("+temp+")").addClass("key_ok");
			
			Hotcold.correct++;
			
			
		}
		else{
		
			//now send a message to our helper (worker) so that it can start working :)
			
			helper.postMessage({"status" : "wrong", "code" : lesson[curr_line].code[curr_index], "close" : false});
		
			$("#lesson_view span:nth-child("+curr_index+")").removeClass("key_before");
			var temp = curr_index+1;
			$("#lesson_view span:nth-child("+temp+")").addClass("key_not_ok");
			
		}
		
		//console.log('index' +curr_index);
		
		curr_index += 1;
		
			
		
		
		if(curr_index == curr_line_length){
			
			//console.log('current line over');
			curr_line++;
			
			//update completion status
			
			if(curr_line == course_length){
				//console.log('course also over');
				//end_course();
				this.end_course();
			}
			else{
				curr_index = 0;
				curr_line_length = lesson[curr_line].code.length;
				//change the screen
					screen_text = '';
					$.each(lesson[curr_line].text, function(key, val){
								var span_text = '<span>'+val+'</span>';
								screen_text += span_text;
							});
							
							lesson_window.html(screen_text);
							
				
			}
		}
		
		
		//$("#lesson_view span:nth-child("+curr_index+")").removeClass("key_before");
		var temp = curr_index+1;
		$("#lesson_view span:nth-child("+temp+")").addClass("key_before");
		
		if(Hotcold.course_init){
			//perform finger pattern
			highlight(lesson[curr_line].pattern[curr_index]);
			//perform key highlight
			highlight_key(lesson[curr_line].code[curr_index]);
		}
		
		var completed_div = $('#completed');
		var completed_percent = parseInt((curr_line/course_length)*100, 10);
		var completed_text = completed_percent + '%';
		completed_div.html(completed_text);
		
		
	};
	
	this.end_course = function(){
	
		endTimer();
		
		Hotcold.course_init = false;
		Hotcold.course_started = false;
		Hotcold.course_completed = true;
		
		var finger = $('.finger');
		finger.hide();
		
		var r_shift = $('#shift_right');
		var l_shift = $('#shift_left');
		
		if(Hotcold.right_shift){
			r_shift.removeClass('backlit');
			Hotcold.right_shift = false;
		}
		
		if(Hotcold.left_shift){
			l_shift.removeClass('backlit');
			Hotcold.left_shift = false;
		}
		
		if(Hotcold.prev_key != 0)
		keys[Hotcold.prev_key].removeClass('backlit');
		
		Hotcold.prev_key = 0;
		
		//close the worker;
		
		helper.postMessage({"close" : true});
		
		//helper.terminate();
		
		canvas_complete();
		
		//console.log("Timer and course finished");
	};
	
	var highlight = function(code){
		
		var finger_1 = $('#fin_1');var finger_2 = $('#fin_2');var finger_3 = $('#fin_3');var finger_4 = $('#fin_4');var finger_5 = $('#fin_5');
		var finger_6 = $('#fin_6');var finger_7 = $('#fin_7');var finger_8 = $('#fin_8');var finger_9 = $('#fin_9');var finger_10 = $('#fin_10');
		
		var finger = $('.finger');
		
		switch(code){
		
			case 1:
			finger.hide();
			finger_1.show();
			break;
			
			case 2:
			finger.hide();
			finger_2.show();
			break;
			
			case 3:
			finger.hide();
			finger_3.show();
			break;
			
			case 4:
			finger.hide();
			finger_4.show();
			break;
			
			case 5:
			finger.hide();
			finger_5.show();
			break;
			
			case 6:
			finger.hide();
			finger_6.show();
			break;
			
			case 7:
			finger.hide();
			finger_7.show();
			break;
			
			case 8:
			finger.hide();
			finger_8.show();
			break;
			
			case 9:
			finger.hide();
			finger_9.show();
			break;
			
			case 10:
			finger.hide();
			finger_10.show();
			break;
			
			case 11:
			finger.hide();
			finger_1.show();
			finger_10.show();
			break;
			
			case 12:
			finger.hide();
			finger_2.show();
			finger_10.show();
			break;
			
			case 13:
			finger.hide();
			finger_3.show();
			finger_10.show();
			break;
			
			case 14:
			finger.hide();
			finger_4.show();
			finger_10.show();
			break;
			
			case 15:
			finger.hide();
			finger_7.show();
			finger_1.show();
			break;
			
			case 16:
			finger.hide();
			finger_1.show();
			finger_8.show();
			break;
			
			case 17:
			finger.hide();
			finger_1.show();
			finger_9.show();
			break;
			
			case 18:
			finger.hide();
			finger_1.show();
			finger_10.show();
			break;
		
		}
		
				
				
			
		
	};//end of highlight module
	
	
	
	//get numeric div module
	//module to get the right div ids for numbers and special characters;
	
	function get_numeric_div(code){
	
		switch(code){
	
			case 49:
			return 33;
	
			case 50:
			return 64;
	
			case 51:
			return 35;
	
			case 52:
			return 36;
	
			case 53:
			return 37;
	
			case 54:
			return 94;
	
			case 55:
			return 38;
			
			case 56:
			return 42;
	
			case 57:
			return 40;
	
			case 48:
			return 41;
	
			case 91:
			return 123;
	
			case 93:
			return 125;
	
			case 59:
			return 58;
	
			case 39:
			return 34;
	
			case 92:
			return 124;
	
			case 44:
			return 60;
	
			case 46:
			return 62;
	
			case 47:
			return 63;
			
			case 95:
			return 45;
			
			case 43:
			return 61;
	
			}

	
	
	}
	
	//highlight key module
	
	function highlight_key(code){
	
		var r_shift = $('#shift_right');
		var l_shift = $('#shift_left');
		
		if(Hotcold.right_shift){
			r_shift.removeClass('backlit');
			Hotcold.right_shift = false;
		}
		
		if(Hotcold.left_shift){
			l_shift.removeClass('backlit');
			Hotcold.left_shift = false;
		}
		
		if(Hotcold.prev_key != 0)
		keys[Hotcold.prev_key].removeClass('backlit');
	
		if((code >= 65 && code <= 71) || (code >= 81 && code <= 84) || (code >= 86 && code <= 88) || code == 90){
			Hotcold.right_shift = true;
			r_shift.addClass('backlit');
		}
		
		if((code >= 72 && code <= 80) || code == 85 || code == 89){
			Hotcold.left_shift = true;
			l_shift.addClass('backlit');
		}
		
		//add for special characters
		
		keys[code].addClass('backlit');
		
		Hotcold.prev_key = code;
	
	}//end of highlight key
	
	
	function canvas_complete(){

		var ctx_a; var ctx_b;
	
		ctx_a = document.getElementById('a').getContext('2d');
		ctx_b = document.getElementById('b').getContext('2d');
		
		ctx_a.save();
		ctx_a.globalAlpha = 0.6;
	
		ctx_a.beginPath();
		
			ctx_a.fillStyle = "#f7f7f7";
			ctx_a.fill();
		
			ctx_a.fillRect(Hotcold.canvas_a.old_x, 0, (Hotcold.canvas_a.width - Hotcold.canvas_a.old_x), Hotcold.canvas_a.height);

		ctx_a.closePath();
		
		ctx_a.restore();
				
		ctx_b.save();
		ctx_b.globalAlpha = 0.6;
		
		ctx_b.beginPath();
		
			ctx_b.fillStyle = "#f7f7f7";
			ctx_b.fill();
		
			ctx_b.fillRect(Hotcold.canvas_b.old_x, 0, (Hotcold.canvas_b.width - Hotcold.canvas_b.old_x), Hotcold.canvas_b.height);
	
		ctx_b.closePath();
		ctx_b.restore();
			
		

	}
	
	//**START of convertJson module**
	
	function convertJson(){
	
		var custom_lesson = $('#custom_lesson_input').val();
		
		
		var newString =custom_lesson.replace(/\r?\n|\r/g," ");
		

		var str = new String(newString);

		var start_index = 0; var last_index = 30; var point = 30;

		var index = 0; 

		var temp = [];

		var converted = [];

		//console.log(String.fromCharCode(str.charCodeAt(last_index)));
		
		if(str.length > last_index){

		while(str.length > last_index){

		var last_space = -1;
		
		str = $.trim(str);

		if(str[last_index] && str.charCodeAt(last_index) != 32){

		    var last_space =  str.lastIndexOf(" ", last_index)
		    
		    
		}

		if(last_space != -1){

		converted[index] = {"text" : [], "code" : [], "pattern" : []};

		    for(var i = 0; i < last_space; i++){
			   converted[index].text.push(str[i]);
			   var code = str[i].charCodeAt(0);
			   var pattern = get_pattern(code);
			   converted[index].pattern.push(pattern);
			   converted[index].code.push(code);
		    }
		    
		    index++;
		    
		    str = str.slice(last_space+1);
		   
		    str = $.trim(str);

		}else{

		    converted[index] = {"text" : [], "code" : [], "pattern" : []};

		    for(var i = 0; i < last_index; i++){
			   converted[index].text.push(str[i]);
			   var code = str[i].charCodeAt(0);
			   var pattern = get_pattern(code);
			   converted[index].pattern.push(pattern);
			   converted[index].code.push(code);
		    }
		    
		    index++;
		    
		    str = str.slice(last_index);
		    
		    str = $.trim(str);
		    
		    }
		    
		    if(str.length < last_index){
			   converted[index] = {"text" : [], "code" : [], "pattern" : []};

		    for(var i = 0; i < str.length; i++){
			   converted[index].text.push(str[i]);
			   var code = str[i].charCodeAt(0);
			   var pattern = get_pattern(code);
			   converted[index].pattern.push(pattern);
			   converted[index].code.push(code);
			   
		    }


		}

		}
		
		} else {
		
			str = $.trim(str);
			
			converted[index] = {"text" : [], "code" : [], "pattern" : []};
			
			for(var i = 0; i < str.length; i++){
			   converted[index].text.push(str[i]);
			   var code = str[i].charCodeAt(0);
			   var pattern = get_pattern(code);
			   converted[index].pattern.push(pattern);
			   converted[index].code.push(code);
			   }
			
			
		
		}
		

		return converted;
		
		//console.log(str);
		
		//returns finger highlighting pattern

		//1-10 correponding finger from left to right

		//11-14 right shift plus left hand four fingers

		//15-18 left shift plus right hand four fingers

		function get_pattern(code){

		switch(code){
	
				case 32:
				return 5;
		
				case 33:
				return 11;
		
				case 34:
				return 18;
		
				case 35:
				return 13;
		
				case 36:
				return 14;
		
				case 37:
				return 14;
		
				case 38:
				return 15;
		
				case 39:
				return 10;
		
				case 40:
				return 17;
		
				case 41:
				return 18;
		
				case 42:
				return 16;
		
				case '+':
				return 18;
		
				case 43:
				return 8;
		
				case 45:
				return 18;
		
				case 46:
				return 9;
		
				case 47:
				return 10;
		
				case 48:
				return 10;
		
				case 49:
				return 1;
		
				case 50:
				return 2;
		
				case 51:
				return 3;
		
				case 52:
				return 4;
		
				case 53:
				return 4;
		
				case 54:
				return 7;
		
				case 55:
				return 7;
		
				case 56:
				return 8;
		
				case 57:
				return 9;
		
				case 58:
				return 18;
		
				case 59:
				return 10;
		
				case 60:
				return 16;
		
				case 61:
				return 10;
		
				case 62:
				return 17;
		
				case 63:
				return 18;
		
				case 64:
				return 12;
		
				case 65:
				return 11;
		
				case 66:
				return 14;
		
				case 67:
				return 13;
		
				case 68:
				return 13;
		
				case 69:
				return 13;
		
				case 70:
				return 14;
		
				case 71:
				return 14;
		
				case 72:
				return 15;
		
				case 73:
				return 16;
		
				case 74:
				return 15;
		
				case 75:
				return 16;
		
				case 76:
				return 17;
		
				case 77:
				return 15;
		
				case 78:
				return 15;
		
				case 79:
				return 17;
		
				case 80:
				return 18;
		
				case 81:
				return 11;
		
				case 82:
				return 14;
		
				case 83:
				return 12;
		
				case 84:
				return 14;
		
				case 85:
				return 15;
		
				case 86:
				return 14;
		
				case 87:
				return 12;
		
				case 88:
				return 12;
		
				case 89:
				return 15;
		
				case 90:
				return 11;
		
				case 91:
				return 10;
		
				case 92:
				return 10;
		
				case 93:
				return 10;
		
				case 94:
				return 15;
		
				case 95:
				return 18;
		
				case 96:
				return 1;
		
				case 97:
				return 1;
		
				case 98:
				return 4;
		
				case 99:
				return 3;
		
				case 100:
				return 3;
		
				case 101:
				return 3;
		
				case 102:
				return 4;
		
				case 103:
				return 4;
		
				case 104:
				return 7;
		
				case 105:
				return 8;
		
				case 106:
				return 7;
		
				case 107:
				return 8;
		
				case 108:
				return 9;
		
				case 109:
				return 7;
		
				case 110:
				return 7;
		
				case 111:
				return 9;
		
				case 112:
				return 10;
		
				case 113:
				return 1;
		
				case 114:
				return 4;
		
				case 115:
				return 2;
		
				case 116:
				return 4;
		
				case 117:
				return 7;
		
				case 118:
				return 4;
		
				case 119:
				return 2;
		
				case 120:
				return 2;
		
				case 121:
				return 7;
		
				case 122:
				return 1;
		
				case 123:
				return 18;
		
				case 124:
				return 18;
		
				case 125:
				return 18;
		
				case 126:
				return 11;
				
				default:
				return 0;
	
			}


		}//end of get_pattern module



	}//**END of convertJson module**



} // end of Course object

//**END of Course Object**







