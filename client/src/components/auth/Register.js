import React, { Fragment, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { removeAlert, setAlert } from '../../redux/slices/alertSlice';
import { registerSuccess, registerFail } from '../../redux/slices/authSlice';
import { loadUser } from '../../redux/thunks/authThunks';
import { v4 as uuidv4 } from 'uuid';

const Register = () => {
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const dispatch = useDispatch();

    const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            const newAlert = { id: uuidv4(), msg: 'Passwords do not match', alertType: "danger" };
            dispatch(setAlert(newAlert));
            setTimeout(() => {
                dispatch(removeAlert(newAlert.id));
            }, 5000); 
        } else {
            const newUser = {
                name,
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

                const res = await axios.post('/api/users', body, config);
                dispatch(registerSuccess(res.data));

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

                dispatch(registerFail());
            }
        }
    };

    if (isAuthenticated) {
        return <Navigate to="/dashboard" />;
    }

    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user" /> Create Your Account
            </p>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <div className="form-group">
                    <input
                        type="text" 
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        // required 
                    />
                </div>
                <div className="form-group">
                    <input 
                        type="email" 
                        placeholder="Email Address" 
                        name="email" 
                        value={email}
                        onChange={e => onChange(e)}
                        // required
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        // minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2}
                        onChange={e => onChange(e)}
                        // minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register" />
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};

export default Register;