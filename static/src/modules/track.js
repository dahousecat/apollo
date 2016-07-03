(function(apollo, Track) {

    // var Marionette = require('backbone.marionette');

    // Define a track
    Track.Track = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            artist: '',
            disc: '',
            time: '',
            track: '',
            albumUri: '',
            file: '',
        },
        urlRoot: '/search',
        url: function() {
            return this.urlRoot + '?q=' + this.query;
        },
        search: function(term) {

            console.log('term is ' + term);

            $.ajax({
                url: window.location.href + '/search/?type=track&term=' + term,
                dataType: 'json',
            }).success(function(data) {

                console.log(data, 'sucess');

                return data;
            });

        },
    });
    
    Track.SetTrackData = function(data) {

        //var tracks = [];

        jQuery.each(data.data, function(index, track) {

            new Track.Track({
                id: track.id,
                disc: track.attributes.disc,
                time: track.attributes.time,
                title: track.attributes.title,
                track: track.attributes.track,
            });

        });

        //apollo.tracks.extend(tracks);
        
    }

    Track.TracksCollection = Backbone.Collection.extend({
        model: Track.Track,
        initialize : function(models, options){
            console.log(options, 'options');
            this.query = options.query;
        },
        urlRoot: '/search',
        url: function() {
            return this.urlRoot + '/?type=track&' + this.query;
        },
    });

    Track.TrackView = Backbone.View.extend({
        tagName: 'li',
        template: _.template($('#item-template').html()),
        render: function(){

            var data = {title: 'test', 'album': 'test', artist: 'test'};
            var html = JST['static/src/templates/track.html'](data);
            this.$el.html(html);

            // this.$el.html(this.template(this.model.toJSON()));
            // this.input = this.$('.edit');
            return this; // enable chained calls
        },
        initialize: function(){
            // this.model.on('change', this.render, this);
            // this.model.on('destroy', this.remove, this);
        },
    });

    Track.TrackList = Backbone.View.extend({
        el: '#track-results',
        //template: _.template($('#item-template').html()),
        initialize: function(){
            // this.model.on('change', this.render, this);
            // this.model.on('destroy', this.remove, this);

            apollo.tracksCollection.on('add', this.addAll, this);
            apollo.tracksCollection.on('reset', this.addAll, this);
            apollo.tracksCollection.fetch();
        },
        render: function(){
            var data = {title: 'test', 'album': 'test', artist: 'test'};
            var html = JST['static/src/templates/track.html'](data);
            this.$el.html(html);

            // this.$el.html(this.template(this.model.toJSON()));
            // this.input = this.$('.edit');
            return this; // enable chained calls
        },
        addOne: function(track){
            var view = new Track.TrackView({model: track});
            $('#track-results').append(view.render().el);
        },
        addAll: function(){
            this.$('#track-results').html('');
            Track.TracksCollection.each(this.addOne, this);
        }

    });

    // Track.TrackList = Marionette.LayoutView.extend({
    //     el: '#track-results',
    //     template: require('/static/src/templates/track.html')
    // });
    //
    // Track.TrackView = new TrackList({
    //     model: new Backbone.Model({
    //         items: [
    //             {title: 'test', 'album': 'test', artist: 'test'},
    //             {title: 'test', 'album': 'test', artist: 'test'}
    //         ]
    //     })
    // });

})(apollo, apollo.module.track);
