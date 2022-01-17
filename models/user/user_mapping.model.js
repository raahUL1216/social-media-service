module.exports = (sequelize, Sequelize) => {
	const UserMapping = sequelize.define("UserMapping", {
		schema: 'auth',
		tableName: 'user_mappings',
		underscored: true,
		timstamps: false
	});

	return UserMapping;
};