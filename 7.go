package main

import (
    "fmt"
    "strings"
)

func main() {
    s := "Go is amazing"
    words := strings.Split(s, " ") // membagi huruf s menjadi dua kata dari huruf s
    fmt.Println(len(words))
}
