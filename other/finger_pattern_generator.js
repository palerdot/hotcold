// takes our layout.json and specifies which finger to be pressed
//returns finger highlighting pattern

//1-10 correponding finger from left to right
//11-14 right shift plus left hand four fingers
//15-18 left shift plus right hand four fingers (starting from index)

var layouts = {
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
};


var current = "qwerty";

var PATTERN = {};

_.each( layouts[current], function (val, key) {
    var patterns = generate_right_left_shifts( key, val );
    PATTERN = _.extend( PATTERN, patterns );
} );

// append space
PATTERN[32] = 5;

var FINGER_PATTERN = {};

console.log("KEY", PATTERN);
// map charcode to char
_.each( PATTERN, function (val, key) {
    FINGER_PATTERN[ String.fromCharCode(key) ] = val;
} );

console.log("pattern ", PATTERN);
console.log("finger pattern ", FINGER_PATTERN);

copy(FINGER_PATTERN);

function generate_right_left_shifts(row, klist) {

    var k = "",
        // holds the hash of finger pattern for all the keys
        PATTERN = {

        };

    switch (row) {

        case "num_row":

            // rules are general for top and bottom keys
            // when adding we will validate for symbol or character
            var rules = {
                "1": [11, 1],
                "2": [12, 2],
                "3": [13, 3],
                "4": [14, 4],
                "5": [14, 4],
                "6": [15, 7],
                "7": [15, 7],
                "8": [16, 8],
                "9": [17, 9],
                "10": [18, 10],
                "11": [18, 10],
                "12": [18, 10]
            };
            
            // go through all the keys
            _.each( klist,  function (list, index) {

                var keys = list["keys"],
                    top_key = keys[0].toUpperCase().charCodeAt(0),
                    is_character = top_key >= 65 && top_key <= 90;

                // apply the rules only for the specified keys
                if (rules[index]) {
                    // top key is a character; we need to handle caps and small key
                    if (is_character) {
                        PATTERN[ top_key ] = rules[index][0];
                        PATTERN[ top_key.toLowerCase() ] = rules[index][1];     
                    } else {
                        // we might have a symbol or number
                        PATTERN[ top_key ] = rules[index][0];
                        // add the lower case only if present
                        if (keys[1]) {
                            PATTERN[ keys[1].toUpperCase().charCodeAt(0) ] = rules[index][1];
                        }
                    }
                    
                }

            } );

            return PATTERN;

            break;
        
        case "top_row":

            // rules are general for top and bottom keys
            // when adding we will validate for symbol or character
            var rules = {
                "0": [11, 1],
                "1": [11, 1],
                "2": [12, 2],
                "3": [13, 3],
                "4": [14, 4],
                "5": [14, 4],
                "6": [15, 7],
                "7": [15, 7],
                "8": [16, 8],
                "9": [17, 9],
                "10": [18, 10],
                "11": [18, 10],
                "12": [18, 10],
                "13": [18, 10]
            };
            
            // go through all the keys
            _.each( klist,  function (list, index) {

                var keys = list["keys"],
                    top_key = keys[0].toUpperCase().charCodeAt(0),
                    is_character = top_key >= 65 && top_key <= 90;

                // apply the rules only for the specified keys
                if (rules[index]) {
                    // top key is a character; we need to handle caps and small key
                    if (is_character) {
                        PATTERN[ top_key ] = rules[index][0];
                        PATTERN[ keys[0].toLowerCase().charCodeAt(0) ] = rules[index][1];     
                    } else {
                        // we might have a symbol or number
                        PATTERN[ top_key ] = rules[index][0];
                        // add the lower case only if present
                        if (keys[1]) {
                            PATTERN[ keys[1].toUpperCase().charCodeAt(0) ] = rules[index][1];
                        }
                    }
                    
                }

            } );

            console.log("top row pattern ", PATTERN);

            return PATTERN;

            break;

        case "middle_row":

            // rules are general for top and bottom keys
            // when adding we will validate for symbol or character
            var rules = {
                "1": [11, 1],
                "2": [12, 2],
                "3": [13, 3],
                "4": [14, 4],
                "5": [14, 4],
                "6": [15, 7],
                "7": [15, 7],
                "8": [16, 8],
                "9": [17, 9],
                "10": [18, 10],
                "11": [18, 10]
            };
            
            // go through all the keys
            _.each( klist,  function (list, index) {

                var keys = list["keys"],
                    top_key = keys[0].toUpperCase().charCodeAt(0),
                    is_character = top_key >= 65 && top_key <= 90;

                // apply the rules only for the specified keys
                if (rules[index]) {
                    // top key is a character; we need to handle caps and small key
                    if (is_character) {
                        PATTERN[ top_key ] = rules[index][0];
                        PATTERN[ keys[0].toLowerCase().charCodeAt(0) ] = rules[index][1];     
                    } else {
                        // we might have a symbol or number
                        PATTERN[ top_key ] = rules[index][0];
                        // add the lower case only if present
                        if (keys[1]) {
                            PATTERN[ keys[1].toUpperCase().charCodeAt(0) ] = rules[index][1];
                        }
                    }
                    
                }

            } );

            return PATTERN;

            break;
        
        case "bottom_row":

            // rules are general for top and bottom keys
            // when adding we will validate for symbol or character
            var rules = {
                "1": [11, 1],
                "2": [12, 2],
                "3": [13, 3],
                "4": [14, 4],
                "5": [14, 4],
                "6": [15, 7],
                "7": [15, 7],
                "8": [16, 8],
                "9": [17, 9],
                "10": [18, 10]
            };
            
            // go through all the keys
            _.each( klist,  function (list, index) {

                var keys = list["keys"],
                    top_key = keys[0].toUpperCase().charCodeAt(0),
                    is_character = top_key >= 65 && top_key <= 90;

                // apply the rules only for the specified keys
                if (rules[index]) {
                    // top key is a character; we need to handle caps and small key
                    if (is_character) {
                        PATTERN[ top_key ] = rules[index][0];
                        PATTERN[ keys[0].toLowerCase().charCodeAt(0) ] = rules[index][1];     
                    } else {
                        // we might have a symbol or number
                        PATTERN[ top_key ] = rules[index][0];
                        // add the lower case only if present
                        if (keys[1]) {
                            PATTERN[ keys[1].toUpperCase().charCodeAt(0) ] = rules[index][1];
                        }
                    }
                    
                }

            } );

            return PATTERN;

            break;
    }
}

