var gulp = require( "gulp" ),
    mainBowerFiles = require( "main-bower-files" ),
    print = require( "gulp-print" ),
    gulp_if = require("gulp-if"),
    clean = require( "gulp-clean" ),
    rename = require( "gulp-rename" ),
    htmlmin = require( "gulp-htmlmin" ),
    sass = require( "gulp-sass" ),
    replace = require( "gulp-replace-task" ),
    prettify = require( "gulp-prettify" ),
    browserify = require( "browserify" ),
    merge_stream = require( "merge-stream" ),
    source = require( 'vinyl-source-stream' ),
    jsValidate = require( "gulp-jsvalidate" ),
    runSequence = require( "run-sequence" ),
    HC_CONFIG = require( "./config.json" ),

    _ = require( "underscore" ),
    zip = require( "gulp-zip" ),
    tar = require( "gulp-tar" ),
    gzip = require( "gulp-gzip" ),

    async = require( "async" ),
    pump = require( "pump" ),
    json_editor = require( "gulp-json-editor" ),
    uglify = require( "gulp-uglify" )
    
    git_info = require( "git-rev" ),
    git = require( "gulp-git" ),
    
    vfs = require( "vinyl-fs" ),
    shell = require( "gulp-shell" ),

    // to change the icons for the windows executables
    rcedit = require( "rcedit" ),

    del = require("del"),
    date_format = require("dateformat");

var ELECTRON_PACKAGER = require( "electron-packager" );

// clean the directories like "lib"
gulp.task( "clean", function () {
    return gulp.src( "./lib/", { read: false } )
        .pipe( clean() );
} );

// copy fonts
gulp.task( "copy-fonts", function () {
    return gulp.src( mainBowerFiles( "**/*.{woff,woff2,eot,svg,ttf}" ) )
        .pipe( gulp.dest( "./lib/fonts/" ) )
} );

// copy "js" libraries 
gulp.task( "copy-js-lib", function () {
    console.log( "copying js lib ", HC_CONFIG.APPMODE );
    return gulp.src( mainBowerFiles( "**/*/*.js" ) )
        .pipe( gulp.dest( "./lib/js/" ) )
} );

// copy "css" libraries
gulp.task( "copy-css-lib", function () {
    console.log( "copying css lib" );
    return gulp.src( mainBowerFiles( "**/*.css" ) )
        .pipe( gulp.dest( "./lib/css" ) )
} );

// copy "src sass" as css
gulp.task( "convert-scss", function () {
    return gulp.src( "./css/scss/**/*.scss" )
        .pipe( sass() )
        .pipe( prettify() )
        .pipe( gulp.dest( "./css/" ) )
} );

gulp.task( "lint", function () {
    return gulp.src( "./js/**/*.js" )
        .pipe( jsValidate() );
} )

gulp.task( "browserify", function () {
    return browserify( './js/src/app.js' )
        .bundle()
        //Pass desired output filename to vinyl-source-stream
        .pipe( source( 'APP.js' ) )
        // Start piping stream to tasks!
        .pipe( gulp.dest( './js/' ) );
} );

// build basics task; copys libs, fonts everything except "changing config" & "browserify"
gulp.task( "build-basics", function (cb) {
    runSequence( [ "clean" ], [ "copy-js-lib", "copy-css-lib", "copy-fonts" ], [ "lint" ], ["convert-scss"], cb );
} )

gulp.task( "default", function ( cb ) {
    runSequence( [ "build-basics" ], ["init-default-config"], [ "browserify" ], cb );
} );

gulp.task( "init-default-config", function (cb) {
    return gulp.src( "./config.json" )
                .pipe( 
                    json_editor({
                        "type": "web",
                        "APPMODE": "FREE"
                    }) 
                )
                .pipe( gulp.dest( "." ) );
} );



gulp.task( "check-branch", function ( cb ) {
    git_info.branch( function ( branch ) {
        console.log( "branch is ", branch );
        if ( branch == "gh-pages" ) {
            build_website();
        }
    } );
    git_info.tag( function ( tag ) {
        console.log( "latest tag is ", tag );
    } );
    cb();
} );

