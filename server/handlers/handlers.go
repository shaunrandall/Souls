package handlers

import (
	"../jswebsocket"
)

var Handlers = map [string]jswebsocket.Handler {
	"login": jswebsocket.Handler { loginHandler, func() interface{} { return &loginRecv{} } },
	"move": jswebsocket.Handler { playerMoveHandler, func() interface{} { return &playerMoveRecv{} } },
}