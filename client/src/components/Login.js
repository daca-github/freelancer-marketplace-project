import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
    const [isLogin, setIsLogin] = useState(true);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: isLogin ? Yup.string() : Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
        }),
        onSubmit: values => {
            console.log(values);
        }
    });

    return (
        <div>
            <h2>{isLogin ? "Login" : "Register"}</h2>
            <form onSubmit={formik.handleSubmit}>
                {!isLogin && (
                    <div>
                        <input
                            type="text"
                            placeholder="Name"
                            {...formik.getFieldProps('name')}
                        />
                        {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
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
                <button type="submit">{isLogin ? "Login" : "Register"}</button>
            </form>
            <button onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Need an account? Register" : "Already have an account? Login"}
            </button>
        </div>
    );
}

export default Login;
