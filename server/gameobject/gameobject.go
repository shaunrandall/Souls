package gameobject

type GameObject struct {
	ObjectId int64 `json:"id"`
	X int `json:"x"`
	Y int `json:"y"`
	Waypoints []Waypoint `json:"waypoints"`
}
type Waypoint struct {
	X int `json:"x"`
	Y int `json:"y"`
}

var lastId int64 = 0

var ObjectsById = make(map[int64]*GameObject)
func (object *GameObject) RegisterObject() {
	// TODO: Not thread safe
	lastId += 1
	object.ObjectId = lastId
	ObjectsById[object.ObjectId] = object
	return
}

func (object *GameObject) UnregisterObject() {
	delete(ObjectsById, object.ObjectId)
	return
}

func (object *GameObject) SetTarget(x int, y int) {
	// TODO: check that target distance is not too great
	object.SetPath([]Waypoint{ Waypoint{ X: x, Y: y } })
}

func (object *GameObject) SetPath(waypoints []Waypoint) {
	// TODO: check that path is possible
	// TODO: not thread safe
	object.Waypoints = waypoints
}