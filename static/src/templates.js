this["JST"] = this["JST"] || {};

this["JST"]["static/src/templates/track.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<div class="track">\n    <div class="title">' +
__e( title ) +
'</div>\n    <div class="album">' +
__e( album ) +
'</div>\n    <div class="artist">' +
__e( artist ) +
'</div>\n</div>';

}
return __p
};