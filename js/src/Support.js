//check if the browser supports canvas and web workers
$( document ).ready( function () {
    function canvas_support() {
        return !!document.createElement( 'canvas' ).getContext;
    }

    function web_worker_support() {
        return !!window.Worker;
    }
    var s_text = '';
    var r_info = $( '#read_info' );
    if ( !canvas_support() && !web_worker_support() ) {
        s_text = 'Your browser does not support web workers and canvas functionality required for this application';
        r_info.addClass( 'alert-error' ).removeClass( 'alert-success' ).text( s_text );
    } else if ( !canvas_support() || !web_worker_support() ) {
        if ( !canvas_support ) {
            s_text = 'Your browser does not support canvas functionality required for this application';
            r_info.addClass( 'alert-error' ).removeClass( 'alert-success' ).text( s_text );
        }
        if ( !web_worker_support ) {
            s_text = 'Your browser does not support web workers functionality required for this application';
            r_info.addClass( 'alert-error' ).removeClass( 'alert-success' ).text( s_text );
        }
    }
} );
