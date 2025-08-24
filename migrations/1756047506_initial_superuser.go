package migrations

import (
	"github.com/pocketbase/pocketbase/core"
	m "github.com/pocketbase/pocketbase/migrations"
)

func init() {
	m.Register(func(app core.App) error {
		superusers, err := app.FindCollectionByNameOrId(core.CollectionNameSuperusers)

		if err != nil {
			return err
		}

		record := core.NewRecord(superusers)

		record.Set("email", "admin@local.com")
		record.Set("password", "password")

		return app.Save(record)
	}, func(app core.App) error {
		record, _ := app.FindAuthRecordByEmail(core.CollectionNameSuperusers, "admin@local.com")

		if record == nil {
			return nil
		}

		return app.Delete(record)
	})
}
