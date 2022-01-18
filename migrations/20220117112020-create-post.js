'use strict';
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('posts', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: DataTypes.BIGINT
			},
			title: {
				type: DataTypes.STRING(50),
				allowNull: false,
			},
			description: {
				type: DataTypes.TEXT
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			},
			created_at: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('posts');
	}
};