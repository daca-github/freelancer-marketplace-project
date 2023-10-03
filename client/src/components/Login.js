import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import './styles/Login.css';

function Login() {
    const [isLogin, setIsLogin] = useState(true);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('user')));

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            is_freelancer: false
        },
        validationSchema: Yup.object({
            name: isLogin ? Yup.string() : Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            is_freelancer: Yup.boolean()
        }),
        onSubmit: values => {
            const url = isLogin ? 'http://localhost:5555/login' : 'http://localhost:5555/register';
            axios.post(url, values)
                .then(response => {
                    console.log(response.data);
                    if (isLogin) {
                        localStorage.setItem('user', JSON.stringify(response.data.user));
                        setCurrentUser(response.data.user);
                    } else {
                        setIsLogin(true);
                    }
                })
                .catch(error => {
                    console.error("There was an error!", error);
                });
        }
        
    });

    const handleLogout = () => {
        localStorage.removeItem('user');
        setCurrentUser(null);
    };

    if (currentUser) {
        return (
            <div className="home-container fade-in">
                <h2>Welcome, {currentUser.username}!</h2>
                <button onClick={handleLogout} className="button">Logout</button>
            </div>
        );
    }

    return (
        <div className="home-container fade-in">
            <div className="container">
                <h2>{isLogin ? "Login to Freelancer Marketplace" : "Register for Freelancer Marketplace"}</h2>
                <div className="card">
                    <form onSubmit={formik.handleSubmit}>
                        {!isLogin && (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    {...formik.getFieldProps('name')}
                                />
                                {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
                                <div>
                                    <input
                                        type="checkbox"
                                        {...formik.getFieldProps('is_freelancer')}
                                    />
                                    <label>Register as Freelancer</label>
                                </div>
                            </div>
                        )}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
                        </div>
                        <div>
                            <input
                                type="password"
                                placeholder="Password"
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
                        </div>
                        <button type="submit" className="button">{isLogin ? "Login" : "Register"}</button>
                    </form>
                </div>
                <button onClick={() => setIsLogin(!isLogin)} className="button">
                    {isLogin ? "Need an account? Register" : "Already have an account? Login"}
                </button>
            </div>
        </div>
    );
}

export default Login;
