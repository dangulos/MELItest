const express = require('express');

//import controllers
const queries = require('../queries/items');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.send('Server working!');
});

routes.get('/items', queries.gets);
routes.get('/items/:id', queries.get);

module.exports = routes;