// ----------------------------------------------------------------------------------------------------
// START: build web tasks

gulp.task( "build-web", function (cb) {
    runSequence( ["web-basics"], ["clean-web"], ["copy-web-files"], cb );
} );

gulp.task( "web-basics", function (cb) {
    runSequence( ["build-basics"], ["init-web-config"], ["browserify"], cb );
} );

// changes "type => web" in config, before doing browserify
gulp.task( "init-web-config", function (cb) {
    return gulp.src( "./config.json" )
                .pipe( 
                    json_editor({
                        "type": "web"
                    }) 
                )
                .pipe( gulp.dest( "." ) );
} );

// clean the web folder
// cleans the releases folder
gulp.task( "clean-web", function () {
    console.log( "cleaning web folder" );
    return gulp.src( "./web/", { read: false } )
        .pipe( clean() );
} );

gulp.task( "copy-web-files", function ( cb ) {

    console.log( "copying web files" );

    var destination = "./web/";

    // copy the main index file as courses.html
    var copy_courses_page = gulp.src( "./index.html" )
                                .pipe( rename("courses.html") )
                                .pipe(htmlmin({collapseWhitespace: true}))
                                .pipe( gulp.dest( destination ) );

    var links = _.map( HC_CONFIG.links, function (link, key) {
        return {
            match: new RegExp( "{{" + key + "}}" ),
            replacement: link
        }
    } );

    // also replace the version
    links.push( {
        match: new RegExp("{{version}}"),
        replacement: HC_CONFIG.VERSION
    } );

    // copy the home.html as index file
    var copy_home_page = gulp.src( "./home.html" )
                                .pipe( rename("index.html") )
                                // replace the download links from config
                                .pipe( replace({
                                    patterns: links
                                }) )
                                .pipe(htmlmin({collapseWhitespace: true}))
                                .pipe( gulp.dest( destination ) );

    // copy config file and change the mode to "web"
    var copy_config = gulp.src( "./config.json" )
                                .pipe( 
                                    json_editor({
                                        "type": "web"
                                    }) 
                                )
                                .pipe( gulp.dest( destination ) );

    var copy_help_file = gulp.src( "./help.html" )
                            .pipe( gulp.dest( destination ) );

    var copy_lib = gulp.src( "./lib/**/*", { base: "." } )
                        .pipe( gulp.dest( destination ) );

    var copy_js = gulp.src( "./js/*.js", { base: "." } )
                        .pipe( 
                            uglify({ 
                                compress: {
                                    drop_console: true
                                }  
                            }) 
                        )
                        .pipe( gulp.dest( destination ) );

    var copy_css = gulp.src( "./css/*.css", { base: "." } )
                        .pipe( gulp.dest( destination ) );

    var copy_lessons = gulp.src( "./lessons/**/*", { base: "." } )
                            .pipe( gulp.dest( destination ) );

    var copy_images = gulp.src( "./images/*", { base: "." } )
                            .pipe( gulp.dest( destination ) );

    var copy_favicon = gulp.src( "./favicon.ico" )
                            .pipe( gulp.dest( destination ) );

    var copy_gulpfile = gulp.src( "./gulpfile.js" )
                            .pipe( gulp.dest( destination ) );

    return merge_stream( 
                copy_home_page,
                copy_courses_page, 
                copy_help_file, 
                copy_lib, 
                copy_js, 
                copy_css, 
                copy_lessons, 
                copy_images, 
                copy_favicon,
                copy_config,
                copy_gulpfile 
            );

} );

// END: build web tasks
// ----------------------------------------------------------------------------------------------------

// START: releases section

gulp.task( "build-releases", function ( cb ) {
    // NOTE: due to the change in the main "config.json" and browserify task we cannot run builds in parallel
    runSequence( [ "clean-releases" ], [ "build-crx"], ["build-electron" ], cb );
} );

// cleans the releases folder
gulp.task( "clean-releases", function () {
    console.log( "cleaning releases folder" );
    return gulp.src( "./releases/", { read: false } )
        .pipe( clean() );
} );

