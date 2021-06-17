import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo_ML@2x.png';
import searchLogo from '../assets/ic_Search.png';
export default function Navbar() {
	const searchValue = React.useRef('');

	React.useEffect(() => {
		searchValue.current.focus();
	}, []);

	const searchCocktail = () => {
		console.log(searchValue.current.value);
		window.location.href = '/items?search=' + searchValue.current.value;
	};

	const handleSubmit = e => {
		e.preventDefault();
	};
	return (
		<nav className="navbar">
			<div className="nav-center">
				<Link to="/">
					<img src={logo} alt="MELI logo" className="logo" />
				</Link>
				<form onSubmit={handleSubmit}>
					<div className="form-control">
						{/* <label htmlFor="name">search your favorite cocktail</label> */}
						<input
							type="text"
							name="name"
							id="name"
							ref={searchValue}
							autoComplete="off"
						/>
						<button
							id="clear"
							className="form-control"
							onClick={searchCocktail}
						>
							<img
								src={searchLogo}
								alt="search logo"
								className="form-control"
							></img>
						</button>
					</div>
				</form>
			</div>
		</nav>
	);
}
