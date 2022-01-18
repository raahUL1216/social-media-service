'use strict';
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('user_followers', {
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
			},
			follower_id: {
				type: DataTypes.BIGINT,
				allowNull: false
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('user_followers');
	}
};