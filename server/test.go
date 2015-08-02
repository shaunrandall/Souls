
package main

import (
	"log"
	"encoding/json"
)

type Handler struct {
	handler func(interface{})
	structure func() interface{}
}


type HandleRequest struct {
	Test bool
	Junk []int
}
func check(zz interface{}) {
	log.Print("CONVERT")
	message := zz.(*HandleRequest)
	log.Print(message)
	log.Print(zz)
	message.Test = !message.Test
	log.Print(message)
	log.Print(zz)
}

var LoginHandler = Handler{ check, func() interface{} { return &HandleRequest{} } }

func main() {
	test1 := []byte("{\"Test\":true,\"Junk\":[1,2,4]}")
	test2 := []byte("{\"Test\":false,\"Junk\":[5,5,6]}")

	log.Print(" test 1 ")
	data1 := LoginHandler.structure()
	if err := json.Unmarshal(test1, data1); err != nil {
	    panic(err)
	}
	LoginHandler.handler(data1)

	log.Print(" test 2 ")
	data2 := LoginHandler.structure()
	if err := json.Unmarshal(test2, data2); err != nil {
	    panic(err)
	}
	LoginHandler.handler(data1)
}