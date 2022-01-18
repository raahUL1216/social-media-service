'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class PostComment extends Model {

		static associate({ Post }) {
			// comment belongs to one post
			this.belongsTo(Post, { foreignKey: 'post_id', as: 'post' });
		}
	}
	PostComment.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		comment: {
			type: DataTypes.STRING(256),
			allowNull: false,
		},
	}, {
		sequelize,
		tableName: 'post_comments',
		modelName: 'PostComment',
		underscored: true
	});
	return PostComment;
};