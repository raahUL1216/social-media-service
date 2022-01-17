module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("User", {
		schema: 'customer',
		tableName: 'users',
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: Sequelize.STRING(254),
			unique: true,
			allowNull: false
		},
		underscored: true,
		timstamps: false
	});

	User.comparePassword = (user, password) => bcrypt.compareSync(password, user.password);

	return User;
};