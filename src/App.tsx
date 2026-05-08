import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { useAppContext } from './context/AppContext';
import { IconPlane, IconUsers, IconSettings, IconReport, IconLayoutDashboard, IconLogout, IconTools, IconFlask } from '@tabler/icons-react';

import Dashboard from './pages/Dashboard';
import Aeronaves from './pages/Aeronaves';
import Login from './pages/Login';
import Pecas from './pages/Pecas';
import Funcionarios from './pages/Funcionarios';
import Relatorios from './pages/Relatorios';

const NavItem: React.FC<{ to: string, icon: React.ReactNode, label: string }> = ({ to, icon, label }) => {
  const location = useLocation();
  const active = location.pathname === to;
  return (
    <Link to={to} className={`nav-item ${active ? 'active' : ''}`}>
      {icon}
      <span>{label}</span>
    </Link>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, logout } = useAppContext();
  
  if (!user) return <Navigate to="/login" />;

  return (
    <div className="app">
      <header className="topbar">
        <div className="topbar-logo">
          <img src="/logo-dragao.png" alt="Logo" style={{ height: '40px', width: 'auto' }} />
          <span>AEROCODE</span>
        </div>
        <div className="topbar-user">
          <span>{user.nome}</span>
          <button className="btn btn-sm" onClick={logout}>
            <IconLogout size={16} />
            Sair
          </button>
        </div>
      </header>
      <div className="layout">
        <aside className="sidebar">
          <div className="sidebar-section">
            <span className="sidebar-label">Principal</span>
            <NavItem to="/" icon={<IconLayoutDashboard size={18} />} label="Dashboard" />
            <NavItem to="/aeronaves" icon={<IconPlane size={18} />} label="Aeronaves" />
          </div>
          <div className="sidebar-section">
            <span className="sidebar-label">Operacional</span>
            <NavItem to="/pecas" icon={<IconTools size={18} />} label="Peças" />
          </div>
          {user.NivelAcesso === 0 && (
            <div className="sidebar-section">
              <span className="sidebar-label">Administração</span>
              <NavItem to="/funcionarios" icon={<IconUsers size={18} />} label="Funcionários" />
              <NavItem to="/relatorios" icon={<IconReport size={18} />} label="Relatórios" />
            </div>
          )}
        </aside>
        <main className="content">
          {children}
        </main>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/aeronaves" element={<Layout><Aeronaves /></Layout>} />
        <Route path="/pecas" element={<Layout><Pecas /></Layout>} />
        <Route path="/funcionarios" element={<Layout><Funcionarios /></Layout>} />
        <Route path="/relatorios" element={<Layout><Relatorios /></Layout>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
