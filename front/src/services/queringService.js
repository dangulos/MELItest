// API url
const url = process.env.APIURL || 'http://localhost:2001/api';

module.exports = {
	// Get up to 4 items matching a query
	getItems: function (q) {
		return new Promise((resolve, reject) => {
			fetch(`${url}/items?q=${q}`)
				.then(response => {
					if (response.status !== 200) {
						return reject({ status: response.status });
					}
					response.json().then(function (data) {
						resolve(data);
					});
				})
				.catch(e => reject(e));
		});
	},
	// Get all the info necesary of the product with the given id
	getItem: function (id) {
		return new Promise((resolve, reject) => {
			fetch(`${url}/items/${id}`)
				.then(response => {
					if (response.status !== 200) {
						return reject({ status: response.status });
					}
					response.json().then(function (data) {
						resolve(data);
					});
				})
				.catch(e => reject(e));
		});
	},
};
