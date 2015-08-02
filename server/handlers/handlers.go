package handlers

import (
	"../jswebsocket"
)

var Handlers = map [string]jswebsocket.Handler {
	"login": jswebsocket.Handler { loginResponse, func() interface{} { return &loginMessage{} } },
}