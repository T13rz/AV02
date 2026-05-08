export enum NiveldeAcesso {
  Administrador = 0,
  Engenheiro = 1,
  Operador = 2,
}

export enum StatusEtapa {
  Pendente = 0,
  EmAndamento = 1,
  Concluida = 2,
}

export enum StatusPeca {
  EmProducao = 0,
  EmTransporte = 1,
  Pronta = 2,
}

export enum StatusTeste {
  Aprovado = 0,
  Reprovado = 1,
}

export enum TipoAeronave {
  Comercial = 0,
  Carga = 1,
  Militar = 2,
}

export enum TipoPeca {
  Motor = 0,
  Asa = 1,
  Fuselagem = 2,
  Eletronico = 3,
}

export enum TipoTeste {
  Seguranca = 0,
  Desempenho = 1,
  Resistencia = 2,
}

export interface Funcionario {
  id: string;
  nome: string;
  telefone?: string;
  endereco?: string;
  usuario: string;
  senha?: string;
  NivelAcesso: NiveldeAcesso;
}

export interface Peca {
  nome: string;
  fornecedor: string;
  tipo: TipoPeca;
  status: StatusPeca;
}

export interface Etapa {
  nome: string;
  prazo: string;
  status: StatusEtapa;
  funcionarios: string[]; // IDs dos funcionários
}

export interface Teste {
  testId: string;
  tipo: TipoTeste;
  status: StatusTeste;
}

export interface Aeronave {
  codigo: string;
  modelo: string;
  tipo: TipoAeronave;
  alcance: number;
  capacidade: number;
  pecas: Peca[];
  etapas: Etapa[];
  testes: Teste[];
}
