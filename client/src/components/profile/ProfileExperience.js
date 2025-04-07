import React from 'react';
import dayjs from 'dayjs';

const ProfileExperience = ({
    experience: {
        company,
        title,
        to,
        from,
        description
    }
}) => {
    const formatDate = (date) => (date ? dayjs(date).format('YYYY/MM/DD') : 'Now');

    return (
        <div>
            <h3 className='text-dark'>{company}</h3>
            <p>
                {formatDate(from)} - {formatDate(to)}
            </p>
            <p>
                <strong>Position: </strong> {title}
            </p>
            <p>
                <strong>Description: </strong> {description}
            </p>
        </div>
    )
}

export default ProfileExperience;
