'use strict';
module.exports = {
	async up(queryInterface, DataTypes) {
		await queryInterface.createTable('post_likes_unlikes', {
			id: {
				type: DataTypes.BIGINT,
				primaryKey: true,
				allowNull: false,
				autoIncrement: true,
			},
			post_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: { model: 'posts', key: 'id' }
			},
			user_id: {
				type: DataTypes.BIGINT,
				allowNull: false,
				references: { model: 'users', key: 'id' }
			},
			liketype: {
				type: DataTypes.ENUM,
				values: ['0', '1'],
			}
		});
	},
	async down(queryInterface, DataTypes) {
		await queryInterface.dropTable('post_likes_unlikes');
	}
};