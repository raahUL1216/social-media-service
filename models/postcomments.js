'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class PostComment extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Post }) {
			// comment belongs to one post
			this.belongsTo(Post, { foreignKey: 'post_id' });
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
		schema: 'customer',
		tableName: 'post_comments',
		modelName: 'PostComment',
		underscored: true
	});
	return PostComment;
};