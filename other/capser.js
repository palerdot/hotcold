// small script which given to our custom text splits and generates words
// useful for generating word lesson
var t = $("textarea").val().split("\n")
t = _.map(t, function (word) { 
    var word =  $.trim(word).toLowerCase();
    // turn random letters into caps
    word = _.map(word, function (letter, index, word) {
        var randomize = _.random(0, 100) % 2 == 0;
        if (randomize) {
            return letter.toUpperCase();
        } else {
            return letter;
        }
    });
    return word;
});


t = _.map(t, function (word) {
   word = word.join("");
   return word;
});

var generated = t.join(" ");

console.log(generated);
copy(generated);
