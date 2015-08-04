package handlers

import (
	"log"
	"../jswebsocket"
	"../players"
)

// --------------------------------------------------- //
// Login
// --------------------------------------------------- //

type playerMoveRecv struct {
	X int `json:x`
	Y int `json:y`
}
var playerMoveHandler = requirePlayer(func(connection *jswebsocket.Connection, stream interface{}) {
	message := stream.(*playerMoveRecv)
	player := connection.User.(*players.Player)
	log.Print("move", message)

	// If the connection has a user, error
	if connection.User != nil {
		connection.Message("login", &errorMessage{ Message: "You are already logged in" })
		return
	}

	player := players.Player{
		Name: message.Username,
	}
	player.Register()

	// TODO: not thread safe
	connection.User = &player
	connection.Message("login", &loginMessageResp{})
})