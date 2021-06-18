import React from 'react';

// Breadcrumb component with simple href
export default function Navbar(props) {
	const { categories } = props;
	return (
		<ul className="breadcrumb">
			{categories.map(category => (
				<li key={category}>
					<a href={'/items?search=' + category}>{category}</a>
				</li>
			))}
		</ul>
	);
}
