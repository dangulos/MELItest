import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import pages
import ItemList from './pages/ItemList';
import SingleItem from './pages/SingleItem';
import Error from './pages/Error';
// import components
import Navbar from './components/Navbar';
function App() {
	return (
		<Router>
			<Navbar />
			<Switch>
				<Route exact path="/">
					{/* <Home /> */}
				</Route>
				<Route exact path="/items">
					<ItemList />
				</Route>
				<Route exact path="/items/:id">
					<SingleItem />
				</Route>
				<Route path="*">
					<Error />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;
