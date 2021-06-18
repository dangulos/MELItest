import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import { getItems } from '../services/queringService';
import Marketplace from '../components/Marketplace';
import BreadCrumb from '../components/BreadCrumb';

// item list view
export default function ItemList() {
	const querylocation = useLocation();
	// requested items
	const [items, setItems] = useState([]);
	// categories for breadcrumb
	const [categories, setCategories] = useState([]);
	// parse url params
	const parseUrl = search => {
		return JSON.parse(
			'{"' +
				decodeURI(search)
					.replace('?', '')
					.replace(/"/g, '\\"')
					.replace(/&/g, '","')
					.replace(/=/g, '":"') +
				'"}'
		);
	};

	React.useEffect(() => {
		const obj = parseUrl(querylocation.search);

		if (obj.search)
			//request items
			getItems(obj.search)
				.then(response => {
					setItems(response.items);
					setCategories(response.categories);
				})
				.catch(e => {
					console.log(e);
				});
	}, [querylocation]);

	return (
		<section>
			<BreadCrumb categories={categories} />
			<div className="products">
				<Marketplace items={items} />
			</div>
		</section>
	);
}
