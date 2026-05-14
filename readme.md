# AeroCode - Sistema de Gestão Aeronáutica

AeroCode é uma plataforma avançada de gerenciamento para a indústria aeroespacial, focada no controle de fabricação de aeronaves, gestão de componentes, fluxos produtivos e testes de qualidade.

## 🚀 Funcionalidades Principais

### ✈️ Gestão de Frota
- Registro completo de unidades com código ID, modelo, autonomia e capacidade.
- Edição e remoção de registros (exclusivo Administrador).

### 🛠️ Operações (Interface por Guias)
- **Peças:** Cadastro de componentes com rastreamento de fornecedor e tipo.
- **Etapas:** Fluxo produtivo sequencial. Controle rigoroso de início e fim de tarefas.
- **Testes:** Registro de testes de segurança, desempenho e resistência.

### 📋 Relatórios & Documentação
- Geração de relatórios em tempo real.
- Exportação em formato `.txt` contendo dados reais de produção, componentes e equipe.

## 🔐 Matriz de Acessos

| Funcionalidade | Administrador | Engenheiro | Operador |
| :--- | :---: | :---: | :---: |
| Gerir Aeronaves | ✅ | ❌ | ❌ |
| Gerir Funcionários | ✅ | ❌ | ❌ |
| Gerir Peças | ✅ | ✅ | ❌ |
| Gerir Etapas | ✅ | ✅ | ✅ |
| Gerir Testes | ✅ | ✅ | ❌ |
| Ver Relatórios | ✅ | ❌ | ❌ |

## 🛠️ Tecnologias Utilizadas

- **React + TypeScript** (Frontend)
- **Vite** (Build Tool)
- **Tabler Icons** (Interface Visual)
- **LocalStorage API** (Persistência de Dados)
- **CSS Variables** (Tematização Dark Mode)

## 📌 Regras de Negócio Importantes

1.  **Sequencialidade Produtiva:** Uma etapa só pode ser iniciada se a anterior já tiver sido iniciada. Uma etapa só pode ser concluída se a anterior já tiver sido concluída.
2.  **Segurança de Dados:** O sistema utiliza níveis de acesso (0, 1, 2) para proteger operações críticas.
3.  **Equipe:** Toda etapa produtiva exige a alocação de pelo menos um colaborador responsável.

---
*Desenvolvido para controle de alta precisão em ambientes industriais.*
