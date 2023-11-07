package api

import (
	"net/http"
	"net/http/httptest"
	"os"
	"testing"

	"npm/internal/config"

	"github.com/stretchr/testify/assert"
	"go.uber.org/goleak"
)

var (
	r       = NewRouter()
	version = "3.0.0"
	commit  = "abcdefgh"
)

// Tear up/down
func TestMain(m *testing.M) {
	config.Init(&version, &commit)
	code := m.Run()
	os.Exit(code)
}

func TestGetHealthz(t *testing.T) {
	// goleak is used to detect goroutine leaks
	defer goleak.VerifyNone(t,
		goleak.IgnoreAnyFunction("github.com/patrickmn/go-cache.(*janitor).Run"),
		goleak.IgnoreAnyFunction("github.com/jc21/go-sse.(*Server).dispatch"),
	)

	respRec := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/api/", nil)

	r.ServeHTTP(respRec, req)
	assert.Equal(t, http.StatusOK, respRec.Code)
	assert.Contains(t, respRec.Body.String(), "healthy")
}

func TestNonExistent(t *testing.T) {
	// goleak is used to detect goroutine leaks
	defer goleak.VerifyNone(t,
		goleak.IgnoreAnyFunction("github.com/patrickmn/go-cache.(*janitor).Run"),
		goleak.IgnoreAnyFunction("github.com/jc21/go-sse.(*Server).dispatch"),
	)

	respRec := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/non-existent-endpoint.jpg", nil)

	r.ServeHTTP(respRec, req)
	assert.Equal(t, http.StatusNotFound, respRec.Code)
	assert.Equal(t, respRec.Body.String(), `{"result":null,"error":{"code":404,"message":"Not found"}}`, "404 Message should match")
}
