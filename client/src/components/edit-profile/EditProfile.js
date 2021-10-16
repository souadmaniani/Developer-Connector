import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile, getCurrentProfile } from '../../redux/actions/profileAction';
import { useHistory } from 'react-router';
import { isEmpty } from '../../utils/isEmpty';

const  EditProfile = () => {
    const [allValues, setallValues] = useState({
        displaySocialInputs: false,
        handle: '',
        company: '',
        website: '',
        location: '',
        status: '',
        skills: '',
        githubusername: '',
        bio: '',
        twitter: '',
        facebook: '',
        linkedin: '',
        youtube: '',
        instagram: '',
    })
	const {errors, profile} = useSelector(state => state);
	const dispatch = useDispatch();
	const history = useHistory();
  
	useEffect(() => {
		dispatch(getCurrentProfile());
	}, [dispatch])

	useEffect(() => {
		if (profile.profile) {
			console.log("Profile: ", profile.profile)
			const exProfile = profile.profile;
			const Skills = exProfile.skills.join(',');
			exProfile.handle = isEmpty(exProfile.handle) ? '' : exProfile.handle;
			exProfile.company = isEmpty(exProfile.company) ? '' : exProfile.company;
			exProfile.website = isEmpty(exProfile.website) ? '' : exProfile.website;
			exProfile.location = isEmpty(exProfile.location) ? '' : exProfile.location;
			exProfile.status = isEmpty(exProfile.status) ? '' : exProfile.status;
			exProfile.githubusername = isEmpty(exProfile.githubusername) ? '' : exProfile.githubusername;
			exProfile.bio = isEmpty(exProfile.bio) ? '' : exProfile.bio;
			exProfile.social = isEmpty(exProfile.social) ? {} : exProfile.social;
			exProfile.twitter = isEmpty(exProfile.twitter) ? '' : exProfile.twitter;
			exProfile.facebook = isEmpty(exProfile.facebook) ? '' : exProfile.facebook;
			exProfile.linkedin = isEmpty(exProfile.linkedin) ? '' : exProfile.linkedin;
			exProfile.youtube = isEmpty(exProfile.youtube) ? '' : exProfile.youtube;
			exProfile.instagram = isEmpty(exProfile.instagram) ? '' : exProfile.instagram;

			setallValues({
				handle: exProfile.handle,
				company: exProfile.company,
				website: exProfile.website,
				location: exProfile.location,
				status: exProfile.status,
				skills: Skills,
				githubusername: exProfile.githubusername,
				bio: exProfile.bio,
				twitter: exProfile.twitter,
				facebook: exProfile.facebook,
				linkedin: exProfile.linkedin,
				youtube: exProfile.youtube,
				instagram: exProfile.instagram
			})

	}
	}, [profile.profile])
	
	const onSubmit = (e) =>{
		e.preventDefault();

		const profileData = {
			handle: allValues.handle,
			company: allValues.company,
			website: allValues.website,
			location: allValues.location,
			status: allValues.status,
			skills: allValues.skills,
			githubusername: allValues.githubusername,
			bio: allValues.bio,
			twitter: allValues.twitter,
			facebook: allValues.facebook,
			linkedin: allValues.linkedin,
			youtube: allValues.youtube,
			instagram: allValues.instagram
		};
		dispatch(createProfile(profileData, history));
  }

  const onChange = (e) =>{
    setallValues({ ...allValues, [e.target.name]: e.target.value });
  }


    let socialInputs;

    if (allValues.displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={allValues.twitter}
            onChange={onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={allValues.facebook}
            onChange={onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="Linkedin Profile URL"
            name="linkedin"
            icon="fab fa-linkedin"
            value={allValues.linkedin}
            onChange={onChange}
            error={errors.linkedin}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={allValues.youtube}
            onChange={onChange}
            error={errors.youtube}
          />

          <InputGroup
            placeholder="Instagram Page URL"
            name="instagram"
            icon="fab fa-instagram"
            value={allValues.instagram}
            onChange={onChange}
            error={errors.instagram}
          />
        </div>
      );
    }

    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Edit Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile stand out
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={allValues.handle}
                  onChange={onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={allValues.status}
                  onChange={onChange}
                  options={options}
                  error={errors.status}
                  info="Give us an idea of where you are at in your career"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={allValues.company}
                  onChange={onChange}
                  error={errors.company}
                  info="Could be your own company or one you work for"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={allValues.website}
                  onChange={onChange}
                  error={errors.website}
                  info="Could be your own website or a company one"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={allValues.location}
                  onChange={onChange}
                  error={errors.location}
                  info="City or city & state suggested (eg. Boston, MA)"
                />
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={allValues.skills}
                  onChange={onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={allValues.githubusername}
                  onChange={onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={allValues.bio}
                  onChange={onChange}
                  error={errors.bio}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      setallValues({...allValues, displaySocialInputs: !allValues.displaySocialInputs});
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
}

export default EditProfile;
