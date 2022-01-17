module.exports = (sequelize, Sequelize) => {
	const PostComments = sequelize.define("PostComments", {
		schema: 'customer',
		tableName: 'post_comments',
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		comment: {
			type: Sequelize.STRING(256),
			allowNull: false,
		},
		timstamps: false,
		underscored: true
	});

	return PostComments;
};