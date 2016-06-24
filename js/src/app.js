var Hotcold = require( "./Hotcold.js" ),
    jquery_el = require( "./jquery_el.js" ),
    Theme = require( "./Theme.js" ),
    Canvas = require( "./Canvas.js" )( Hotcold, jquery_el, Theme ),
    Timer = require( "./Timer.js" )( Hotcold, jquery_el, Theme, Canvas ),
    Canvas = require( "./Canvas.js" )( Hotcold, jquery_el, Theme ),
    Course = require( "./Course.js" )( Hotcold, Canvas, jquery_el, Timer );

var HC_CONFIG = require( "../../config.json" );

var APP = {

    $el: jquery_el,

    start: function () {
        console.log( "config ", HC_CONFIG, HC_CONFIG.APPMODE );
        this.initializeEvents();
    },

    isFullScreen: function () {
        // ref: http://stackoverflow.com/a/7855739/1410291
        if ( !window.screenTop && !window.screenY ) {
            return true;
        }

        return false;
    },

    requestFullScreen: function () {
        var el = document.getElementById("course_window"),
            rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;

        // call the appropriate function
        rfs.call(el);
    },

    cancelFullScreen: function () {
        document.cancelFullScreen = document.webkitExitFullscreen || document.mozCancelFullScreen || document.exitFullscreen;
        document.cancelFullScreen();
    },

    initializeEvents: function () {

        var self = this; // save reference

        console.log( "initing events ", this, this.$el.d_theme );

        // day theme setting
        this.$el.d_theme.click( function () {
            console.log( "setting day theme" );
            self.set_day_theme();
        } );

        // night theme setting
        this.$el.n_theme.click( function () {
            console.log( "setting night theme" );
            self.set_night_theme();
        } );

        // click the night theme manually for the first time
        this.$el.n_theme.click();

        // go to course home
        this.$el.c_home.click( function () {
            console.log( "clicking course home" );
            Hotcold.reset();
            Hotcold.curr_course.clean_window();

            self.$el.c_win.hide();
            self.$el.c_tab.show();
        } );

        this.initLessons();

        // pause
        this.$el.pause_button.click( function () {
            // TODO: check where this is coming from
            Timer.pauseTimer();
        } );

        // redo
        this.$el.redo_course.click( function () {
            Hotcold.curr_course.redo();
        } );

        // abort
        this.$el.abort.click( function () {
            Hotcold.curr_course.end_course();
            Hotcold.curr_course.clean_window();

            self.$el.c_win.hide();
            self.$el.c_tab.show();
        } );

        // pagers
        this.$el.sp1.click( function ( e ) {
            e.preventDefault();
            self.$el.akp2.fadeOut( 'fast' );
            self.$el.akp1
                .delay( 250 )
                .fadeIn();
        } );

        this.$el.sp2.click( function ( e ) {
            e.preventDefault();
            self.$el.akp1.fadeOut( 'fast' );
            self.$el.akp2
                .delay( 250 )
                .fadeIn();
        } );

        this.$el.fs_toggle.click( function () {
            console.log("TOGGLING");
            if ( self.isFullScreen() ) {
                self.cancelFullScreen();
            } else {
                self.requestFullScreen();
            }
        } );

        this.initCustomLesson();

        this.initKeyPressEvents();

        this.initKeyDownEvents();

        window.onload = window.onresize = function () {
            Canvas.init_canvas();
            Canvas.redraw_canvas();
            Canvas.redraw_fingers();

            var $fs_icon = self.$el.fs_toggle.children( "i" );

            // change fullscreen button icon
            if ( self.isFullScreen() ) {
                $fs_icon
                    .removeClass( "glyphicon-resize-full" )
                    .addClass( "glyphicon-resize-small" );
            } else {
                $fs_icon
                    .removeClass( "glyphicon-resize-small" )
                    .addClass( "glyphicon-resize-full" );
            }

        };

    },

    initLessons: function () {

        var self = this;

        // lesson 1
        this.$el.lc1.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 1 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
            self.requestFullScreen();
        } );

        // lesson 2
        this.$el.lc2.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 2 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 3
        this.$el.lc3.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 3 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 4
        this.$el.lc4.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 4 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 5
        this.$el.lc5.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 5 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 6
        this.$el.lc6.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 6 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 7
        this.$el.lc7.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 7 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 8
        this.$el.lc8.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 8 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 9
        this.$el.lc9.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 9 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 10
        this.$el.lc10.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 10 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 11
        this.$el.lc11.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 11 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 12
        this.$el.lc12.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 12 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 13
        this.$el.lc13.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 13 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 14
        this.$el.lc14.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 14 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 15
        this.$el.lc15.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 15 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 16
        this.$el.lc16.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 16 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 17
        this.$el.lc17.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 17 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // lesson 18
        this.$el.lc18.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 18 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // launch poem
        this.$el.lp.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 19 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // launch quotes 1
        this.$el.lq1.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 20 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // launch quotes 2
        this.$el.lq2.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 21 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

        // launch quotes 3
        this.$el.lq3.click( function () {
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( 22 );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
        } );

    },

    initCustomLesson: function () {

        var self = this;

        this.$el.custom_lesson.keyup( function () {
            if ( $( this ).val().length > 0 ) {
                self.$el.no_input.hide();
            }
            self.$el.char_length.html( $( this ).val().trim().length );
        } );

        this.$el.prepare_lesson.click( function () {

            if ( self.$el.custom_lesson.val().trim().length == 0 ) {
                self.$el.no_input.show();
            } else {
                //there is an input; prepare custom lesson
                Hotcold.curr_course = new Course();
                Hotcold.curr_course.init( 0 );
                self.$el.c_tab.hide();
                self.$el.c_win.fadeIn();
            }

        } );

    },

    initKeyPressEvents: function () {

        var self = this;

        $( document )
            .keypress( function ( e ) {

                if ( Hotcold.course_init ) {

                    if ( !Hotcold.course_started ) {

                        if ( e.which == 32 ) {

                            Hotcold.key_interval = 0;
                            Hotcold.course_started = true;

                            Timer.startTimer();

                            if ( Hotcold.course_first_time ) {

                                self.$el.abort.show();
                                self.$el.pause_button.show();
                                self.$el.space_to_start.hide();
                                self.$el.resume_button.hide();
                                self.$el.c_label.show();
                                Hotcold.course_first_time = false;
                                self.$el.space.removeClass( 'space_start' );
                            }

                        }

                    } else {
                        Hotcold.key_interval = 0;
                        Hotcold.curr_course.manage_screen( e.which );
                        Hotcold.hits++;
                    }

                }

            } );

    },

    initKeyDownEvents: function () {

        $( document )
            .keydown( function ( e ) {

                var is_firefox = navigator.userAgent.toLowerCase().indexOf( 'firefox' ) > -1;

                if ( is_firefox && Hotcold.course_started ) {

                    //firefox has a quick find; let us disable that to prevent key mismatch and accidental window resize

                    switch ( e.which ) {

                        case 222:
                        case 191:
                            e.preventDefault();
                            break;

                    }

                }

                if ( e.ctrlKey ) {

                    switch ( e.which ) {

                        case 13:
                        case 79:
                        case 84:
                        case 85:
                        case 83:
                        case 87:
                        case 80:
                        case 78:
                        case 68:
                        case 116:
                        case 70:
                        case 71:
                        case 104:
                        case 72:
                        case 106:
                        case 74:
                        case 69:
                        case 75:
                        case 76:
                            e.preventDefault();
                            break;

                        default:
                            break;

                    }

                }

            } );

    },

    set_day_theme: function () {

        Theme.current = "day";

        $( "body" )
            .css( {
                "background-color": Theme.day.body_bg,
                "color": Theme[ Theme.current ].body_text_color
            } )
            .removeClass( "night-theme" )
            .addClass( "day-theme" );

        this.$el.c_win.css( {
            'background-color': Theme.day.body_bg
        } );
        this.$el.s_block.css( {
            "background-color": Theme.day.saved_block
        } );
        this.$el.cli.css( {
            "background-color": Theme.day.body_bg,
            "color": Theme.day.text_color
        } );

        this.$el.course_time.css( "color", Theme.day.text_color );
        this.$el.lv.css( "color", Theme.day.text_color );

        Hotcold.canvas_normal_line = Theme.day.canvas_normal_line;
        Hotcold.canvas_ref_line = Theme[Theme.current].canvas_ref_line;

        this.$el.canvas_a.css( "border-color", Theme.day.canvas_border );
        this.$el.canvas_b.css( "border-color", Theme.day.canvas_border );

        this.$el.c_section.css( "border-color", Theme.day.canvas_border );

        this.$el.nav_bar.removeClass( "navbar-inverse" );

        Canvas.clear_canvas_a();

    },

    set_night_theme: function () {

        Theme.current = "night";

        $( "body" )
            .css( {
                "background-color": Theme.night.body_bg,
                "color": Theme[ Theme.current ].body_text_color
            } )
            .removeClass( "day-theme" )
            .addClass( "night-theme" );

        this.$el.c_win.css( {
            'background-color': Theme.night.body_bg
        } );
        this.$el.s_block.css( {
            "background-color": Theme.night.saved_block
        } );
        this.$el.cli.css( {
            "background-color": Theme.night.body_bg,
            "color": Theme.night.text_color
        } );

        this.$el.course_time.css( "color", Theme.night.text_color );
        this.$el.lv.css( "color", Theme.night.text_color );

        Hotcold.canvas_normal_line = Theme.night.canvas_normal_line;
        Hotcold.canvas_ref_line = Theme[Theme.current].canvas_ref_line;

        this.$el.canvas_a.css( "border-color", Theme.night.canvas_border );
        this.$el.canvas_b.css( "border-color", Theme.night.canvas_border );

        this.$el.c_section.css( "border-color", Theme.night.canvas_border );

        this.$el.nav_bar.addClass( "navbar-inverse" );

        Canvas.clear_canvas_a();

    }

};

// window.APP = APP;
// window.Hotcold = Hotcold;

// start the APP on doc ready
APP.start();
