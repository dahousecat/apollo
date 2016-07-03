package config

import(
    //"fmt"
    "io/ioutil"
    //"encoding/json"
    "github.com/Jeffail/gabs"
)

type Config struct {
    MusicDir    string
    Port        string
    MpdAddress  string
    MpdPassword string
}

func check(e error) {
    if e != nil {
        panic(e)
    }
}

func NewConfig() (c Config, err error) {

    configPath := "config.json"
    dat, err := ioutil.ReadFile(configPath)
    check(err)
    //fmt.Print(string(dat))

    jsonParsed, err := gabs.ParseJSON(dat);

    var value string
    var ok bool

    c = Config{}

    // TODO: Find out how to use a function to keep this DRY

    value, ok = jsonParsed.Path("MusicDir").Data().(string)
    if(ok) {
        c.MusicDir = value
    } else {
        panic("Can't get MusicDir")
    }

    value, ok = jsonParsed.Path("Port").Data().(string)
    if(ok) {
        c.Port = value
    } else {
        panic("Can't get Port")
    }

    value, ok = jsonParsed.Path("MpdAddress").Data().(string)
    if(ok) {
        c.MpdAddress = value
    } else {
        panic("Can't get MpdAddress")
    }

    value, ok = jsonParsed.Path("MpdPassword").Data().(string)
    if(ok) {
        c.MpdPassword = value
    } else {
        panic("Can't get MpdPassword")
    }

    //c = getSetting(jsonParsed, "MusicDir")
    //c = getSetting(jsonParsed, "Port")
    //c = getSetting(jsonParsed, "MpdAddress")
    //c = getSetting(jsonParsed, "MpdPassword")

    return c, nil

}

//func (c *Config) getSetting(jsonParsed *gabs.Container, key string) (Config) {
//
//    var value string
//    var ok bool
//
//    value, ok = jsonParsed.Path(key).Data().(string)
//    if(ok) {
//        c.key = value
//    } else {
//        panic("Can't get " + key)
//    }
//
//    return c
//}