import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './redux/actions/authAction';
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard'
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
	const  history = useHistory();
	// Check for token
	if (localStorage.jwttoken) {
		setAuthToken(localStorage.jwttoken);
		// Decode token to get user data
		const decoded = jwt_decode(localStorage.jwttoken);
		// Set current user
		store.dispatch(setCurrentUser(decoded))
		// Check for expired token
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			// Log out user
			store.dispatch(logoutUser());
	 		// Redirect to Login
			history.push('/login');
		}
	}

  return (
	  <Provider	store={ store }>
			<Router>
					<div className="App">
						<NavBar />
						<Route exact path="/"><Landing /></Route>
						<div className="container">
							<Route exact path="/Login"><Login /></Route>
							<Route exact path="/Register"><Register /></Route>
						</div>
						<Route exact path="/dashboard"><Dashboard /></Route>
					</div>
					<Footer />
			</Router>
	  </Provider>
  );
}

export default App;
