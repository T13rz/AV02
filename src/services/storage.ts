import { Aeronave, Funcionario } from '../types';

const INITIAL_FUNCIONARIOS: Funcionario[] = [
  {
    "id": "44",
    "nome": "Lewis Hamilton",
    "usuario": "admin",
    "senha": "admin123",
    "NivelAcesso": 0
  },
  {
    "id": "81",
    "nome": "Oscar Piastri",
    "usuario": "pilastrini",
    "senha": "WDC2026",
    "NivelAcesso": 0
  },
  {
    "id": "1",
    "nome": "Max Verstappen",
    "usuario": "Tilapia",
    "senha": "WDC2025",
    "NivelAcesso": 1
  },
  {
    "id": "18",
    "nome": "Lance Stroll",
    "usuario": "destroi",
    "senha": "dummy",
    "NivelAcesso": 2
  }
];

const INITIAL_AERONAVES: Aeronave[] = [
  {
    "codigo": "AN-001",
    "modelo": "Jet-Civix",
    "tipo": 0,
    "alcance": 190,
    "capacidade": 30,
    "pecas": [],
    "etapas": [],
    "testes": []
  },
  {
    "codigo": "AN-002",
    "modelo": "Storm-Higher",
    "tipo": 2,
    "alcance": 450,
    "capacidade": 2,
    "pecas": [],
    "etapas": [],
    "testes": []
  },
  {
    "codigo": "AN-003",
    "modelo": "Sound-Flare",
    "tipo": 2,
    "alcance": 580,
    "capacidade": 0,
    "pecas": [],
    "etapas": [],
    "testes": []
  }
];

const KEYS = {
  AERONAVES: 'aerocode_aeronaves',
  FUNCIONARIOS: 'aerocode_funcionarios',
  USER: 'aerocode_current_user',
};

export const storage = {
  getAeronaves: (): Aeronave[] => {
    const data = localStorage.getItem(KEYS.AERONAVES);
    const parsed = data ? JSON.parse(data) : [];
    if (!parsed || parsed.length === 0) {
      localStorage.setItem(KEYS.AERONAVES, JSON.stringify(INITIAL_AERONAVES));
      return INITIAL_AERONAVES;
    }
    return parsed;
  },
  saveAeronaves: (aeronaves: Aeronave[]) => {
    localStorage.setItem(KEYS.AERONAVES, JSON.stringify(aeronaves));
  },
  getFuncionarios: (): Funcionario[] => {
    const data = localStorage.getItem(KEYS.FUNCIONARIOS);
    const parsed = data ? JSON.parse(data) : [];
    if (!parsed || parsed.length === 0) {
      localStorage.setItem(KEYS.FUNCIONARIOS, JSON.stringify(INITIAL_FUNCIONARIOS));
      return INITIAL_FUNCIONARIOS;
    }
    return parsed;
  },
  saveFuncionarios: (funcionarios: Funcionario[]) => {
    localStorage.setItem(KEYS.FUNCIONARIOS, JSON.stringify(funcionarios));
  },
  getCurrentUser: (): Funcionario | null => {
    const data = localStorage.getItem(KEYS.USER);
    return data ? JSON.parse(data) : null;
  },
  setCurrentUser: (user: Funcionario | null) => {
    if (user) localStorage.setItem(KEYS.USER, JSON.stringify(user));
    else localStorage.removeItem(KEYS.USER);
  },
  reset: () => {
    localStorage.clear();
    window.location.reload();
  }
};
/*“Chega uma hora em que um homem tem que ficar de pé e lutar! Essa hora é quando os sonhos dos seus amigos estão sendo ridicularizados! E eu não vou deixar você rir disso!” - Usopp*/