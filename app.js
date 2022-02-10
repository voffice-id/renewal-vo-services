require('dotenv').config();

const express = require('express');
const appConfig = require('./config/app');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cors());

app.get('/', (req, res, next) => {
	console.log('Hello World');

	return res.status(200).send('OK');
});

app.use(routes);

app.listen(appConfig.port, () => {
	console.info(`Server is running on port ${appConfig.port}`);
});
