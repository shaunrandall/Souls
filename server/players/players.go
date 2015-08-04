package players

import (
	"strings"
	"../gameobject"
	"../jswebsocket"
)

type Player struct {
	gameobject.GameObject
	Name string
	IDName string
	Connection *jswebsocket.Connection
}

func (player *Player) Register() {
	player.IDName = NameToIDName(player.Name)
	playersByName[player.IDName] = player
	player.RegisterObject()
	return
}

func (player *Player) Unregister() {
	delete(playersByName, player.IDName)
	player.UnregisterObject()
	return
}

// --------------------------------------------- //
// Static
// --------------------------------------------- //

func NameToIDName(name string) string {
	name = strings.ToLower(name)
	name = strings.Replace(name, " ", "", -1)
	return name
}

var playersByName = make(map[string]*Player)
func GetByName(name string) (player *Player, err bool) {
	player, err = playersByName[NameToIDName(name)]
	return
}