import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentProfile } from '../../redux/thunks/profileThunks';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';
import { deleteAccount } from '../../redux/thunks/authThunks';
import Spinner from '../layout/Spinner';

const Dashboard = () => {
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.auth);
    const {profile, loading} = useSelector((state) => state.profile);

    useEffect(() => {
        dispatch(getCurrentProfile());
    }, [dispatch]);

    return (
        loading && profile === null ? (
            <Spinner />
        ) : (
            <Fragment>
                <h1 className="large text-primary">Dashboard</h1>
                <p className="lead">
                    <i className="fas fa-user" /> Welcome {user && user.name}
                </p>
                {profile !== null ? (
                    <Fragment>
                        <DashboardActions />
                        <Experience experiences={profile.experience} />
                        <Education educations={profile.education} />

                        <div className='my-2'>
                            <button className='btn btn-danger' onClick={() => dispatch(deleteAccount())}>
                                <i className='fas fa-user-minus' /> Delete My Account
                            </button>
                        </div>

                    </Fragment>
                ) : (
                    <Fragment>
                        <p>You have not yet setup a profile, please add some info</p>
                        <Link to='/create-profile' className='btn btn-primary my-1'>
                            Create Profile
                        </Link>
                    </Fragment>
                )}
            </Fragment>
        )
    );
};

export default Dashboard;