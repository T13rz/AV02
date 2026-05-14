import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconDownload, IconReport, IconSearch, IconLock } from '@tabler/icons-react';

const TIPO_AERO = ['Comercial', 'Carga', 'Militar'];

const Relatorios = () => {
  const { aeronaves, user } = useAppContext();
  const [selectedAero, setSelectedAero] = useState('');

  if (user?.NivelAcesso !== 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <IconLock size={48} color="var(--color-text-tertiary)" style={{ marginBottom: '1rem' }} />
        <h3>Acesso Restrito</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>Apenas administradores podem gerar relatórios.</p>
      </div>
    );
  }

  const aero = aeronaves.find(a => a.codigo === selectedAero);

  const exportTxt = () => {
    if (!aero) return;
    let txt = `AEROCODE — RELATÓRIO\n${'='.repeat(40)}\n`;
    txt += `Código: ${aero.codigo}\nModelo: ${aero.modelo}\nTipo: ${TIPO_AERO[aero.tipo]}\nAlcance: ${aero.alcance} km\nCapacidade: ${aero.capacidade}\n\n`;
    
    txt += `PEÇAS\n${'-'.repeat(30)}\n`;
    if (aero.pecas.length === 0) {
      txt += "Nenhuma peça registrada.\n";
    } else {
      aero.pecas.forEach(p => {
        txt += `- ${p.nome} (${p.fornecedor})\n`;
      });
    }

    txt += `\nETAPAS\n${'-'.repeat(30)}\n`;
    if (aero.etapas.length === 0) {
      txt += "Nenhuma etapa registrada.\n";
    } else {
      aero.etapas.forEach(e => {
        txt += `- ${e.nome} (${e.prazo}) - ${['Pendente', 'Em Andamento', 'Concluída'][e.status]}\n`;
      });
    }
    
    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `relatorio_${aero.codigo}.txt`;
    link.click();
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Relatórios</h2>
        <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Geração e exportação de dados</p>
      </div>

      <div className="card">
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-end' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '12px', marginBottom: '4px' }}>Selecionar Aeronave</label>
            <select 
              className="btn" 
              style={{ width: '100%', textAlign: 'left', background: '#000' }}
              value={selectedAero}
              onChange={e => setSelectedAero(e.target.value)}
            >
              <option value="">— Selecione —</option>
              {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
            </select>
          </div>
          <button className="btn btn-primary" onClick={exportTxt} disabled={!selectedAero}>
            <IconDownload size={18} />
            Exportar .txt
          </button>
        </div>
      </div>

      {aero ? (
        <div className="card">
          <div className="card-header">
            <span className="card-title"><IconReport size={18} /> Resumo: {aero.codigo}</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
            <div>
              <div style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Modelo</span>
                <strong>{aero.modelo}</strong>
              </div>
              <div style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Tipo</span>
                <strong>{TIPO_AERO[aero.tipo]}</strong>
              </div>
            </div>
            <div>
              <div style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Peças</span>
                <strong>{aero.pecas.length}</strong>
              </div>
              <div style={{ padding: '8px 0', borderBottom: '1px solid var(--color-border-tertiary)', display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: 'var(--color-text-secondary)' }}>Etapas</span>
                <strong>{aero.etapas.length}</strong>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-tertiary)' }}>
          Selecione uma aeronave para visualizar o resumo.
        </div>
      )}
    </div>
  );
};

export default Relatorios;
