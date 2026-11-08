import React, { useState } from 'react';
import { useUser } from '../context/UserContext';
import { useNavigate, Link } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useUser();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // --- MUDANÇA AQUI ---
    // Em vez de chamar login(), passamos o email do formulário
    login(email); 
    
    navigate('/'); // Redireciona para a Home após o login
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <p>Use qualquer e-mail/senha para esta simulação.</p>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            type="email" 
            id="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
            placeholder="ex: seu.nome@email.com"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Senha</label>
          <input 
            type="password" 
            id="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
            placeholder="Qualquer senha"
          />
        </div>
        
        <button type="submit" className="login-button">Entrar</button>
        
        <p className="go-back">
          <Link to="/">&larr; Voltar para a loja</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;