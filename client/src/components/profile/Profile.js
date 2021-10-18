import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCred from './ProfileCred';
import ProfileGithub from './ProfileGithub';
import { getProfileByHandle } from '../../redux/actions/profileAction'
import { useHistory, useParams } from 'react-router-dom';
import Spinner from '../common/Spinner';
import { Link } from 'react-router-dom';

const Profile = () => {
	const state = useSelector(state => state);
	const { profile, loading } = state.profile;
	const dispatch = useDispatch();
	const { handle } = useParams();
	const history = useHistory();
	let profileContent;

	useEffect(() => {
		dispatch(getProfileByHandle(handle))
	}, [handle, dispatch]);
	if (profile === null && loading)
		history.push('/not-found');
	if (profile === null || loading) {
		profileContent = <Spinner />;
	} else {
	  	profileContent = (
			  <div>
				<div className="row">
					<div className="col-md-6">
						<Link to="/profiles" className="btn btn-light mb-3 float-left">
							Back To Profiles
						</Link>
					</div>
					<div className="col-md-6" />
				</div>
				<ProfileHeader profile={profile} />
				<ProfileAbout profile={profile} />
				<ProfileCred education={profile.education} experience={profile.experience} />
				{profile.githubusername ? (
					<ProfileGithub githubusername={profile.githubusername} />
				) : null}
			</div>
	  );
	}

	return (
	  <div className="profile">
		<div className="container">
		  <div className="row">
			<div className="col-md-12">{profileContent}</div>
		  </div>
		</div>
	  </div>
	);
}

export default Profile;
