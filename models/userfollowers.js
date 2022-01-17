'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class UserFollower extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Post }) {
			this.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
			this.belongsTo(User, { foreignKey: "follower_id", targetKey: "id" });
		}
	}
	UserFollower.init({
	}, {
		sequelize,
		schema: 'customer',
		tableName: 'user_followers',
		modelName: 'UserFollower',
		underscored: true,
	});

	UserFollower.removeAttribute('id');

	return UserFollower;
};