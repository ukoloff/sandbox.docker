package sidecar_test

import (
	"os"
	"path"
	"testing"

	git "github.com/go-git/go-git/v6"
)

func TestGit(t *testing.T) {
	tmp := t.TempDir()

	t.Run("Old plain clone", func(t *testing.T) {
		plain := path.Join(tmp, "plain")
		err := os.Mkdir(plain, 0700)
		if err != nil {
			t.Error(err)
		}

		_, err = git.PlainClone(plain, &git.CloneOptions{
			URL:   "https://github.com/ukoloff/sandbox.docker",
			Depth: 2,
		})
		if err != nil {
			t.Error(err)
		}
	})

}
