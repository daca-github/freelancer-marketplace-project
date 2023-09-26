import React, { useState } from 'react';

function Login() {
    const [isRegistering, setIsRegistering] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isRegistering) {
            if (password !== confirmPassword) {
                alert("Passwords don't match!");
                return;
            }
            // Handle registration logic
        } else {
            // Handle login logic
        }
    };

    return (
        <div className="auth-container">
            <h2>{isRegistering ? "Register" : "Login"}</h2>
            <form onSubmit={handleSubmit}>
                {isRegistering && (
                    <div className="input-group">
                        <label>Username</label>
                        <input 
                            type="text" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)} 
                            required 
                        />
                    </div>
                )}
                <div className="input-group">
                    <label>Email</label>
                    <input 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                </div>
                {isRegistering && (
                    <div className="input-group">
                        <label>Confirm Password</label>
                        <input 
                            type="password" 
                            value={confirmPassword} 
                            onChange={(e) => setConfirmPassword(e.target.value)} 
                            required 
                        />
                    </div>
                )}
                <button type="submit" className="button">{isRegistering ? "Register" : "Login"}</button>
            </form>
            {isRegistering ? (
                <p>Already have an account? <button onClick={() => setIsRegistering(false)}>Login</button></p>
            ) : (
                <p>Don't have an account? <button onClick={() => setIsRegistering(true)}>Register</button></p>
            )}
        </div>
    );
}

export default Login;
