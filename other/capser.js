// small script which given to our custom text splits and generates words
// useful for generating word lessons
var t = $("textarea").val().split("\n")
t = _.map(t, function (word) { 
    var word =  $.trim(word).toLowerCase();
    // turn random letters into caps
    _.each(word, function (letter, index) {
        var randomize = _.random(0, 100) % 2 == 0;
        if (randomize) {
            word[index] = letter.toUpperCase();
        }
    });
    return word;
});