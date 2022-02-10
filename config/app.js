const appConfig = {
	port: process.env.PORT || 4001,
	jwtSecret: process.env.SECRET || 'cJn#Rn.n8W[!hDCt-}rARp,E-j}b@78',
	db: {
		host: process.env.DB_HOST,
		port: process.env.DB_PORT || 3306,
		user: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		name: process.env.DB_NAME,
		nameMain: process.env.DB_NAME_MAIN,
	},
};

module.exports = appConfig;
