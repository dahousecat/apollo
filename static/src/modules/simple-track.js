
var Track = Backbone.Model.extend();

var TrackList = Backbone.Collection.extend({
    model: Track,
    url: '/search/?type=track&term=red'
});


var tracks = new TrackList();
tracks.fetch();
//console.log(tracks);

tracks.bind('reset', function () { console.log(tracks); });

// var profiles = new ProfileList();
// profiles.fetch();
// console.log(profiles);

// TrackList= Backbone.Collection.extend(
//     {
//         model:Server,
//         url:"/LoginWebService/Domain1?DomainName=mail",
//         initialize:function(){alert('In collection init');},
//         parse:{
//             success:function(response){alert(response);},
//
//             error:function(){alert("error");}
//         }
//     }
// );
//
// list=new ServerList;
// list.fetch();