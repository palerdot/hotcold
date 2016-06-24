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

            Hotcold.canvas_a.x += 5;
            Hotcold.canvas_b.x += 5;

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

            fin_image.src = "images/viral-copy.gif";

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
