# HC Agents Web

Uma aplicação web moderna para gerenciamento de chatbots com IA, construída com React, TypeScript e Vite.

## 🚀 Tecnologias

### Frontend

- **React** - Biblioteca para interfaces de usuário
- **TypeScript** - Superset tipado do JavaScript
- **Vite** - Build tool e dev server ultra-rápido
- **React Router DOM** - Roteamento para React
- **Tailwind CSS** - Framework CSS utilitário
- **shadcn/ui** - Componentes UI modernos
- **Axios** - Cliente HTTP para APIs

### Backend

- **.NET 9** - Framework backend
- **Entity Framework Core** - ORM para acesso a dados

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **npm** ou **yarn** ou **pnpm**
- **Git**

## 🛠️ Instalação

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd hcagents-web
```

### 2. Instale as dependências

```bash
# Com npm
npm install

# Com yarn
yarn install

# Com pnpm
pnpm install
```

### 3. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

## 🚀 Como executar

### Desenvolvimento

```bash
# Com npm
npm run dev

# Com yarn
yarn dev

# Com pnpm
pnpm dev
```

A aplicação estará disponível em `http://localhost:5173`

### Build para produção

```bash
# Com npm
npm run build

# Com yarn
yarn build

# Com pnpm
pnpm build
```

### 🔐 Fluxo de Autenticação

1. Usuário insere email na tela de login
2. Sistema envia OTP para o email
3. Usuário insere o código OTP
4. Sistema valida e retorna JWT
5. Token é armazenado e usado para requisições


### 🔄 Em Desenvolvimento

- Edição de chats existentes
- Configurações avançadas de bots
- Compartilhamento de chats
- Exportação de conversas

## 🔧 API Backend

A aplicação frontend se conecta com uma API backend que deve implementar os seguintes endpoints:

### Autenticação
- `POST /session/validate` - Validar email e OTP

### Chats
- `GET /chat` - Listar chats do usuário
- `POST /chat` - Criar novo chat/bot

### Mensagens
- `GET /message` - Buscar mensagens de um chat (com paginação)
- `POST /message` - Enviar nova mensagem


## 📝 Scripts Disponíveis

```json
{
  "dev": "vite --mode development",                    // Servidor de desenvolvimento
  "build": "tsc -b && vite build", // Build para produção
  "lint": "eslint .",               // Verificar código
  "preview": "vite preview"         // Preview da build
}
```

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Para suporte e dúvidas:

- Abra uma [issue](link-para-issues) no GitHub
- Entre em contato via email: [eneto774@gmail.com]

---

Desenvolvido com ❤️
