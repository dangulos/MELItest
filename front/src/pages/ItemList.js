import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { getItem, getItems } from '../services/queringService';

export default function About() {
	const querylocation = useLocation();
	React.useEffect(() => {
		const obj = parseUrl(querylocation.search);
		console.log(obj);
		getItems(obj.search)
			.then(response => {
				console.log(response);
			})
			.catch(e => {
				console.log(e);
			});
	}, []);

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

	return (
		<section className="section about-section">
			<h1 className="section-title">about us</h1>
			<p>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae
				repudiandae architecto qui adipisci in officiis, aperiam sequi atque
				perferendis eos, autem maiores nisi saepe quisquam hic odio consectetur
				nobis veritatis quasi explicabo obcaecati doloremque? Placeat ratione
				hic aspernatur error blanditiis?
			</p>
		</section>
	);
}
