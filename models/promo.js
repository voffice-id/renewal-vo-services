const {DataTypes} = require('sequelize');
const db = require('./dbConn');
const InvoicesHt = require('./invoices_ht');

const Promos = db.define(
	'promo',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		name: DataTypes.STRING,
		price: DataTypes.INTEGER,
		type: {
			type: DataTypes.ENUM('1', '2'),
			allowNull: false,
			comment: '1 = fixed number, 2 = percentage',
		},
		status: {
			type: DataTypes.ENUM('0', '1'),
			allowNull: false,
			defaultValue: '0',
			comment: '0 = not active, 1 = active',
		},
		created_by: {
			type: DataTypes.INTEGER,
		},
	},
	{
		freezeTableName: true,
	}
);

Promos.hasMany(InvoicesHt, {foreignKey: 'promo_id'});
InvoicesHt.belongsTo(Promos, {foreignKey: 'promo_id'});

module.exports = Promos;
