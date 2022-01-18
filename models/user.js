'use strict';
const { Model } = require('sequelize');
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		static associate(models) {
			// can have many followers and following
			this.belongsToMany(this, {
				foreignKey: 'user_id',
				as: 'followers',
				through: 'user_followers'
			});
			this.belongsToMany(this, {
				foreignKey: 'follower_id',
				as: 'following',
				through: 'user_followers'
			});

			// can have many posts
			this.hasMany(models.Post, { foreignKey: 'user_id', as: 'posts' });

			// can post more than one comment
			this.hasMany(models.PostComment, { foreignKey: 'user_id' });

			// can like post one time
			this.hasOne(models.PostLikeUnlike, { foreignKey: 'user_id', targetKey: 'id' });
		}
	}
	User.init({
		id: {
			type: DataTypes.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		email: {
			type: DataTypes.STRING(254),
			unique: true,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING(256),
			allowNull: false,
			set(value) {
				this.setDataValue('password', bcrypt.hashSync(value, 10));
			}
		}
	}, {
		sequelize,
		tableName: 'users',
		modelName: 'User',
		underscored: true,
	});
	return User;
};