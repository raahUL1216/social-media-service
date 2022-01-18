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
				references: { model: 'users', key: 'id' }
			},
			follower_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: { model: 'users', key: 'id' }
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('user_followers');
	}
};