// END: releases section

// ----------------------------------------------------------------------------------------------------
// START: chrome App tasks

gulp.task( "build-crx", function ( cb ) {
    runSequence( [ "build-basics" ], [ "clean-crx" ], [ "prepare-crx-build" ], cb );
} );

gulp.task( "clean-crx", function ( cb ) {
    console.log( "deleting crx folder" )
    return gulp.src( "./releases/chrome-app", { read: false } )
                .pipe( clean() );
} );

gulp.task( "prepare-crx-build", function (cb) {

    var modes = ["FREE", "PRO"];

    var tasks = _.map( modes, function (mode) {
        return function (async_cb) {
            init_crx_mode( mode, async_cb );            
        };
    } );

    async.series( tasks, cb );

} );

function init_crx_mode (mode, async_cb) {
    console.log("will be building crx for: ", mode);
    // sequence of events: init config, browserify, copy files, zip files
    var tasks = [
        // init config
        function (cb) {
            init_crx_config( mode, cb );
        },

        // browserify
        function (cb) {
            runSequence( ["browserify"], cb );
        },

        // copy files
        function (cb) {
            copy_crx_files(mode, cb);
        },

        // zip files
        function (cb) {
            zip_crx_files(mode, cb);
        }

    ];

    async.series( tasks, async_cb );
}

function init_crx_config (mode, cb) {
    console.log("initing crx config ", mode);

    gulp.src( "./config.json" )
        .pipe( 
            json_editor({
                "type": "crx",
                "APPMODE": mode
            }) 
        )
        .pipe( gulp.dest( "." ) )
        // on done indicate to async that it is done
        .on("end", cb);
}

function copy_crx_files (mode, async_cb) {

    var crx_destination = "./releases/chrome-app/" + mode;

    console.log("copying chrome extension files for ", mode);

    var copy_index_file = gulp.src( "./index.html" );

    var copy_config = gulp.src( "./config.json" );

    var copy_help_file = gulp.src( "./help.html" );

    var copy_lib = gulp.src( "./lib/**/*", { base: "." } );

    var copy_js = gulp.src( "./js/*.js", { base: "." } )
                        .pipe( 
                            uglify({ 
                                compress: {
                                    drop_console: true
                                }  
                            }) 
                        );

    var copy_css = gulp.src( "./css/hotcold.css", { base: "." } );

    var copy_lessons = gulp.src( "./lessons/**/*", { base: "." } );

    var copy_images = gulp.src( "./images/viralgal.png", { base: "." } );

    var copy_manifest = gulp.src( "./manifest.json" );

    var copy_init_script = gulp.src( "./init_crx.js" );

    var copy_icons = gulp.src( "./icon/icon-*.png" );

    var copy_favicon = gulp.src( "./favicon.ico" );

    var tasks = [
        copy_index_file, 
        copy_help_file, 
        copy_lib, 
        copy_js, 
        copy_css, 
        copy_lessons, 
        copy_images, 
        copy_manifest, 
        copy_init_script, 
        copy_icons,
        copy_config
    ];

    var parallel_tasks = _.map( tasks, function (task) {
        return function (cb) {
            task
                .pipe( gulp.dest( crx_destination ) )
                .on("end", cb);
        }
    } );

    async.parallel( parallel_tasks, async_cb );

}

function zip_crx_files (mode, async_cb) {

    console.log("zipping ", mode);

    var src = "./releases/chrome-app/" + mode,
        zip_file_name = mode + ".zip";

    vfs.src( src )
        // zip the folder
        .pipe( zip(zip_file_name) )
        .pipe( vfs.dest( "./releases/chrome-app/" ) )
        .on( "end", async_cb );

}

// END: chrome app tasks
// ----------------------------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------------------------
// START: new electron tasks

gulp.task( "build-electron", function (cb) {
    runSequence( ["build-basics"], ["clean-electron"], ["prepare-electron-build"], cb );
} );

gulp.task( "clean-electron", function ( cb ) {
    console.log( "deleting electron build folder" )
    return gulp.src( "./releases/electron", { read: false } )
        .pipe( clean() );
} );

