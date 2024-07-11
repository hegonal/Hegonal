package models

type SignUp struct {
	Username          string    `db:"username" json:"username" validate:"required,max=255"`
	Password      string    `db:"password" json:"password" validate:"required,max=72"`
	Email         string    `db:"email" json:"email" validate:"required,email,max=255"`
}

type Login struct {
	Password      string    `db:"password" json:"password" validate:"required,max=72"`
	Email         string    `db:"email" json:"email" validate:"required,email,max=255"`
}
