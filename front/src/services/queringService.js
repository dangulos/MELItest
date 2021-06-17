const url = 'http://localhost:2001/api';

module.exports = {
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
