'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PostLikesUnlike extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, Post }) {
			this.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
			this.belongsTo(Post, { foreignKey: "post_id", targetKey: "id" });
		}
	}
	PostLikesUnlike.init({
		liketype: {
			type: DataTypes.ENUM('0', '1'),
			allowNull: false
		}
	}, {
		sequelize,
		schema: 'customer',
		tableName: 'post_likes_unlikes',
		modelName: 'PostLikesUnlike',
		underscored: true,
	});
	return PostLikesUnlike;
};