require('dotenv').config();

const express = require('express');
const appConfig = require('./config/app');
const app = express();
const routes = require('./routes');
const cors = require('cors');
const initializeScheduler = require('./scheduler');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

initializeScheduler();

app.get('/', (req, res, next) => {
	console.info('App is running');

	return res.status(200).send('OK');
});

app.use(routes);

app.listen(appConfig.port, () => {
	console.info(`Server is running on port ${appConfig.port}`);
});
