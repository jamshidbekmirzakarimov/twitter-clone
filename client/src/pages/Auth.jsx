import React, { useState, useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { User, UserCircle, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

const Auth = () => {
    const { login, signup } = useContext(AuthContext);
    const [isLogin, setIsLogin] = useState(false);
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            if (isLogin) {
                await login(username, password);
            } else {
                await signup(name, username, password);
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-info card" style={{ background: 'transparent', border: 'none', boxShadow: 'none'}}>
                    <div className="nav-logo" style={{ marginBottom: '16px' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                        X Mini
                    </div>
                    <h1>Your next thought<br/>belongs here.</h1>
                    <p>Post fast, react instantly, and keep your favorite conversations close.</p>
                    
                    <div className="auth-stats">
                        <div className="stat-item">
                            <div className="stat-value">280</div>
                            <div className="stat-label">characters</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">5MB</div>
                            <div className="stat-label">images</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">0ms</div>
                            <div className="stat-label">like feel</div>
                        </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <div style={{ display: 'flex' }}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="avatar" style={{ border: '2px solid white', marginLeft: i > 1 ? -12 : 0, width: 32, height: 32 }}>
                                    <UserCircle size={20} color="#737373" />
                                </div>
                            ))}
                        </div>
                        <div>
                            <div style={{ fontSize: '14px', fontWeight: 700 }}>Fresh voices are joining.</div>
                            <div style={{ fontSize: '13px', color: 'var(--text-light)' }}>Claim a username and start posting.</div>
                        </div>
                    </div>
                </div>

                <div className="auth-form-card card">
                    <h2>{isLogin ? 'WELCOME BACK' : 'CREATE ACCOUNT'}</h2>
                    <h3>{isLogin ? 'Log in' : 'Start posting'}</h3>
                    
                    {error && <div style={{ color: '#ef4444', marginBottom: '16px', fontSize: '14px' }}>{error}</div>}
                    
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="input-group">
                                <label className="input-label">Name</label>
                                <div className="input-with-icon">
                                    <User />
                                    <input 
                                        type="text" 
                                        className="input-field" 
                                        placeholder="Ada Lovelace"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required={!isLogin}
                                    />
                                </div>
                            </div>
                        )}
                        
                        <div className="input-group">
                            <label className="input-label">Username</label>
                            <div className="input-with-icon">
                                <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-light)' }}>@</span>
                                <input 
                                    type="text" 
                                    className="input-field" 
                                    placeholder="mini_builder"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <div className="input-group">
                            <label className="input-label">Password</label>
                            <div className="input-with-icon">
                                <Lock />
                                <input 
                                    type="password" 
                                    className="input-field" 
                                    placeholder="8+ characters"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        
                        <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '8px' }}>
                            {isLogin ? 'Log in →' : 'Create account →'}
                        </button>
                        
                        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px' }}>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <button type="button" onClick={() => setIsLogin(!isLogin)} style={{ fontWeight: 700, textDecoration: 'underline' }}>
                                {isLogin ? 'Sign up' : 'Log in'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Auth;
