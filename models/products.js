const {DataTypes} = require('sequelize');
const db = require('./dbConn');
const VoPlans = require('./vo_plans');
const InvoicesDt = require('./invoices_dt');
const Products = db.define(
	'products',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		location_id: DataTypes.INTEGER,
		product_name: DataTypes.STRING,
		category: DataTypes.INTEGER,
		price: DataTypes.FLOAT(4),
		setup_fee: DataTypes.FLOAT(4),
		credit: DataTypes.INTEGER,
		serviced_office_id: DataTypes.INTEGER,
		status: DataTypes.INTEGER,
		renewal_price: DataTypes.FLOAT(4),
		approved_by: {
			allowNull: true,
			type: DataTypes.INTEGER,
		},
		approved_at: {
			allowNull: true,
			type: DataTypes.DATE,
		},
		created_by: DataTypes.INTEGER,
	},
	{}
);

Products.hasMany(VoPlans, {foreignKey: 'product_id'});
VoPlans.belongsTo(Products, {foreignKey: 'product_id'});
Products.hasMany(InvoicesDt, {foreignKey: 'product_id'});
InvoicesDt.belongsTo(Products, {foreignKey: 'product_id'});

module.exports = Products;
