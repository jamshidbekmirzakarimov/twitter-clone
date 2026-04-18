import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { Home, User, FileText, Heart, Moon, LogOut, PenTool } from 'lucide-react';

const SidebarLeft = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="sidebar-left">
            <div className="nav-card card" style={{ height: 'calc(100vh - 64px)' }}>
                <div className="nav-header">
                    <div className="nav-logo" style={{ color: 'var(--text-dark)', background: '#111', border: 'none', color: '#fff' }}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"/></svg>
                        X Mini
                    </div>
                    <button className="tool-btn" style={{ padding: '6px' }}>
                        <Moon size={16} />
                    </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1 }}>
                    <NavLink to="/" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`} end>
                        <Home size={20} />
                        Home
                    </NavLink>
                    <NavLink to="/profile" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                        <User size={20} />
                        Profile
                    </NavLink>
                    <NavLink to="/myposts" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                        <FileText size={20} />
                        My Posts
                    </NavLink>
                    <NavLink to="/mylikes" className={({isActive}) => `nav-item ${isActive ? 'active' : ''}`}>
                        <Heart size={20} />
                        My Likes
                    </NavLink>
                    
                    <button className="btn-brand" style={{ marginTop: '16px', py: '14px', fontSize: '16px' }}>
                        <PenTool size={18} />
                        Post
                    </button>
                </div>

                <div className="user-snippet">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '15px' }}>{user?.username}</div>
                            <div style={{ color: 'var(--text-light)', fontSize: '13px' }}>@{user?.username}</div>
                        </div>
                    </div>
                    
                    <button onClick={handleLogout} className="btn-outline" style={{ width: '100%', marginTop: '16px', py: '10px' }}>
                        <LogOut size={16} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarLeft;
