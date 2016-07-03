package handlers

import (
    "fmt"
    //"github.com/dahousecat/gompd/mpd"
    "github.com/Jeffail/gabs"
    "net/http"
    "strings"
    //"strconv"
    "github.com/dahousecat/apollo/astfgl"
    "log"
)

type SearchHandler struct {
    astfgl.Astfgl
}

//type SearchResult struct {
//    Artists []mpd.Attrs
//    Albums []mpd.Attrs
//    Titles []mpd.Attrs
//}
//

// track
//"Album": "Clancy's Tavern (Deluxe Edition)",
//"Artist": "Toby Keith",
//"Disc": "1",
//"Time": "223",
//"Title": "Red Solo Cup",
//"Track": "10",

//"X-AlbumUri": "spotify:album:6fDc100UHbUvS6IuxBrKRn",

//"file": "spotify:track:47nm8czanMUzIqHsnr5x61"

type Attributes struct {
    Title string `json:"title"`
    Time string `json:"time"`
    Disc string `json:"disc"`
    Track string `json:"track"`
}

type Result struct {
    Type        string    `json:"type"`
    ID          string      `json:"id"`
    Attributes  Attributes `json:"attributes"`
}

func (h SearchHandler) ServeHTTP(w http.ResponseWriter, r *http.Request) {

    // Get the query type from the URL
    query_type := strings.Trim(r.URL.Query().Get("type"), "[]")
    if(query_type == "track") {
        query_type = "title"
    }

    // Get the search term from the URL
    query_term := strings.Trim(r.URL.Query().Get("term"), "[]")
    query := fmt.Sprintf("%s %s", query_type, query_term)

    // Create a new json object
    jsonObj := gabs.New()

    if query_type == "" {
        // No type supplied so return artist, album and title
        jsonObj = findJson(jsonObj, "artists", "artist " + query, h);
        jsonObj = findJson(jsonObj, "album", "album " + query, h);
        jsonObj = findJson(jsonObj, "title", "title " + query, h);
    } else {
        // Just return type
        jsonObj = findJson(jsonObj, query_type, query, h);
        //jsonObj = findJson(jsonObj, "title", "title " + query, h);
    }

    w.Header().Set("Content-Type", "application/json; charset=UTF-8")
    w.WriteHeader(http.StatusOK)

    fmt.Fprintf(w, "%s", jsonObj.String())

}


func findJson(jsonObj *gabs.Container, key string, query string, h SearchHandler) (*gabs.Container) {

    log.Printf("query: %s\n", query)

    res_artist, err := h.Astfgl.Conn.Find(query)
    if(err != nil) {
        fmt.Sprintf("Error: %v\n", err)
        jsonObj.Set(err, "error", "title")
        jsonObj.Set("The query was: " + query, "error", "detail")
    } else {

        jsonObj.Array("data")

        var res_type string

        if(key == "title") {
            res_type = "track"
        } else {
            res_type = key
        }


        for _, element := range res_artist {

            // Album
            //"Album": "Red River Blue (Deluxe)",
            //"Artist": "Blake Shelton",
            //"Disc": "1",
            //"Time": "210",
            //"Title": "Honey Bee",
            //"Track": "1",
            //"X-AlbumUri": "spotify:album:1WXCjIDp84rJN6Sa1Um9kJ",
            //"file": "spotify:track:0gY2iq0xJPRoIB1PScKSw4"

            //Title string `json:"title"`
            //Time string `json:"time"`
            //Disc string `json:"disc"`
            //Track string `json:"track"`

            a := Attributes{
                Title: element["Title"],
                Time: element["Time"],
                Disc: element["Disc"],
                Track: element["Track"],
            }
            r := Result{
                Type: res_type,
                ID: element["file"],
                Attributes: a,
            }

            //fmt.Printf("element: %v\n", element)

            // Turn the index into a string to use for the key
            //item_key := strconv.Itoa(index)
            //jsonObj.Set(element, "data", key, item_key)

            jsonObj.ArrayAppend(r, "data")
        }
    }
    return jsonObj
}