gulp.task( "prepare-electron-build", function (cb) {

    var modes = ["FREE"];

    var tasks = _.map( modes, function (mode) {
        return function (async_cb) {
            init_electron_mode( mode, async_cb );            
        };
    } );

    async.series( tasks, cb );

} );

function init_electron_mode (mode, async_cb) {

    console.log("will be building electron for: ", mode);
    // sequence of events: init config, browserify, copy files, zip files
    var tasks = [
        // init config
        function (cb) {
            init_electron_config( mode, cb );
        },

        // browserify
        function (cb) {
            runSequence( ["browserify"], cb );
        },

        // copy files
        function (cb) {
            copy_electron_files(mode, cb);
        },

        // prepare the binaries for the platforms
        function (cb) {
            prepare_electron_binary(mode, cb);
        }

    ];

    async.series( tasks, async_cb );
}

function init_electron_config (mode, async_cb) {
    console.log("initing electron config ", mode);

    gulp.src( "./config.json" )
        .pipe( 
            json_editor({
                "type": "desktop",
                "APPMODE": mode
            }) 
        )
        .pipe( gulp.dest( "." ) )
        // on done indicate to async that it is done
        .on("end", async_cb);
}

function copy_electron_files (mode, async_cb) {

    console.log("copying electron files for ", mode);

    var electron_destination = "./releases/electron/" + mode;

    var to_replace = new RegExp('<script src="lib/js/jquery.min.js"></script>'),
        replace_with = "<script>window.$ = window.jQuery = require('./lib/js/jquery.min.js');</script>";

    var copy_index_file = gulp.src( "./index.html" )
        // replace jquery library for electron build
        .pipe( replace({
            patterns: [
                {
                    match: to_replace,
                    replacement: replace_with
                }
            ]
        }) );

    var copy_config = gulp.src( "./config.json" );

    var copy_help_file = gulp.src( "./help.html" );

    var copy_lib = gulp.src( "./lib/**/*", { base: "." } );

    var copy_js = gulp.src( "./js/*.js", { base: "." } )
                        .pipe( 
                            uglify({ 
                                compress: {
                                    drop_console: true
                                }  
                            }) 
                        );

    var copy_css = gulp.src( "./css/hotcold.css", { base: "." } );

    var copy_lessons = gulp.src( "./lessons/**/*", { base: "." } );

    var copy_images = gulp.src( "./images/viralgal.png", { base: "." } );

    var copy_init_script = gulp.src( "./electron.js", { base: "." } );

    // copy the node package json as it is important for electron
    var copy_node_package_json = gulp.src( "./package.json*", { base: "." } );

    // note: electron icons are different
    var copy_icons = gulp.src( "./icon/hc-logo.{icns,ico,png}" );

    var copy_favicon = gulp.src( "./favicon.ico" );

    var tasks = [
        copy_index_file, 
        copy_help_file, 
        copy_lib, 
        copy_js, 
        copy_css, 
        copy_lessons, 
        copy_images,
        copy_init_script, 
        copy_node_package_json,
        copy_icons,
        copy_config
    ];

    var parallel_tasks = _.map( tasks, function (task) {
        return function (cb) {
            task
                .pipe( gulp.dest( electron_destination ) )
                .on("end", cb);
        }
    } );

    async.parallel( parallel_tasks, async_cb );

}

function prepare_electron_binary (mode, async_cb) {
    console.log("will prepare electron binary for ", mode);

    var source_dir = "./releases/electron/" + mode,
        binary_dir = source_dir + "/binaries/";

    ELECTRON_PACKAGER( {
        "arch": "all",
        "dir": source_dir,
        "platform": [ "win32", "linux", "darwin" ],
        "out": binary_dir,
        "app-version": HC_CONFIG.VERSION,
        "build-version": HC_CONFIG.VERSION,
        "icon": "hc-logo"
    }, function ( err, binary_paths ) {

        binary_paths.forEach( function ( buildPath, key, orig_array ) {

            var os_platform = _.last( buildPath.split( "/" ) ).split( "-" )[ 1 ],
                build_arch = _.last( buildPath.split( "/" ) ).split( "-" )[ 2 ];

            if ( os_platform == "win32" ) {
                // use rcedit to change the icon for the windows executable binary
                rcedit( buildPath + "/hotcold.exe", {
                    icon: "./releases/electron/hc-logo.ico"
                }, function ( err ) {
                    package_electron_build( buildPath, build_arch, os_platform, mode );
                } );
            } else {
                package_electron_build( buildPath, build_arch, os_platform, mode );    
            }

        } );

        // let async know that this task is done
        async_cb();
    } );

}

