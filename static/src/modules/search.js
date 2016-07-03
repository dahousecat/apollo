(function(apollo, Search) {

    // Dependencies
    // var Artist = apollo.module('artist');
    // var Album = apollo.module('album');
    var Track = apollo.module.track;

    // The application container
    // var app = apollo.app;

    // Define a track
    Search.Result = Backbone.Model.extend({
        urlRoot: '/search',
        url: function() {
            return this.urlRoot + '?' + this.query;
        },
        defaults: {
            term: '',
            results: {
                artists: [],
                albums: [],
                tracks: [],
            },
        }
    });

    Search.ResultsCollection = Backbone.Collection.extend({
        model: Search.Result,
        initialize : function(models, options){
            console.log(options, 'options');
            this.query = options.query;
        },
        urlRoot: '/search',
        url: function() {

            console.log(this, 'this');

            return this.urlRoot + '/?' + this.query;
        }
    });


    Search.SearchView = Backbone.View.extend({
        el: '#search',
        events: {
            "click #do-search": "doSearch"
        },
        doSearch: function(event) {

            var term = $('input[name="search-term"]').val();
            console.log('Search for ' + term);

            var trackData = apollo.search('track', term, Track.SetTrackData);

            // var tracks = new Track.Track;
            // var trackData = tracks.search(term);
            //console.log(trackData, 'trackData');

            // var results = new Search.ResultsCollection([], { query: $.param({ term: term}) });
            // results.fetch();


            // console.log(Search, 'Search');
            // console.log(Track, 'track');

            //var tracks = new Track.TracksCollection([], { query: $.param({ term: term}) });
            // { data: $.param({ page: 1}) }
            //tracks.fetch();
            //tracks.render();

            //console.log(Track, 'Track 2');

            //Track.TrackView.render();


            //console.log(tracks);

        },

        renderResults: function( search ){
            // use search.results to render the results on your own way
        }
    });

    ////////////////////////////

    // Search.TestSearch = Backbone.Model.extend({
    //     url: "/search",
    //
    //     initialize: function(){
    //         this.results = new Results( this.get( "results" ) );
    //         this.trigger( "search:ready", this );
    //     }
    // });
    //
    // Search.TestResults = Backbone.Collection.extend({
    //     model: Result
    // });
    //
    // Search.TestSearchView = Backbone.View.extend({
    //     events: {
    //         "submit form" : "createSearch"
    //     },
    //
    //     createSearch: function(){
    //         // You can use things like this
    //         // http://stackoverflow.com/questions/1184624/convert-form-data-to-js-object-with-jquery
    //         // to authomat this process
    //         var search = new Search({
    //             field_1: this.$el.find( "input.field_1" ).val(),
    //             field_2: this.$el.find( "input.field_2" ).val(),
    //         });
    //
    //         // You can listen to the "search:ready" event
    //         search.on( "search:ready", this.renderResults, this )
    //
    //         // this is when a POST request is sent to the server
    //         // to the URL `/search` with all the search information packaged
    //         search.save();
    //     },
    //
    //     renderResults: function( search ){
    //         // use search.results to render the results on your own way
    //     }
    // });


})(apollo, apollo.module.search);
