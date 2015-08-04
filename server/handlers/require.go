package handlers

import (
	"../jswebsocket"
)

func requirePlayer(f jswebsocket.HandlerFunc) jswebsocket.HandlerFunc {
	return func(c *jswebsocket.Connection, i interface{}) {
		if c.User == nil {
			c.Message("error", &errorMessage{ Message: "You must be logged in" })
			return
		}
		f(c,i)
	}
}