'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class PostLikeUnlike extends Model {
		static associate({ User, Post }) {
			this.belongsTo(User, { foreignKey: "user_id", targetKey: "id" });
			this.belongsTo(Post, { foreignKey: "post_id", targetKey: "id", as: "post" });
		}
	}
	PostLikeUnlike.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			allowNull: false,
			autoIncrement: true,
		},
		liketype: {
			type: DataTypes.ENUM,
			values: ['0', '1'],
			allowNull: false
		}
	}, {
		sequelize,
		tableName: 'post_likes_unlikes',
		modelName: 'PostLikeUnlike',
		underscored: true,
	});
	return PostLikeUnlike;
};