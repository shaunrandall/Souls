package handlers

import (
	"../jswebsocket"
)

func requireAuth(f jswebsocket.HandlerFunc) jswebsocket.HandlerFunc {
	return func(c *jswebsocket.Connection, i interface{}) {
		f(c,i)
	}
}