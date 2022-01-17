module.exports = {
	HOST: "localhost",
	USER: "rahul",
	PASSWORD: "Welcome!",
	DB: "social_media",
	dialect: "postgres",
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	}
};