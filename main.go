package main

/**
/search/funk?type=album&term=funk
/search/funk?type=artist&term=funk
/search/?type=title&term=diddy
 */

import (
    "fmt"
    "github.com/dahousecat/apollo/handlers"
    "github.com/dahousecat/apollo/astfgl"
    "github.com/dahousecat/apollo/config"
    "net/http"
    //"github.com/gorilla/mux"
    "log"
    "os"
)

func main() {

    conf, err := config.NewConfig()
    if err != nil {
        fmt.Printf("Failed to fetch configuration", err)
    }

    astfgl, err := astfgl.NewAstfgl(&conf)
    if err != nil {
        fmt.Printf("Failed to initialize astfgl ruler of the daemons", err)
    }

    serve(&conf, astfgl)
}

func serve(conf *config.Config, astfgl astfgl.Astfgl) {

    // Index
    //router := mux.NewRouter().StrictSlash(true)
    //router.HandleFunc("/", handlers.Index)
    //
    //// Static
    //staticDir, _ := os.Getwd()
    //staticDir = staticDir + "/static"
    //log.Printf("Serving static files from %s\n", staticDir)
    //
    //log.Fatal(http.ListenAndServe(":8080", router))
    //router.HandleFunc("/", handlers.Index)

    ////////////////

    searchHandler := handlers.SearchHandler{astfgl}
    http.Handle("/search/", searchHandler)

    staticDir, _ := os.Getwd()
    staticDir = staticDir + "/static"
    log.Printf("Serving static files from %s\n", staticDir)

    http.Handle("/static/", http.StripPrefix("/static/",
        http.FileServer(http.Dir(staticDir))))
    http.HandleFunc("/", handlers.Index)

    // var bind = fmt.Sprintf(":%d", *conf.Port)
    http.ListenAndServe(":8080", nil)
}
