// replaces lesson text with appropriate letters for the corresponding layouts
// qwerty => dvorak
var lesson_text = "azaz sxsx azaz sxsx aazz aazz ssxx ssxx zzxx .?.? zzxx ..?? zZaA xXsS aAzZ sSxX as? as? sax. sax. zasx zasx ZASX ZASX z?z? Z?Z? l.l. L.L. z?z? x.x. Z?Z? X.X. zaza ZAZA xsxs XSXS zasx. zasx? zasx. zasx? ZZXX zzxx zZ. zZ? xxzz XXZZ xz. XZ? a? a? s. s. z? z? x? x. zx.? zx.? ZX.? ZX.? zaza xsxs ZAZA XSXS la. la. laz? laz? ZZXX zzxx zZ. zZ?";

var RULES = {
    "a": "a",
    "s": "o",
    "d": "e",
    "f": "u",
    "g": "i",
    "h": "d",
    "j": "h",
    "k": "t",
    "l": "n",
    ":": "s",
    ";": "s",
    "\"": "_",
    "'": "-",
    "e": ">",
    "i": "c",
    "r": "p",
    "u": "g",
    "t": "y",
    "o": "r",
    "c": "j",
    ",": "w",
    "v": "k",
    "n": "b",
    "w": "<",
    "m": "m",
    "q": "\"",
    "p" : "l",
    "b": "x",
    "y": "f",
    "z": ";",
    "x": "q"
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