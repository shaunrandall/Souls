package jswebsocket

import (
    "bytes"
    "flag"
    "encoding/json"
    "log"
    "net/http"
    "text/template"
)

type muxEntry struct {
    // Registered connections.
    handlers map[string]Handler
}
var DefaultMuxEntry = muxEntry {
    handlers: make(map[string]Handler),
}
type Handler struct {
    Function HandlerFunc
    Structure func() interface{}
}
type HandlerFunc func(*Connection, interface{})


func messageReceive(connection *Connection, message []byte) {
    separatorIndex := bytes.Index(message, []byte("|"))

    if separatorIndex == -1 {
        log.Print("Unable to parse message")
        return
    }

    command := string(message[:separatorIndex])
    handler, found := DefaultMuxEntry.handlers[command]
    if !found {
        log.Print("Handler ", command, " not found")
        return
    }

    data := handler.Structure()
    if err := json.Unmarshal(message[separatorIndex+1:], data); err != nil {
        log.Print("Unable to decode JSON: ", err)
        return
    }

    handler.Function(connection, data)
}


// serverWs handles websocket requests from the peer.
func serveWebSocket(w http.ResponseWriter, r *http.Request){
    if r.Method != "GET" {
        http.Error(w, "Method not allowed", 405)
        return
    }
    ws, err := upgrader.Upgrade(w, r, nil)
    if err != nil {
        log.Println(err)
        return
    }
    c := &Connection{send: make(chan []byte, 256), ws: ws}
    h.register <- c
    go c.writePump()
    c.readPump()
}

var homeTempl = template.Must(template.ParseFiles("home.html"))
func serveHome(w http.ResponseWriter, r *http.Request) {
    if r.URL.Path != "/" {
        http.Error(w, "Not found", 404)
        return
    }
    if r.Method != "GET" {
        http.Error(w, "Method not allowed", 405)
        return
    }
    w.Header().Set("Content-Type", "text/html; charset=utf-8")
    homeTempl.Execute(w, r.Host)
}

func ListenAndServe(addr string) {
    flag.Parse()
    go h.run()
    http.HandleFunc("/", serveHome)
    http.HandleFunc("/ws", serveWebSocket)
    err := http.ListenAndServe(addr, nil)
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
}

func HandleFunc(handlerName string, handler Handler) {
    DefaultMuxEntry.handlers[handlerName] = handler
}