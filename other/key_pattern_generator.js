// takes our layout.json and specifies for which key, right shift and left shift are applied
var layouts = {
    "qwerty": {

        "num_row": [{
            "keys": ["~", "`"]
        }, {
            "keys": ["!", "1"]
        }, {
            "keys": ["@", "2"]
        }, {
            "keys": ["#", "3"]
        }, {
            "keys": ["$", "4"]
        }, {
            "keys": ["%", "5"]
        }, {
            "keys": ["^", "6"]
        }, {
            "keys": ["&", "7"]
        }, {
            "keys": ["*", "8"]
        }, {
            "keys": ["(", "9"]
        }, {
            "keys": [")", "0"]
        }, {
            "keys": ["-", "_"]
        }, {
            "keys": ["+", "="]
        }, {
            "special": "true",
            "id": "bksp_key",
            "keys": ["Bksp", ""]
        }],

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

    },

    "dvorak": {

        "num_row": [{
            "keys": ["~", "`"]
        }, {
            "keys": ["!", "1"]
        }, {
            "keys": ["@", "2"]
        }, {
            "keys": ["#", "3"]
        }, {
            "keys": ["$", "4"]
        }, {
            "keys": ["%", "5"]
        }, {
            "keys": ["^", "6"]
        }, {
            "keys": ["&", "7"]
        }, {
            "keys": ["*", "8"]
        }, {
            "keys": ["(", "9"]
        }, {
            "keys": [")", "0"]
        }, {
            "keys": ["_", "-"]
        }, {
            "keys": ["+", "="]
        }, {
            "special": "true",
            "id": "bksp_key",
            "keys": ["Bksp", ""]
        }],

        "top_row": [

            {
                "special": "true",
                "id": "tab_key",
                "keys": ["Tab", ""]
            },

            {
                "keys": ["\"", "'"]
            },

            {
                "keys": ["<", ","]
            },

            {
                "keys": [">", "."]
            },

            {
                "keys": ["P", ""]
            },

            {
                "keys": ["Y", ""]
            },

            {
                "keys": ["F", ""]
            },

            {
                "keys": ["G", ""]
            },

            {
                "keys": ["C", ""]
            },

            {
                "keys": ["R", ""]
            },

            {
                "keys": ["L", ""]
            },

            {
                "keys": ["?", "\/"]
            },

            {
                "keys": ["+", "="]
            },

            {
                "keys": ["|", "\\"]
            }

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
                "keys": ["O", ""]
            },

            {
                "keys": ["E", ""]
            },

            {
                "keys": ["U", ""]
            },

            {
                "keys": ["I", ""]
            },

            {
                "keys": ["D", ""]
            },

            {
                "keys": ["H", ""]
            },

            {
                "keys": ["T", ""]
            },

            {
                "keys": ["N", ""]
            },

            {
                "keys": ["S", ""]
            },

            {
                "keys": ["_", "-"]
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
                "keys": [":", ";"]
            },

            {
                "keys": ["Q", ""]
            },

            {
                "keys": ["J", ""]
            },

            {
                "keys": ["K", ""]
            },

            {
                "keys": ["X", ""]
            },

            {
                "keys": ["B", ""]
            },

            {
                "keys": ["M", ""]
            },

            {
                "keys": ["W", ""]
            },

            {
                "keys": ["V", ""]
            },

            {
                "keys": ["Z", ""]
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

    },

    "colemak": {

        "num_row": [{
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
                "keys": ["F", ""]
            },

            {
                "keys": ["P", ""]
            },

            {
                "keys": ["G", ""]
            },

            {
                "keys": ["J", ""]
            },

            {
                "keys": ["L", ""]
            },

            {
                "keys": ["U", ""]
            },

            {
                "keys": ["Y", ""]
            },

            {
                "keys": [":", ";"]
            },

            {
                "keys": ["{", "["]
            },

            {
                "keys": ["}", "]"]
            },

            {
                "keys": ["|", "\\"]
            }

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
                "keys": ["R", ""]
            },

            {
                "keys": ["S", ""]
            },

            {
                "keys": ["T", ""]
            },

            {
                "keys": ["D", ""]
            },

            {
                "keys": ["H", ""]
            },

            {
                "keys": ["N", ""]
            },

            {
                "keys": ["E", ""]
            },

            {
                "keys": ["I", ""]
            },

            {
                "keys": ["O", ""]
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
                "keys": ["K", ""]
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
            }

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


var current = "colemak";

var PATTERN = {
    "right": [],
    "left": []
};

_.each(layouts[current], function(val, key) {
    var patterns = generate_right_left_shifts(key, val);
    PATTERN.right = _.union(PATTERN.right, patterns.right);
    PATTERN.left = _.union(PATTERN.left, patterns.left);
});

console.log("KEY", PATTERN);
copy(PATTERN);

function generate_right_left_shifts(row, klist) {

    var k = "",
        PATTERN = {
            "right": [],
            "left": []
        };

    switch (row) {
        case "num_row":

            // all rules applied to top row keys only keys[0]
            var rules = {
                "ignore": [],
                "right": [0, 1, 2, 3, 4, 5],
                "left": [6, 7, 8, 9, 10, 11, 12, 13]
            };

            // go through all the keys
            _.each(klist, function(list, index) {

                var keys = list["keys"];

                // check for right shift
                var is_right_shift = _.contains(rules.right, index) && keys[0];
                // console.log("is right shift ", is_right_shift, index, keys);
                if (is_right_shift) {
                    var char_code = keys[0].charCodeAt(0);
                    PATTERN.right.push(char_code);
                }

                // check for left shift
                var is_left_shift = _.contains(rules.left, index) && keys[0];
                if (is_left_shift) {
                    var char_code = keys[0].charCodeAt(0);
                    PATTERN.left.push(char_code);
                }
            });

            // console.log("pattern ", PATTERN);
            return PATTERN;

            break;

        case "top_row":

            // all rules applied to top row keys only keys[0]
            var rules = {
                "ignore": [0],
                "right": [1, 2, 3, 4, 5],
                "left": [6, 7, 8, 9, 10, 11, 12, 13]
            };

            // go through all the keys
            _.each(klist, function(list, index) {

                var keys = list["keys"],
                    top_key = keys[0].toUpperCase().charCodeAt(0),
                    is_character = top_key >= 65 && top_key <= 90;

                // check for right shift
                var is_right_shift = _.contains(rules.right, index) && keys[0];
                // console.log("is right shift ", is_right_shift, index, keys);
                if (is_right_shift) {
                    PATTERN.right.push(top_key);
                }

                // check for left shift
                var is_left_shift = _.contains(rules.left, index) && keys[0];
                if (is_left_shift) {
                    PATTERN.left.push(top_key);
                }

            });

            // console.log("pattern ", PATTERN);
            return PATTERN;

            break;

        case "middle_row":

            var rules = {
                "ignore": [0, 12],
                "right": [1, 2, 3, 4, 5],
                "left": [6, 7, 8, 9, 10, 11]
            };

            // go through all the keys
            _.each(klist, function(list, index) {

                var keys = list["keys"],
                    top_key = keys[0].toUpperCase().charCodeAt(0),
                    is_character = top_key >= 65 && top_key <= 90;

                // check for right shift
                var is_right_shift = _.contains(rules.right, index) && keys[0];
                // console.log("is right shift ", is_right_shift, index, keys);
                if (is_right_shift) {
                    PATTERN.right.push(top_key);
                }

                // check for left shift
                var is_left_shift = _.contains(rules.left, index) && keys[0];
                if (is_left_shift) {
                    PATTERN.left.push(top_key);
                }

            });

            // console.log("pattern ", PATTERN);
            return PATTERN;

            break;

        case "bottom_row":

            var rules = {
                "ignore": [0, 11],
                "right": [1, 2, 3, 4, 5],
                "left": [6, 7, 8, 9, 10]
            };

            // go through all the keys
            _.each(klist, function(list, index) {

                var keys = list["keys"],
                    top_key = keys[0].toUpperCase().charCodeAt(0),
                    is_character = top_key >= 65 && top_key <= 90;

                // check for right shift
                var is_right_shift = _.contains(rules.right, index) && keys[0];
                // console.log("is right shift ", is_right_shift, index, keys);
                if (is_right_shift) {
                    PATTERN.right.push(top_key);
                }

                // check for left shift
                var is_left_shift = _.contains(rules.left, index) && keys[0];
                if (is_left_shift) {
                    PATTERN.left.push(top_key);
                }

            });

            // console.log("pattern ", PATTERN);
            return PATTERN;

            break;

        case "space_row":
            return PATTERN;
            break;
    }
}

// console.log(layouts[current]);
