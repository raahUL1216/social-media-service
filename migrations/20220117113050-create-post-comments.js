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
				allowNull: false
			},
			comment: {
				type: DataTypes.STRING
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('post_comments');
	}
};