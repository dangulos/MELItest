import React from 'react';
import { useParams } from 'react-router-dom';
import { getItem } from '../services/queringService';
import BreadCrumb from '../components/BreadCrumb';

// Single item view
export default function Singleitem() {
	// get product id
	const { id } = useParams();
	// requested item
	const [item, setItem] = React.useState(null);
	// requested item categories for breadcrumb
	const [categories, setCategories] = React.useState(null);
	// Loading state for cleaner render
	const [loading, setLoading] = React.useState(true);

	React.useEffect(() => {
		setLoading(true);
		getItem(id)
			.then(res => {
				setItem(res.item);
				setCategories(res.categories);
				setLoading(false);
			})
			.catch(e => {
				console.error(e);
				setLoading(false);
			});
	}, [id]);

	// loading view
	if (loading) {
		return <div></div>;
	}
	// no item found
	if (!item) {
		return <h2>no item to display</h2>;
	} else {
		// found item

		//params
		const { condition, description, picture, price, sold_quantity, title } =
			item;

		// simple "translate" to spanish
		const conditionsToSpanish = condition =>
			condition === 'new' ? 'Nuevo' : 'Usado';

		// decimal value formater
		const formatDecimals = dec => {
			if (!dec) return '00';
			return '' + Math.trunc(dec * 100);
		};

		return (
			<section>
				<BreadCrumb categories={categories} />
				<div className="single-item">
					<div className="single-item-container">
						<div className="single-item-left">
							<img src={picture} alt="product"></img>
							<div className="single-item-description">
								<div className="single-item-description-title">Descripción</div>
								<div className="single-item-description-text">
									{description}
								</div>
							</div>
						</div>
						<div className="single-item-right">
							<div className="single-item-condition">
								{conditionsToSpanish(condition)} - {sold_quantity} Vendidos
							</div>
							<div className="single-item-title">{title}</div>
							<div className="single-item-price">
								<div className="single-item-price-big">
									{price.currency}
									{' $'}
									{price.amount}
								</div>
								<div className="single-item-price-small">
									{formatDecimals(price.decimals)}
								</div>
							</div>

							<button className="single-item-button">comprar</button>
						</div>
					</div>
				</div>
			</section>
		);
	}
}
