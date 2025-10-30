package main_test

import (
	main "sidecar"
	"testing"
)

func TestStringify(t *testing.T) {
	tests := []struct {
		name string // description of this test case
		// Named input parameters for target function.
		data    any
		want    string
		wantErr bool
	}{
		{name: "Empty",
			data: struct{ A string }{A: "Hello, world!"},
			want: "{\"A\":\"Hello, world!\"}"},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, gotErr := main.Stringify(tt.data)
			if gotErr != nil {
				if !tt.wantErr {
					t.Errorf("Stringify() failed: %v", gotErr)
				}
				return
			}
			if tt.wantErr {
				t.Fatal("Stringify() succeeded unexpectedly")
			}

			if got != tt.want {
				t.Errorf("Stringify() = %v, want %v", got, tt.want)
			}
		})
	}
}
