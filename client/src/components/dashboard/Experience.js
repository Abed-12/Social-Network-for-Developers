import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { deleteExperience } from '../../redux/thunks/profileThunks';
import dayjs from 'dayjs';

const Experience = ({ experiences }) => {
    const dispatch = useDispatch();

    const formatDate = (date) => (date ? dayjs(date).format('YYYY/MM/DD') : 'Now');

    return (
        <Fragment>
            <h2 className='my-2'>Experience Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th className='hide-sm'>Title</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {experiences && experiences.length > 0 && (
                        experiences.map((exp) => (
                            <tr key={exp._id}>
                                <td>{exp.company}</td>
                                <td className='hide-sm'>{exp.title}</td>
                                <td>{formatDate(exp.from)} - {formatDate(exp.to)}</td>
                                <td>
                                    <button onClick={() => dispatch(deleteExperience(exp._id))} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Experience;
