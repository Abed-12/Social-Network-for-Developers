import axios from 'axios';
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { removeAlert, setAlert } from '../../redux/slices/alertSlice';
import { loginSuccess, loginFail } from '../../redux/slices/authSlice'; 
import { loadUser } from '../../redux/thunks/authThunks'; 
import { v4 as uuidv4 } from 'uuid';

const Login = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const { email, password } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const dispatch = useDispatch();


    const onSubmit = async e => {
        e.preventDefault();

        const newUser = {
            email,
            password
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const body = JSON.stringify(newUser);

            const res = await axios.post('/api/auth', body, config);
            dispatch(loginSuccess(res.data));

            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;
            
            if (errors) {
                errors.forEach(error => {
                    const newAlert = { id: uuidv4(), msg: error.msg, alertType: "danger" };
                    dispatch(setAlert(newAlert));
                    setTimeout(() => {
                        dispatch(removeAlert(newAlert.id));
                    }, 5000);
                });
            }

            dispatch(loginFail());
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user" /> Sign Into Your Account
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
};

export default Login;