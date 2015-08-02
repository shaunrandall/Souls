// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package main

import (
    "flag"
    "log"
    "./jswebsocket"
    "./handlers"
)

func main() {
    address := flag.String("addr", ":1337", "http service address")
    log.Print("Starting Server...")

    for name, handler := range handlers.Handlers {
        jswebsocket.HandleFunc(name, handler)
    }

    jswebsocket.ListenAndServe(*address)
}