import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo_ML@2x.png';
import { useLocation } from 'react-router-dom';
import searchLogo from '../assets/ic_Search.png';
// navigation bar
export default function Navbar() {
	// ref for input
	const searchValue = React.useRef('');
	// unformated url params
	const querylocation = useLocation();
	// input state
	const [inputValue, setInputValue] = React.useState('');

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
		// get formated url params
		const obj = querylocation.search ? parseUrl(querylocation.search) : {};
		// if search param was found set it as input's default value
		setInputValue(obj.search ? obj.search : '');
		// focus ref
		searchValue.current.focus();
	}, [querylocation]);

	// redirect url with search options
	const searchProducts = () => {
		window.location.href = '/items?search=' + searchValue.current.value;
	};

	const handleSubmit = e => {
		console.log(e);
		e.preventDefault();
	};
	return (
		<nav className="navbar">
			<div className="nav-center">
				<Link to="/">
					<img src={logo} alt="MELI logo" className="logo" />
				</Link>
				<form onSubmit={handleSubmit} className="form-nav">
					<div className="form-control">
						<input
							type="text"
							name="name"
							id="name"
							placeholder="Nunca pares de buscar"
							ref={searchValue}
							defaultValue={inputValue}
							autoComplete="off"
						/>
						<button
							id="clear"
							className="form-control"
							onClick={searchProducts}
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
