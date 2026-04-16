# ✈️ AEROCODE — Gerenciamento de Aeronaves

Sistema de gerenciamento de aeronaves via terminal, desenvolvido em **TypeScript**. Permite cadastrar e controlar aeronaves, funcionários, peças, etapas de manutenção e testes, com controle de acesso por nível de usuário.

---

## 📁 Estrutura do Projeto

```
src/
│   ├── index.ts
│   ├── classes/
│   │   ├── Aeronave.ts
│   │   ├── Etapa.ts
│   │   ├── Funcionario.ts
│   │   ├── Peca.ts
│   │   ├── Relatorio.ts
│   │   └── Teste.ts
│   └── enums/
│       ├── NiveldeAcesso.ts
│       ├── StatusdaEtapa.ts
│       ├── StatusdePecas.ts
│       ├── StatusdeTeste.ts
│       ├── TipodeAeronave.ts
│       ├── TipodePeca.ts
│       └── TipodeTeste.ts
└── jsons/
    ├── aeronave/
    ├── funcionario/
    ├── peca/
    └── teste/
```

---

## 🚀 Como Rodar

### 1. Instale as dependências
```bash
npm init -y
npm install typescript ts-node @types/node
```

### 2. Crie as pastas de dados
```bash
mkdir -p jsons/aeronave
mkdir -p jsons/funcionario
mkdir -p jsons/peca
mkdir -p jsons/teste
```

### 3. Execute o projeto
```bash
npx ts-node src/index.ts
```

---

## 🔐 Login

O sistema exige autenticação ao iniciar. As credenciais são salvas em arquivos `.json` dentro de `jsons/funcionario/`.

Exemplo de funcionário (`func_81.json`):
```json
{
  "id": "81",
  "nome": "Oscar Piastri",
  "usuario": "Pilastrini",
  "senha": "WDC2026",
  "NivelAcesso": 0
}
```

---

## 👤 Níveis de Acesso

| Nível | Cargo | Permissões |
|---|---|---|
| 0 | Administrador | Acesso total |
| 1 | Engenheiro | Etapas e Testes |
| 2 | Operador | Somente leitura |

---

## 📋 Funcionalidades

### ✈️ Aeronave
- Cadastrar nova aeronave
- Carregar aeronave existente
- Detalhar aeronave (peças, etapas, testes)

### 👷 Funcionário
- Cadastrar novo funcionário
- Carregar funcionário existente

### 🔩 Peças
- Cadastrar nova peça
- Carregar peça existente
- Adicionar peça a uma aeronave
- Atualizar status da peça

### 🗂️ Etapas
- Criar e adicionar etapa a uma aeronave
- Iniciar etapa
- Finalizar etapa
- Associar funcionário a uma etapa
- Listar funcionários de uma etapa

### 🧪 Testes
- Cadastrar teste
- Carregar teste
- Adicionar teste a uma aeronave

### 📄 Relatório
- Gerar relatório no terminal
- Salvar relatório como `.txt` em `/relatorios/`

---

## 🗄️ Persistência de Dados

Os dados são salvos localmente em arquivos `.json`:

| Entidade | Caminho |
|---|---|
| Aeronave | `jsons/aeronave/aero_{codigo}.json` |
| Funcionário | `jsons/funcionario/func_{id}.json` |
| Peça | `jsons/peca/peca_{nome}.json` |
| Teste | `jsons/teste/func_{id}.json` |
| Relatório | `relatorios/rel_{codigo}.txt` |

---

## 🛠️ Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [Node.js](https://nodejs.org/)
- [ts-node](https://typestrong.org/ts-node/)