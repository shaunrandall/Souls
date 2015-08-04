
package main

import (
	"log"
)

func byteCheck(args ...bool) {
	log.Print(len(args))
}

func main() {
	test1 := []byte("{\"Test\":true,\"Junk\":[1,2,4]}")

	log.Print(test1[0])

	byteCheck(true)
	byteCheck(false)
	byteCheck()
}