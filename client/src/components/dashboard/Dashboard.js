import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../redux/actions/profileAction';
import Spinner from '../common/Spinner';
import ProfileActions from './ProfileActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = () => {
    const  state = useSelector(state => state);
    const dispatch = useDispatch();
    const { user } = state.auth;
    const { profile, loading } = state.profile;
    let dashboardContent;

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch])

	const onDeleteClick = ()=> {
		dispatch(deleteAccount());
	}

    if (profile === null || loading) {
        dashboardContent = <Spinner />;
    }
    else {
        // Check if logged in user has profile data
        if (Object.keys(profile).length > 0) {
            dashboardContent = (
              <div>
                <p className="lead text-muted">
                  Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
                </p>
                <ProfileActions />
                <Experience experience={profile.experience} />
                <Education education={profile.education} />
                <div style={{ marginBottom: '60px' }} />
                  <button
                    onClick={onDeleteClick}
                    className="btn btn-danger"
                  >
                  Delete My Account
                </button>
              </div>
          );
        } else {
            // User is logged in but has no profile
            dashboardContent = (
            <div>
                <p className="lead text-muted">Welcome {user.name}</p>
                <p>You have not yet setup a profile, please add some info</p>
                <Link to="/create-profile" className="btn btn-lg btn-info">
                Create Profile
                </Link>
            </div>
            );
        }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }

export default Dashboard;
