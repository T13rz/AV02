import React from 'react';
import { useAppContext } from '../context/AppContext';
import { IconPlane, IconUsers, IconTools, IconFlask } from '@tabler/icons-react';

const Dashboard = () => {
  const { aeronaves, funcionarios } = useAppContext();

  const stats = [
    { label: 'Aeronaves', value: aeronaves.length, icon: <IconPlane size={20} /> },
    { label: 'Funcionários', value: funcionarios.length, icon: <IconUsers size={20} /> },
    { label: 'Peças Totais', value: aeronaves.reduce((acc, a) => acc + a.pecas.length, 0), icon: <IconTools size={20} /> },
    { label: 'Testes Realizados', value: aeronaves.reduce((acc, a) => acc + a.testes.length, 0), icon: <IconFlask size={20} /> },
  ];

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Visão Geral</h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Métricas principais do sistema</p>
      </div>

      <div className="grid-stats">
        {stats.map((s, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span className="stat-label">{s.label}</span>
              <div style={{ color: 'var(--color-text-tertiary)' }}>{s.icon}</div>
            </div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      <div className="card">
        <div className="card-header">
          <span className="card-title">Atividade Recente</span>
        </div>
        <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: '13px' }}>
          Nenhuma atividade registrada no momento.
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
