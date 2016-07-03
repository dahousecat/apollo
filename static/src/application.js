var apollo = {
    module: {
        search: {},
        track: {}
    }
};

jQuery(function($) {

    // Initialize your application here.
    // app.router = new app.Router();
    // Backbone.history.start();
    // app.appView = new app.AppView();
    //
    // // Create the root application Router
    // var Router = Backbone.Router.extend({ ... });
    //
    // // Initialize it into the application namespace
    // app.router = new Router();
    //
    // // Start tracking history
    // Backbone.history.start();

    // var data = {title: 'test', 'album': 'test', artist: 'test'};
    // var html = JST['static/src/templates/track.html'](data);

    //apollo.tracksCollection = new apollo.module.track.TracksCollection

    //apollo.tracks = new apollo.module.track.Track();
    apollo.searchView = new apollo.module.search.SearchView();

   // TrackModel = Backbone.Model.extend({});


    apollo.search = function(type, term, callback) {
        $.ajax({
            url: window.location.href + '/search/?type=' + type + '&term=' + term,
            dataType: 'json',
        }).success(function(data) {

            callback(data);

            console.log(data, 'data');
            //return data;
        });
    }


});