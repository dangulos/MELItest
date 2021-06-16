import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo_ML@2x.png';
import SearchForm from './SearchForm';
export default function Navbar() {
	return (
		<nav className="navbar">
			<div className="nav-center">
				<Link to="/">
					<img src={logo} alt="MELI logo" className="logo" />
				</Link>
				<SearchForm />
			</div>
		</nav>
	);
}
