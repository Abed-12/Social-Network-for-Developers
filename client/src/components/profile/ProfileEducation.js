import React from 'react';
import dayjs from 'dayjs';

const ProfileEducation = ({
    education: {
        school,
        degree,
        fieldofstudy,
        to,
        from,
        description
    }
}) => {
    const formatDate = (date) => (date ? dayjs(date).format('YYYY/MM/DD') : 'Now');

    return (
        <div>
            <h3 className='text-dark'>{school}</h3>
            <p>
                {formatDate(from)} - {formatDate(to)}
            </p>
            <p>
                <strong>Degree: </strong> {degree}
            </p>
            <p>
                <strong>Field Of Study: </strong> {fieldofstudy}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

export default ProfileEducation;
