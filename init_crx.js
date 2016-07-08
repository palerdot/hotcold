// on 'APP LAUNCH'
chrome.app.runtime.onLaunched.addListener( function () {
    chrome.app.window.create( 'index.html', {
        'outerBounds': {
            'width': 1333,
            'height': 666,
            'minWidth': 1333,
            'minHeight': 666
        },
        'minWidth': 1333,
        'minHeight': 666
    } );

    chrome.contextMenus.create({
        "title": "Test porumai item", 
        "id": "porumai",
        "contexts": ["all"]
    });

} );

// on 'APP INSTALL'
chrome.runtime.onInstalled.addListener(function() {
    console.log("app installed");
    /*chrome.contextMenus.create({
        "title": "Test porumai item", 
        "id": "porumai",
        "contexts": ["selection", "frame", "page"]
    });*/
});

chrome.contextMenus.onClicked.addListener( function (info, id) {
    console.log(info, id, arguments, " Porumai");
} );
