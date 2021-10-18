import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { logoutUser, setCurrentUser } from './redux/actions/authAction';
import { BrowserRouter as Router, Switch,  Route, useHistory } from "react-router-dom";
import NavBar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard'
import { Provider } from 'react-redux';
import store from './redux/store';
import { clearCurrentProfile } from './redux/actions/profileAction';
import PrivateRoute from './components/common/PrivateRoute';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-experience-education/add-experience';
import AddEducation from './components/add-experience-education/add-education';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound'
import Posts from './components/posts/Posts';

function App() {
	const  history = useHistory();
	// Check for token
	if (localStorage.jwttoken) {
		setAuthToken(localStorage.jwttoken);
		// Decode token to get user data
		const decoded = jwt_decode(localStorage.jwttoken);
		// Set current user
		store.dispatch(setCurrentUser(decoded));
		// Clear current profile
		store.dispatch(clearCurrentProfile());
		// Check for expired token
		const currentTime = Date.now() / 1000;
		if (decoded.exp < currentTime) {
			// Log out user
			store.dispatch(logoutUser());
	 		// Redirect to Login
			if (history !== undefined )
				history.push('/login');
		}
	}
  return (
	  <Provider	store={ store }>
			<Router>
					<div className="App">
						<NavBar />
						<Route exact path="/"><Landing /></Route>
						<Route exact path="/profiles"><Profiles /></Route>
						<Route exact path="/profile/:handle"><Profile /></Route>
						<div className="container">
							<Route  exact path="/Login"><Login /></Route>
							<Route  exact path="/Register"><Register /></Route>
						</div>
						<Switch>
							<PrivateRoute exact path="/dashboard" component={Dashboard} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/create-profile" component={CreateProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/edit-profile" component={EditProfile} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/add-experience" component={AddExperience} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/add-education" component={AddEducation} />
						</Switch>
						<Switch>
							<PrivateRoute exact path="/feed" component={Posts} />
						</Switch>
						<Route exact path="/not-found"><NotFound /></Route>
					</div>
					<Footer />
			</Router>
	  </Provider>
  );
}

export default App;
