(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
    "VERSION": "2.0.1",
    "APPMODE": "PRO",
    "PRO_CRX_URL": "https://chrome.google.com/webstore/detail/hotcold-typing-pro/aoceloicmloamkmaljmpejphndalilgp?hl=en-US",
    "type": "crx",
    "links": {
        "linux_32": "https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#newwindow=1&q=linux+32+bit",
        "linux_64": "https://www.dropbox.com/s/fy9wxqsn50i65bq/Hotcold-2.0.0-linux-x64.tar.gz?dl=1",
        "windows_32": "https://www.dropbox.com/s/fy9wxqsn50i65bq/Hotcold-2.0.0-linux-x64.tar.gz?dl=1",
        "windows_64": "https://www.dropbox.com/s/fy9wxqsn50i65bq/Hotcold-2.0.0-linux-x64.tar.gz?dl=1",
        "mac_64": "https://www.google.co.in/webhp?sourceid=chrome-instant&ion=1&espv=2&ie=UTF-8#newwindow=1&q=mac+64+bit",
        "dev_derby_blog_url": "https://hacks.mozilla.org/2013/06/announcing-the-winners-of-the-april-2013-dev-derby/",
        "dev_derby_hc_cached": "http://web.archive.org/web/20131107013950/https://developer.mozilla.org/en-US/demos/detail/hot-cold-typing",
        "dev_derby_down_link": "https://blog.mozilla.org/community/2015/12/18/saying-goodbye-to-demo-studio/",
        "github_link": "https://github.com/palerdot/hotcold"
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
var CourseWrapper = function ( HC, Canvas, $el, Timer ) {

    var Hotcold = HC,
        Canvas = Canvas,
        $el = $el,
        Timer = Timer;

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

            if ( i >= 48 && i <= 57 ) {

                //we have numbers (top row) assign them the appropriate divs    
                var code = get_numeric_div( i );
                temp = '#key_' + code;
                keys[ i ] = $( temp );
            }

            if ( i == 91 || i == 93 || i == 59 || i == 39 || i == 92 || i == 44 || i == 46 || i == 47 || i == 95 || i == 43 ) {
                var code = get_numeric_div( i );
                temp = '#key_' + code;
                keys[ i ] = $( temp );
            }

        }

        //initialize the course; get the contents from the json file and prepare the local variables;   

        this.init = function ( course_no ) {

            var self = this; // save reference

            switch ( course_no ) {

                case 0:

                    lesson = convertJson();
                    // we need to check if it is default 1 min or custom time
                    minutes = $el.free_time.is(":checked") ? 1 : $el.custom_duration.val();
                    self.prepare();

                    break;

                case 1:

                    $.getJSON( 'lessons/lesson1.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 1;

                    break;

                case 2:

                    $.getJSON( 'lessons/lesson2.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 3:

                    $.getJSON( 'lessons/lesson3.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 4:

                    $.getJSON( 'lessons/lesson4.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 5:

                    $.getJSON( 'lessons/lesson5.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 6:

                    $.getJSON( 'lessons/lesson6.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 7:

                    $.getJSON( 'lessons/lesson7.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 8:

                    $.getJSON( 'lessons/lesson8.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 9:

                    $.getJSON( 'lessons/lesson9.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 10:

                    $.getJSON( 'lessons/lesson10.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 11:

                    $.getJSON( 'lessons/lesson11.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 12:

                    $.getJSON( 'lessons/lesson12.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 13:

                    $.getJSON( 'lessons/lesson13.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 14:

                    $.getJSON( 'lessons/lesson14.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 15:

                    $.getJSON( 'lessons/lesson15.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 16:

                    $.getJSON( 'lessons/lesson16.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 17:

                    $.getJSON( 'lessons/lesson17.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 18:

                    $.getJSON( 'lessons/lesson18.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 3;

                    break;

                case 19:

                    $.getJSON( 'lessons/poem.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 5;

                    break;

                case 20:

                    $.getJSON( 'lessons/quotes1.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 5;

                    break;

                case 21:

                    $.getJSON( 'lessons/quotes2.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 5;

                    break;

                case 22:

                    $.getJSON( 'lessons/quotes3.json', function ( data ) {

                            $.each( data, function ( key, val ) {

                                lesson[ key ] = {};
                                lesson[ key ].code = val.code;
                                lesson[ key ].text = val.text;
                                lesson[ key ].pattern = val.pattern;

                            } );

                        } )
                        .done( function () { self.prepare(); } )
                        .fail( function ( data ) { /*console.log("error");*/ } );

                    minutes = 5;

                    break;

            } //end of switch case

        }; //end of init

        // prepare the course
        this.prepare = function () {

            // clean_canvas();
            Canvas.clean_canvas();
            //initiate the worker 

            helper = new Worker( 'js/hotcold_stat_helper.js' );

            helper.addEventListener( 'message', function ( event ) {

                var result = JSON.parse( event.data );

                $(result.highlight.div_id).removeClass();
                $(result.highlight.div_id).addClass( 'keys' )
                $(result.highlight.div_id).addClass( result.highlight.div_class );

                keys[ result.highlight.code ].removeClass();
                keys[ result.highlight.code ].addClass( 'keys' );
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

            if ( ( code >= 65 && code <= 71 ) || ( code >= 81 && code <= 84 ) || ( code >= 86 && code <= 88 ) || code == 90 ) {
                Hotcold.right_shift = true;
                r_shift.addClass( 'backlit' );
            }

            if ( ( code >= 72 && code <= 80 ) || code == 85 || code == 89 ) {
                Hotcold.left_shift = true;
                l_shift.addClass( 'backlit' );
            }

            //add for special characters
            // let us first deal with special characters that need right shift highlight
            var r_shift_special_char_codes = [33, 64, 35, 36, 37];
            if ( $.inArray(code, r_shift_special_char_codes) > -1 ) {
                Hotcold.right_shift = true;
                r_shift.addClass("backlit");
            }

            // now let us deal with special chars for which left shift highlight is needed
            var l_shift_special_char_codes = [94, 38, 42, 40, 41, 95, 43, 123, 124, 125, 58, 34, 60, 62, 63];
            if ( $.inArray(code, l_shift_special_char_codes) > -1 ) {
                Hotcold.left_shift = true;
                l_shift.addClass("backlit");
            }

            keys[ code ].addClass( 'backlit' );

            Hotcold.prev_key = code;

        }
        // END: Highlight key

        // START: get_numeric_div
        //module to get the right div ids for numbers and special characters;
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

                case 95:
                    return 45;

                case 43:
                    return 61;

            }

        }
        // END: get_numeric_div

        // START: convertJson module
        function convertJson() {

            var custom_lesson = $el.cli.val().trim();

            var newString = custom_lesson.replace( /\r?\n|\r/g, " " );

            var str = new String( newString );

            var start_index = 0;
            var last_index = 30;
            var point = 30;

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
                            var pattern = get_pattern( code );
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
                            var pattern = get_pattern( code );
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
                            var pattern = get_pattern( code );
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
                    var pattern = get_pattern( code );
                    converted[ index ].pattern.push( pattern );
                    converted[ index ].code.push( code );
                }

            }

            return converted;

            //returns finger highlighting pattern

            //1-10 correponding finger from left to right
            //11-14 right shift plus left hand four fingers
            //15-18 left shift plus right hand four fingers
            function get_pattern( code ) {

                switch ( code ) {

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

            } //end of get_pattern module

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
    Theme = require( "./Theme.js" ),
    Canvas = require( "./Canvas.js" )( Hotcold, jquery_el, Theme ),
    Timer = require( "./Timer.js" )( Hotcold, jquery_el, Theme, Canvas ),
    Canvas = require( "./Canvas.js" )( Hotcold, jquery_el, Theme ),
    Course = require( "./Course.js" )( Hotcold, Canvas, jquery_el, Timer );

var HC_CONFIG = require( "../../config.json" );

var APP = {

    $el: jquery_el,

    start: function () {
        console.log( "config ", HC_CONFIG );
        this.initializeEvents();
        this.initAppMode();
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

},{"../../config.json":1,"./Canvas.js":2,"./Course.js":3,"./Hotcold.js":4,"./Theme.js":5,"./Timer.js":6,"./jquery_el.js":8}],8:[function(require,module,exports){
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

    d_theme: $( '#day_theme' ),
    n_theme: $( '#night_theme' ),
    themes: $(".theme"),

    keys: $( '.keys' ),
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
    
    canvas_a: $( '#a' ),
    canvas_b: $( '#b' ),
    c_div: $( "#c" ),
    c_section: $(".c_section"),

    scroll_thumb: $("::-webkit-scrollbar-thumb"),
    scroll_bar: $("::-webkit-scrollbar"),

    dtp: $( '#day_theme_preview' ),
    ntp: $( '#night_theme_preview' ),

    lc_temp: $( '#launch_course_temp' ),

    lc1: $( '#launch_course_1' ),
    lc2: $( '#launch_course_2' ),
    lc3: $( '#launch_course_3' ),
    lc4: $( '#launch_course_4' ),
    lc5: $( '#launch_course_5' ),
    lc6: $( '#launch_course_6' ),
    lc7: $( '#launch_course_7' ),
    lc8: $( '#launch_course_8' ),
    lc9: $( '#launch_course_9' ),
    lc10: $( '#launch_course_10' ),
    lc11: $( '#launch_course_11' ),
    lc12: $( '#launch_course_12' ),
    lc13: $( '#launch_course_13' ),
    lc14: $( '#launch_course_14' ),
    lc15: $( '#launch_course_15' ),
    lc16: $( '#launch_course_16' ),
    lc17: $( '#launch_course_17' ),
    lc18: $( '#launch_course_18' ),

    lp: $( '#launch_poem' ),
    lq1: $( '#launch_quote_1' ),
    lq2: $( '#launch_quote_2' ),
    lq3: $( '#launch_quote_3' ),

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
    sp1: $( '#show_all_key_page_1' ),
    sp2: $( '#show_all_key_page_2' ),
    akp1: $( '#all_key_page_1' ),
    akp2: $( '#all_key_page_2' ),

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

},{}]},{},[7]);
