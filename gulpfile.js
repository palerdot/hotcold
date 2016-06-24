var gulp = require("gulp"),
    mainBowerFiles = require("main-bower-files"),
    print = require("gulp-print"),
    clean = require("gulp-clean"),
    sass = require("gulp-sass"),
    prettify = require("gulp-prettify"),
    browserify = require("browserify"),
    source = require('vinyl-source-stream'),
    jsValidate = require("gulp-jsvalidate"),
    runSequence = require("run-sequence"),
    HC_CONFIG = require("./config.json");

// clean the directories like "lib"
gulp.task("clean", function () {
    return gulp.src("./lib/", {read: false})
                .pipe( clean() );
});

// copy fonts
gulp.task("copy-fonts", function () {
    return gulp.src( mainBowerFiles( "**/*.{woff,woff2,eot,svg,ttf}" ) )
                .pipe( gulp.dest("./lib/fonts/") )
});

// copy "js" libraries 
gulp.task("copy-js-lib", function() {
    console.log("copying js lib ", HC_CONFIG.APPMODE);
    return gulp.src( mainBowerFiles("**/*/*.js") )
                .pipe( gulp.dest("./lib/js/") )
});

// copy "css" libraries
gulp.task("copy-css-lib", function () {
    console.log("copying css lib");
    return gulp.src( mainBowerFiles("**/*.css") )
                .pipe( gulp.dest("./lib/css") )
});



// copy "src sass" as css
gulp.task("convert-scss", function () {
    return gulp.src( "./css/scss/**/*.scss" )
                .pipe( sass() )
                .pipe( prettify() )
                .pipe( gulp.dest("./css/") )
});

gulp.task("lint", function () {
    return gulp.src("./js/**/*.js")
                .pipe( jsValidate() );
})

gulp.task("browserify", function () {
    return browserify('./js/src/app.js')
            .bundle()
            //Pass desired output filename to vinyl-source-stream
            .pipe(source('APP.js'))
            // Start piping stream to tasks!
            .pipe(gulp.dest('./js/'));
});

// gulp.task("copy-lib", ["copy-js-lib", "copy-css-lib", "convert-scss"])

// run the "default" task
// gulp.task("default", ["copy-js-lib", "copy-css-lib", "convert-scss"]);


gulp.task("default", function (cb) {
    runSequence(["clean"], ["copy-js-lib", "copy-css-lib", "copy-fonts"], ["lint"], ["convert-scss", "browserify"], cb)
});
