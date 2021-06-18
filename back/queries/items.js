const axios = require('axios');
// URL query
const MELIURLMLA = 'https://api.mercadolibre.com/sites/MLA';
// URL single item and categories
const MELIURL = 'https://api.mercadolibre.com';

module.exports = {
	// Consume API, get up to 4 products matching the q query
	gets: async function (req, res) {
		console.log('gets', req.query);
		const { q } = req.query;
		if (!q) return res.status(400).json({ msg: 'incomplete params' });
		try {
			const response = await axios.get(`${MELIURLMLA}/search`, {
				params: {
					q,
					limit: 4,
				},
			});
			let data = {};

			// get categories
			let categories = response.data.filters.find(
				filter => filter.id === 'category'
			);
			data.categories = !categories
				? [q]
				: [...categories.values[0].path_from_root.map(path => path.name), q];

			// get items
			let results = response.data.results;

			// Organize Items data
			let items = results.map(item => {
				let obj = {
					id: item.id,
					title: item.title,
					price: {
						currency: item.currency_id,
						amount: Math.trunc(item.price),
						decimals: item.price - Math.trunc(item.price),
					},
					picture: item.thumbnail,
					condition: item.condition,
					free_shipping: item.shipping.free_shipping,
					state: item.address.state_name,
				};
				return obj;
			});

			data.items = items;
			return res.status(200).json(data);
		} catch (error) {
			// handle error
			console.log(error);
			return res.status(200).json({ msg: 'server error' });
		}
	},
	// Consume API: get all data from a product using it's id
	get: async function (req, res) {
		console.log('get', req.params);
		const { id } = req.params;
		if (!id) return res.status(400).json({ msg: 'incomplete params' });
		try {
			// general data
			const itemPromise = axios.get(`${MELIURL}/items/${id}`);
			// promise
			const descriptionPromise = axios.get(
				`${MELIURL}/items/${id}/description`
			);
			// await promises
			const [item, description] = await Promise.all([
				itemPromise,
				descriptionPromise,
			]);

			//get and await categories
			const { category_id } = item.data;
			const categories = await axios.get(
				`${MELIURL}/categories/${category_id}`
			);
			let data = {};

			// Organize data

			data.item = {
				id: item.data.id,
				title: item.data.title,
				price: {
					currency: item.data.currency_id,
					amount: Math.trunc(item.data.price),
					decimals: item.data.price - Math.trunc(item.data.price),
				},
				picture: item.data.pictures[0].url,
				condition: item.data.condition,
				free_shipping: item.data.shipping.free_shipping,
				sold_quantity: item.data.sold_quantity,
				description: description.data.plain_text,
			};

			// Organize categories

			data.categories = categories.data.path_from_root.map(path => path.name);

			// console.log(categories);

			return res.status(200).json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json({});
		}
	},
};
