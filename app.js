require('dotenv').config();

const express = require('express');
const appConfig = require('./config/app');
const app = express();
// eslint-disable-next-line new-cap
const router = express.Router();
const cors = require('cors');
const initializeScheduler = require('./scheduler');
const initializeRoute = require('./routes');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

initializeScheduler();
initializeRoute(app, router);

app.get('/', (req, res, next) => {
	console.info('App is running');

	return res.status(200).send('OK');
});

app.listen(appConfig.port, () => {
	console.info(`Server is running on port ${appConfig.port}`);
});
