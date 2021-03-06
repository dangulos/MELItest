'use strict';

// Template for a simple express server

// Env variables handling
process.env.NODE_ENV || require('dotenv').config();

const express = require('express');
const cors = require('cors');
const routes = require('./routes/routes.js');

const port = process.env.PORT || 2001;
const app = express();

const whitelist = ['http://localhost:3000'];

const corsOptions = {
	// Origin whitelist
	origin: function (origin, callback) {
		if (!origin || whitelist.indexOf(origin) !== -1) callback(null, true);
		else
			callback(
				new Error(
					'Not allowed by CORS, try again <br/> \n' +
						JSON.stringify(origin, null, 2)
				),
				false
			);
	},
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '100mb' }));
console.log('Server listening on port ' + port);
app.listen(port);

app.get('/', function (req, res) {
	return res.send('All in order');
});

app.use('/api', routes);
