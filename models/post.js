'use strict';
const {
	Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Post extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ User, PostComment, PostLikesUnlike }) {
			// post can have one owner
			this.belongsTo(User, { foreignKey: 'user_id' });

			// post can have multiple comments
			this.hasMany(PostComment, { foreignKey: 'post_id' });

			// post can have multiple likes
			this.hasMany(PostLikesUnlike, { foreignKey: 'post_id' });
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
		sequelize,
		schema: 'customer',
		tableName: 'posts',
		modelName: 'Post',
		underscored: true
	});
	return Post;
};