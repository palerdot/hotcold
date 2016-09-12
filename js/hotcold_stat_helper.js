// our helper script

var key_pressed;

var keys = [];

for ( var i = 32; i < 127; i++ ) {

    keys[ i ] = {
        hits: 0,
        correct: 0,
        accuracy: 0,
        key: '',
        code: 0,
        div_id: '#key_' + i,
        bg_class: '',
        key_class: '',
        compute_accuracy: function () {
            this.accuracy = toFixed( ( this.correct / this.hits ) * 100, 2 );
        }
    };

    keys[ i ].code = i;
    keys[ i ].key = String.fromCharCode( keys[ i ].code );
    keys[ 32 ].key = 'space';

    if ( i >= 65 && i <= 90 ) {
        //we have caps letters; assign them appropriate divs of small letters in the virtual keyboard
        var temp = String.fromCharCode( i ).toLowerCase().charCodeAt( 0 );
        keys[ i ].div_id = '#key_' + temp;

    }

    if ( i >= 48 && i <= 57 ) {
        // we have numbers (top row) assign them the appropriate divs	
        var temp = get_numeric_div( i );
        keys[ i ].div_id = '#key_' + temp;
    }

    if ( i == 91 || i == 93 || i == 59 || i == 39 || i == 92 || i == 44 || i == 46 || i == 47 || i == 95 || i == 43 ) {
        var temp = get_numeric_div( i );
        keys[ i ].div_id = '#key_' + temp;
    }

}

self.onmessage = function ( event ) {

    var latest;

    var output = {
        highlight: { div_id: '', code: 0, div_class: '', format: 0 },
        update: latest
    };

    var my_class = {};

    var message = event.data;

    if ( message.close == false ) {

        if ( message.status == "right" ) {
            keys[ message.code ].hits++;
            keys[ message.code ].correct++;
            keys[ message.code ].compute_accuracy();
            my_class = get_class( parseInt( keys[ message.code ].accuracy ), message.code );
            keys[ message.code ].bg_class = my_class.div_class;
            keys[ message.code ].key_class = my_class.key_class;
            output.highlight.format = my_class.format;
            latest = sort_keys();
        } else {
            keys[ message.code ].hits++;
            keys[ message.code ].compute_accuracy();
            my_class = get_class( parseInt( keys[ message.code ].accuracy ), message.code );
            keys[ message.code ].bg_class = my_class.div_class;
            keys[ message.code ].key_class = my_class.key_class;
            output.highlight.format = my_class.format;
            latest = sort_keys();
        }

        output.highlight.div_id = keys[ message.code ].div_id;
        output.highlight.code = keys[ message.code ].code;
        output.highlight.div_class = keys[ message.code ].key_class;
        output.update = latest;

        self.postMessage( JSON.stringify( output ) );

    } else if ( message.close == true )
        self.close();

};

//our main sorting method, returns an object of first and last 5 keys based on their accuracy;

function sort_keys() {

    var result = "";

    var sorted = [];

    for ( var i = 32; i < 127; i++ ) {
        if ( keys[ i ].hits > 0 ) {
            sorted.push( keys[ i ] );
        }
    }

    sorted.sort( function ( a, b ) {
        return parseFloat( a.accuracy ) - parseFloat( b.accuracy );
    } );

    for ( var i = 0; i < sorted.length; i++ ) {
        var span = "<span>" + sorted[ i ].key + "</span><span>" + sorted[ i ].hits + "</span><span>" + sorted[ i ].correct + "</span><span>" + sorted[ i ].accuracy + "</span>";
        result += "<div class = '" + sorted[ i ].bg_class + "'>" + span + "</div>"
    }

    return result;

}

function get_class( accuracy, code ) {

    var result = { key_class: '', div_class: '', format: 0 };

    if ( code >= 65 && code <= 90 ) {
        //we have bold letters
        result.key_class = ' o_line ';
    }

    if ( code >= 48 && code <= 57 ) {

        //we have numbers
        result.format = 2;

    }

    if ( code == 123 || code == 125 || code == 58 || code == 34 || code == 124 || code == 60 || code == 62 || code == 63 || code == 95 || code == 43 ) {
        //we have other special characters
        //result.format = 2;
        result.key_class = ' o_line ';
    }

    if ( accuracy > 95 ) {

        result.key_class += 'blue';
        result.div_class = 'bg_blue';

    } else {

        if ( accuracy > 90 ) {

            result.key_class += 'light_blue';
            result.div_class = 'bg_light_blue';

        } else {

            if ( accuracy > 85 ) {

                result.key_class += 'green';
                result.div_class = 'bg_green';

            } else {

                if ( accuracy > 80 ) {

                    result.key_class += 'light_green';
                    result.div_class = 'bg_light_green';

                } else {

                    if ( accuracy > 75 ) {

                        result.key_class += 'yellow';
                        result.div_class = 'bg_yellow';

                    } else {

                        if ( accuracy > 70 ) {

                            result.key_class += 'orange';
                            result.div_class = 'bg_orange';

                        } else {

                            if ( accuracy > 60 ) {

                                result.key_class += 'red_1';
                                result.div_class = 'bg_red_1';

                            } else {

                                result.key_class += 'red_2';
                                result.div_class = 'bg_red_2';

                            }

                        }

                    }

                }

            }

        }

    }

    return result;

} //end of get_class module

//if the keys are numbers assign them the appropriate div
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

        // note this for +; have to watch out in case of bugs;
        // note this module is also used in stat course.js
        case 43:
            // return 61;
            return 43;

    }

}

//converts the floating point for all platforms

function toFixed( value, precision ) {

    var precision = precision || 0,
        neg = value < 0,
        power = Math.pow( 10, precision ),
        value = Math.round( value * power ),
        integral = String( ( neg ? Math.ceil : Math.floor )( value / power ) ),
        fraction = String( ( neg ? -value : value ) % power ),
        padding = new Array( Math.max( precision - fraction.length, 0 ) + 1 ).join( '0' );

    return precision ? integral + '.' + padding + fraction : integral;
}
