package main

import (
	"fmt"
	"os"

	days "github.com/advent-of-code-2021/days"
)

func main() {
	fmt.Println("Welcome to Advent of Code 2021!")
	args := os.Args[1:]
	if len(args) == 0 {
		fmt.Println("Please provide a day to run")
		return
	}
	switch args[0] {
	case "1":
		days.Run()
		return
	default:
		fmt.Printf("Day %s is not implemented yet\n", args[0])
	}
}
