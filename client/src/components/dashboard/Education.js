import React from "react";
import Moment from "react-moment";
import { deleteEducation } from '../../redux/actions/profileAction';
import { useSelector, useDispatch } from 'react-redux'

const Education = () => {
	const { profile } = useSelector(state => state);
	const dispatch = useDispatch();
	const onDeleteClick = (id)=> {
		dispatch(deleteEducation(id));
	}

  	const education = profile.profile.education.map((exp) => (
		<tr key={exp._id}>
		<td>{exp.school}</td>
		<td>{exp.degree}</td>
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
      <h4 className="mb-4">Education Credentials</h4>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th>Degree</th>
            <th>Years</th>
            <th />
          </tr>
          {education}
        </thead>
      </table>
    </div>
  );
};

export default Education;