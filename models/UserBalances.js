const {DataTypes} = require('sequelize');
const db = require('./dbConn');

const UserBalances = db.define(
	'user_balances',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		user_id: {
			type: DataTypes.INTEGER,
		},
		plan_id: {
			type: DataTypes.INTEGER,
		},
		balance: {
			type: DataTypes.FLOAT,
		},
		createdAt: {
			field: 'created_at',
			type: DataTypes.DATE,
		},
		updatedAt: {
			field: 'updated_at',
			type: DataTypes.DATE,
		},
	},
	{
		freezeTableName: true,
	}
);

const getQuotaByUserId = (userId) =>
	UserBalances.findAll({
		where: {
			user_id: userId,
		},
	});

module.exports = {
	UserBalances,
	getQuotaByUserId,
};
