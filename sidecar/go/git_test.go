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
			URL:      "https://github.com/ukoloff/sandbox.docker",
			Depth:    2,
			Progress: os.Stdout,
		})
		if err != nil {
			t.Error(err)
		}
	})

	t.Run("Sparse clone", func(t *testing.T) {
		t.Skip()
		sparse := path.Join(tmp, "sparse")
		err := os.Mkdir(sparse, 0700)
		if err != nil {
			t.Error(err)
		}

		repo, err := git.PlainClone(sparse, &git.CloneOptions{
			URL: "https://github.com/ukoloff/sandbox.docker",
			// Depth:      2,
			NoCheckout: true,
			Progress:   os.Stdout,
		})
		if err != nil {
			t.Error(err)
		}
		w, err := repo.Worktree()
		if err != nil {
			t.Error(err)
		}

		err = w.Checkout(&git.CheckoutOptions{
			SparseCheckoutDirectories: []string{"/sidecar"},
		})
		if err != nil {
			t.Error(err)
		}
	})

}
