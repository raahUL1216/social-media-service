'use strict';
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('post_comments', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT
			},
			post_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: { model: 'posts', key: 'id' }
			},
			comment: {
				type: DataTypes.STRING
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: { model: 'users', key: 'id' }
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('post_comments');
	}
};