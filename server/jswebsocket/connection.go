// Copyright 2013 The Gorilla WebSocket Authors. All rights reserved.
// Use of this source code is governed by a BSD-style
// license that can be found in the LICENSE file.

package jswebsocket

import (
    "github.com/gorilla/websocket"
    "encoding/json"
    "time"
)

const (
    // Time allowed to write a message to the peer.
    writeWait = 10 * time.Second

    // Time allowed to read the next pong message from the peer.
    pongWait = 60 * time.Second

    // Send pings to peer with this period. Must be less than pongWait.
    pingPeriod = (pongWait * 9) / 10

    // Maximum message size allowed from peer.
    maxMessageSize = 512
)

var upgrader = websocket.Upgrader{
    ReadBufferSize:  1024,
    WriteBufferSize: 1024,
}

// connection is an middleman between the websocket connection and the hub.
type Connection struct {
    // The websocket connection.
    ws *websocket.Conn

    // Buffered channel of outbound messages.
    send chan []byte

    User interface{}
}

// readPump pumps messages from the websocket connection to the hub.
func (c *Connection) readPump() {
    defer func() {
        h.unregister <- c
        c.ws.Close()
    }()
    c.ws.SetReadLimit(maxMessageSize)
    c.ws.SetReadDeadline(time.Now().Add(pongWait))
    c.ws.SetPongHandler(func(string) error { c.ws.SetReadDeadline(time.Now().Add(pongWait)); return nil })
    for {
        _, message, err := c.ws.ReadMessage()
        if err != nil {
            break
        }
        messageReceive(c, message)
    }
}

// message is a fancy wrapper for write
func (c *Connection) Message(name string, payload interface{}, broadcast bool) {
    jsonOut, _ := json.Marshal(payload)
    messageBytes := append([]byte(name), []byte("|")...)
    messageBytes = append(messageBytes, jsonOut...)

    if broadcast {
        h.broadcast <- messageBytes
    } else {
        c.send <- messageBytes
    }
}

// write writes a message with the given message type and payload.
func (c *Connection) write(mt int, payload []byte) error {
    c.ws.SetWriteDeadline(time.Now().Add(writeWait))
    return c.ws.WriteMessage(mt, payload)
}

// writePump pumps messages from the hub to the websocket connection.
func (c *Connection) writePump() {
    ticker := time.NewTicker(pingPeriod)
    defer func() {
        ticker.Stop()
        c.ws.Close()
    }()
    for {
        select {
        case message, ok := <-c.send:
            if !ok {
                c.write(websocket.CloseMessage, []byte{})
                return
            }
            if err := c.write(websocket.TextMessage, message); err != nil {
                return
            }
        case <-ticker.C:
            if err := c.write(websocket.PingMessage, []byte{}); err != nil {
                return
            }
        }
    }
}