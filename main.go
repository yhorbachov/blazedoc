package main

import (
	"log"
	"os"
	"strings"

	_ "github.com/yhorbachov/blazedoc/migrations"
	"github.com/yhorbachov/blazedoc/ui"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/core"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

func main() {
	app := pocketbase.New()

	isGoRun := strings.HasPrefix(os.Args[0], os.TempDir())

	migratecmd.MustRegister(app, app.RootCmd, migratecmd.Config{
		Automigrate: isGoRun,
	})

	app.OnServe().BindFunc(func(e *core.ServeEvent) error {
		e.Router.GET("/{path...}", apis.Static(ui.DistDirFS, false)).
			BindFunc(func(e *core.RequestEvent) error {
				if e.Request.URL.Path != "/" {
					e.Response.Header().Set("Cache-Control", "max-age=1209600, stale-while-revalidate=86400")
				}

				return e.Next()
			}).Bind(apis.Gzip())

		return e.Next()
	})

	if err := app.Start(); err != nil {
		log.Fatal(err)
	}
}
