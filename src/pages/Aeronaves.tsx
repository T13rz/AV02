import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconPlus, IconEye, IconTrash, IconPlane, IconAlertCircle, IconEdit } from '@tabler/icons-react';
import { TipoAeronave } from '../types';

const TIPO_LABELS = ['Comercial', 'Carga', 'Militar'];

const Aeronaves = () => {
  const { aeronaves, setAeronaves, user } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState('');
  const [novaAero, setNovaAero] = useState({
    codigo: '',
    modelo: '',
    tipo: 0,
    alcance: 0,
    capacidade: 0
  });

  const handleOpenEdit = (a: any) => {
    setNovaAero(a);
    setIsEditing(true);
    setShowModal(true);
    setError('');
  };

  const handleSave = () => {
    setError('');
    const codigoTrim = novaAero.codigo.trim().toUpperCase();

    if (!codigoTrim || !novaAero.modelo) {
      setError('Preencha os campos obrigatórios.');
      return;
    }

    if (isEditing) {
      setAeronaves(aeronaves.map(a => a.codigo === novaAero.codigo ? { ...a, ...novaAero } : a));
    } else {
      // Regra de Unicidade: Código de Aeronave
      if (aeronaves.some(a => a.codigo === codigoTrim)) {
        setError('Este código de aeronave já está em uso.');
        return;
      }
      setAeronaves([...aeronaves, { ...novaAero, codigo: codigoTrim, pecas: [], etapas: [], testes: [] }]);
    }
    
    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setNovaAero({ codigo: '', modelo: '', tipo: 0, alcance: 0, capacidade: 0 });
    setError('');
  };

  const handleRemove = (codigo: string) => {
    if (user?.NivelAcesso !== 0) {
      alert('Apenas administradores podem remover aeronaves.');
      return;
    }
    if (window.confirm(`Deseja realmente remover a aeronave ${codigo}?`)) {
      setAeronaves(aeronaves.filter(a => a.codigo !== codigo));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '2px' }}>AERONAVES</h2>
          <p style={{ fontSize: '11px', color: '#555', textTransform: 'uppercase' }}>Frota e unidades em fabricação</p>
        </div>
        {user?.NivelAcesso === 0 && (
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            <IconPlus size={16} />
            REGISTRAR UNIDADE
          </button>
        )}
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>CÓDIGO</th>
              <th>MODELO / CONFIGURAÇÃO</th>
              <th>TIPO</th>
              <th>AUTONOMIA</th>
              <th>CAPACIDADE</th>
              <th style={{ textAlign: 'right' }}>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {aeronaves.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '5rem', color: '#222', fontWeight: 800 }}>NENHUMA UNIDADE EM REGISTRO</td>
              </tr>
            ) : (
              aeronaves.map(a => (
                <tr key={a.codigo}>
                  <td><code>{a.codigo}</code></td>
                  <td><strong>{a.modelo.toUpperCase()}</strong></td>
                  <td><span className="status-badge">{TIPO_LABELS[a.tipo]}</span></td>
                  <td>{a.alcance} KM</td>
                  <td>{a.capacidade} PAX</td>
                  <td style={{ textAlign: 'right', display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                    {user?.NivelAcesso === 0 && (
                      <button className="btn btn-sm" onClick={() => handleOpenEdit(a)} title="Editar Unidade" style={{ border: 'none', background: 'transparent' }}>
                        <IconEdit size={16} color="var(--color-accent)" />
                      </button>
                    )}
                    <button className="btn btn-sm" title="Ver Detalhes">
                      <IconEye size={14} color="var(--color-accent)" />
                    </button>
                    {user?.NivelAcesso === 0 && (
                      <button 
                        className="btn btn-sm" 
                        onClick={() => handleRemove(a.codigo)}
                        title="Remover Registro"
                        style={{ border: 'none', background: 'transparent' }}
                      >
                        <IconTrash size={14} color="#ff3333" />
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '2.5rem', letterSpacing: '2px' }}>REGISTRO DE AERONAVE</h3>
            
            {error && (
              <div style={{ padding: '12px', background: 'rgba(255,51,51,0.1)', color: '#ff3333', fontSize: '11px', fontWeight: 800, marginBottom: '1.5rem', border: '1px solid rgba(255,51,51,0.2)' }}>
                {error.toUpperCase()}
              </div>
            )}

            <div style={{ display: 'grid', gap: '1.5rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '9px', fontWeight: 900, marginBottom: '6px', color: '#444' }}>CÓDIGO ID</label>
                  <input className="btn" style={{ width: '100%', textAlign: 'left' }} value={novaAero.codigo} onChange={e => setNovaAero({...novaAero, codigo: e.target.value})} placeholder="X-001" />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '9px', fontWeight: 900, marginBottom: '6px', color: '#444' }}>MODELO</label>
                  <input className="btn" style={{ width: '100%', textAlign: 'left' }} value={novaAero.modelo} onChange={e => setNovaAero({...novaAero, modelo: e.target.value})} placeholder="Ex: Boeing 737" />
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', fontSize: '9px', fontWeight: 900, marginBottom: '6px', color: '#444' }}>TIPO DE OPERAÇÃO</label>
                <select className="btn" style={{ width: '100%', textAlign: 'left' }} value={novaAero.tipo} onChange={e => setNovaAero({...novaAero, tipo: parseInt(e.target.value)})}>
                  <option value={0}>COMERCIAL</option>
                  <option value={1}>CARGA / LOGÍSTICA</option>
                  <option value={2}>MILITAR / DEFESA</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '9px', fontWeight: 900, marginBottom: '6px', color: '#444' }}>AUTONOMIA (KM)</label>
                  <input type="number" className="btn" style={{ width: '100%', textAlign: 'left' }} value={novaAero.alcance} onChange={e => setNovaAero({...novaAero, alcance: parseInt(e.target.value) || 0})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '9px', fontWeight: 900, marginBottom: '6px', color: '#444' }}>CAPACIDADE</label>
                  <input type="number" className="btn" style={{ width: '100%', textAlign: 'left' }} value={novaAero.capacidade} onChange={e => setNovaAero({...novaAero, capacidade: parseInt(e.target.value) || 0})} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '3.5rem' }}>
              <button className="btn" onClick={() => { setShowModal(false); setError(''); }}>CANCELAR</button>
              <button className="btn btn-primary" onClick={handleSave}>EFETUAR REGISTRO</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aeronaves;
