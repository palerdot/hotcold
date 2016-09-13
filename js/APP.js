(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
    "VERSION": "2.0.2",
    "APPMODE": "FREE",
    "PRO_CRX_URL": "https://chrome.google.com/webstore/detail/hotcold-typing-pro/aoceloicmloamkmaljmpejphndalilgp",
    "type": "web",
    "links": {
        "linux_32": "https://www.dropbox.com/s/h7t9lymfs86qrqn/Hotcold-2.0.1-linux-ia32.tar.gz?dl=1",
        "linux_64": "https://www.dropbox.com/s/8j99vyxhuybivbs/Hotcold-2.0.1-linux-x64.tar.gz?dl=1",
        "windows_32": "https://www.dropbox.com/s/pr9bf5dobt6cgil/Hotcold-2.0.1-win32-ia32.zip?dl=1",
        "windows_64": "https://www.dropbox.com/s/l4eqw1cb1rwzs4c/Hotcold-2.0.1-win32-x64.zip?dl=1",
        "mac_64": "https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#newwindow=1&q=mac+64+bit",
        "dev_derby_blog_url": "https://hacks.mozilla.org/2013/06/announcing-the-winners-of-the-april-2013-dev-derby/",
        "dev_derby_hc_cached": "http://web.archive.org/web/20131107013950/https://developer.mozilla.org/en-US/demos/detail/hot-cold-typing",
        "dev_derby_down_link": "https://blog.mozilla.org/community/2015/12/18/saying-goodbye-to-demo-studio/",
        "github_link": "https://github.com/palerdot/hotcold",
        "chrome_free_app": "https://chrome.google.com/webstore/detail/hotcold-typing/gikgnaajhiofmngkodahgpjnpgacmhlc",
        "chrome_pro_app": "https://chrome.google.com/webstore/detail/hotcold-typing-pro/aoceloicmloamkmaljmpejphndalilgp"
    },
    "messages": {
        "crx": "You can specify a custom time for your own course in PRO version. Get the Chrome App for the Pro Version!",
        "desktop": "You can specify a custom time for your own course in PRO version. PRO Desktop version coming soon! Please try the Chrome App for the Pro Version.",
        "web": "You can specify a custom time for your own course in PRO version. PRO Web version coming soon! Please try the Chrome App for the Pro Version."
    },
    "ORIGINAL_DEV_DERBY_URL": "https://developer.mozilla.org/en-US/demos/detail/hot-cold-typing"
}
},{}],2:[function(require,module,exports){
var CanvasWrapper = function ( HC, $el, Theme ) {

    // get the Hotcold obj reference which we will access by closure
    var Hotcold = HC,
        $el = $el,
        Theme = Theme;

    var Canvas = {

        init_canvas: function () {

            var C = 0.32; // canvas width to viewport width ratio

            var ctx_a;
            var ctx_b;

            var el = document.getElementById( "a" );

            var viewportWidth = window.innerWidth;
            var viewportHeight = window.innerHeight;

            var canvasWidth = viewportWidth * C;
            var canvasHeight = viewportHeight * 0.175;

            el.setAttribute( "width", canvasWidth );
            el.setAttribute( "height", canvasHeight );

            // update the new width/height
            Hotcold.canvas_a.width = canvasWidth;
            Hotcold.canvas_a.height = canvasHeight;

            //draw the canvas_a reference lines
            //initiate canvas a 
            ctx_a = document.getElementById( 'a' )
                            .getContext( '2d' );

            ctx_a.beginPath();

            for ( var i = 1; i <= 10; i++ ) {

                ctx_a.moveTo( 0, ( i * Hotcold.canvas_a.height ) / 10 );
                ctx_a.lineTo( Hotcold.canvas_a.width, ( i * Hotcold.canvas_a.height ) / 10 );

            }

            ctx_a.strokeStyle = Hotcold.canvas_normal_line;
            ctx_a.stroke();

            ctx_a.closePath();

            ctx_a.save();
            ctx_a.beginPath();

            ctx_a.moveTo( 0, 0.1 * Hotcold.canvas_a.height );
            ctx_a.lineTo( Hotcold.canvas_a.width, 0.1 * Hotcold.canvas_a.height );

            ctx_a.lineWidth = 2;
            ctx_a.strokeStyle = Hotcold.canvas_ref_line;
            ctx_a.stroke();

            ctx_a.closePath();
            ctx_a.restore();

            if ( Hotcold.course_completed ) {
                // draw the saved block
                ctx_a.save();
                ctx_a.globalAlpha = 0.6;
                ctx_a.beginPath();

                ctx_a.fillStyle = Theme[Theme.current].saved_block;
                ctx_a.fill();

                ctx_a.fillRect( Hotcold.canvas_a.old_x, 0, ( Hotcold.canvas_a.width - Hotcold.canvas_a.old_x ), Hotcold.canvas_a.height );

                ctx_a.closePath();
                ctx_a.restore();
            }

            var el_b = document.getElementById( "b" );

            canvasHeight = viewportHeight * 0.15;

            el_b.setAttribute( "width", canvasWidth );
            el_b.setAttribute( "height", canvasHeight );

            Hotcold.canvas_b.width = canvasWidth;
            Hotcold.canvas_b.height = canvasHeight;

            Hotcold.canvas_b.old_gross_y = Hotcold.canvas_b.height;
            Hotcold.canvas_b.old_net_y = Hotcold.canvas_b.height;

            ctx_b = document.getElementById( 'b' )
                            .getContext( '2d' );

            ctx_b.save();
            ctx_b.beginPath();

            ctx_b.moveTo( 0, 0.6 * Hotcold.canvas_b.height );
            ctx_b.lineTo( Hotcold.canvas_b.width, 0.6 * Hotcold.canvas_b.height );

            ctx_b.lineWidth = 2;
            ctx_b.strokeStyle = Hotcold.canvas_ref_line;
            ctx_b.stroke();

            ctx_b.closePath();
            ctx_b.restore();

            var length = Hotcold.canvas_b.arr_gross_y.length;
            Hotcold.canvas_b.old_gross_y = Hotcold.canvas_b.arr_gross_y[ length - 1 ];

            length = Hotcold.canvas_b.arr_net_y.length;
            Hotcold.canvas_b.old_net_y = Hotcold.canvas_b.arr_net_y[ length - 1 ];

            // draw the saved block
            if ( Hotcold.course_completed ) {

                ctx_b.save();
                ctx_b.globalAlpha = 0.6;

                ctx_b.beginPath();

                ctx_b.fillStyle = Theme[Theme.current].saved_block;
                ctx_b.fill();

                ctx_b.fillRect( Hotcold.canvas_b.old_x, 0, ( Hotcold.canvas_b.width - Hotcold.canvas_b.old_x ), Hotcold.canvas_b.height );

                ctx_b.closePath();
                ctx_b.restore();

            }

        },

        // MAIN function to update the canvas at frequent intervals
        // called by Timer.js
        Update: function () {

            var ctx,
                ctx_g,
                ctx_n,
                moveX,
                moveY,
                lineX,
                lineY;

            var can_height = Hotcold.canvas_a.height;

            var y_val = parseInt( Hotcold.accuracy, 10 );

            ctx = document.getElementById( 'a' ).getContext( '2d' );

            Hotcold.canvas_a.y = parseInt( can_height - ( can_height * ( y_val / 100 ) ), 10 );

            //try to push them to an array to be redrawn later
            Hotcold.canvas_a.arr_x.push( Hotcold.canvas_a.x );
            Hotcold.canvas_a.arr_y.push( Hotcold.canvas_a.y );

            ctx.save();
            ctx.beginPath();

            ctx.lineWidth = 3;

            // transform to old co-ordinates before moving
            moveX = Hotcold.canvas_a.old_x * ( Hotcold.canvas_a.width/Hotcold.canvas_a.ref_width[ Hotcold.canvas_a.ref_width.length - 1 ] );
            moveY = Hotcold.canvas_a.old_y * ( Hotcold.canvas_a.height/Hotcold.canvas_a.ref_height[ Hotcold.canvas_a.ref_height.length - 1 ] );

            // ctx.moveTo( Hotcold.canvas_a.old_x, Hotcold.canvas_a.old_y );
            ctx.moveTo( moveX, moveY );
            ctx.lineTo( Hotcold.canvas_a.x, Hotcold.canvas_a.y );

            ctx.strokeStyle = Theme.accuracy_color;
            ctx.stroke();

            ctx.closePath();
            ctx.restore();

            Hotcold.canvas_a.old_x = Hotcold.canvas_a.x;
            Hotcold.canvas_a.old_y = Hotcold.canvas_a.y;

            // also save the current width/height for reference
            Hotcold.canvas_a.ref_width.push( Hotcold.canvas_a.width );
            Hotcold.canvas_a.ref_height.push( Hotcold.canvas_a.height );

            ctx_g = document.getElementById( 'b' ).getContext( '2d' );

            var gross_y = parseInt( Hotcold.gross_speed, 10 );

            Hotcold.canvas_b.y = parseInt( Hotcold.canvas_b.height - ( Hotcold.canvas_b.height * ( gross_y / 100 ) ), 10 );

            Hotcold.canvas_b.arr_gross_x.push( Hotcold.canvas_b.x );
            Hotcold.canvas_b.arr_gross_y.push( Hotcold.canvas_b.y );

            ctx_g.beginPath();

            ctx_g.lineWidth = 3;

            // transform to old co-ordinates before moving
            moveX = Hotcold.canvas_b.old_x * ( Hotcold.canvas_b.width/Hotcold.canvas_b.ref_width[ Hotcold.canvas_b.ref_width.length - 1 ] );
            moveY = Hotcold.canvas_b.old_gross_y * ( Hotcold.canvas_b.height/Hotcold.canvas_b.ref_height[ Hotcold.canvas_b.ref_height.length - 1 ] );

            // ctx_g.moveTo( Hotcold.canvas_b.old_x, Hotcold.canvas_b.old_gross_y );
            ctx_g.moveTo( moveX, moveY );
            ctx_g.lineTo( Hotcold.canvas_b.x, Hotcold.canvas_b.y );

            ctx_g.strokeStyle = Theme.gross_speed_color;

            ctx_g.closePath();

            ctx_g.stroke();

            Hotcold.canvas_b.old_gross_y = Hotcold.canvas_b.y;

            ctx_n = document.getElementById( 'b' ).getContext( '2d' );

            var net_y = parseInt( Hotcold.net_speed, 10 );

            Hotcold.canvas_b.y = parseInt( Hotcold.canvas_b.height - ( Hotcold.canvas_b.height * ( net_y / 100 ) ), 10 );

            Hotcold.canvas_b.arr_net_x.push( Hotcold.canvas_b.x );
            Hotcold.canvas_b.arr_net_y.push( Hotcold.canvas_b.y );

            ctx_n.beginPath();

            ctx_n.lineWidth = 3;

            // transform to previous values co-ords
            moveX = Hotcold.canvas_b.old_x * ( Hotcold.canvas_b.width/Hotcold.canvas_b.ref_width[ Hotcold.canvas_b.ref_width.length - 1 ] );
            moveY = Hotcold.canvas_b.old_net_y * ( Hotcold.canvas_b.height/Hotcold.canvas_b.ref_height[ Hotcold.canvas_b.ref_height.length - 1 ] );

            // ctx_n.moveTo( Hotcold.canvas_b.old_x, Hotcold.canvas_b.old_net_y );
            ctx_n.moveTo( moveX, moveY );
            ctx_n.lineTo( Hotcold.canvas_b.x, Hotcold.canvas_b.y );

            ctx_n.strokeStyle = Theme.net_speed_color;
            ctx_n.stroke();

            ctx_n.closePath();

            Hotcold.canvas_b.old_x = Hotcold.canvas_b.x;
            Hotcold.canvas_b.old_net_y = Hotcold.canvas_b.y;

            //move the x axis

            Hotcold.canvas_a.x += Hotcold.timer_speed_step;
            Hotcold.canvas_b.x += Hotcold.timer_speed_step;

            // also save the current width/height for reference
            Hotcold.canvas_b.ref_width.push( Hotcold.canvas_b.width );
            Hotcold.canvas_b.ref_height.push( Hotcold.canvas_b.height );

        },

        redraw_canvas: function () {

            var ctx;
            var ctx_g;
            var ctx_n;

            var moveX, moveY, lineX, lineY;

            ctx = document.getElementById( 'a' )
                            .getContext( '2d' );

            ctx.save();
            ctx.beginPath();

            ctx.lineWidth = 3;

            for ( var i = 0; i < Hotcold.canvas_a.arr_x.length; i++ ) {

                moveX = Hotcold.canvas_a.arr_x[ i ] * (Hotcold.canvas_a.width/Hotcold.canvas_a.ref_width[i]);
                moveY = Hotcold.canvas_a.arr_y[ i ] * (Hotcold.canvas_a.height/Hotcold.canvas_a.ref_height[i]);

                lineX = Hotcold.canvas_a.arr_x[ i + 1 ] * (Hotcold.canvas_a.width/Hotcold.canvas_a.ref_width[i + 1]);
                lineY = Hotcold.canvas_a.arr_y[ i + 1 ] * (Hotcold.canvas_a.height/Hotcold.canvas_a.ref_height[i + 1]);

                ctx.moveTo( moveX, moveY );
                ctx.lineTo( lineX, lineY );

            }

            ctx.strokeStyle = Theme.accuracy_color;
            ctx.stroke();

            ctx.closePath();
            ctx.restore();

            //redraw gross speed
            ctx_g = document.getElementById( 'b' )
                .getContext( '2d' );
            ctx_g.save();
            ctx_g.beginPath();

            ctx_g.lineWidth = 3;

            for ( var i = 0; i < Hotcold.canvas_b.arr_gross_x.length; i++ ) {

                moveX = Hotcold.canvas_b.arr_gross_x[ i ] * (Hotcold.canvas_b.width/Hotcold.canvas_b.ref_width[i]);
                moveY = Hotcold.canvas_b.arr_gross_y[ i ] * (Hotcold.canvas_b.height/Hotcold.canvas_b.ref_height[i]);

                lineX = Hotcold.canvas_b.arr_gross_x[ i + 1 ] * (Hotcold.canvas_b.width/Hotcold.canvas_b.ref_width[i + 1]);
                lineY = Hotcold.canvas_b.arr_gross_y[ i + 1 ] * (Hotcold.canvas_b.height/Hotcold.canvas_b.ref_height[i + 1]);

                ctx_g.moveTo( moveX, moveY );
                ctx_g.lineTo( lineX, lineY );

            }

            ctx_g.strokeStyle = Theme.gross_speed_color;
            ctx_g.stroke();

            ctx_g.closePath();
            ctx_g.restore();

            //redraw net speed
            ctx_n = document.getElementById( 'b' )
                            .getContext( '2d' );
            ctx_n.save();
            ctx_n.beginPath();

            ctx_n.lineWidth = 3;

            for ( var i = 0; i < Hotcold.canvas_b.arr_net_x.length; i++ ) {

                moveX = Hotcold.canvas_b.arr_net_x[ i ] * (Hotcold.canvas_b.width/Hotcold.canvas_b.ref_width[i]);
                moveY = Hotcold.canvas_b.arr_net_y[ i ] * (Hotcold.canvas_b.height/Hotcold.canvas_b.ref_height[i]);

                lineX = Hotcold.canvas_b.arr_net_x[ i + 1 ] * (Hotcold.canvas_b.width/Hotcold.canvas_b.ref_width[i + 1]);
                lineY = Hotcold.canvas_b.arr_net_y[ i + 1 ] * (Hotcold.canvas_b.height/Hotcold.canvas_b.ref_height[i + 1]);

                ctx_n.moveTo( moveX, moveY );
                ctx_n.lineTo( lineX, lineY );

            }

            ctx_n.strokeStyle = Theme.net_speed_color;
            ctx_n.stroke();

            ctx_n.closePath();
            ctx_n.restore();

        },

        redraw_fingers: function () {

            var finger_canvas;
            var ctx_f;
            var f_div;

            finger_canvas = document.getElementById( "f" );

            ctx_f = finger_canvas.getContext( "2d" );

            viewportWidth = window.innerWidth;
            viewportHeight = window.innerHeight;

            canvasWidth = viewportWidth * 0.18;
            canvasHeight = viewportHeight * 0.11;

            $el.f_canvas_holder
                .width( canvasWidth );
            $el.f_canvas_holder
                .height( canvasHeight );

            $el.f_span_holder
                .width( canvasWidth );
            $el.f_span_holder
                .height( canvasHeight );

            finger_canvas.setAttribute( "width", canvasWidth );
            finger_canvas.setAttribute( "height", canvasHeight );

            var fin_image = new Image();

            fin_image.src = "images/viralgal.png";

            fin_image.onload = function () {
                ctx_f.drawImage( fin_image, 0, 0, canvasWidth, canvasHeight );
            };

        },

        clean_canvas: function () {

            //reset the canvas
            var ctx_a = document.getElementById( 'a' )
                                .getContext( '2d' );
            ctx_a.clearRect( 0, 0, Hotcold.canvas_a.width, Hotcold.canvas_a.height );

            //draw the reference line

            ctx_a.beginPath();

            ctx_a.lineWidth = 1;

            for ( var i = 1; i <= 10; i++ ) {

                ctx_a.moveTo( 0, ( i * Hotcold.canvas_a.height ) / 10 );
                ctx_a.lineTo( Hotcold.canvas_a.width, ( i * Hotcold.canvas_a.height ) / 10 );

            }

            ctx_a.strokeStyle = Hotcold.canvas_normal_line;
            ctx_a.stroke();

            ctx_a.closePath();

            ctx_a.beginPath();

            ctx_a.moveTo( 0, 0.1 * Hotcold.canvas_a.height );
            ctx_a.lineTo( Hotcold.canvas_a.width, 0.1 * Hotcold.canvas_a.height );

            ctx_a.save();
            ctx_a.lineWidth = 2;
            ctx_a.strokeStyle = Hotcold.canvas_normal_line;
            ctx_a.stroke();
            ctx_a.restore();

            ctx_a.closePath();

            var ctx_b = document.getElementById( 'b' )
                                .getContext( '2d' );
            ctx_b.clearRect( 0, 0, Hotcold.canvas_b.width, Hotcold.canvas_b.height );

            //draw the reference line
            ctx_b.beginPath();

            ctx_b.moveTo( 0, 0.6 * Hotcold.canvas_b.height );
            ctx_b.lineTo( Hotcold.canvas_b.width, 0.6 * Hotcold.canvas_b.height );

            ctx_b.strokeStyle = Hotcold.canvas_normal_line;
            ctx_b.stroke();

            ctx_b.closePath();

        },

        clear_canvas_a: function () {

            var ctx_a = document.getElementById( 'a' )
                                .getContext( '2d' );

            ctx_a.clearRect( 0, 0, Hotcold.canvas_a.width, Hotcold.canvas_a.height );
            ctx_a.beginPath();

            ctx_a.lineWidth = 1;

            for ( var i = 1; i <= 10; i++ ) {
                ctx_a.moveTo( 0, ( i * Hotcold.canvas_a.height ) / 10 );
                ctx_a.lineTo( Hotcold.canvas_a.width, ( i * Hotcold.canvas_a.height ) / 10 );
            }

            ctx_a.save();
            ctx_a.strokeStyle = Hotcold.canvas_normal_line;
            ctx_a.stroke();
            ctx_a.restore();

            ctx_a.closePath();

            ctx_a.beginPath();

            ctx_a.moveTo( 0, 0.1 * Hotcold.canvas_a.height );
            ctx_a.lineTo( Hotcold.canvas_a.width, 0.1 * Hotcold.canvas_a.height );

            ctx_a.save();

            ctx_a.lineWidth = 2;
            ctx_a.strokeStyle = Hotcold.canvas_normal_line;
            ctx_a.stroke();
            ctx_a.restore();

            ctx_a.closePath();
        },

        // reset the canvas to fresh state
        reset: function () {
            //reset the canvas
            var ctx_a = document.getElementById( 'a' )
                                .getContext( '2d' );

            ctx_a.clearRect( 0, 0, Hotcold.canvas_a.width, Hotcold.canvas_a.height );

            //draw the reference line

            ctx_a.beginPath();

            ctx_a.lineWidth = 1;

            for ( var i = 1; i <= 10; i++ ) {

                ctx_a.moveTo( 0, ( i * Hotcold.canvas_a.height ) / 10 );
                ctx_a.lineTo( Hotcold.canvas_a.width, ( i * Hotcold.canvas_a.height ) / 10 );

            }

            ctx_a.strokeStyle = Hotcold.canvas_normal_line;;
            ctx_a.stroke();

            ctx_a.closePath();

            ctx_a.beginPath();

            ctx_a.moveTo( 0, 0.1 * Hotcold.canvas_a.height );
            ctx_a.lineTo( Hotcold.canvas_a.width, 0.1 * Hotcold.canvas_a.height );

            ctx_a.save();
            ctx_a.strokeStyle = Hotcold.canvas_ref_line;
            ctx_a.stroke();
            ctx_a.restore();

            ctx_a.closePath();

            var ctx_b = document.getElementById( 'b' )
                                .getContext( '2d' );
            ctx_b.clearRect( 0, 0, Hotcold.canvas_b.width, Hotcold.canvas_b.height );

            //draw the reference line

            ctx_b.beginPath();

            ctx_b.moveTo( 0, 0.6 * Hotcold.canvas_b.height );
            ctx_b.lineTo( Hotcold.canvas_b.width, 0.6 * Hotcold.canvas_b.height );

            ctx_b.strokeStyle = Hotcold.canvas_ref_line;
            ctx_b.stroke();

            ctx_b.closePath();
        },

        // complete the canvas related stuff when course is complete
        complete: function () {
            var ctx_a;
            var ctx_b;

            ctx_a = document.getElementById( 'a' )
                .getContext( '2d' );
            ctx_b = document.getElementById( 'b' )
                .getContext( '2d' );

            ctx_a.save();
            ctx_a.globalAlpha = 0.6;

            ctx_a.beginPath();

            ctx_a.fillStyle = Theme[ Theme.current ].saved_block;
            ctx_a.fill();

            ctx_a.fillRect( Hotcold.canvas_a.old_x, 0, ( Hotcold.canvas_a.width - Hotcold.canvas_a.old_x ), Hotcold.canvas_a.height );

            ctx_a.closePath();

            ctx_a.restore();

            ctx_b.save();
            ctx_b.globalAlpha = 0.6;

            ctx_b.beginPath();

            ctx_b.fillStyle = Theme[ Theme.current ].saved_block;
            ctx_b.fill();

            ctx_b.fillRect( Hotcold.canvas_b.old_x, 0, ( Hotcold.canvas_b.width - Hotcold.canvas_b.old_x ), Hotcold.canvas_b.height );

            ctx_b.closePath();
            ctx_b.restore();
        }

    };

    return Canvas;

};

module.exports = CanvasWrapper;

},{}],3:[function(require,module,exports){
var CourseWrapper = function ( HC, Canvas, $el, Timer, Fingers, KeyPatterns ) {

    var Hotcold = HC,
        Canvas = Canvas,
        $el = $el,
        Timer = Timer,
        Fingers = Fingers,
        KeyPatterns = KeyPatterns;

    function Course() {

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

        // Our "Worker" Helper
        var helper;

        var keys = [];

        this.get_time = function () {
            return minutes;
        };

        for ( var i = 32; i < 127; i++ ) {

            var temp = '#key_' + i;
            keys[ i ] = $( temp );

            if ( i >= 65 && i <= 90 ) {

                //we have caps letters; assign them appropriate divs of small letters in the virtual keyboard;
                var code = String.fromCharCode( i )
                                    .toLowerCase()
                                    .charCodeAt( 0 );
                temp = '#key_' + code;
                keys[ i ] = $( temp );

            }

            // numbers 0 - 9
            if ( i >= 48 && i <= 57 ) {
                //we have numbers (top row) assign them the appropriate divs    
                var code = get_numeric_div( i );
                temp = '#key_' + code;
                keys[ i ] = $( temp );
            }

            // mapping all the symbols to appropriate div
            // 91 => [, 93 => ], 59 => ; , 39 => ' (single quote) , 92 => \, 44 => ,(comma),
            // 46 => . (period), 47 => /, 95 => _ (underscore), 43 => +, 96 => `(tick), 45 => hyphen() 
            // NOTE: for keyboard change, this has to be dynamic
            if ( i == 91 || i == 93 || i == 59 || i == 39 || i == 92 || i == 44 || i == 46 || i == 47 || i == 43 || i == 96 || i == 45) {
                var code = get_numeric_div( i );
                temp = '#key_' + code;
                keys[ i ] = $( temp );
            }

        }

        //initialize the course; get the contents from the json file and prepare the local variables;   

        this.init = function ( course_details ) {

            var self = this; // save reference

            // note: lesson is defined globally in this object; careful of this gotcha

            if ( !course_details ) {
                
                lesson = convertJson();
                // we need to check if it is default 1 min or custom time
                minutes = $el.free_time.is(":checked") ? 1 : $el.custom_duration.val();
                self.prepare();
                // all done; lets return
                return;

            } else {

                // we have one extra special case; check if course text is an array
                if ( _.isArray( course_details.course_text ) ) {

                    // for each line in course
                    _.each( course_details.course_text, function (val, key) {
                        
                        lesson[ key ] = {};
                        lesson[ key ].code = [];
                        lesson[ key ].text = [];
                        lesson[ key ].pattern = [];
                        
                        // convert each string in line to code and finger pattern
                        _.each( val, function (str, index) {
                            lesson[ key ].text.push( str );
                            var code = str.charCodeAt( 0 );
                            var pattern = get_finger_pattern( code );
                            lesson[ key ].pattern.push( pattern );
                            lesson[ key ].code.push( code );
                        } );
                        
                    } );

                    minutes = course_details.duration ? course_details.duration : 1;
                    self.prepare();

                    // all done;
                    return;
                }

                // it is a general lesson; parse the course text and other stuff from the course details
                lesson = convertJson( course_details );
                minutes = course_details.duration ? course_details.duration : 1;
                self.prepare();
                // all done; lets return  
                return;
            }

            return;

        }; //end of init

        // prepare the course
        this.prepare = function () {

            // clean_canvas();
            Canvas.clean_canvas();
            //initiate the worker 

            helper = new Worker( 'js/hotcold_stat_helper.js' );

            helper.addEventListener( 'message', function ( event ) {

                var result = JSON.parse( event.data );

                // do not blindly remove all the class; let the "backlit class be there"
                var has_backlit = $(result.highlight.div_id).hasClass("backlit") ? "backlit": "";
                $(result.highlight.div_id).removeClass();
                $(result.highlight.div_id).addClass( 'keys ' + has_backlit );
                $(result.highlight.div_id).addClass( result.highlight.div_class );

                // do not blindly remove all the class; let the "backlit class be there"
                var has_backlit = keys[ result.highlight.code ].hasClass("backlit") ? "backlit": "";
                keys[ result.highlight.code ].removeClass();
                keys[ result.highlight.code ].addClass( 'keys ' + has_backlit );
                keys[ result.highlight.code ].addClass( result.highlight.div_class );

                if ( result.highlight.format == 2 ) {
                    keys[ result.highlight.code ]
                        .children( '.bottom-k' )
                        .addClass( 'u_line' );
                } else {
                    keys[ result.highlight.code ]
                        .children( '.bottom-k' )
                        .removeClass( 'u_line' );
                }

                $el.c_div.html( result.update );

            }, false );

            helper.addEventListener( 'error', function ( e ) {
                //console.log('Worker error info: message '+e.message);
            }, false );

            course_length = lesson.length;
            curr_line_length = lesson[ curr_line ].code.length;

            for ( var i = 32; i < 127; i++ ) {
                keys[ i ].removeClass()
                        .addClass( 'keys' );
            }

            $el.lv.html( '' );
            // var live_update = $( '#c' );
            $el.c_div.html( '' );
            // var c_label = $( '#c_label' );
            $el.c_label.hide();

            // var min_div = $( '#min' );
            // var sec_div = $( '#sec' );

            $el.$min_div.html( minutes );
            $el.$sec_div.html( '00' );

            // var ci = $( '#completion_indicator' );
            $el.ci.hide();

            // var completed_div = $( '#completed' );
            $el.completed_div.html( '' );

            // var gross_speed = $( '#type_speed' );
            $el.type_speed.html( '' );
            // var net_speed = $( '#net_type_speed' );
            $el.net_type_speed.html( '' );
            // var accuracy = $( '#accuracy' );
            $el.accuracy.html( '' );

            $.each( lesson[ curr_line ].text, function ( key, val ) {
                var span_text = '<span>' + val + '</span>';
                screen_text += span_text;
            } );

            highlight_finger( lesson[ curr_line ].pattern[ curr_index ] );

            highlight_key( lesson[ curr_line ].code[ curr_index ] );

            $el.lv.html( screen_text );

            var temp = curr_index + 1;
            
            $el.lv.find("span:nth-child(" + temp + ")").addClass( "key_before" );

            Hotcold.course_init = true;

            keys[ 32 ].addClass( 'space_start' );

            $el.abort.show();
            $el.space_to_resume.hide();

        };

        //redo function
        this.redo = function () {

            //reset the hotcold object variables

            Hotcold.reset();

            //reset the variables
            curr_index = 0;
            curr_line = 0;
            curr_line_length = 0;
            course_length = 0;
            screen_text = '';

            $el.completed_button.hide();
            $el.redo_course.hide();
            $el.space_to_start.show();
            $el.c_home.hide();

            this.prepare();

        };

        this.clean_window = function () {

            $el.lv.html( '' );

            //reset the hotcold object variables

            Hotcold.reset();

            //reset the variables
            curr_index = 0;
            curr_line = 0;
            curr_line_length = 0;
            course_length = 0;
            screen_text = '';

            Canvas.reset();

            $el.completed_button.hide();
            $el.redo_course.hide();
            $el.space_to_start.show();
            $el.c_home.hide();

        };

        this.manage_screen = function ( key_typed ) {

            if ( key_typed == lesson[ curr_line ].code[ curr_index ] ) {

                //now send a message to our helper (worker) so that it can start working :)

                helper.postMessage( { "status": "right", "code": lesson[ curr_line ].code[ curr_index ], "close": false } );

                $el.lv.find("span:nth-child(" + curr_index + ")").removeClass( "key_before" );
                
                var temp = curr_index + 1;
                $el.lv.find("span:nth-child(" + temp + ")").addClass( "key_ok" );

                Hotcold.correct++;

            } else {

                //now send a message to our helper (worker) so that it can start working :)

                helper.postMessage( { "status": "wrong", "code": lesson[ curr_line ].code[ curr_index ], "close": false } );

                $el.lv.find("span:nth-child(" + curr_index + ")").removeClass( "key_before" );
                
                var temp = curr_index + 1;
                $el.lv.find("span:nth-child(" + temp + ")").addClass( "key_not_ok" );

            }

            //console.log('index' +curr_index);

            curr_index += 1;

            if ( curr_index == curr_line_length ) {

                //console.log('current line over');
                curr_line++;

                //update completion status

                if ( curr_line == course_length ) {
                    //console.log('course also over');
                    //end_course();
                    this.end_course();
                } else {
                    curr_index = 0;
                    curr_line_length = lesson[ curr_line ].code.length;
                    //change the screen
                    screen_text = '';
                    $.each( lesson[ curr_line ].text, function ( key, val ) {
                        var span_text = '<span>' + val + '</span>';
                        screen_text += span_text;
                    } );

                    $el.lv.html( screen_text );

                }
            }

            
            var temp = curr_index + 1;
            $el.lv.find("span:nth-child(" + temp + ")").addClass( "key_before" );

            if ( Hotcold.course_init ) {
                //perform finger pattern
                highlight_finger( lesson[ curr_line ].pattern[ curr_index ] );
                //perform key highlight
                highlight_key( lesson[ curr_line ].code[ curr_index ] );
            }

            // var completed_div = $( '#completed' );
            var completed_percent = parseInt( ( curr_line / course_length ) * 100, 10 );
            var completed_text = completed_percent + '%';
            $el.completed_div.html( completed_text );

        };

        this.end_course = function () {

            Timer.endTimer();

            Hotcold.course_init = false;
            Hotcold.course_started = false;
            Hotcold.course_completed = true;

            var finger = $( '.finger' );
            finger.hide();

            var r_shift = $( '#shift_right' );
            var l_shift = $( '#shift_left' );

            if ( Hotcold.right_shift ) {
                r_shift.removeClass( 'backlit' );
                Hotcold.right_shift = false;
            }

            if ( Hotcold.left_shift ) {
                l_shift.removeClass( 'backlit' );
                Hotcold.left_shift = false;
            }

            if ( Hotcold.prev_key != 0 )
                keys[ Hotcold.prev_key ].removeClass( 'backlit' );

            Hotcold.prev_key = 0;

            //close the worker;

            helper.postMessage( { "close": true } );

            Canvas.complete();

            //console.log("Timer and course finished");
        };

        // -------------------------------------------------------------------------------------------
        // START: Helper functions
        // -------------------------------------------------------------------------------------------

        // START: highlight finger module
        function highlight_finger (code) {

            switch ( code ) {

                case 1:
                    $el.finger.hide();
                    $el.finger_1.show();
                    break;

                case 2:
                    $el.finger.hide();
                    $el.finger_2.show();
                    break;

                case 3:
                    $el.finger.hide();
                    $el.finger_3.show();
                    break;

                case 4:
                    $el.finger.hide();
                    $el.finger_4.show();
                    break;

                case 5:
                    $el.finger.hide();
                    $el.finger_5.show();
                    break;

                case 6:
                    $el.finger.hide();
                    $el.finger_6.show();
                    break;

                case 7:
                    $el.finger.hide();
                    $el.finger_7.show();
                    break;

                case 8:
                    $el.finger.hide();
                    $el.finger_8.show();
                    break;

                case 9:
                    $el.finger.hide();
                    $el.finger_9.show();
                    break;

                case 10:
                    $el.finger.hide();
                    $el.finger_10.show();
                    break;

                case 11:
                    $el.finger.hide();
                    $el.finger_1.show();
                    $el.finger_10.show();
                    break;

                case 12:
                    $el.finger.hide();
                    $el.finger_2.show();
                    $el.finger_10.show();
                    break;

                case 13:
                    $el.finger.hide();
                    $el.finger_3.show();
                    $el.finger_10.show();
                    break;

                case 14:
                    $el.finger.hide();
                    $el.finger_4.show();
                    $el.finger_10.show();
                    break;

                case 15:
                    $el.finger.hide();
                    $el.finger_7.show();
                    $el.finger_1.show();
                    break;

                case 16:
                    $el.finger.hide();
                    $el.finger_1.show();
                    $el.finger_8.show();
                    break;

                case 17:
                    $el.finger.hide();
                    $el.finger_1.show();
                    $el.finger_9.show();
                    break;

                case 18:
                    $el.finger.hide();
                    $el.finger_1.show();
                    $el.finger_10.show();
                    break;

            }

        }
        // END: highlight finger module

        // START: Highlight key
        function highlight_key( code ) {

            if ( Hotcold.prev_key != 0 ) {
                keys[ Hotcold.prev_key ].removeClass( 'backlit' );
            }

            var r_shift = $( '#shift_right' );
            var l_shift = $( '#shift_left' );

            if ( Hotcold.right_shift ) {
                r_shift.removeClass( 'backlit' );
                Hotcold.right_shift = false;
            }

            if ( Hotcold.left_shift ) {
                l_shift.removeClass( 'backlit' );
                Hotcold.left_shift = false;
            }

            var right_shift_patterns = KeyPatterns[ Hotcold.layout ].right,
                is_right_shift = right_shift_patterns.indexOf(code) > -1,
                left_shift_patterns = KeyPatterns[ Hotcold.layout ].left,
                is_left_shift = left_shift_patterns.indexOf(code) > -1;

            if ( is_right_shift ) {
                Hotcold.right_shift = true;
                r_shift.addClass( 'backlit' );
            }

            if (is_left_shift) {
                Hotcold.left_shift = true;
                l_shift.addClass( 'backlit' );
            }

            keys[ code ].addClass( 'backlit' );

            Hotcold.prev_key = code;

        }
        // END: Highlight key

        // START: get_numeric_div
        //module to get the right div ids for numbers and special characters;
        // TODO: should tweak this for each keyboard layouts also in stat helper
        function get_numeric_div( code ) {

            switch ( code ) {

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

                // case 95:
                //     return 45;

                // tick => `, mapping to ~
                case 96:
                    return 126;

                // hyphen mapping to underscore
                case 45: 
                    return 95;

                // note this for +; have to watch out in case of bugs;
                // note this module is also used in stat helper
                case 43:
                    // return 61;
                    return 43;

            }

        }
        // END: get_numeric_div

        //returns finger highlighting pattern

        //1-10 correponding finger from left to right
        //11-14 right shift plus left hand four fingers
        //15-18 left shift plus right hand four fingers (starting from index)
        function get_finger_pattern( code ) {

            var char = String.fromCharCode( code ),
                pattern = Fingers[ Hotcold.layout ][ char ];

            return  pattern;

        } //end of get_finger_pattern module

        // START: convertJson module
        function convertJson( course_details ) {

            var custom_lesson = course_details ? course_details.course_text : $el.cli.val().trim();

            var newString = custom_lesson.replace( /\r?\n|\r/g, " " );

            var str = new String( newString );

            var start_index = 0;
            var last_index = course_details ? course_details.line_length : 30;

            var index = 0;

            var temp = [];

            var converted = [];

            //console.log(String.fromCharCode(str.charCodeAt(last_index)));

            if ( str.length > last_index ) {

                while ( str.length > last_index ) {

                    var last_space = -1;

                    str = $.trim( str );

                    if ( str[ last_index ] && str.charCodeAt( last_index ) != 32 ) {

                        var last_space = str.lastIndexOf( " ", last_index )

                    }

                    if ( last_space != -1 ) {

                        converted[ index ] = { "text": [], "code": [], "pattern": [] };

                        for ( var i = 0; i < last_space; i++ ) {
                            converted[ index ].text.push( str[ i ] );
                            var code = str[ i ].charCodeAt( 0 );
                            var pattern = get_finger_pattern( code );
                            converted[ index ].pattern.push( pattern );
                            converted[ index ].code.push( code );
                        }

                        index++;

                        str = str.slice( last_space + 1 );

                        str = $.trim( str );

                    } else {

                        converted[ index ] = { "text": [], "code": [], "pattern": [] };

                        for ( var i = 0; i < last_index; i++ ) {
                            converted[ index ].text.push( str[ i ] );
                            var code = str[ i ].charCodeAt( 0 );
                            var pattern = get_finger_pattern( code );
                            converted[ index ].pattern.push( pattern );
                            converted[ index ].code.push( code );
                        }

                        index++;

                        str = str.slice( last_index );

                        str = $.trim( str );

                    }

                    if ( str.length < last_index ) {
                        converted[ index ] = { "text": [], "code": [], "pattern": [] };

                        for ( var i = 0; i < str.length; i++ ) {
                            converted[ index ].text.push( str[ i ] );
                            var code = str[ i ].charCodeAt( 0 );
                            var pattern = get_finger_pattern( code );
                            converted[ index ].pattern.push( pattern );
                            converted[ index ].code.push( code );

                        }

                    }

                }

            } else {

                str = $.trim( str );

                converted[ index ] = { "text": [], "code": [], "pattern": [] };

                for ( var i = 0; i < str.length; i++ ) {
                    converted[ index ].text.push( str[ i ] );
                    var code = str[ i ].charCodeAt( 0 );
                    var pattern = get_finger_pattern( code );
                    converted[ index ].pattern.push( pattern );
                    converted[ index ].code.push( code );
                }

            }

            return converted;

        } 
        // END: convertJson module

        // -------------------------------------------------------------------------------------------
        // END: Helper functions
        // -------------------------------------------------------------------------------------------

    }

    return Course;

};

// export the course constructor
module.exports = CourseWrapper;

},{}],4:[function(require,module,exports){
//start of Hotcold object

var Hotcold = {

    layout: "qwerty",

    key_interval: 0,
    hits: 0,
    correct: 0,
    seconds_elapsed: 0,

    course_started: false,
    course_init: false,
    course_first_time: true,
    course_completed: false,

    timer_id: 0,
    key_gap_timer_id: 0,

    word_speed: 0,
    gross_speed: 0,
    net_speed: 0,
    accuracy: 100,

    timer_speed_step: 3,

    prev_pattern: 0,
    prev_key: 0,
    right_shift: false,
    left_shift: false,
    
    curr_course: 0,

    canvas_normal_line: '#f2f2f2',
    canvas_ref_line: '#bfbfbf',

    canvas_a: {
        x: 0,
        y: 0,

        old_x: 0,
        old_y: 0,

        timer: 0,

        arr_x: [ ],
        arr_y: [ ],

        // used for mapping the  coordinates when dimensions change
        ref_width: [],
        ref_height: [],

        // last reference values
        last_ref_width: 0,
        last_ref_height: 0,

        width: 0,
        height: 0
    },

    canvas_b: {
        x: 0,
        y: 0,

        old_x: 0,
        old_gross_y: 0,
        old_net_y: 0,
        timer: 0,

        width: 0,
        height: 0,

        arr_gross_x: [ ],
        arr_gross_y: [ ],

        arr_net_x: [ ],
        arr_net_y: [ ],

        // used for mapping the  coordinates when dimensions change
        ref_width: [],
        ref_height: []
    },

    canvas_c: {
        width: 0,
        height: 0
    },

    reset: function ( ) {
        this.key_interval = 0;
        this.hits = 0;
        this.correct = 0;
        this.seconds_elapsed = 0;
        this.course_started = false;
        this.course_init = false;
        this.course_first_time = true;
        this.course_completed = false;
        this.timer_id = 0;
        this.key_gap_timer_id = 0;
        this.word_speed = 0;
        this.gross_speed = 0;
        this.net_speed = 0;
        this.accuracy = 100;
        this.prev_pattern = 0;
        this.prev_key = 0;
        this.right_shift = false;
        this.left_shift = false;
        this.canvas_a.x = 0;
        this.canvas_a.y = 0;
        this.canvas_a.old_x = 0;
        this.canvas_a.old_y = 0;
        this.canvas_a.timer = 0;
        this.canvas_a.arr_x = [ ];
        this.canvas_a.arr_y = [ ];
        this.canvas_b.x = 0;
        this.canvas_b.y = this.canvas_b.height;
        this.canvas_b.old_x = 0;
        this.canvas_b.old_gross_y = this.canvas_b.height;
        this.canvas_b.old_net_y = this.canvas_b.height;
        this.canvas_b.timer = 0;
        this.canvas_b.arr_gross_x = [ ];
        this.canvas_b.arr_gross_y = [ ];
        this.canvas_b.arr_net_x = [ ];
        this.canvas_b.arr_net_y = [ ];
    }
};

module.exports = Hotcold;
},{}],5:[function(require,module,exports){
var Theme = {

    current: "night",

    gross_speed_color: "#FF9900",
    net_speed_color: "#00CC00",
    timer_color: "#BD9C59",
    accuracy_color: "#0066FF",
    completed_color: "#CC3300",

    day: {
        body_bg: "#F7F7F7",
        body_text_color: "#777777",
        
        canvas_border: "#C2C2C2",
        canvas_normal_line: "#DEDEDE",
        canvas_ref_line: "#ACACAC",

        saved_block: "#BDBDBD",
        text_color: "#777777",

        scroll_thumb_color: "#000000",
        scroll_bg_color: "#EDEDED"
    },

    night: {
        body_bg: "#282828",
        body_text_color: "#999999",

        canvas_border: "#555555",
        canvas_normal_line: "#555555",
        canvas_ref_line: "#BFBFBF",

        saved_block: "#454545",
        text_color: "#999999",

        scroll_thumb_color: "#555555",
        scroll_bg_color: "#222222"
    }

};

module.exports = Theme;
},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
var Hotcold = require( "./Hotcold.js" ),
    jquery_el = require( "./jquery_el.js" ),
    Fingers = require( "./finger_patterns.json" ),
    KeyPatterns = require( "./key_patterns.json" ),
    Theme = require( "./Theme.js" ),
    Canvas = require( "./Canvas.js" )( Hotcold, jquery_el, Theme ),
    Timer = require( "./Timer.js" )( Hotcold, jquery_el, Theme, Canvas ),
    Canvas = require( "./Canvas.js" )( Hotcold, jquery_el, Theme ),
    Course = require( "./Course.js" )( Hotcold, Canvas, jquery_el, Timer, Fingers, KeyPatterns ),
    KB = require( "./layouts.json" ),
    Lessons = require("../../lessons/lessons.json");

var HC_CONFIG = require( "../../config.json" );

var APP = {

    $el: jquery_el,

    start: function () {
        console.log( "config ", HC_CONFIG, KB, _ );

        // change underscore template settings
        _.templateSettings = {
            interpolate: /\{\{(.+?)\}\}/g
        };

        this.initKeyboardLayouts();

        this.initLayoutLessons();

        this.initializeEvents();
        this.initAppMode();
    },

    // initializes keyboard layout in the course window
    initKeyboardLayouts: function () {
        console.log("Porumai! initing keyboard events ", Hotcold.layout, _.keys( KB ) );
        var self = this; // save reference

        var $keyboard, $row, $main_key, $top_k, $bottom_k;

        // main keyboard div
        $keyboard = $("<div>")
                        .attr("id", this.layout);

        // generate rows from the layout data
        _.each( KB[Hotcold.layout], function (key_data, row) {

            // generating main row
            $row = $("<section>")
                        .attr("id", row);


            // generating keys for the row
            _.each( key_data, function (key) {

                // check if the key is special
                if (key.special) {
                    // this is a special key
                    $main_key = $("<span>")
                                    .attr("id", key.id)
                                    .addClass("keys");

                    $main_key
                        // append the top key
                        .append(
                            $("<div>")
                                .addClass("top-k")
                                .html( key.keys[0] ? key.keys[0] : "&nbsp;" )
                        )
                        // append the bottom key
                        .append(
                            $("<div>")
                                .addClass("bottom-k")
                                .html( key.keys[1] ? key.keys[1] : "&nbsp;" )
                        )

                    // all done; append the key to the row
                    $row.append( $main_key );
                } 
                // normal key
                else {
                    // in current logic, key id is character code of the top key
                    var key_id = key.keys[0].toLowerCase().charCodeAt(0);

                    $main_key = $("<span>")
                                    .attr("id", "key_" + key_id)
                                    .addClass("keys");

                    
                    $main_key
                        // append the top key
                        .append(
                            $("<div>")
                                .addClass("top-k")
                                .html( key.keys[0] )
                        )
                        // append the bottom key
                        .append(
                            $("<div>")
                                .addClass("bottom-k")
                                .html( key.keys[1] ? key.keys[1] : "&nbsp;" )
                        )

                    // all done; append the key to the row
                    $row.append( $main_key );
                }

            } );

            // all done; append the row to the keyboard
            $keyboard.append( $row );

        } );

        // keyboard generated
        // clear the existing keyboard div
        self.$el.keyboard_layout.empty();
        // append the new layout to the keyboard div
        self.$el.keyboard_layout.html( $keyboard );

        // last but not least, update the space jquery element reference
        self.$el.space = self.$el.keyboard_layout.find("#key_32");

    },

    // initializes lessons for the selected keyboard layout
    initLayoutLessons: function () {

        var self = this; // save reference
        
        console.log("Porumai! will init lessons for ", Hotcold.layout, Lessons[Hotcold.layout] );

        // generate lesson (in reverse) to prepend properly
        var lessons = _.chain( Lessons[Hotcold.layout] )
                        .reverse()
                        .value();

        // clear the lesson headers (except the custom course)
        self.$el.lesson_headers.find(".lesson-header").remove();

        // empty lesson details
        self.$el.lesson_details.find(".lesson-detail").remove();

        var lh_template = _.template( self.$el.template_lh.html() );
        
        _.each( lessons, function (lesson) {
            // display the lesson headers
            self.$el.lesson_headers.prepend( $( lh_template(lesson) ) );
            
            // get the course template string
            var ci_template = _.template( self.$el.template_ci.html() );

            // display the course row
            var $course_row = $("<div>")
                                    .attr("id", lesson.row_id)
                                    .addClass("lesson-detail tab-pane");

            // append the courses to the course row
            _.each( lesson.courses, function (course) {
                var $course = $( ci_template(course) );
                // attach the course details to the launch button
                $course
                    .find(".launch-course")
                    .data("hc-course", JSON.stringify(course) );

                $course_row.append( $course ); 
            } );

            // append the course row
            self.$el.lesson_details.prepend( $course_row );

        } );

        // click the first lesson
        self.$el.lesson_headers.find(".lesson-header").first().find("a").click();
    },

    // ----------------------------------------------------
    // START: HELPER FUNCTIONS

    isFullScreen: function () {
        // ref: http://stackoverflow.com/a/7855739/1410291
        if ( !window.screenTop && !window.screenY ) {
            return true;
        }

        return false;
    },

    requestFullScreen: function () {
        var el = document.getElementById( "course_window" ),
            rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen;

        // call the appropriate function
        rfs.call( el );
    },

    cancelFullScreen: function () {
        document.cancelFullScreen = document.webkitExitFullscreen || document.mozCancelFullScreen || document.exitFullscreen;
        document.cancelFullScreen();
    },

    isProModeAllowed: function () {
        // check if the free course time is selected
        if ( HC_CONFIG.APPMODE == "PRO" ) {
            return true;
        }
        return this.$el.free_time.is( ":checked" );
    },

    getProModeInfo: function () {

        var msg = "You can specify a custom time for your own course in PRO version. Get the Chrome App for the Pro Version!";

        var $holder = $( "<div>" )
                        .html( HC_CONFIG.messages[ HC_CONFIG.type ] || msg );

        var $b_holder = $( "<div>" )
                            .addClass("text-center");

        var $button = $( "<a>" )
            .attr( "href", HC_CONFIG.PRO_CRX_URL )
            .attr( "target", "_blank" )
            .addClass( "btn btn-primary" )
            .html( "Download" )
            .appendTo( $b_holder );

        $holder.append( $b_holder );

        return $holder.get( 0 );

    },

    // END: HELPER FUNCTIONS
    // ----------------------------------------------------

    initAppMode: function () {
        HC_CONFIG.APPMODE == "FREE" ? this.initFreeMode() : this.initProMode();
        // also if not web version, for now hide the full screen button
        if (HC_CONFIG.type != "web") {
            this.$el.fs_toggle.hide();
            this.$el.web_home.hide();
        } else {
            this.$el.web_home.show();
        }
    },

    initFreeMode: function () {

        var self = this; // save reference

        this.$el.pro_label
            .text( "PRO" )
            .addClass( "label label-primary" );

        // init the popups
        this.$el.pro_label
            .popover( {
                container: "body",
                title: "Get PRO App",
                content: "You can specify a custom time for your own course in PRO App",
                html: true,
                trigger: "manual",
                placement: "auto"
            } );

        this.$el.pro_label.hover( function () {
            $( this ).popover( "show" );
        }, function () {
            $( this ).popover( "hide" );
        } );

        // also init the popover on the prepare & launch button
        this.$el.prepare_lesson
            .popover( {
                container: "body",
                title: "Get PRO Version",
                // content: "<div>You can specify a custom time for your own course in PRO version.<div class='text-center'><button class='btn btn-primary'>Download</button></div></div>",
                content: self.getProModeInfo(),
                html: true,
                trigger: "manual",
                placement: "auto"
            } );

        this.$el.body.click( function ( e ) {
            if ( e.target.id == "custom_lesson_launch" ) {
                e.preventDefault();
                return;
            }
            self.$el.prepare_lesson.popover( "hide" );
        } );

    },

    initProMode: function () {
        console.log( "Porumai! initing PRO mode" );
    },

    initHelpGuide: function () {

        var self = this; // save reference

        // init the helpguide modal
        this.$el.guide_modal.modal( {
            show: false
        } );

        // help guide
        this.$el.guide.click( function () {
            
            console.log( "will show help guide" );
            $.get("help.html", function (data) {
                // got the help data content
                self.$el.guide_content.html( data );
                // show the modal
                self.$el.guide_modal.modal("show");
            });
            
        } );

    },

    initializeEvents: function () {

        var self = this; // save reference

        console.log( "initing events ", this, this.$el.d_theme );

        this.initHelpGuide();

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

        // set the night theme manually for the first time
        self.set_night_theme();

        // go to course home
        this.$el.c_home.click( function () {
            console.log( "clicking course home" );
            Hotcold.reset();
            Hotcold.curr_course.clean_window();

            self.$el.c_win.hide();
            self.$el.c_tab.show();

            self.cancelFullScreen();
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

            self.cancelFullScreen();
        } );

        this.$el.fs_toggle.click( function () {
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

        this.$el.lesson_details.on("click", ".launch-course", function () {
            console.log( $.parseJSON( $(this).data("hc-course") ) );
            var course_details = $.parseJSON( $(this).data("hc-course") );
            Hotcold.curr_course = new Course();
            Hotcold.curr_course.init( course_details );
            self.$el.c_tab.hide();
            self.$el.c_win.fadeIn();
            self.requestFullScreen();
        });

        return;

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

            var CLI_LENGTH = $( this ).val().trim().length;

            if ( CLI_LENGTH > 0 ) {
                self.$el.no_input.hide();
                self.$el.clear_cli_input.show();
                // remove the red border warning
                self.$el.cli.removeClass( "no-input" );
            } else {
                self.$el.no_input.show();
                self.$el.clear_cli_input.hide();
            }
            self.$el.char_length.html( CLI_LENGTH );
        } );

        this.$el.prepare_lesson.click( function () {

            if ( self.$el.custom_lesson.val().trim().length == 0 ) {
                self.$el.no_input.show();
                self.$el.clear_cli_input.hide();
                // add the red border warning
                self.$el.cli.addClass( "no-input" );
            } else {
                // remove the red border warning
                self.$el.cli.removeClass( "no-input" );
                // before launching the custom lesson check if custom time is allowed
                if ( !self.isProModeAllowed() ) {
                    console.log( "PORUMAI! APP IS IN FREE MODE" );
                    // show the popover
                    $( this ).popover( "show" );
                    // DO NOT PROCEED   
                    return;
                }

                //there is an input; prepare custom lesson
                Hotcold.curr_course = new Course();
                Hotcold.curr_course.init( 0 );
                self.$el.c_tab.hide();
                self.$el.c_win.fadeIn();
            }

        } );

        this.$el.custom_duration.on( "change", function () {
            var cd = parseInt( $( this ).val(), 10 );
            self.$el.cd_ph.text( cd );

            var base_chars = 125,
                easy_chars = cd * base_chars,
                medium_chars = cd * 2 * base_chars;

            self.$el.cd_easy_ph.text( easy_chars );
            self.$el.cd_medium_ph.text( easy_chars + " - " + medium_chars );
            self.$el.cd_hard_ph.text( medium_chars );
        } );

        // clearing the input box
        this.$el.clear_cli_input.on( "click", function () {
            console.log( "Porumai! will clear the custom input" );
            self.$el.cli.val( "" );
            // trigger a keyup
            self.$el.cli.trigger( "keyup" );
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

        this.$el.themes
            .removeClass( "current-theme" );

        this.$el.d_theme
            .addClass( "current-theme" );

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
        Hotcold.canvas_ref_line = Theme[ Theme.current ].canvas_ref_line;

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

        this.$el.themes
            .removeClass( "current-theme" );

        this.$el.n_theme
            .addClass( "current-theme" );

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
        Hotcold.canvas_ref_line = Theme[ Theme.current ].canvas_ref_line;

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

},{"../../config.json":1,"../../lessons/lessons.json":12,"./Canvas.js":2,"./Course.js":3,"./Hotcold.js":4,"./Theme.js":5,"./Timer.js":6,"./finger_patterns.json":8,"./jquery_el.js":9,"./key_patterns.json":10,"./layouts.json":11}],8:[function(require,module,exports){
module.exports={
    "qwerty": {
        "0": 10,
        "1": 1,
        "2": 2,
        "3": 3,
        "4": 4,
        "5": 4,
        "6": 7,
        "7": 7,
        "8": 8,
        "9": 9,
        " ": 5,
        "!": 11,
        "\"": 18,
        "#": 13,
        "$": 14,
        "%": 14,
        "&": 15,
        "'": 10,
        "(": 17,
        ")": 18,
        "*": 16,
        "+": 18,
        ",": 8,
        "-": 10,
        ".": 9,
        "/": 10,
        ":": 18,
        ";": 10,
        "<": 16,
        "=": 10,
        ">": 17,
        "?": 18,
        "@": 12,
        "A": 11,
        "B": 14,
        "C": 13,
        "D": 13,
        "E": 13,
        "F": 14,
        "G": 14,
        "H": 15,
        "I": 16,
        "J": 15,
        "K": 16,
        "L": 17,
        "M": 15,
        "N": 15,
        "O": 17,
        "P": 18,
        "Q": 11,
        "R": 14,
        "S": 12,
        "T": 14,
        "U": 15,
        "V": 14,
        "W": 12,
        "X": 12,
        "Y": 15,
        "Z": 11,
        "[": 10,
        "\\": 10,
        "]": 10,
        "^": 15,
        "_": 18,
        "a": 1,
        "b": 4,
        "c": 3,
        "d": 3,
        "e": 3,
        "f": 4,
        "g": 4,
        "h": 7,
        "i": 8,
        "j": 7,
        "k": 8,
        "l": 9,
        "m": 7,
        "n": 7,
        "o": 9,
        "p": 10,
        "q": 1,
        "r": 4,
        "s": 2,
        "t": 4,
        "u": 7,
        "v": 4,
        "w": 2,
        "x": 2,
        "y": 7,
        "z": 1,
        "{": 18,
        "|": 18,
        "}": 18
    },

    "dvorak": {
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": "",
        "": ""
    }

}

},{}],9:[function(require,module,exports){
// all the jquery elements of the Hotcold app
var $el = {

    body: $("body"),

    guide: $("#help-guide"),
    guide_modal: $("#help-guide-modal"),
    guide_content: $("#help-guide-content"),

    c_home: $( '#back_to_course_button' ),
    lv: $( '#lesson_view' ),
    c_win: $( '#course_window' ),
    c_tab: $( '#course_tab' ),
    c_course: $( '#create_course_tab' ),

    lesson_headers: $(" #lesson-headers "),
    lesson_details: $(" #lesson-details "),

    template_lh: $("#lesson-header-template"),
    template_ci: $( "#course-info-template" ),

    d_theme: $( '#day_theme' ),
    n_theme: $( '#night_theme' ),
    themes: $(".theme"),

    keys: $( '.keys' ),
    keyboard_layout: $( "#keyboard_layout" ),
    f_canvas_holder: $( '#finger_canvas_holder' ),
    f_span_holder: $("#fin_spans"),
    backlit: $( '.backlit' ),
    s_block: $( '#saved_block' ),

    right_shift: $( "#shift_right" ),
    left_shift: $( "shift_left" ),

    course_time: $( '#course_time' ),
    free_time: $("#free_course_time"),

    custom_time: $("#custom_course_time"),
    custom_duration: $("#custom_course_duration"),

    cd_ph: $(".custom_duration_placeholder"),
    cd_easy_ph: $(".custom_duration_easy_placeholder"),
    cd_medium_ph: $(".custom_duration_medium_placeholder"),
    cd_hard_ph: $(".custom_duration_hard_placeholder"),

    pro_label: $(".pro-label"),

    nav_bar: $("#hotcold-navigation-bar"),

    fs_toggle: $("#fullscreen-toggle"),
    web_home: $("#web-home"),
    
    canvas_a: $( '#a' ),
    canvas_b: $( '#b' ),
    c_div: $( "#c" ),
    c_section: $(".c_section"),

    scroll_thumb: $("::-webkit-scrollbar-thumb"),
    scroll_bar: $("::-webkit-scrollbar"),

    dtp: $( '#day_theme_preview' ),
    ntp: $( '#night_theme_preview' ),

    pause_button: $("#pause_button"),
    resume_button: $("#resume_button"),

    completed_button: $("#completed_button"),
    completed_div: $("#completed"),

    redo_course: $( '#redo_button' ),
    abort: $( '#abort_button' ),

    custom_lesson: $( '#custom_lesson_input' ),
    char_length: $( '#total_characters' ),

    no_input: $( '#no_input_error' ),
    cli: $( '#custom_lesson_input' ),
    clear_cli_input: $("#clear_custom_lesson_input"),
    

    prepare_lesson: $( '#custom_lesson_launch' ),
    

    space: $( '#key_32' ),
    space_to_start: $( '#space_to_start' ),
    space_to_resume: $( '#space_to_resume' ),

    $min_div: $( '#min' ),
    $sec_div: $( '#sec' ),

    type_speed: $("#type_speed"),
    net_type_speed: $("#net_type_speed"),
    accuracy: $("#accuracy"),

    ci: $( '#completion_indicator' ),
    ts: $( '#time_saved' ),
    c_label: $("#c_label"),

    finger_1: $( '#fin_1' ),
    finger_2: $( '#fin_2' ),
    finger_3: $( '#fin_3' ),
    finger_4: $( '#fin_4' ),
    finger_5: $( '#fin_5' ),
    finger_6: $( '#fin_6' ),
    finger_7: $( '#fin_7' ),
    finger_8: $( '#fin_8' ),
    finger_9: $( '#fin_9' ),
    finger_10: $( '#fin_10' ),

    finger: $( '.finger' )

};

module.exports = $el;

},{}],10:[function(require,module,exports){
module.exports={
    "qwerty": {
        "right": [
            126,
            33,
            64,
            35,
            36,
            37,
            81,
            87,
            69,
            82,
            84,
            65,
            83,
            68,
            70,
            71,
            90,
            88,
            67,
            86,
            66
        ],
        "left": [
            94,
            38,
            42,
            40,
            41,
            45,
            43,
            66,
            89,
            85,
            73,
            79,
            80,
            123,
            125,
            124,
            72,
            74,
            75,
            76,
            58,
            34,
            78,
            77,
            60,
            62,
            63
        ]
    }
}

},{}],11:[function(require,module,exports){
module.exports={
    "qwerty": {
        
        "num_row": [
            {
                "keys": ["~", "`"]
            },
            {
                "keys": ["!", "1"]
            },
            {
                "keys": ["@", "2"]
            },
            {
                "keys": ["#", "3"]
            },
            {
                "keys": ["$", "4"]
            },
            {
                "keys": ["%", "5"]
            },
            {
                "keys": ["^", "6"]
            },
            {
                "keys": ["&", "7"]
            },
            {
                "keys": ["*", "8"]
            },
            {
                "keys": ["(", "9"]
            },
            {
                "keys": [")", "0"]
            },
            {
                "keys": ["_", "-"]
            },
            {
                "keys": ["+", "="]
            },
            {
                "special": "true",
                "id": "bksp_key",
                "keys": ["Bksp", ""]
            }
        ],

        "top_row": [

            {
                "special": "true",
                "id": "tab_key",
                "keys": ["Tab", ""]
            },

            {
                "keys": ["Q", ""]
            },

            {
                "keys": ["W", ""]
            },

            {
                "keys": ["E", ""]
            },

            {
                "keys": ["R", ""]
            },

            {
                "keys": ["T", ""]
            },

            {
                "keys": ["Y", ""]
            },

            {
                "keys": ["U", ""]
            },

            {
                "keys": ["I", ""]
            },

            {
                "keys": ["O", ""]
            },

            {
                "keys": ["P", ""]
            },

            {
                "keys": ["{", "["]
            },

            {
                "keys": ["}", "]"]
            },

            {
                "keys": ["|", "\\"]
            },

        ],

        "middle_row": [

            {
                "special": "true",
                "id": "caps_key",
                "keys": ["Caps", ""]
            },

            {
                "keys": ["A", ""]
            },

            {
                "keys": ["S", ""]
            },

            {
                "keys": ["D", ""]
            },

            {
                "keys": ["F", ""]
            },

            {
                "keys": ["G", ""]
            },

            {
                "keys": ["H", ""]
            },

            {
                "keys": ["J", ""]
            },

            {
                "keys": ["K", ""]
            },

            {
                "keys": ["L", ""]
            },

            {
                "keys": [":", ";"]
            },

            {
                "keys": ["\"", "'"]
            },

            {
                "special": "true",
                "id": "enter_key",
                "keys": ["Enter", ""]
            }            

        ],

        "bottom_row": [

            {
                "special": "true",
                "id": "shift_left",
                "keys": ["Shift", ""]
            },

            {
                "keys": ["Z", ""]
            },

            {
                "keys": ["X", ""]
            },

            {
                "keys": ["C", ""]
            },

            {
                "keys": ["V", ""]
            },

            {
                "keys": ["B", ""]
            },

            {
                "keys": ["N", ""]
            },

            {
                "keys": ["M", ""]
            },

            {
                "keys": ["<", ","]
            },

            {
                "keys": [">", "."]
            },

            {
                "keys": ["?", "\/"]
            },

            {
                "special": "true",
                "id": "shift_right",
                "keys": ["Shift", ""]
            },

        ],

        "space_row": [

            {
                "special": "true",
                "id": "ctrl_left",
                "keys": ["Ctrl", ""]
            },

            {
                "special": "true",
                "id": "alt_left",
                "keys": ["Alt", ""]
            },

            {
                "special": "true",
                "id": "key_32",
                "keys": ["", ""]
            },

            {
                "special": "true",
                "id": "ctrl_right",
                "keys": ["Ctrl", ""]
            },

            {
                "special": "true",
                "id": "alt_right",
                "keys": ["Alt", ""]
            }

        ]

    }
}
},{}],12:[function(require,module,exports){
module.exports={
    "qwerty": [
        {

            "name": "Home Row, G, H",
            "row_id": "qwerty-home-row",
            "courses": [
                {
                    "id": 1,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces the home row keys and keys G and H. Home row keys are: a, s, d, f, j, k, l and ;. Learn the key positions and appropriate fingers to type these keys.",
                    "course_text": "asdf jkl; aa ss dd ff jj kk ll ;; adsf jlk; asdfg hjkl; gg hh gg hh aa dd ss ff jj ll kk ;; ff gg hh jj gf hj fg jh fj gh ghfj fjgh gghh ffjj fgfg jhjh ffgg jjhh aa hh ;; gg jj ff ss ll dd kk ss hh ll gg a; sl dk fj gh a; ls dk jf gh asdfg ;lkjh"
                },

                {
                    "id": 2,
                    "name": "Word practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice home row keys, G, H by typing simple words",
                    "course_text": "as all add ash all glad add dash all sad sad as dad glad as dad salsa lalalaa dallas flag alaska flag sad kafka glad kafka lakh flak half dash gas dash half flask ask glad dad ask sad dad dad had kafka had all kafka glad lad sad lad alaska lad glad dallas lad sad alaska lad sad dallas lad glad all lad glad all lad sad"
                }
            ]
        },
        {

            "name": "Capital Letters", 
            "row_id": "qwerty-capital-letters",
            "courses": [
                {
                    "id": 3,
                    "name": "Introducing Shift key",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "Shift key is used to type capital letters. Learn the key position and appropriate finger to type the shift key in this course. Practice typing home row keys in both capital and small letters.",
                    "course_text": "ASDF JKL; Aa Ss Dd Ff Jj Kk Ll ;; aDsF JlK; aSDfg hJKl; gG hH Gg Hh aA dD sS fF jJ lL kK ;; fF Gg Hh jJ gF Hj fG jH FJ gh GhFj FjGh GgHh FfJj fgFG jhJH fFgG jJhH Aa Hh ;; Gg Jj Ff Ss Ll Dd Kk Ss Hh Ll Gg A; SL DK FJ GH A; lS Dk jF gH ASDFG ;LKJH"
                },

                {
                    "id": 4,
                    "name": "Word practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice Shift key by typing simple words with both capital and small letters",
                    "course_text": "AS ALL Add Ash All Glad add Dash all Sad SAD as DAD GLAD as DAD SalsA LaLaLaA DaLLas FLAG ALASka flag sad KAFKA glad KAFKA Lakh Flak Half Dash Gas Dash Half Flask ASK glad DAD ask sad dad Dad Had Kafka Had All Kafka Glad Lad Sad Lad Alaska LAD Glad Dallas Lad Sad Alaska Lad Sad Dallas Lad Glad ALL LAD GLAD ALL LAD SAD"
                }
            ]

        },
        {

            "name": "keys E, I, R, U", 
            "row_id": "qwerty-keys-eiru",
            "courses": [
                {
                    "id": 5,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces the keys E, I, R, U. Learn the key positions and appropriate finger to type these keys.",
                    "course_text": "dede kiki eded ikik dDeE kKiI eEdD iIkK eidk dkei ekid ekid frju frju rfuj rfuj RrUu RrUu RUru RUru erui erui uire uire eiru eiru ruei ruei edfr ujik edrf ujik dfer dfer jkui jkui fger jhiu fger jhiu GRgr HUhu GRgr HUhu reRE reRE uiUI uiUI rReE uUiI rReE uUiI"
                },

                {
                    "id": 6,
                    "name": "Word Practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "",
                    "course_text": "eureka skill if skill freud else fraud rural federal fraud useful fiddle useless life failure sugarlike farside duskier surreal ural isle fragile jailer real hurdle sharked redfish laughs sugared sulfide ruse useful fluid fuse asia safari ski red iris diesel fire field fluid redial failsafe adelaide file desk lead seal see sleek leaf red aura alike kids"
                }
            ]
            
        },
        {

            "name": "keys T, O, C, comma", 
            "row_id": "qwerty-keys-toc",
            "courses": [
                {
                    "id": 7,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces the keys T, O, C and ,(Comma). Learn the key positions and appropriate finger to type these keys.",
                    "course_text": "ftft lolo ftft lolo fFtT lLoO fFtT lLoO dcdc k,k, dcdc k,k, dDcC dDcC k,K, k,K, ddcc kk,, ddcc kk,, tctc o,o, tctc o,o, ttcc oo,, ttcc oo,, cCdD cCdD ,k,K ,k,K fFtT lLoO fFtT lLoO ftft lolo ftft lolo fFtT lLoO fFtT lLoO dcdc k,k, dcdc k,k, dDcC dDcC k,K, k,K, ttcc tTcC oO,, oO,, toto TOTO c,c, CCTO"
                },

                {
                    "id": 8,
                    "name": "Word Practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice keys T, O, C and ,(Comma) by typing simple words",
                    "course_text": "elucidate circus disgraceful soul to tie, out of foot colorado circus effect tickle crocodile cataract casual access to the deck later, resort to clerical class decode circle ratio kettle for karate trout cute cat, out of focus coffee out of cocoa, for tailor lifeguard outraged after shock authorise access to the feudalist lethargic cheat, curious article jostle fast, audio lost leaf rustle, cracker effect"
                }
            ]
            
        },
        {

            "name": "keys V, N, W, M", 
            "row_id": "qwerty-keys-vnwm",
            "courses": [
                {
                    "id": 9,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces the keys V, N, W, M. Learn the key positions and appropriate finger to type these keys",
                    "course_text": "fvfv jnjn fvfv jnjn ffvv jjnn ffvv jjnn swsw jmjm swsw jmjm ssww jjmm ssww jjmm vfnj vfnj vvff nnjj wwss mmjj wwss mmjj vVfF nNjJ wWsS mMjJ vVwW vVwW nNmM nNmM wmWM wmWM nvNV nvNV nnww nnww vvmm vvmm nNwW nNwW vVmM vVmM swfv jnjm swfv jnjm jvjm jvjm swsv swsv wWmM vVnN wvWV nmNM vvVV nnNN wwWW mmMM"
                },

                {
                    "id": 10,
                    "name": "Word Practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice keys V, N, W, M by typing simple words",
                    "course_text": "welcome meet me in manila not in vancouver overhauling warehouse dangerous glamour virtual Niles near Niagara sparrow missed narrow meadow Moscow wonder Wales winter saw Viking native near Nevada river maestro near magnet window throw minimum welcome varnish valve for nine vehicles eleven snowman near Manila jewel mania missed wallet wild fishmonger journalism virtual world for man"
                }
            ]
            
        },
        {

            "name": "keys Q, P, B, Y", 
            "row_id": "qwerty-keys-qpby",
            "courses": [
                {
                    "id": 11,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces the keys Q, P, B, Y. Learn the key positions and appropriate finger to type these keys",
                    "course_text": "aqaq ;p;p aqaq ;p;p aaqq ;;pp aaqq ;;pp ffbb jjyy bbff yyjj fbaq jy;p fbaq jy;p qQaA pP;; bByY bByY fbFB jyJY bBfF yYjJ fgbq jhyp qqbb ppyy qQbB pPyY bBqQ yYpP byBY byBY qpQP QPqp QPQP QPQP BYBY BYBY byby BYBY qpqp QPQP bbff BFBF jyjy JYJY qbqb QBQB pyPY pyPY bbyy bByY qpqp qPqP qpqp QPQP byby BYBY"
                },

                {
                    "id": 12,
                    "name": "Word Practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice keys Q, P, B, Y by typing simple words",
                    "course_text": "imponderably malnourished prepare quick equip power blaspheming filmography palindrome but jumble undesirably superfamily presumingly dangerous nasty yesterday dynasty pompous broadway request panama playground your royalty phillips queen dangerous grayhound opaque soap busy opera your yoga fluency paris party squire etiquette blueberry baby square barrel busy diary year maybe Bye Bye"
                }
            ]
            
        },
        {

            "name": "keys Z, X, period, ?", 
            "row_id": "qwerty-keys-zx",
            "courses": [
                {
                    "id": 13,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces the keys Z, X, .(period), ?(question mark). Learn the key positions and appropriate finger to type these keys",
                    "course_text": "azaz sxsx azaz sxsx aazz aazz ssxx ssxx zzxx .?.? zzxx ..?? zZaA xXsS aAzZ sSxX as? as? sax. sax. zasx zasx ZASX ZASX z?z? Z?Z? l.l. L.L. z?z? x.x. Z?Z? X.X. zaza ZAZA xsxs XSXS zasx. zasx? zasx. zasx? ZZXX zzxx zZ. zZ? xxzz XXZZ xz. XZ? a? a? s. s. z? z? x? x. zx.? zx.? ZX.? ZX.? zaza xsxs ZAZA XSXS la. la. laz? laz? ZZXX zzxx zZ. zZ?"
                },

                {
                    "id": 14,
                    "name": "Word Practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice keys Z, X, .(period), ?(question mark) by typing simple words",
                    "course_text": "jazz fixture zurich ? amazing wax fox ? flexible bazaar. zambia xylophone mixup ? zaire lizard tuxedo ? amazing zero pixel ? sixty annexure. azure buzzer. exact lexicon lizard ? jazz fox fly mixup ? sixty exact lexicon lizard. amazing zero jazz fox. jazz sax ? sax jazz. wax xylophone mixup ? amazing citizen ? zero. bazaar flexible fixture wax xylophone zurich lizard flexible ? amazing."
                }
            ]
            
        },
        {

            "name": "Numbers", 
            "row_id": "qwerty-numbers",
            "courses": [
                {
                    "id": 15,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces the number keys (top row). Learn the key positions and appropriate finger to type these keys",
                    "course_text": "aq1 a1 q1 aq1 sw2 s2 w2 sw2 de3 d3 e3 de3 fr4 f4 r4 fr4 gt5 g5 t5 gt5 hy6 h6 y6 hy6 ju7 j7 u7 ju7 ki8 k8 i8 ki8 lo9 l9 o9 lo9 ;p0 ;0 p0 ;p0"
                },

                {
                    "id": 16,
                    "name": "Word Practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice typing simple words containing numbers",
                    "course_text": "1 is one. one is 1. 2 is two. two is 2. 1 plus 2 is 3. 1 plus 3 is 4. 2 plus 2 is also 4. 3 plus 2 is 5. 1 plus 4 is also 5. 2 plus 4 is 6. 3 plus 3 is also 6. 1 plus 5 is what ? 2 plus 5 is 7. 4 plus 3 is also 7. 1 plus 2 plus 4 is what ? 2 times 4 is 8. 3 plus 5 is also 8. 6 plus 2 is what ? 3 times 3 is 9. 9 is a square. 5 plus 4 is what ? 0 is a special number. 0 before number is number but, 0 after number ? 0 is the real hero."
                }
            ]
            
        },
        {

            "name": "Special characters", 
            "row_id": "qwerty-special-chars",
            "courses": [
                {
                    "id": 17,
                    "name": "Keys Introduction",
                    "duration": "3",
                    "level": "easy",
                    "line_length": 30,
                    "description": "This course introduces special characters and symbols. Learn the key positions and appropriate finger to type these keys",
                    "course_text": "aq1! a! q! 1! aq1! sw2@ s@ w@ 2@ sw2@ de3# d# e# 3# de3# fr4$ f$ r$ 4$ fr4$ gt5% g% t% 5% gt5% hy6^ h^ y^ 6^ hy6^ ju7& j& u& 7& ju7& ki8* k* i* 8* ki8* lo9( l( o( 9( lo9( ;p0) ;) p) 0) ;p0) ;: ;: ;' ;\" ;\\ ;[ ;{ ;] ;} ;- ;_ ;= ;+ k, k, k< k< l. l. l> l> ;? ;? ;/ ;/"
                },

                {
                    "id": 18,
                    "name": "Word Practice",
                    "duration": "3",
                    "level": "medium",
                    "line_length": 30,
                    "description": "Practice typing simple words containing special characters and symbols",
                    "course_text": "Hello ! Welcome ! email@domain.com # represents number 4$ is too much. 5% of 100 is what ? ^ is not carrot. & is and. * is star. 3*3 is what ? (90)*0 is what ? 4 + 4 = 3? 7 - 8 is positive ! [] are square brackets; {} are braces; Is 'you' really \"you\"? if (zero == '0') then true; 1 < 0 is true ! 0 > 9 is also true ?"
                }
            ]
            
        },
        {

            "name": "All keys practice", 
            "row_id": "qwerty-all-keys",
            "courses": [
                {
                    "id": 19,
                    "name": "The Road Not Taken",
                    "duration": "5",
                    "level": "medium",
                    "line_length": 30,
                    "description": "The legendary classical poem 'The Road Not Taken' by Robert Frost",
                    "course_text": [
                        "The Road Not Taken",
                        "Two roads diverged in a yellow wood,",
                        "And sorry I could not travel both",
                        "And be one traveler, long I stood",
                        "And looked down one as far as I could",
                        "To where it bent in the undergrowth;",
                        "Then took the other, as just as fair,",
                        "And having perhaps the better claim,",
                        "Because it was grassy and wanted wear;",
                        "Though as for that the passing there",
                        "Had worn them really about the same,",
                        "And both that morning equally lay",
                        "In leaves no step had trodden black.",
                        "Oh, I kept the first for another day!",
                        "Yet knowing how way leads on to way,",
                        "I doubted if I should ever come back.",
                        "I shall be telling this with a sigh",
                        "Somewhere ages and ages hence:",
                        "Two roads diverged in a wood, and I-",
                        "I took the one less traveled by,",
                        "And that has made all the difference.",
                        "- Robert Frost."
                    ]
                },

                {
                    "id": 20,
                    "name": "Albert Einstein Quotes : Part 1",
                    "duration": "5",
                    "level": "hard",
                    "line_length": 30,
                    "description": "A collection of great quotes of Albert Einstein from wikiquote",
                    "course_text": "A happy man is too satisfied with the present to dwell too much on the future. Unthinking respect for authority is the greatest enemy of truth. Nature shows us only the tail of the lion. But there is no doubt in my mind that the lion belongs with it even if he cannot reveal himself to the eye all at once because of his huge dimension. How does it happen that a properly endowed natural scientist comes to concern himself with epistemology? Concepts that have proven useful in ordering things easily achieve such authority over us that we forget their earthly origins and accept them as unalterable givens. 'How much do I love that noble man More than I could tell with words I fear though he'll remain alone With a holy halo of his own.' Subtle is the Lord, but malicious He is not. I have second thoughts. Maybe God is malicious. In science, moreover, the work of the individual is so bound up with that of his scientific predecessors and contemporaries that it appears almost as an impersonal product of his generation. [I do not] carry such information in my mind since it is readily available in books....The value of a college education is not the learning of many facts but the training of the mind to think. I, at any rate, am convinced that He does not throw dice. As I have said so many times, God doesn't play dice with the world. Whether you can observe a thing or not depends on the theory which you use. It is the theory which decides what can be observed."
                },

                {
                    "id": 21,
                    "name": "Albert Einstein Quotes : Part 2",
                    "duration": "5",
                    "level": "hard",
                    "line_length": 30,
                    "description": "A collection of great quotes of Albert Einstein from wikiquote",
                    "course_text": "Try and penetrate with our limited means the secrets of nature and you will find that, behind all the discernible concatenations, there remains something subtle, intangible and inexplicable. Veneration for this force beyond anything that we can comprehend is my religion. To that extent I am, in point of fact, religious. I believe in Spinoza's God, Who reveals Himself in the lawful harmony of the world, not in a God Who concerns Himself with the fate and the doings of mankind. If A is success in life, then A = x + y + z. Work is x, play is y and z is keeping your mouth shut. Life is like riding a bicycle. To keep your balance you must keep moving. I believe that whatever we do or live for has its causality; it is good, however, that we cannot see through to it. To punish me for my contempt of authority, Fate has made me an authority myself. I never think of the future. It comes soon enough. It is my view that a vegetarian manner of living by its purely physical effect on the human temperament would most beneficially influence the lot of mankind. Why does this magnificent applied science which saves work and makes life easier bring us so little happiness? The simple answer runs: Because we have not yet learned to make sensible use of it. I believe in intuition and inspiration. … At times I feel certain I am right while not knowing the reason. When the eclipse of 1919 confirmed my intuition, I was not in the least surprised. In fact I would have been astonished had it turned out otherwise. Imagination is more important than knowledge. For knowledge is limited, whereas imagination embraces the entire world, stimulating progress, giving birth to evolution. It is, strictly speaking, a real factor in scientific research."
                },

                {
                    "id": 22,
                    "name": "Albert Einstein Quotes : Part 3",
                    "duration": "5",
                    "level": "hard",
                    "line_length": 30,
                    "description": "A collection of great quotes of Albert Einstein from wikiquote",
                    "course_text": "Everyone sits in the prison of his own ideas; he must burst it open, and that in his youth, and so try to test his ideas on reality. I see a clock, but I cannot envision the clockmaker. The human mind is unable to conceive of the four dimensions, so how can it conceive of a God, before whom a thousand years and a thousand dimensions are as one ? Only a life lived for others is a life worthwhile. Our experience hitherto justifies us in trusting that nature is the realization of the simplest that is mathematically conceivable. It can scarcely be denied that the supreme goal of all theory is to make the irreducible basic elements as simple and as few as possible without having to surrender the adequate representation of a single datum of experience. Everything should be made as simple as possible, but no simpler. All of science is nothing more than the refinement of everyday thinking. One may say 'the eternal mystery of the world is its comprehensibility. All religions, arts and sciences are branches of the same tree. All these aspirations are directed toward ennobling man's life, lifting it from the sphere of mere physical existence and leading the individual towards freedom. Physical concepts are free creations of the human mind, and are not, however it may seem, uniquely determined by the external world. Still, there are moments when one feels free from one's own identification with human limitations and inadequacies. At such moments, one imagines that one stands on some spot of a small planet, gazing in amazement at the cold yet profoundly moving beauty of the eternal, the unfathomable: life and death flow into one, and there is neither evolution nor destiny; only being'."
                }
            ]
            
        }
    ]
}
},{}]},{},[7]);
