'use strict';

module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('users', {
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			email: {
				type: DataTypes.STRING(254),
				unique: true,
				allowNull: false
			},
			password: {
				type: DataTypes.STRING(256),
				allowNull: false,
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('users');
	}
};