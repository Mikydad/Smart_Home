import React from 'react';
import { FaCog, FaBell } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Settings from '../Settings/Settings';
import './navbar.css';

const Navbar = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px  20px',
            margin: '0 4.5px 0 45px',
            backgroundColor: '#f8f9fa',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
        }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>M-Home</div>
            </Link>
            <div style={{ fontSize: '16px', color: '#555' }}>Welcome Miky</div>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <FaBell style={{ cursor: 'pointer', fontSize: '20px', color: '#555' }} />
                
                <Link to="/Settings">
                    <FaCog style={{ cursor: 'pointer', fontSize: '20px', color: '#555' }} />
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
