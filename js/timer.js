
	
	function startTimer(){
	
		//var time_elapsed = 0;
		
		var pause_button = $('#pause_button');
		var resume_button = $('#resume_button');
		var space = $('#key_32');
		var space_to_resume = $('#space_to_resume');
		var bc = $('#back_to_course_button');
		
		
		var $min_div = $('#min');
		var $sec_div = $('#sec');
		
		var $min_val;
		var $sec_val = 60;
		
		//$min_div.html(minutes);
		//$sec_div.html('00');
		
		var can_width = $('#a').width();	
		
		Hotcold.timer_id = setInterval(updateTimer, 1000);
		Hotcold.key_gap_timer_id = setInterval(monitor_key_gap, 500);
		Hotcold.word_speed = setInterval(updateSpeed, 1000);
		Hotcold.canvas_a.timer = setInterval(animate, (Hotcold.curr_course.get_time())*60*1000/(Hotcold.canvas_a.width/5));
		
		space.removeClass('space_resume');
		space_to_resume.hide();
		resume_button.hide();
		pause_button.show();
		bc.hide();
		
				function updateSpeed(){
				
					var words;
					var time; var speed; var net_words; var net_time;
					
					words = (Hotcold.hits)/5;
					time = words/(Hotcold.seconds_elapsed);
					
					speed = time*60;
					Hotcold.gross_speed = parseInt(speed, 10);
					
					net_words = (Hotcold.correct)/5;
					net_time = net_words/(Hotcold.seconds_elapsed);
					
					net_speed = net_time*60;
					Hotcold.net_speed = parseInt(net_speed, 10);
	
					$('#type_speed').html(Hotcold.gross_speed);
					$('#net_type_speed').html(Hotcold.net_speed);
					
					if(Hotcold.hits !== 0)
					Hotcold.accuracy = parseInt((Hotcold.correct/Hotcold.hits)*100, 10);
					
					if(Hotcold.hits == 0){
						var percent = '100 %';
						$('#accuracy').html(percent);
					}else {
						var percent = Hotcold.accuracy + ' %';
						$('#accuracy').html(percent);
					}
					
	
				}	
				
				
				function updateTimer(){
					
					//time_elapsed++;
					
					//total_time_elapsed = time_elapsed;
					
					Hotcold.seconds_elapsed++;
	
					var $min_div = $('#min').html();
					var $sec_div = $('#sec').html();
		
					var min_val = parseInt($min_div, 10);
					var sec_val = parseInt($sec_div, 10);
		
					if(min_val === 0 && sec_val === 0){
						//course finished; end timer
						endTimer();
						Hotcold.curr_course.end_course();
						return;
					}
		
					if(sec_val == 0){
						sec_val = 59;
						min_val -= 1;
			
						$('#min').html(min_val);
						$('#sec').html(sec_val);
					}else{
						sec_val -= 1;
			
							if(sec_val < 10)
							sec_val = '0'+sec_val;
			
						$('#sec').html(sec_val);
					}
		
		
	
				}
		
		
	}
	
	
	function monitor_key_gap(){
	
		if(Hotcold.key_interval < 16) {
			Hotcold.key_interval++;
			//console.log(Hotcold.key_interval);
		}else{ 
			pauseTimer();
		}
	
	}
	
	
	
	function pauseTimer(){
	
		var pause_button = $('#pause_button');
		var resume_button = $('#resume_button');
		var space = $('#key_32');
		var space_to_resume = $('#space_to_resume');
		var bc = $('#back_to_course_button');
		
		space_to_resume.show();
		pause_button.hide();
		resume_button.show();
		bc.hide();
		
		space.addClass('space_resume');
	
		clearInterval(Hotcold.timer_id);
		clearInterval(Hotcold.key_gap_timer_id);
		clearInterval(Hotcold.word_speed);
		clearInterval(Hotcold.canvas_a.timer);
		Hotcold.course_started = false;
	
	}
	
	function endTimer(){
	
		var abort = $('#abort_button');
		var completed = $('#completed_button');
		var pause_button = $('#pause_button');
		var resume_button = $('#resume_button');
		var redo_button = $('#redo_button');
		var ci = $('#completion_indicator');
		var ts = $('#time_saved');
		var bc = $('#back_to_course_button');
		
					var $min_div = $('#min').html();
					var $sec_div = $('#sec').html();
		
					var min_val = parseInt($min_div, 10);
					var sec_val = parseInt($sec_div, 10);
					
					var time_text = '( '+min_val+' min '+sec_val+' sec )';
					ts.html(time_text);
					
		
		abort.hide();
		pause_button.hide();
		completed.show();
		resume_button.hide();
		redo_button.show();
		ci.show();
		bc.show();
	
		clearInterval(Hotcold.timer_id);
		clearInterval(Hotcold.key_gap_timer_id);
		clearInterval(Hotcold.word_speed);
		clearInterval(Hotcold.canvas_a.timer);
		Hotcold.course_init = false;
		Hotcold.course_started = false;
		
		
	
	}
	
	
	$(document).keypress(function(e){
		
		//$('#char_results').append(e.which + ' -- ');
		
		if(Hotcold.course_init){
		
			if(!Hotcold.course_started){
		
				if(e.which == 32){
				
					Hotcold.key_interval = 0;
					Hotcold.course_started = true;
					startTimer();
					
					if(Hotcold.course_first_time){
					
						//do first time operation here
						var pause_button = $('#pause_button');
						var resume_button = $('#resume_button');
						var space_to_start = $('#space_to_start');
						var space = $('#key_32');
						var abort = $('#abort_button');
						var c_label = $('#c_label');
						
						abort.show();
						pause_button.show();
						space_to_start.hide();
						resume_button.hide();
						c_label.show();
						Hotcold.course_first_time = false;
						space.removeClass('space_start');
					}
					
				
				}	
			
			} else {
				Hotcold.key_interval = 0;
				Hotcold.curr_course.manage_screen(e.which);
				Hotcold.hits++;
			}
		
		}
		
	});
	

	$(document).keydown(function(e){
			
			var is_firefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
			
			if(is_firefox){
			
				//firefox has a quick find; let us disable that to prevent key mismatch and accidental window resize
				
				switch(e.which){
				
					case 222:
					e.preventDefault();
					break;
					
					case 191:
					e.preventDefault();
					break;
					
				}
				
				
				
				
				
			}				
		
		if(e.ctrlKey){
	
		
		switch (e.which){
		
		case 13:
		e.preventDefault();
		//console.log('ctrl enter pressed' +e.which);
		break;
		
		case 79:
		e.preventDefault();
		//console.log('ctrl o pressed' +e.which);
		break;
		
		case 84:
		e.preventDefault();
		//console.log('ctrl t pressed' +e.which);
		break;
		
		case 85:
		e.preventDefault();
		//console.log('ctrl u pressed' +e.which);
		break;
		
		case 83:
		e.preventDefault();
		//console.log('ctrl s pressed' +e.which);
		break;
		
		case 87:
		e.preventDefault();
		//console.log('ctrl w pressed' +e.which);
		break;
		
		case 80:
		e.preventDefault();
		//console.log('ctrl p pressed' +e.which);
		break;
		
		case 78:
		e.preventDefault();
		//console.log('ctrl n pressed' +e.which);
		break;
		
		case 68:
		e.preventDefault();
		console.log('ctrl d pressed' +e.which);
		break;
		
		case 116:
		e.preventDefault();
		//console.log('ctrl t pressed' +e.which);
		break;
		
		case 70:
		e.preventDefault();
		//console.log('ctrl f pressed' +e.which);
		break;
		
		case 71:
		e.preventDefault();
		//console.log('ctrl g pressed' +e.which);
		break;
		
		case 104:
		e.preventDefault();
		//console.log('ctrl h pressed' +e.which);
		break;
		
		case 72:
		e.preventDefault();
		//console.log('ctrl h pressed' +e.which);
		break; 
		
		case 106:
		e.preventDefault();
		//console.log('ctrl t pressed' +e.which);
		break;
		
		case 74:
		e.preventDefault();
		//console.log('ctrl j pressed' +e.which);
		break;
		
		case 69:
		e.preventDefault();
		//console.log('ctrl e pressed' +e.which);
		break;
		
		case 75:
		e.preventDefault();
		//console.log('ctrl k pressed' +e.which);
		break;
		
		case 76:
		e.preventDefault();
		//console.log('ctrl l pressed' +e.which);
		break;
		
		default:
		break;
		
		}
		
		}
		
		
		
	
	}); 
	
	

