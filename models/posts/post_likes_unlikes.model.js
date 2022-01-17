module.exports = (sequelize, Sequelize) => {
	const PostLikesUnlikes = sequelize.define("PostLikesUnlikes", {
		schema: 'customer',
		tableName: 'post_likes_unlikes',
		liketype: {
			type: Sequelize.ENUM(0, 1),
			allowNull: false
		},
		timstamps: false
	});

	return PostLikesUnlikes;
};