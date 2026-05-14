import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import { IconPlus, IconUserPlus, IconUserShield, IconSearch, IconTrash, IconAlertCircle, IconEdit } from '@tabler/icons-react';

const NIVEL_LABELS = ['Administrador', 'Engenheiro', 'Operador'];
const NIVEL_BADGE = ['status-2', 'status-1', 'status-0'];

const Funcionarios = () => {
  const { funcionarios, setFuncionarios, aeronaves, user } = useAppContext();
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');
  const [novo, setNovo] = useState({
    id: '',
    nome: '',
    usuario: '',
    senha: '',
    NivelAcesso: 2
  });

  if (user?.NivelAcesso !== 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
        <IconAlertCircle size={48} color="var(--color-text-danger)" style={{ marginBottom: '1rem' }} />
        <h3>Acesso Restrito</h3>
        <p style={{ color: 'var(--color-text-secondary)' }}>Apenas administradores podem gerenciar usuários.</p>
      </div>
    );
  }

  const filtered = funcionarios.filter(f => 
    f.nome.toLowerCase().includes(search.toLowerCase()) || 
    f.usuario.toLowerCase().includes(search.toLowerCase()) ||
    f.id.includes(search)
  );

  const handleOpenEdit = (f: any) => {
    setNovo(f);
    setIsEditing(true);
    setShowModal(true);
    setError('');
  };

  const handleSave = () => {
    setError('');
    const idTrim = novo.id.trim();
    const userTrim = novo.usuario.trim();

    if (!idTrim || !novo.nome || !userTrim || !novo.senha) {
      setError('Preencha todos os campos obrigatórios.');
      return;
    }

    if (isEditing) {
      const usuarioExiste = funcionarios.some(f => f.usuario === userTrim && f.id !== idTrim);
      if (usuarioExiste) {
        setError('Este nome de usuário já está sendo usado.');
        return;
      }
      setFuncionarios(funcionarios.map(f => f.id === idTrim ? novo : f));
    } else {
      const idExiste = funcionarios.some(f => f.id === idTrim) || aeronaves.some(a => a.codigo === idTrim);
      const usuarioExiste = funcionarios.some(f => f.usuario === userTrim);

      if (idExiste) {
        setError('Este ID já está em uso.');
        return;
      }
      if (usuarioExiste) {
        setError('Este nome de usuário já está em uso.');
        return;
      }
      setFuncionarios([...funcionarios, { ...novo, id: idTrim, usuario: userTrim }]);
    }

    handleClose();
  };

  const handleClose = () => {
    setShowModal(false);
    setIsEditing(false);
    setNovo({ id: '', nome: '', usuario: '', senha: '', NivelAcesso: 2 });
    setError('');
  };

  const handleRemove = (id: string) => {
    if (id === user.id) {
      alert('Você não pode remover seu próprio usuário.');
      return;
    }
    if (window.confirm('Deseja realmente remover este funcionário?')) {
      setFuncionarios(funcionarios.filter(f => f.id !== id));
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 600 }}>Gestão de Equipe</h2>
          <p style={{ fontSize: '14px', color: 'var(--color-text-secondary)' }}>Administração de acessos e usuários</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          <IconUserPlus size={18} />
          Novo Funcionário
        </button>
      </div>

      <div className="card" style={{ marginBottom: '1rem', padding: '0.75rem' }}>
        <div style={{ position: 'relative' }}>
          <IconSearch size={16} style={{ position: 'absolute', left: '12px', top: '10px', color: 'var(--color-text-tertiary)' }} />
          <input 
            type="text" 
            className="btn" 
            style={{ width: '100%', paddingLeft: '36px', textAlign: 'left', background: '#080808' }} 
            placeholder="Buscar por nome, usuário ou ID..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="card" style={{ padding: 0 }}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Usuário</th>
              <th>Nível</th>
              <th style={{ textAlign: 'right' }}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(f => (
              <tr key={f.id}>
                <td><code>{f.id}</code></td>
                <td><strong>{f.nome}</strong></td>
                <td>{f.usuario}</td>
                <td><span className={`status-badge ${NIVEL_BADGE[f.NivelAcesso]}`}>{NIVEL_LABELS[f.NivelAcesso]}</span></td>
                <td style={{ textAlign: 'right', display: 'flex', gap: '4px', justifyContent: 'flex-end' }}>
                  <button className="btn btn-sm" onClick={() => handleOpenEdit(f)} title="Editar Usuário" style={{ border: 'none', background: 'transparent' }}>
                    <IconEdit size={16} color="var(--color-accent)" />
                  </button>
                  <button className="btn btn-sm" onClick={() => handleRemove(f.id)} title="Remover Usuário" style={{ border: 'none', background: 'transparent' }}>
                    <IconTrash size={16} color="#ff3333" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 style={{ marginBottom: '1.5rem', color: 'var(--color-text-secondary)' }}>
              {isEditing ? `Editar: ${novo.nome}` : 'Cadastrar Funcionário'}
            </h3>
            
            {error && (
              <div style={{ padding: '10px', background: 'rgba(255,0,0,0.1)', border: '1px solid rgba(255,0,0,0.2)', borderRadius: '4px', color: '#ff5555', fontSize: '12px', marginBottom: '1rem' }}>
                {error}
              </div>
            )}

            <div style={{ display: 'grid', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>ID Único</label>
                  <input className="btn" style={{ width: '100%', textAlign: 'left', background: '#080808', opacity: isEditing ? 0.6 : 1 }} value={novo.id} onChange={e => !isEditing && setNovo({...novo, id: e.target.value})} disabled={isEditing} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Nome Completo</label>
                  <input className="btn" style={{ width: '100%', textAlign: 'left', background: '#080808' }} value={novo.nome} onChange={e => setNovo({...novo, nome: e.target.value})} />
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Usuário</label>
                  <input className="btn" style={{ width: '100%', textAlign: 'left', background: '#080808' }} value={novo.usuario} onChange={e => setNovo({...novo, usuario: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Senha</label>
                  <input type="password" className="btn" style={{ width: '100%', textAlign: 'left', background: '#080808' }} value={novo.senha} onChange={e => setNovo({...novo, senha: e.target.value})} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, marginBottom: '4px', textTransform: 'uppercase' }}>Nível</label>
                <select className="btn" style={{ width: '100%', textAlign: 'left', background: '#080808' }} value={novo.NivelAcesso} onChange={e => setNovo({...novo, NivelAcesso: parseInt(e.target.value)})}>
                  <option value={0}>Administrador</option>
                  <option value={1}>Engenheiro</option>
                  <option value={2}>Operador</option>
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '2rem' }}>
              <button className="btn" onClick={handleClose}>Cancelar</button>
              <button className="btn btn-primary" onClick={handleSave}>
                {isEditing ? 'Salvar Alterações' : 'Salvar Colaborador'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Funcionarios;
