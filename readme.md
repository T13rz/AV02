# 🐉 DrakoSYS — Gerenciamento Aeronáutico (SPA)

Sistema industrial de ponta para gerenciamento de fabricação de aeronaves, desenvolvido em **React 19** + **TypeScript** + **Vite**.

## 🎨 Identidade Visual
O projeto adota o tema **Cyber-Dragon** (Black, Industrial Grey & Electric Cyan), projetado para operações de alta precisão e visibilidade em ambientes escuros.

## 🔐 Credenciais Operacionais (Default)
| Colaborador | Usuário | Senha | Nível |
| :--- | :--- | :--- | :--- |
| Lewis Hamilton | `admin` | `admin123` | Administrador |
| Oscar Piastri | `pilastrini` | `WDC2026` | Administrador |
| Max Verstappen | `Tilapia` | `WDC2025` | Engenheiro |
| Lance Stroll | `destroi` | `dummy` | Operador |

## 🚀 Guia de Inicialização Rápida

Siga os passos abaixo para rodar o projeto localmente:

### 1. Clonar o Repositório
Abra o seu terminal e execute o comando:
```bash
git clone https://github.com/T13rz/AV02.git
```

### 2. Acessar a Pasta do Projeto
```bash
cd AV02
# ou cd AV02-main (caso tenha baixado como .zip)
```

### 3. Instalar as Dependências
Certifique-se de ter o **Node.js** instalado em sua máquina:
```bash
npm install
```

### 4. Iniciar o Servidor de Desenvolvimento
```bash
npm run dev
```
Após o comando, o terminal exibirá um link (geralmente `http://localhost:5173`). Clique ou copie e cole no seu navegador.

### 5. Configuração Inicial (Importante)
Ao abrir o site pela primeira vez, caso não veja as aeronaves ou usuários padrão, abra o console do desenvolvedor (`F12`), vá em **Application** > **Local Storage**, clique com o botão direito no link do site e selecione **Clear**. Depois, dê um **F5** na página.

## 🛠️ Stack Tecnológica
- **Core:** React 19, TypeScript.
- **Roteamento:** React Router 7.
- **Ícones:** Tabler Icons.
- **Persistência:** LocalStorage Engine (via `src/services/storage.ts`).

---
**Nota de Segurança:** Para aplicar atualizações estruturais de dados, limpe o Local Storage do navegador (F12 > Application > Clear Storage) antes de iniciar a sessão.