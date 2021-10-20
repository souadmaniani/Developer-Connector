import React, { useEffect } from 'react'
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
	const { auth } = useSelector(state => state);
	const history = useHistory();
    useEffect(() => {
       if (auth.isAuthentified)
			history.push('/dashboard');
    }, [auth.isAuthentified, history]);

    return (
        <div className="landing">
            <div className="dark-overlay landing-inner text-light">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12 text-center">
                            <h1 className="display-3 mb-4">Developer Connector</h1>
                            <p className="lead">
                            {' '}
                            Create a developer profile/portfolio, share posts and get help
                            from other developers
                            </p>
                            <hr />
                            <Link to="/Register" className="btn btn-lg btn-info mr-2">
                            Sign Up
                            </Link>
                            <Link to="/Login" className="btn btn-lg btn-light">
                            Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
      </div>
    )
}

export default Landing
