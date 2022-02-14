const {Model, DataTypes} = require('sequelize');
const db = require('./dbConn');
const ActivationData = require('./activation_data');

const InvoicesDt = db.define(
	'invoices_dt',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		invoice_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		company_plan_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		product_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		product_name: DataTypes.STRING,
		product_price: DataTypes.FLOAT(4),
		price: DataTypes.DOUBLE(15, 2),
		pph_42: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: true,
			defaultValue: '0.00',
		},
		pph_23: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: true,
			defaultValue: '0.00',
		},
		vat: {
			type: DataTypes.DOUBLE(10, 2),
			allowNull: true,
			defaultValue: '0.00',
		},
	},
	{
		freezeTableName: true,
		timestamps: false,
	}
);

InvoicesDt.hasOne(ActivationData, {foreignKey: 'invoice_id', sourceKey: 'invoice_id'});
ActivationData.belongsTo(InvoicesDt, {foreignKey: 'invoice_id', targetKey: 'invoice_id'});

module.exports = InvoicesDt;
