module.exports = (sequelize, Sequelize) => {
	const Post = sequelize.define("Post", {
		schema: 'customer',
		tableName: 'posts',
		id: {
			type: Sequelize.BIGINT,
			primaryKey: true,
			autoIncrement: true
		},
		title: {
			type: Sequelize.STRING(50),
			allowNull: false,
		},
		description: {
			type: Sequelize.TEXT
		},
		underscored: true,
		timstamps: true,
		createdAt: "created_time",
		updatedAt: false
	});

	return Post;
};