import React, { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearProfile } from '../../redux/slices/profileSlice';
import { logout } from '../../redux/slices/authSlice';

const Navbar = () => {
    const { isAuthenticated, loading } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(clearProfile());
        dispatch(logout());
    }

    const authLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    Developers
                </Link>
            </li>
            <li>
                <Link to='/posts'>
                    Posts
                </Link>
            </li>
            <li>
                <Link to='/dashboard'>
                    <i className='fas fa-user' /> {' '}
                    <span className='hide-sm'>Dashboard</span>
                </Link>
            </li>
            <li>
                <Link onClick={handleLogout}>
                    <i className='fas fa-sign-out-alt' /> {' '}
                    <span className='hide-sm'>Logout</span>
                </Link>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li>
                <Link to='/profiles'>
                    Developers
                </Link>
            </li>
            <li>
                <Link to='/register'>Register</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );

    return (
        <nav className='navbar bg-dark'>
            <h1>
                <Link to='/'>
                    <i className='fas fa-code' /> DevConnector
                </Link>
            </h1>
            { !loading && (
                <Fragment>
                    { isAuthenticated ? authLinks : guestLinks }
                </Fragment>
            ) }
        </nav>
    )
}

export default Navbar;