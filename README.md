# E-CRF: Framework de E-commerce Componentizado com Recomendações

> Projeto acadêmico para a disciplina de Engenharia de Software, desenvolvido como uma proposta de framework reutilizável para aplicações de e-commerce, com foco em componentes, arquitetura modular e práticas de desenvolvimento orientadas a software engineering.

---

## 1. Visão geral

O projeto E-CRF foi pensado como uma base para prototipar sistemas de e-commerce de forma rápida, organizada e reutilizável. Em vez de focar em uma loja única, o objetivo principal é demonstrar como as boas práticas de Engenharia de Software podem ser aplicadas para criar um framework com blocos reutilizáveis.

A solução inclui:
- catálogo de produtos
- página de detalhes do produto
- módulo de recomendações
- carrinho de compras
- autenticação simulada
- fluxo de checkout

## 2. Foco da disciplina

A nova versão do projeto foi adaptada para a disciplina de Engenharia de Software, enfatizando:
- separação de responsabilidades
- reutilização de componentes
- abstração de serviços
- arquitetura modular
- organização do desenvolvimento por entregas
- documentação técnica e acadêmica

## 3. Conceitos de Engenharia de Software aplicados

### 3.1 Reuso de componentes
O componente ProductCard é reutilizado em diferentes pontos do sistema, como na listagem principal e no widget de recomendações. Isso mostra a ideia de composição reutilizável, reduzindo duplicação de código e aumentando a consistência visual.

### 3.2 Gerenciamento de estado desacoplado
O uso de Context API permite que o estado do carrinho e do usuário seja compartilhado entre diferentes partes da interface, sem acoplamento direto entre os componentes. Isso melhora a manutenção e facilita a evolução do sistema.

### 3.3 Abstração de serviços
A parte de backend atua como uma camada de serviços que o frontend consome por meio de API. Essa separação reflete uma boa prática de engenharia de software, onde a interface não depende diretamente dos detalhes internos da implementação.

## 4. Arquitetura do sistema

O projeto mantém uma estrutura simples e didática com duas camadas principais:

- client: frontend em React
- server: backend em Node.js/Express

Essa organização facilita o entendimento da separação entre apresentação, lógica de negócio e serviços, além de servir como base para discussões sobre arquitetura modular e evolução para uma abordagem orientada a microserviços.

## 5. Tecnologias utilizadas

### Frontend
- React.js
- React Router DOM
- Context API
- Axios

### Backend
- Node.js
- Express.js
- CORS
- JSON como fonte de dados do protótipo

## 6. Metodologia de desenvolvimento

O projeto foi organizado seguindo uma visão ágil, com entregas por ciclos e priorização de funcionalidades. O foco foi desenvolver primeiro a base reutilizável e depois expandir o fluxo do sistema, de acordo com práticas de engenharia de software.

## 7. Como executar

Pré-requisito: Node.js LTS instalado.

### Backend
```bash
cd server
npm install
npm run dev
```

### Frontend
```bash
cd client
npm install
npm start
```

O backend fica em http://localhost:3001 e o frontend em http://localhost:3000.

## 8. Objetivo acadêmico

Este projeto foi adaptado para a disciplina de Engenharia de Software com foco em demonstrar, de forma prática, como um sistema pode ser organizado por componentes reutilizáveis, com boa separação de responsabilidades e arquitetura adequada para manutenção e evolução.

## 9. Autor

Guilherme Nunes Alves