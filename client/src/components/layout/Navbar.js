import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../redux/actions/userAction';

const Navbar = () => {
	const history = useHistory();
    const {isAuthentified, user} = useSelector(state => state.auth);
	const dispatch = useDispatch();
    const onLogoutClick = (e)=>{
      e.preventDefault();
    	dispatch(logoutUser());
		history.push('/login')
    }
    const authLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a
              href="/profile"
              onClick={(e)=> onLogoutClick(e)}
              className="nav-link"
            >
              <img
                className="rounded-circle"
                src={user.avatar}
                alt={user.name}
                style={{ width: '25px', marginRight: '5px' }}
                title="You must have a Gravatar connected to your email to display an image"
              />{' '}
              Logout
            </a>
          </li>
        </ul>
      );
  
      const guestLinks = (
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/register">
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        </ul>
      );
    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
            <Link className="navbar-brand" to="/">
                DevConnector
            </Link>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#mobile-nav"
            >
                <span className="navbar-toggler-icon" />
            </button>

            <div className="collapse navbar-collapse" id="mobile-nav">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/profiles">
                    {' '}
                    Developers
                    </Link>
                </li>
                </ul>
				{isAuthentified ? authLinks : guestLinks}
            </div>
            </div>
      </nav>
    )
}

export default Navbar
