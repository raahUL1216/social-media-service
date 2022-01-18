'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class UserFollower extends Model {

		static associate({ User }) {
			this.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
			this.belongsTo(User, { foreignKey: "follower_id", targetKey: "id" });
		}
	}
	UserFollower.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		}
	}, {
		sequelize,
		tableName: 'user_followers',
		modelName: 'UserFollower',
		underscored: true,
	});

	return UserFollower;
};