function package_electron_build( buildPath, arch, os, mode ) {

    console.log( "Porumai! packaging " + os + " build ", "./" + buildPath + "/**" );

    var file_name = "Hotcold-" + HC_CONFIG.VERSION + "-" + os + "-" + arch,
        tar_file_name = file_name + ".tar",
        zip_file_name = file_name + ".zip",
        isLinux = (os == "linux");

    var dist_location = "./releases/electron/" + mode + "/dist/"

    // execute the steps in series
    async.series( [
        function ( next ) {
                // copy the binary
                console.log( "copying binary ", file_name, buildPath );
                // NOTE: using vinyl-fs because of symlink problems in mac/darwin binary builds
                vfs.src( "./" + buildPath + "/**/*" )
                    // move to temporary path
                    .pipe( vfs.dest( dist_location + file_name + "/" + file_name ) )
                    .on( "end", next );
        },
        function ( next ) {
                // copy the install instructions
                vfs.src( "./other/install_instructions/" + os + "/README.txt" )
                    // move to temporary path
                    .pipe( vfs.dest( dist_location + file_name + "/" + file_name ) )
                    .on( "end", next );
        },
        function ( next ) {
                // now let us tar the files
                vfs.src( dist_location + file_name + "/**" )
                    // tar if linux, zip if windows or mac
                    .pipe( gulp_if( isLinux, tar(tar_file_name), zip(zip_file_name) ) )
                    // gzip if it is linux
                    .pipe( gulp_if( isLinux, gzip() ) )
                    .pipe( vfs.dest( dist_location ) )
                    .on( "end", next );
        },
        function ( next ) {
                console.log( "cleaning up ?", dist_location + file_name );
                gulp.src( dist_location + file_name, { read: false } )
                    .pipe( clean() )
                    .on( "end", next );
        }
    ],
        function ( err, results ) {
            console.log( "RESULTS:", err, results, arguments );
        } );

}

// END: electron tasks
// ----------------------------------------------------------------------------------------------------


// START: gh-pages tasks

var GH_PAGE_BRANCH = "gh-pages";

gulp.task( "gh-pages", function (cb) {

    git_info.branch( function ( branch ) {
        console.log( "branch is ", branch );
        if ( branch == GH_PAGE_BRANCH ) {
            runSequence(["build-gh-pages"], ["clean-gh-pages"], ["deploy-gh-pages"], cb);
        } else {
            console.log("ERROR! not gh pages branch");
        }
    } );

} );

gulp.task( "build-gh-pages", shell.task([
    "git archive master | gzip > master.tar.gz && tar -xvzf master.tar.gz",
    "gulp build-web && tar -cvzf web.tar.gz web",
]));



gulp.task( "clean-gh-pages", function (cb) {

    var dry_run = false,
        msg = 'Files and folders ' + (dry_run ? "that would be" : "")  + ' deleted:\n';

    // delete all the files in the current directory
    // except the web archive and our bower, node installations
    return del(["./*", "!./web.tar.gz", "!./bower_components", "!./node_modules"], {dryRun: dry_run}).then(paths => {
        console.log(msg, paths.join('\n'));
    });

} );

gulp.task( "deploy-gh-pages", shell.task([
    "tar -xvzf web.tar.gz --strip-components=1 && rm web.tar.gz",
    "echo [auto-web-build] $(date) >> build_log",
    'git add --all && git commit -m "[auto-web-build] $(date)"'
]));

// END: gh-pages tasks

