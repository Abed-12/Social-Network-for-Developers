import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../redux/thunks/profileThunks';

const ProfileGithub = ({ username }) => {
    const [buttonVisible, setButtonVisible] = useState(true); 
    const {repos} = useSelector((state) => state.profile);

    const dispatch = useDispatch();

    const handleButtonClick = () => {
        dispatch(getGithubRepos(username));
        setButtonVisible(false); 
    };

    return (
        <div className='profile-github'>
            <h2 className='text-primary my-1'>Github Repos</h2>
            {buttonVisible && ( 
                <button className='btn btn-light' onClick={handleButtonClick}>
                    Load User Repos
                </button>
            )}
            {repos === null ? ( 
                <Spinner />
            ) : (
                repos.map(repo => (
                    <div key={repo.id} className='repo bg-white p-1 my-1'>
                        <div>
                            <h4>
                                <Link to={repo.html_url} target='_blank' rel='noopener noreferrer'>
                                    {repo.name}
                                </Link>
                            </h4>
                            <p>{repo.description}</p>
                        </div>
                        <div>
                            <ul>
                                <li className='badgs badge-primary'>
                                    Stars: {repo.stargazers_count}
                                </li>
                                <li className='badgs badge-dark'>
                                    Watchers: {repo.watchers_count}
                                </li>
                                <li className='badgs badge-light'>
                                    Forks: {repo.forks_count}
                                </li>
                            </ul>
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}

export default ProfileGithub;
