import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconTools, IconPlus, IconHistory, IconAlertCircle, IconCheck, IconPlane, IconUsers } from '@tabler/icons-react';
import { StatusEtapa } from '../types';

const TIPO_LABELS = ['Motor', 'Asa', 'Fuselagem', 'Eletrônico'];
const STATUS_LABELS = ['Em Produção', 'Em Transporte', 'Pronta'];
const STATUS_ETAPA_LABELS = ['Pendente', 'Em Andamento', 'Concluída'];

const Pecas = () => {
  const { aeronaves, setAeronaves, funcionarios, user } = useAppContext();
  const [selectedAero, setSelectedAero] = useState('');
  const [error, setError] = useState('');
  const [showAddStep, setShowAddStep] = useState(false);
  const [novaEtapa, setNovaEtapa] = useState({ nome: '', prazo: '', funcionarios: [] as string[] });
  
  const aero = aeronaves.find(a => a.codigo === selectedAero);

  const handleStartStep = (etapaIndex: number) => {
    if (!aero) return;
    const etapaAtiva = aero.etapas.find(e => e.status === StatusEtapa.EmAndamento);
    if (etapaAtiva) {
      setError(`A etapa "${etapaAtiva.nome}" ainda está em andamento.`);
      return;
    }
    const novasEtapas = [...aero.etapas];
    novasEtapas[etapaIndex].status = StatusEtapa.EmAndamento;
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
    setError('');
  };

  const handleFinishStep = (etapaIndex: number) => {
    if (!aero) return;
    const novasEtapas = [...aero.etapas];
    novasEtapas[etapaIndex].status = StatusEtapa.Concluida;
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
    setError('');
  };

  const handleSaveStep = () => {
    if (!aero) return;
    if (!novaEtapa.nome || !novaEtapa.prazo) { setError('Preencha os dados da etapa.'); return; }
    
    // Regra: Obrigatoriamente um ou mais funcionários
    if (novaEtapa.funcionarios.length === 0) {
      setError('É obrigatório associar pelo menos um funcionário à etapa.');
      return;
    }

    const novasEtapas = [...aero.etapas, { ...novaEtapa, status: StatusEtapa.Pendente }];
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
    setShowAddStep(false);
    setNovaEtapa({ nome: '', prazo: '', funcionarios: [] });
    setError('');
  };

  const toggleFunc = (id: string) => {
    const list = novaEtapa.funcionarios.includes(id) 
      ? novaEtapa.funcionarios.filter(x => x !== id)
      : [...novaEtapa.funcionarios, id];
    setNovaEtapa({ ...novaEtapa, funcionarios: list });
  };

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '2px' }}>OPERAÇÕES</h2>
        <p style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase' }}>Controle de componentes e fluxo produtivo</p>
      </div>

      <div className="card">
        <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase', color: '#444' }}>Aeronave em Operação</label>
        <select 
          className="btn" 
          style={{ width: '100%', textAlign: 'left', background: '#000', border: '1px solid #111' }}
          value={selectedAero}
          onChange={e => { setSelectedAero(e.target.value); setError(''); }}
        >
          <option value="">— SELECIONAR UNIDADE —</option>
          {aeronaves.map(a => <option key={a.codigo} value={a.codigo}>{a.codigo} — {a.modelo}</option>)}
        </select>
      </div>

      {error && (
        <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #fff', color: '#fff', fontSize: '12px', marginBottom: '2rem', fontWeight: 800 }}>
          {error.toUpperCase()}
        </div>
      )}

      {aero ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
          <div className="card">
            <div className="card-header">
              <span className="card-title"><IconTools size={16} /> COMPONENTES</span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>Peça</th>
                  <th>Tipo</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {aero.pecas.length === 0 ? (
                  <tr><td colSpan={3} style={{ textAlign: 'center', padding: '4rem', color: '#333', fontSize: '10px', fontWeight: 800 }}>Vazio</td></tr>
                ) : (
                  aero.pecas.map((p, i) => (
                    <tr key={i}>
                      <td><strong>{p.nome}</strong></td>
                      <td>{TIPO_LABELS[p.tipo]}</td>
                      <td><span className={`status-badge status-${p.status}`}>{STATUS_LABELS[p.status]}</span></td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-title"><IconHistory size={16} /> FLUXO PRODUTIVO</span>
              {user?.NivelAcesso !== 2 && <button className="btn btn-sm" onClick={() => setShowAddStep(true)}><IconPlus size={14} /></button>}
            </div>
            {aero.etapas.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '4rem', color: '#333', fontSize: '10px', fontWeight: 800 }}>Nenhum fluxo definido</div>
            ) : (
              aero.etapas.map((e, i) => (
                <div key={i} style={{ padding: '20px', border: '1px solid #111', background: e.status === StatusEtapa.EmAndamento ? '#111' : 'transparent', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ fontSize: '13px', fontWeight: 900 }}>{e.nome.toUpperCase()}</div>
                    <div className={`status-badge status-${e.status}`}>{STATUS_ETAPA_LABELS[e.status]}</div>
                  </div>
                  <div style={{ fontSize: '10px', color: '#444', marginBottom: '15px' }}>PRAZO: {e.prazo}</div>
                  
                  <div style={{ marginBottom: '15px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 800, color: '#333', marginBottom: '6px' }}>EQUIPE ALOCADA:</div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {e.funcionarios.map(fid => {
                        const f = funcionarios.find(x => x.id === fid);
                        return <span key={fid} style={{ padding: '4px 8px', background: '#000', border: '1px solid #222', fontSize: '10px' }}>{f?.nome}</span>
                      })}
                    </div>
                  </div>

                  {user?.NivelAcesso !== 2 && (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {e.status === StatusEtapa.Pendente && <button className="btn btn-sm btn-primary" style={{ width: '100%' }} onClick={() => handleStartStep(i)}>INICIAR</button>}
                      {e.status === StatusEtapa.EmAndamento && <button className="btn btn-sm" style={{ width: '100%', borderColor: '#fff' }} onClick={() => handleFinishStep(i)}>FINALIZAR</button>}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '6rem', color: '#222', fontWeight: 900, letterSpacing: '4px' }}>
          AGUARDANDO SELEÇÃO DE UNIDADE
        </div>
      )}

      {showAddStep && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '2rem', letterSpacing: '2px' }}>NOVA ETAPA</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <input className="btn" style={{ width: '100%', textAlign: 'left' }} placeholder="NOME DA ETAPA" value={novaEtapa.nome} onChange={e => setNovaEtapa({...novaEtapa, nome: e.target.value})} />
              <input className="btn" style={{ width: '100%', textAlign: 'left' }} placeholder="PRAZO (ex: 48h)" value={novaEtapa.prazo} onChange={e => setNovaEtapa({...novaEtapa, prazo: e.target.value})} />
              
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#444', marginBottom: '10px' }}>SELECIONAR EQUIPE (OBRIGATÓRIO)</div>
                <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #111', padding: '10px' }}>
                  {funcionarios.map(f => (
                    <div key={f.id} onClick={() => toggleFunc(f.id)} style={{ padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', background: novaEtapa.funcionarios.includes(f.id) ? '#111' : 'transparent', marginBottom: '2px' }}>
                      <div style={{ width: '12px', height: '12px', border: '1px solid #444', background: novaEtapa.funcionarios.includes(f.id) ? '#fff' : 'transparent' }} />
                      <span style={{ fontSize: '12px' }}>{f.nome} ({f.id})</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '3rem' }}>
              <button className="btn" onClick={() => setShowAddStep(false)}>CANCELAR</button>
              <button className="btn btn-primary" onClick={handleSaveStep}>CRIAR FLUXO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pecas;
