var SupportWrapper = function ($el) {

    var Support = {

        check: function () {

            console.log("checking canvas, web worker support ");

            var status = {
                canvas: this.canvas_support(),
                worker: this.web_worker_support()
            };

            if ( !status.worker ) {
                var msg = "You are using an old browser that does not support instant key glows and statistics. You can still practice touch typing without instant feedback. Please update to <a href='http://browsehappy.com' target='_blank'>latest browser by clicking here.</a> ";
                $el.tt.html( msg ).addClass("alert alert-danger");
            } else if ( !status.canvas ) {
                var msg = "You are using an old browser that does not support instant graphs. You can still practice touch typing without instant feedback. Please update to <a href='http://browsehappy.com' target='_blank'>latest browser by clicking here.</a> ";
                $el.tt.html( msg ).addClass("alert alert-danger");
            }

        },

        canvas_support: function () {
            return !!document.createElement( 'canvas' ).getContext;
        },

        web_worker_support: function () {
            return !!window.Worker;
        }

    };

    return Support;

};

module.exports = SupportWrapper;
