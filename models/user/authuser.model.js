module.exports = (sequelize, Sequelize) => {
	const bcrypt = require('bcryptjs');

	const AuthUser = sequelize.define("AuthUser", {
		schema: 'auth',
		tableName: 'authuser',
		id: {
			type: Sequelize.UUID,
			primaryKey: true,
			defaultValue: Sequelize.UUIDV4
		},
		email: {
			type: Sequelize.STRING(254),
			unique: true,
			allowNull: false,
			validate: {
				isEmail: { msg: 'Must be a valid email address.' }
			}
		},
		password: {
			type: Sequelize.STRING(256),
			allowNull: false,
			set(value) {
				this.setDataValue('password', bcrypt.hashSync(value, 10));
			}
		},
		underscored: true,
		timstamps: false
	});

	return AuthUser;
};