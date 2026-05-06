<div align="center">

# 🎮 PixelStore

### E-commerce de games desenvolvido com React + TypeScript

[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?style=flat-square&logo=typescript)](https://typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-6-646cff?style=flat-square&logo=vite)](https://vitejs.dev)
[![RAWG API](https://img.shields.io/badge/API-RAWG-f4901e?style=flat-square)](https://rawg.io/apidocs)

</div>

---

## 📖 Sobre o Projeto

A **PixelStore** é uma plataforma de e-commerce para jogos digitais que consome dados reais da API RAWG. O projeto foi focado em aplicar conceitos avançados de React, como gerenciamento de estado global, otimização de chamadas de API e uma interface responsiva com tema dark moderno.

---

## ✨ Funcionalidades Implementadas

- 🎬 **Destaques Dinâmicos** — Slideshow automático com os 5 jogos principais da semana.
- 🔍 **Busca Otimizada** — Sistema de busca com *debounce* para reduzir requisições desnecessárias.
- 🏷️ **Filtros e Ordenação** — Navegação por gêneros e ordenação por preço, avaliação ou lançamento.
- 💰 **Lógica de Preços** — Algoritmo para geração de preços e descontos baseados nos metadados da API.
- 🛒 **Carrinho Persistente** — Gerenciamento completo de itens com persistência via `localStorage`.
- 📄 **Páginas de Detalhes** — Visualização de requisitos do sistema, screenshots e descrições.
- 💀 **User Experience** — Uso de *Skeleton Loaders* para evitar o efeito de "layout shift" durante o carregamento.

---

## 🛠️ Tecnologias Utilizadas

- **Core:** React 19 & TypeScript 5
- **Tooling:** Vite, ESLint
- **Navegação:** React Router DOM 7
- **Estilização:** CSS Modules / Global CSS
- **API:** Axios & RAWG Database
- **Estado:** React Context API

---

## 📁 Estrutura de Pastas

```text
src/
├── components/         # Componentes reutilizáveis (Navbar, Sidebar, Banner)
├── context/            # Gerenciamento de estado do carrinho
├── pages/              # Páginas da aplicação (Home, Cart, GameDetail)
├── services/           # Configuração do Axios e helpers da API
└── assets/             # Estilos globais e recursos estáticos

Como executar o projeto
Clone o repositório:

Bash
git clone [https://github.com/g4bri3llucas/pixelstore.git](https://github.com/g4bri3llucas/pixelstore.git)
cd pixelstore
Instale as dependências:

Bash
npm install
Configure a API Key:
Crie um arquivo .env na raiz do projeto e adicione sua chave da RAWG:

Snippet de código
VITE_API_KEY=sua_chave_aqui
Inicie o servidor de desenvolvimento:

Bash
npm run dev
🗺️ Roadmap de Evolução
[ ] Implementação de autenticação de usuário

[ ] Sistema de Wishlist (Lista de Desejos)

[ ] Checkout simulado

[ ] Finalização da migração total para TypeScript

[ ] Testes unitários com Vitest

👤 Autor
Desenvolvido por Gabriel Lucas