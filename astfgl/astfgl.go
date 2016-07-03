package astfgl

import (
    "github.com/dahousecat/gompd/mpd"
    "github.com/dahousecat/apollo/config"
)

// Implement Astfgl, rules of the Music Player Daemons
type Astfgl struct {
    Conn              *mpd.Client
    Conf              *config.Config
}

func NewAstfgl(conf *config.Config) (a Astfgl, err error) {

    conn, err := mpd.Dial("tcp", conf.MpdAddress)
    if err != nil {
        return a, err
    }

    a = Astfgl{conn, conf}

    return a, nil
}
