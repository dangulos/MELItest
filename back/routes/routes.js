const express = require('express');

//import controllers
const queries = require('../queries/items');

const routes = express.Router();

routes.get('/', (req, res) => {
	return res.send('Server working!');
});

// query route
routes.get('/items', queries.gets);
// get item route
routes.get('/items/:id', queries.get);

module.exports = routes;
