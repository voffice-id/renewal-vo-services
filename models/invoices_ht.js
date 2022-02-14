const {Model, DataTypes} = require('sequelize');
const db = require('./dbConn');
const InvoicesDt = require('./invoices_dt');
const ActivationData = require('./activation_data');

const InvoicesHt = db.define(
	'invoices_ht',
	{
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER,
		},
		company_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		amount_due: {
			allowNull: false,
			type: DataTypes.DOUBLE(15, 2),
		},
		promo_id: DataTypes.INTEGER,
		discount: DataTypes.INTEGER,
		date_generated: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.DATEONLY,
		},
		date_due: {
			allowNull: true,
			defaultValue: null,
			type: DataTypes.DATEONLY,
		},
		date_paid: DataTypes.DATEONLY,
		paid_references: DataTypes.TEXT,
		paid_references_notes: DataTypes.TEXT,
		amount_paid: DataTypes.FLOAT,
		payment_proof: DataTypes.TEXT,
		proforma_invoice_pdf: DataTypes.TEXT,
		status: {
			type: DataTypes.INTEGER,
			allowNull: false,
			defaultValue: 0,
			comment:
				'0 = unpaid, 1 = paid, 2 = void, 3 = cancelled, 4 = expired, 5 = payment accepted, 6 = payment declined, 7 = payment on hold',
		},
		activation_status: {
			type: DataTypes.INTEGER,
			allowNull: true,
			defaultValue: 0,
			comment: '0 = pending, 1 = activated, 3 = renewal invoice',
		},
		additional_description: DataTypes.TEXT,
		decline_notes: DataTypes.TEXT,
		period_from: DataTypes.DATEONLY,
		period_to: DataTypes.DATEONLY,
		show_period: {
			allowNull: false,
			type: DataTypes.INTEGER,
		},
		pph_42: {
			type: DataTypes.ENUM('y', 'n'),
			allowNull: true,
			defaultValue: 'n',
		},
		pph_23: {
			type: DataTypes.ENUM('y', 'n'),
			allowNull: true,
			defaultValue: 'n',
		},
		vat: {
			type: DataTypes.ENUM('y', 'n'),
			allowNull: true,
			defaultValue: 'y',
		},
		recurring: {
			type: DataTypes.ENUM('y', 'n'),
			allowNull: true,
			defaultValue: 'n',
		},
		vat_rounding: {
			type: DataTypes.ENUM('y', 'n'),
			allowNull: false,
			defaultValue: 'n',
		},
		created_by: DataTypes.INTEGER,
		accept_by: DataTypes.INTEGER,
		decline_by: DataTypes.INTEGER,
	},
	{
		freezeTableName: true,
	}
);

InvoicesHt.hasMany(InvoicesDt, {foreignKey: 'invoice_id'});
InvoicesDt.belongsTo(InvoicesHt, {foreignKey: 'invoice_id'});
InvoicesHt.hasOne(ActivationData, {foreignKey: 'invoice_id'});
ActivationData.belongsTo(InvoicesHt, {foreignKey: 'invoice_id'});

module.exports = InvoicesHt;
