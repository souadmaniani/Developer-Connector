import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { getProfiles } from '../../redux/actions/profileAction';
import Spinner from '../common/Spinner';
import ProfileItem from './ProfileItem'


const Profiles = () => {
    const dispatch = useDispatch();
    const { profiles, loading } = useSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfiles());
    }, [dispatch]);

    let profileItems;
    if (profiles === null || loading) {
        profileItems = <Spinner />
    }
    else if (Object.keys(profiles).length > 0) {
        profileItems = (
          profiles.map((profile) => {
            return <ProfileItem profile={profile} />
          })
        )
    }
    else
        profileItems =  <h4>there is no profile</h4>

    return (
        <div className="profiles">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h1 className="display-4 text-center">Developer Profiles</h1>
                <p className="lead text-center">
                  Browse and connect with developers
                </p>
                {profileItems}
              </div>
            </div>
          </div>
        </div>
      );
}

export default Profiles
