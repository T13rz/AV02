import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconTools, IconPlus, IconHistory, IconAlertCircle, IconCheck, IconPlane, IconUsers, IconTrash, IconFlask, IconEdit } from '@tabler/icons-react';
import { StatusEtapa } from '../types';

const TIPO_LABELS = ['Motor', 'Asa', 'Fuselagem', 'Eletrônico'];
const STATUS_LABELS = ['Em Produção', 'Em Transporte', 'Pronta'];
const STATUS_ETAPA_LABELS = ['Pendente', 'Em Andamento', 'Concluída'];
const TESTE_TIPO_LABELS = ['Segurança', 'Desempenho', 'Resistência'];
const TESTE_STATUS_LABELS = ['Aprovado', 'Reprovado'];

const Pecas = () => {
  const { aeronaves, setAeronaves, funcionarios, user } = useAppContext();
  const [selectedAero, setSelectedAero] = useState('');
  const [activeTab, setActiveTab] = useState('etapas');
  const [error, setError] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);
  
  // Modais
  const [showAddStep, setShowAddStep] = useState(false);
  const [showAddPeca, setShowAddPeca] = useState(false);
  const [showAddTeste, setShowAddTeste] = useState(false);

  // Novos itens
  const [novaEtapa, setNovaEtapa] = useState({ nome: '', prazo: '', funcionarios: [] as string[] });
  const [novaPeca, setNovaPeca] = useState({ nome: '', fornecedor: '', tipo: 0, status: 0 });
  const [novoTeste, setNovoTeste] = useState({ testId: '', tipo: 0, status: 0 });
  
  const aero = aeronaves.find(a => a.codigo === selectedAero);

  const handleOpenEditPeca = (p: any, index: number) => {
    setNovaPeca(p);
    setEditIndex(index);
    setIsEditing(true);
    setShowAddPeca(true);
  };

  const handleOpenEditStep = (e: any, index: number) => {
    setNovaEtapa(e);
    setEditIndex(index);
    setIsEditing(true);
    setShowAddStep(true);
  };

  const handleOpenEditTeste = (t: any, index: number) => {
    setNovoTeste(t);
    setEditIndex(index);
    setIsEditing(true);
    setShowAddTeste(true);
  };

  const handleSavePeca = () => {
    if (!aero) return;
    if (!novaPeca.nome || !novaPeca.fornecedor) { setError('Preencha os dados da peça.'); return; }
    
    let novasPecas = [...aero.pecas];
    if (isEditing) {
      novasPecas[editIndex] = novaPeca;
    } else {
      novasPecas.push(novaPeca);
    }

    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, pecas: novasPecas } : a));
    handleClose();
  };

  const handleSaveTeste = () => {
    if (!aero) return;
    if (!novoTeste.testId) { setError('Informe o ID do teste.'); return; }
    
    let novosTestes = [...(aero.testes || [])];
    if (isEditing) {
      novosTestes[editIndex] = novoTeste;
    } else {
      novosTestes.push(novoTeste);
    }

    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, testes: novosTestes } : a));
    handleClose();
  };

  const handleSaveStep = () => {
    if (!aero) return;
    if (!novaEtapa.nome || !novaEtapa.prazo) { setError('Preencha os dados da etapa.'); return; }
    if (novaEtapa.funcionarios.length === 0) { setError('É obrigatório associar pelo menos um funcionário.'); return; }
    
    let novasEtapas = [...aero.etapas];
    if (isEditing) {
      novasEtapas[editIndex] = { ...novaEtapa, status: novasEtapas[editIndex].status };
    } else {
      novasEtapas.push({ ...novaEtapa, status: StatusEtapa.Pendente });
    }

    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
    handleClose();
  };

  const handleClose = () => {
    setShowAddPeca(false);
    setShowAddStep(false);
    setShowAddTeste(false);
    setIsEditing(false);
    setEditIndex(-1);
    setNovaPeca({ nome: '', fornecedor: '', tipo: 0, status: 0 });
    setNovaEtapa({ nome: '', prazo: '', funcionarios: [] });
    setNovoTeste({ testId: '', tipo: 0, status: 0 });
    setError('');
  };

  const handleRemovePeca = (index: number) => {
    if (!aero) return;
    if (window.confirm('Deseja remover este componente?')) {
      const novasPecas = aero.pecas.filter((_, i) => i !== index);
      setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, pecas: novasPecas } : a));
    }
  };

  const handleRemoveStep = (index: number) => {
    if (!aero) return;
    if (window.confirm('Deseja remover esta etapa do fluxo?')) {
      const novasEtapas = aero.etapas.filter((_, i) => i !== index);
      setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
    }
  };

  const handleRemoveTeste = (index: number) => {
    if (!aero) return;
    if (window.confirm('Deseja remover este registro de teste?')) {
      const novosTestes = aero.testes.filter((_, i) => i !== index);
      setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, testes: novosTestes } : a));
    }
  };

  const handleStartStep = (etapaIndex: number) => {
    if (!aero) return;
    if (etapaIndex > 0) {
      const etapaAnterior = aero.etapas[etapaIndex - 1];
      if (etapaAnterior.status === StatusEtapa.Pendente) {
        setError(`A etapa anterior ("${etapaAnterior.nome}") deve ser iniciada primeiro.`);
        return;
      }
    }
    const novasEtapas = [...aero.etapas];
    novasEtapas[etapaIndex] = { ...novasEtapas[etapaIndex], status: StatusEtapa.EmAndamento };
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
    setError('');
  };

  const handleFinishStep = (etapaIndex: number) => {
    if (!aero) return;
    if (etapaIndex > 0) {
      const etapaAnterior = aero.etapas[etapaIndex - 1];
      if (etapaAnterior.status !== StatusEtapa.Concluida) {
        setError(`A etapa anterior ("${etapaAnterior.nome}") deve ser concluída antes desta.`);
        return;
      }
    }
    const novasEtapas = [...aero.etapas];
    novasEtapas[etapaIndex] = { ...novasEtapas[etapaIndex], status: StatusEtapa.Concluida };
    setAeronaves(aeronaves.map(a => a.codigo === aero.codigo ? { ...a, etapas: novasEtapas } : a));
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
        <p style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase' }}>Gerenciamento técnico e produtivo</p>
      </div>

      <div className="card">
        <label style={{ display: 'block', fontSize: '10px', fontWeight: 800, marginBottom: '8px', textTransform: 'uppercase', color: '#444' }}>Aeronave Selecionada</label>
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

      {aero && (
        <div style={{ display: 'flex', gap: '10px', marginBottom: '2rem' }}>
          {user?.NivelAcesso !== 2 && (
            <button className={`btn ${activeTab === 'pecas' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('pecas')}>PEÇAS</button>
          )}
          <button className={`btn ${activeTab === 'etapas' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('etapas')}>ETAPAS</button>
          {user?.NivelAcesso !== 2 && (
            <button className={`btn ${activeTab === 'testes' ? 'btn-primary' : ''}`} onClick={() => setActiveTab('testes')}>TESTES</button>
          )}
        </div>
      )}

      {error && (
        <div style={{ padding: '15px', background: 'rgba(255, 255, 255, 0.05)', borderLeft: '4px solid #fff', color: '#fff', fontSize: '12px', marginBottom: '2rem', fontWeight: 800 }}>
          {error.toUpperCase()}
        </div>
      )}

      {aero ? (
        <div>
          {activeTab === 'pecas' && user?.NivelAcesso !== 2 && (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><IconTools size={16} /> COMPONENTES</span>
                <button className="btn btn-sm" onClick={() => setShowAddPeca(true)}><IconPlus size={14} /></button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Peça</th>
                    <th>Fornecedor</th>
                    <th>Tipo</th>
                    <th>Status</th>
                    <th style={{ textAlign: 'right' }}>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {aero.pecas.length === 0 ? (
                    <tr><td colSpan={5} style={{ textAlign: 'center', padding: '4rem', color: '#333', fontSize: '10px', fontWeight: 800 }}>Vazio</td></tr>
                  ) : (
                    aero.pecas.map((p, i) => (
                      <tr key={i}>
                        <td><strong>{p.nome}</strong></td>
                        <td>{p.fornecedor}</td>
                        <td>{TIPO_LABELS[p.tipo]}</td>
                        <td><span className={`status-badge status-${p.status}`}>{STATUS_LABELS[p.status]}</span></td>
                        <td style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="btn btn-sm" onClick={() => handleOpenEditPeca(p, i)} title="Editar Peça" style={{ border: 'none', background: 'transparent' }}>
                            <IconEdit size={16} color="var(--color-accent)" />
                          </button>
                          <button className="btn btn-sm" onClick={() => handleRemovePeca(i)} style={{ border: 'none', background: 'transparent' }}>
                            <IconTrash size={14} color="#ff3333" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'etapas' && (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><IconHistory size={16} /> FLUXO PRODUTIVO</span>
                <button className="btn btn-sm" onClick={() => setShowAddStep(true)}><IconPlus size={14} /></button>
              </div>
              {aero.etapas.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem', color: '#333', fontSize: '10px', fontWeight: 800 }}>Nenhum fluxo definido</div>
              ) : (
                aero.etapas.map((e, i) => (
                  <div key={i} style={{ padding: '20px', border: '1px solid #111', background: e.status === StatusEtapa.EmAndamento ? '#111' : 'transparent', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 900 }}>{e.nome.toUpperCase()}</div>
                        <button className="btn btn-sm" onClick={() => handleOpenEditStep(e, i)} title="Editar Etapa" style={{ border: 'none', background: 'transparent', padding: '0' }}>
                          <IconEdit size={14} color="var(--color-accent)" />
                        </button>
                        <button className="btn btn-sm" onClick={() => handleRemoveStep(i)} style={{ border: 'none', background: 'transparent', padding: '0' }}>
                          <IconTrash size={12} color="#ff3333" />
                        </button>
                      </div>
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
                    <div style={{ display: 'flex', gap: '10px' }}>
                      {e.status === StatusEtapa.Pendente && <button className="btn btn-sm btn-primary" style={{ width: '100%' }} onClick={() => handleStartStep(i)}>INICIAR</button>}
                      {e.status === StatusEtapa.EmAndamento && <button className="btn btn-sm" style={{ width: '100%', borderColor: '#fff' }} onClick={() => handleFinishStep(i)}>FINALIZAR</button>}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'testes' && user?.NivelAcesso !== 2 && (
            <div className="card">
              <div className="card-header">
                <span className="card-title"><IconFlask size={16} /> TESTES DE QUALIDADE</span>
                <button className="btn btn-sm" onClick={() => setShowAddTeste(true)}><IconPlus size={14} /></button>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>ID TESTE</th>
                    <th>TIPO</th>
                    <th>STATUS</th>
                    <th style={{ textAlign: 'right' }}>AÇÕES</th>
                  </tr>
                </thead>
                <tbody>
                  {!aero.testes || aero.testes.length === 0 ? (
                    <tr><td colSpan={4} style={{ textAlign: 'center', padding: '4rem', color: '#333', fontSize: '10px', fontWeight: 800 }}>Vazio</td></tr>
                  ) : (
                    aero.testes.map((t, i) => (
                      <tr key={i}>
                        <td><code>{t.testId}</code></td>
                        <td>{TESTE_TIPO_LABELS[t.tipo]}</td>
                        <td><span className={`status-badge status-${t.status === 0 ? '2' : '0'}`}>{TESTE_STATUS_LABELS[t.status]}</span></td>
                        <td style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                          <button className="btn btn-sm" onClick={() => handleOpenEditTeste(t, i)} title="Editar Teste" style={{ border: 'none', background: 'transparent' }}>
                            <IconEdit size={16} color="var(--color-accent)" />
                          </button>
                          <button className="btn btn-sm" onClick={() => handleRemoveTeste(i)} style={{ border: 'none', background: 'transparent' }}>
                            <IconTrash size={14} color="#ff3333" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '6rem', color: '#222', fontWeight: 900, letterSpacing: '4px' }}>
          AGUARDANDO SELEÇÃO DE UNIDADE
        </div>
      )}

      {/* Modais */}
      {showAddStep && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '2rem' }}>{isEditing ? 'EDITAR ETAPA' : 'NOVA ETAPA'}</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <input className="btn" style={{ width: '100%', textAlign: 'left' }} placeholder="NOME DA ETAPA" value={novaEtapa.nome} onChange={e => setNovaEtapa({...novaEtapa, nome: e.target.value})} />
              <input className="btn" style={{ width: '100%', textAlign: 'left' }} placeholder="PRAZO" value={novaEtapa.prazo} onChange={e => setNovaEtapa({...novaEtapa, prazo: e.target.value})} />
              <div>
                <div style={{ fontSize: '10px', fontWeight: 800, marginBottom: '10px' }}>EQUIPE</div>
                <div style={{ maxHeight: '150px', overflowY: 'auto', border: '1px solid #111', padding: '10px' }}>
                  {funcionarios.map(f => (
                    <div key={f.id} onClick={() => toggleFunc(f.id)} style={{ padding: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', background: novaEtapa.funcionarios.includes(f.id) ? '#111' : 'transparent' }}>
                      <div style={{ width: '12px', height: '12px', border: '1px solid #444', background: novaEtapa.funcionarios.includes(f.id) ? '#fff' : 'transparent' }} />
                      <span style={{ fontSize: '12px' }}>{f.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '3rem' }}>
              <button className="btn" onClick={handleClose}>CANCELAR</button>
              <button className="btn btn-primary" onClick={handleSaveStep}>{isEditing ? 'SALVAR' : 'CRIAR'}</button>
            </div>
          </div>
        </div>
      )}

      {showAddPeca && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '2rem' }}>{isEditing ? 'EDITAR PEÇA' : 'NOVA PEÇA'}</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <input className="btn" style={{ width: '100%', textAlign: 'left' }} placeholder="NOME" value={novaPeca.nome} onChange={e => setNovaPeca({...novaPeca, nome: e.target.value})} />
              <input className="btn" style={{ width: '100%', textAlign: 'left' }} placeholder="FORNECEDOR" value={novaPeca.fornecedor} onChange={e => setNovaPeca({...novaPeca, fornecedor: e.target.value})} />
              <select className="btn" style={{ width: '100%', textAlign: 'left' }} value={novaPeca.tipo} onChange={e => setNovaPeca({...novaPeca, tipo: parseInt(e.target.value)})}>
                {TIPO_LABELS.map((l, i) => <option key={i} value={i}>{l.toUpperCase()}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '3rem' }}>
              <button className="btn" onClick={handleClose}>CANCELAR</button>
              <button className="btn btn-primary" onClick={handleSavePeca}>{isEditing ? 'SALVAR' : 'ADICIONAR'}</button>
            </div>
          </div>
        </div>
      )}

      {showAddTeste && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '2rem' }}>{isEditing ? 'EDITAR TESTE' : 'REGISTRAR TESTE'}</h3>
            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <input className="btn" style={{ width: '100%', textAlign: 'left' }} placeholder="ID DO TESTE (ex: TST-01)" value={novoTeste.testId} onChange={e => setNovoTeste({...novoTeste, testId: e.target.value})} />
              <select className="btn" style={{ width: '100%', textAlign: 'left' }} value={novoTeste.tipo} onChange={e => setNovoTeste({...novoTeste, tipo: parseInt(e.target.value)})}>
                {TESTE_TIPO_LABELS.map((l, i) => <option key={i} value={i}>{l.toUpperCase()}</option>)}
              </select>
              <select className="btn" style={{ width: '100%', textAlign: 'left' }} value={novoTeste.status} onChange={e => setNovoTeste({...novoTeste, status: parseInt(e.target.value)})}>
                {TESTE_STATUS_LABELS.map((l, i) => <option key={i} value={i}>{l.toUpperCase()}</option>)}
              </select>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '3rem' }}>
              <button className="btn" onClick={handleClose}>CANCELAR</button>
              <button className="btn btn-primary" onClick={handleSaveTeste}>{isEditing ? 'SALVAR' : 'REGISTRAR'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pecas;
