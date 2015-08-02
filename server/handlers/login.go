package handlers

import (
	"log"
	"../jswebsocket"
)

type loginMessage struct {
	Username string `json:username`
	Password string `json:password`
}
var loginResponse = requireAuth(func(connection *jswebsocket.Connection, stream interface{}) {
	message := stream.(*loginMessage)
	log.Print("login", message)
})