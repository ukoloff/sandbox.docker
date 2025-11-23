package sidecar_test

import (
	"fmt"
	"testing"
)

func TestGit(t *testing.T) {
	tmp := t.TempDir()
	fmt.Println(tmp)
}
