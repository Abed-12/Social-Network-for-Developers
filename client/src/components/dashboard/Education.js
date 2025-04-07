import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { deleteEducation } from '../../redux/thunks/profileThunks';
import dayjs from 'dayjs';

const Education = ({ educations }) => {
    const dispatch = useDispatch();
    
    const formatDate = (date) => (date ? dayjs(date).format('YYYY/MM/DD') : 'Now');

    return (
        <Fragment>
            <h2 className='my-2'>Education Credentials</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>School</th>
                        <th className='hide-sm'>Degree</th>
                        <th className='hide-sm'>Years</th>
                        <th />
                    </tr>
                </thead>
                <tbody>
                    {educations && educations.length > 0 && (
                        educations.map((edu) => (
                            <tr key={edu._id}>
                                <td>{edu.school}</td>
                                <td className='hide-sm'>{edu.degree}</td>
                                <td>{formatDate(edu.from)} - {formatDate(edu.to)}</td>
                                <td>
                                    <button onClick={() => dispatch(deleteEducation(edu._id))} className='btn btn-danger'>Delete</button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </Fragment>
    )
}

export default Education;
