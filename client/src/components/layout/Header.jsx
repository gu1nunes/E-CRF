import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import CartIcon from '../features/CartIcon';
import './Header.css';

const Header = () => {
  const { user, isLoggedIn, logout } = useUser(); // 1. Remova o 'login' daqui

  return (
    <header className="app-header">
      <Link to="/" className="app-logo">
        E-CRF Store
      </Link>
      <div className="header-controls">
        {isLoggedIn ? (
          <div className="user-info">
            <span>Olá, {user.name}</span>
            <button onClick={logout} className="auth-button">Logout</button>
          </div>
        ) : (
          // 2. Mude este botão para um Link
          <Link to="/login" className="auth-button" style={{textDecoration: 'none'}}>
            Login
          </Link>
        )}
        <CartIcon />
      </div>
    </header>
  );
};

export default Header;