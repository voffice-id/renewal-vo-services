const {Sequelize} = require('sequelize');
const appConfig = require('../config/app');

// create connection
const db = new Sequelize(appConfig.db.name, appConfig.db.user, appConfig.db.password, {
	host: appConfig.db.host,
	dialect: 'mysql',
	port: appConfig.db.port,
	define: {
		// hooks: {
		// 	beforeCreate: (model) => {
		// 		model.createdAt = new Date();
		// 		model.updatedAt = new Date();
		// 	},
		// 	beforeUpdate: (model) => {
		// 		model.updatedAt = new Date();
		// 	},
		// },
		// underscored: true,
		// freezeTableName: true, // use singular table name
		// timestamps: false,  // I do not want timestamp fields by default
	},
	dialectOptions: {
		useUTC: false, // for reading from database UTC time
	},
	timezone: '+07:00', // for writing to database UTC time
});

// export connection
module.exports = db;
