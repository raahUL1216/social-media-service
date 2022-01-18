'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		static associate({ User, PostComment, PostLikeUnlike }) {
			// post can have one owner
			this.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

			// post can have multiple comments
			this.hasMany(PostComment, { foreignKey: 'post_id', as: 'comments' });

			// post can have multiple likes
			this.hasMany(PostLikeUnlike, { foreignKey: 'post_id', as: 'postLikesUnlikes' });
		}
	}
	Post.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: DataTypes.STRING(50),
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT
		},
		created_at: {
			type: DataTypes.DATE,
			defaultValue: DataTypes.NOW
		}
	}, {
		hooks: {
			afterCreate: (record) => {
				delete record.dataValues.user_id;
			},
		},
		sequelize,
		tableName: 'posts',
		modelName: 'Post',
		underscored: true
	});
	return Post;
};