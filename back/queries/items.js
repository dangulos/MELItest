const axios = require('axios');
const MELIURLMLA = 'https://api.mercadolibre.com/sites/MLA';
const MELIURLI = 'https://api.mercadolibre.com/items';

module.exports = {
	gets: async function (req, res) {
		console.log('gets', req.query);
		const { q } = req.query;
		if (!q) return res.status(400).json({ msg: 'incomplete params' });
		try {
			const response = await axios.get(MELIURLMLA + '/search?q=' + q);
			let data = {};

			// get categories
			let categories = response.data.filters.find(
				filter => filter.id === 'category'
			);
			data.categories = !categories
				? []
				: categories.values[0].path_from_root.map(path => path.name);

			// get items
			let results =
				response.data.results.length > 4
					? response.data.results.slice(0, 4)
					: response.data.results;
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
	get: async function (req, res) {
		console.log('get', req.params);
		const { id } = req.params;
		if (!id) return res.status(400).json({ msg: 'incomplete params' });
		try {
			const itemPromise = axios.get(MELIURLI + '/' + id);
			const descriptionPromise = axios.get(
				MELIURLI + '/' + id + '/description'
			);
			const [item, description] = await Promise.all([
				itemPromise,
				descriptionPromise,
			]);

			let data = {};

			// get item

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

			return res.status(200).json(data);
		} catch (error) {
			console.log(error);
			return res.status(500).json({});
		}
	},
};
