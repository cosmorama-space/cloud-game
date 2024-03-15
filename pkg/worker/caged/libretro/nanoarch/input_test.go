package nanoarch

import (
	"math/rand"
	"sync"
	"testing"
)

func TestConcurrentInput(t *testing.T) {
	var wg sync.WaitGroup
	state := InputState{}
	events := 1000
	wg.Add(2 * events)

	for i := 0; i < events; i++ {
		player := rand.Intn(maxPort)
		go func() { state.Input(player, []byte{0, 1}); wg.Done() }()
		go func() { state.IsKeyPressed(uint(player), 100); wg.Done() }()
	}
	wg.Wait()
}
