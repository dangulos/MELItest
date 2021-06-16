import React from 'react';
import { useGlobalContext } from '../context';

import logo from '../assets/ic_Search.png';
export default function SearchForm() {
	const { setSearchTerm } = useGlobalContext();
	const searchValue = React.useRef('');

	React.useEffect(() => {
		searchValue.current.focus();
	}, []);

	function searchCocktail() {
		setSearchTerm(searchValue.current.value);
	}
	function handleSubmit(e) {
		e.preventDefault();
	}

	return (
		<section className="section">
			<form onSubmit={handleSubmit}>
				<div className="form-control">
					{/* <label htmlFor="name">search your favorite cocktail</label> */}
					<input
						type="text"
						name="name"
						id="name"
						ref={searchValue}
						onChange={searchCocktail}
						autoComplete="off"
					/>
					<button id="clear" className="form-control">
						<img src={logo} alt="search logo" className="form-control"></img>
					</button>
				</div>
			</form>
		</section>
	);
}
