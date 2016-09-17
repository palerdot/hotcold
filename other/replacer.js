// replaces lesson text with appropriate letters for the corresponding layouts
// qwerty => colemak
var lesson_text = "asdf jkl; aa ss dd ff jj kk ll ;; adsf jlk; asdfg hjkl; gg hh gg hh aa dd ss ff jj ll kk ;; ff gg hh jj gf hj fg jh fj gh ghfj fjgh gghh ffjj fgfg jhjh ffgg jjhh aa hh ;; gg jj ff ss ll dd kk ss hh ll gg a; sl dk fj gh a; ls dk jf gh asdfg ;lkjh";

var RULES = {
    "a": "a",
    "s": "r",
    "d": "s",
    "f": "t",
    "g": "d",
    "h": "h",
    "j": "n",
    "k": "e",
    "l": "i",
    ":": "o",
    ";": "o",
    "\"": "\"",
    "'": "'",
    "e": "f",
    "i": "u",
    "r": "p",
    "u": "l",
    "t": "g",
    "o": "y",
    "c": "j",
    ",": ",",
    "v": "v",
    "n": "k",
    "w": "w",
    "m": "m",
    "q": "q",
    "p" : ";",
    "b": "b",
    "y": "j",
    "z": "z",
    "x": "x"
};

_.each( RULES, function (val, index) {
    replace(index, val);
} );

function replace(source, target) {
    var is_both_characters = is_character(source) && is_character(target),
        is_target_symbol = is_character(source) && !is_character(target);

    lesson_text = lesson_text.replace( new RegExp(source, "g") , target);

    if (is_both_characters) {
        lesson_text = lesson_text.replace( new RegExp(source.toUpperCase(), "g"), target.toUpperCase() );
    }

    if (is_target_symbol) {
        lesson_text = lesson_text.replace( new RegExp(source.toUpperCase(), "g"), target );   
    }

}

function is_character(char) {
    var c = char.toUpperCase().charCodeAt(0),
        is_character = c >= 65 && c <= 90;

    return is_character;
}

console.log(lesson_text);
copy(lesson_text);