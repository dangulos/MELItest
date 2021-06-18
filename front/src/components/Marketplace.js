import React from 'react';
import { Link } from 'react-router-dom';
import freeShippingLogo from '../assets/ic_shipping.png';

// product listing as a marketplace
export default function Marketplace(props) {
	const { items } = props;

	return (
		<section className="section">
			{items.map(item => {
				return (
					<Link key={item.id} to={`/items/${item.id}`}>
						<div className="product">
							<img src={item.picture} alt="product img"></img>
							<div className="product-info">
								<div className="product-info-left">
									<div className="product-price">
										<p>
											{item.price.currency}
											{' $'}
											{item.price.amount}
										</p>
										{item.free_shipping && (
											<img
												src={freeShippingLogo}
												alt="free shipping logo"
											></img>
										)}
									</div>
									<p className="product-title">{item.title}</p>
								</div>
								<div className="product-info-right">
									<p className="product-state">{item.state}</p>
								</div>
							</div>
						</div>
						<hr className="product-line" />
					</Link>
				);
			})}
		</section>
	);
}
