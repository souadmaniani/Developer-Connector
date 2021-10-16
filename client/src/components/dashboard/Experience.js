import React from "react";
import Moment from "react-moment";
import { deleteExperience } from '../../redux/actions/profileAction';
import { useSelector, useDispatch } from 'react-redux'

const Experience = () => {
	const { profile } = useSelector(state => state);
	const dispatch = useDispatch();
	const onDeleteClick = (id)=> {
		dispatch(deleteExperience(id));
	}

  	const experience = profile?.profile.experience.map((exp) => (
		<tr key={exp._id}>
		<td>{exp.company}</td>
		<td>{exp.title}</td>
		<td>
			<Moment format="YYYY/MM/DD">{exp.from}</Moment> -
			{exp.to === null ? (
			" Now"
			) : (
			<Moment format="YYYY/MM/DD">{exp.to}</Moment>
			)}
		</td>
		<td>
			<button
			onClick={()=> onDeleteClick(exp._id)}
			className="btn btn-danger"
			>
			Delete
			</button>
		</td>
		</tr>
  ));

  return (
    <div>
      <h4 className="mb-4">Experience Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Title</th>
            <th>Years</th>
            <th />
          </tr>
          {experience}
        </thead>
      </table>
    </div>
  );
};

export default Experience;
