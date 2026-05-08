import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { IconLock, IconUser, IconCircleChevronRight } from '@tabler/icons-react';

const Login = () => {
  const { user, setUser, funcionarios } = useAppContext();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (user) return <Navigate to="/" />;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const found = funcionarios.find(f => f.usuario === username && f.senha === password);
    if (found) {
      setUser(found);
      navigate('/');
    } else {
      setError('Acesso negado: Falha na autenticação.');
    }
  };

  const inputContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    background: '#000',
    border: '1px solid #222',
    padding: '0 20px', /* Aumentado de 16 para 20 */
    gap: '16px' /* Aumentado de 12 para 16 */
  };

  const inputStyle: React.CSSProperties = {
    flex: 1,
    padding: '16px 0',
    background: 'transparent',
    border: 'none',
    color: '#fff',
    fontSize: '13px',
    letterSpacing: '2px',
    outline: 'none',
    width: '100%'
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: '#000',
      padding: '2rem'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: '380px',
        padding: '3rem 2rem',
        border: '1px solid #1a1a1a',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #000 100%)',
        position: 'relative'
      }}>
        {/* Bordas decorativas brancas */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '20px', height: '20px', borderTop: '2px solid #fff', borderLeft: '2px solid #fff' }} />
        <div style={{ position: 'absolute', bottom: 0, right: 0, width: '20px', height: '20px', borderBottom: '2px solid #fff', borderRight: '2px solid #fff' }} />

        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <img 
            src="/logo-dragao.png" 
            alt="Logo" 
            style={{ 
              height: '140px', 
              width: 'auto', 
              marginBottom: '1rem',
              filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.1))'
            }} 
          />
          <h1 style={{ 
            fontSize: '24px', 
            fontWeight: 900, 
            letterSpacing: '8px', 
            color: '#fff', 
            textTransform: 'uppercase',
            margin: '0'
          }}>Drako<span style={{ color: 'var(--color-accent)' }}>SYS</span></h1>
          <p style={{ 
            fontSize: '9px', 
            color: '#fff', 
            textTransform: 'uppercase', 
            letterSpacing: '4px',
            marginTop: '10px',
            fontWeight: 800,
            opacity: 0.8
          }}>Sistema de Gerenciamento Aeronáutico</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'grid', gap: '1.25rem' }}>
          {/* USER ID INPUT */}
          <div style={inputContainerStyle}>
            <IconUser size={18} style={{ color: 'var(--color-accent)', opacity: 0.4 }} />
            <input 
              type="text" 
              style={inputStyle}
              value={username}
              onChange={e => { setUsername(e.target.value); setError(''); }}
              placeholder="Login"
            />
          </div>
          
          {/* ACCESS KEY INPUT */}
          <div style={inputContainerStyle}>
            <IconLock size={18} style={{ color: 'var(--color-accent)', opacity: 0.4 }} />
            <input 
              type="password" 
              style={inputStyle}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              placeholder="Senha"
            />
          </div>

          {error && (
            <div style={{ color: '#ff3333', fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', textAlign: 'center', letterSpacing: '2px' }}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ 
              padding: '20px', 
              fontSize: '11px',
              marginTop: '1rem',
              letterSpacing: '4px',
              width: '100%',
              fontWeight: 900,
              background: '#fff',
              color: '#000',
              border: 'none',
              boxShadow: '0 0 30px rgba(255, 255, 255, 0.1)'
            }}
          >
            Logar
          </button>
        </form>

        <div style={{ marginTop: '6rem', textAlign: 'center', fontSize: '9px', color: '#222', textTransform: 'uppercase', letterSpacing: '4px', fontWeight: 800 }}>
          Criado por T13rz // Todos os Direitos reservados
        </div>
      </div>
    </div>
  );
};

export default Login;
