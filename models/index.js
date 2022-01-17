const config = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
	config.DB,
	config.USER,
	config.PASSWORD,
	{
		host: config.HOST,
		dialect: config.dialect,
		operatorsAliases: false,

		pool: {
			max: config.pool.max,
			min: config.pool.min,
			acquire: config.pool.acquire,
			idle: config.pool.idle
		}
	}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.authuser = require("./user/authuser.model")(sequelize, Sequelize);
db.usermapping = require("./user/user_mapping.model")(sequelize, Sequelize);
db.user = require("./user/user.model")(sequelize, Sequelize);

db.post = require("./posts/posts.model")(sequelize, Sequelize);
db.postlikesunlikes = require("./posts/post_likes_unlikes.model")(sequelize, Sequelize);
db.postcomments = require("./posts/post_comments.model")(sequelize, Sequelize);

// map authuser and user
db.authuser.hasOne(db.usermapping, { foreignKey: 'authuser_id' });
db.usermapping.belongsTo(db.authuser, { foreignKey: 'authuser_id' });
db.user.hasOne(db.usermapping, { foreignKey: 'user_id' });
db.usermapping.belongsTo(db.user, { foreignKey: 'user_id' });

// map user with followers
db.user.belongsToMany(db.user, { as: 'followers', through: "user_followers", foreignKey: "user_id" });
db.user.belongsToMany(db.user, { as: 'following', through: "user_followers", foreignKey: "follower_id" });

// map user with posts
db.user.hasMany(db.post);
db.post.belongsTo(db.user);

// map post with comments
db.post.hasMany(db.postcomments, { foreignKey: 'post_id' });
db.postcomments.belongsTo(db.post, { foreignKey: 'post_id' });
db.user.hasMany(db.postcomments, { foreignKey: 'user_id' });
db.postcomments.belongsTo(db.user, { foreignKey: 'user_id' });

// map post with likes
db.post.hasMany(db.postlikesunlikes, { foreignKey: 'post_id' });
db.postlikesunlikes.belongsTo(db.post, { foreignKey: 'post_id' });
db.user.hasMany(db.postlikesunlikes, { foreignKey: 'user_id' });
db.postlikesunlikes.belongsTo(db.user, { foreignKey: 'user_id' });

module.exports = db;