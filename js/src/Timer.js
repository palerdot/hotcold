var TimerWrapper = function ( HC, $el, Theme, Canvas ) {

    var Hotcold = HC,
        $el = $el,
        Theme = Theme,
        Canvas = Canvas;

    var Timer = {

        startTimer: function () {

            var can_width = $el.canvas_a.width();

            Hotcold.timer_id = setInterval( Timer.updateTimer, 1000 );
            Hotcold.key_gap_timer_id = setInterval( Timer.monitor_key_gap, 500 );
            Hotcold.word_speed = setInterval( Timer.updateSpeed, 1000 );
            Hotcold.canvas_a.timer = setInterval( Canvas.Update, ( Hotcold.curr_course.get_time() ) * 60 * 1000 / ( Hotcold.canvas_a.width / Hotcold.timer_speed_step ) );

            $el.space.removeClass( 'space_resume' );
            $el.space_to_resume.hide();
            $el.resume_button.hide();
            $el.pause_button.show();
            $el.c_home.hide();
        },

        updateSpeed: function () {

            var words;
            var time;
            var speed;
            var net_words;
            var net_time;

            words = ( Hotcold.hits ) / 5;
            time = words / ( Hotcold.seconds_elapsed );

            speed = time * 60;
            Hotcold.gross_speed = parseInt( speed, 10 );

            net_words = ( Hotcold.correct ) / 5;
            net_time = net_words / ( Hotcold.seconds_elapsed );

            net_speed = net_time * 60;
            Hotcold.net_speed = parseInt( net_speed, 10 );

            $el.type_speed
                .html( Hotcold.gross_speed );
            $el.net_type_speed
                .html( Hotcold.net_speed );

            if ( Hotcold.hits !== 0 )
                Hotcold.accuracy = parseInt( ( Hotcold.correct / Hotcold.hits ) * 100, 10 );

            if ( Hotcold.hits == 0 ) {
                var percent = '100 %';
                $el.accuracy
                    .html( percent );
            } else {
                var percent = Hotcold.accuracy + ' %';
                $el.accuracy
                    .html( percent );
            }

        },

        updateTimer: function () {

            Hotcold.seconds_elapsed++;

            var min_html = $el.$min_div.html();
            var sec_html = $el.$sec_div.html();

            var min_val = parseInt( min_html, 10 );
            var sec_val = parseInt( sec_html, 10 );

            if ( min_val === 0 && sec_val === 0 ) {
                //course finished; end timer
                Timer.endTimer();
                Hotcold.curr_course.end_course();
                return;
            }

            if ( sec_val == 0 ) {
                sec_val = 59;
                min_val -= 1;

                $el.$min_div
                    .html( min_val );
                $el.$sec_div
                    .html( sec_val );
            } else {
                sec_val -= 1;

                if ( sec_val < 10 )
                    sec_val = '0' + sec_val;

                $el.$sec_div
                    .html( sec_val );
            }

        },

        monitor_key_gap: function () {

            if ( Hotcold.key_interval < 16 ) {
                Hotcold.key_interval++;
            } else {
                Timer.pauseTimer();
            }

        },

        pauseTimer: function () {

            $el.space_to_resume.show();
            $el.pause_button.hide();
            $el.resume_button.show();
            $el.c_home.hide();

            $el.space.addClass( 'space_resume' );

            clearInterval( Hotcold.timer_id );
            clearInterval( Hotcold.key_gap_timer_id );
            clearInterval( Hotcold.word_speed );
            clearInterval( Hotcold.canvas_a.timer );

            Hotcold.course_started = false;
        },

        endTimer: function () {

            var min_html = $el.$min_div.html();
            var sec_html = $el.$sec_div.html();

            var min_val = parseInt( min_html, 10 );
            var sec_val = parseInt( sec_html, 10 );

            var time_text = '( ' + min_val + ' min ' + sec_val + ' sec )';
            $el.ts.html( time_text );

            $el.abort.hide();
            $el.pause_button.hide();
            $el.completed_button.show();
            $el.resume_button.hide();
            $el.redo_course.show();
            $el.ci.show();
            $el.c_home.show();

            clearInterval( Hotcold.timer_id );
            clearInterval( Hotcold.key_gap_timer_id );
            clearInterval( Hotcold.word_speed );
            clearInterval( Hotcold.canvas_a.timer );

            Hotcold.course_init = false;
            Hotcold.course_started = false;
        }

    };

    return Timer;

};

module.exports = TimerWrapper;
