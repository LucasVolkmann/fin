# Um projeto pessoal para consolidar as minhas habilidades em desenvolvimento web.
Descrição do projeto: Um app simples para controlar finanças pessoais.

---
### Sumário:
1. Links
2. Tecnologias utilizadas
3. Descrição detalhada
4. Estrutura do Banco de Dados e Endpoints

---
#### Links:
- [[ Repositório do backend ]](https://github.com/LucasVolkmann/fin-backend)
- [ Url do backend (ainda não implementado) ]
- [[ Repositório do frontend ]](https://github.com/LucasVolkmann/fin-frontend)
- [ Url do frontend (ainda não implementado) ]

---
#### Tecnologias utilizadas:
- Linguagem principal: **TypeScript**
- API framework: **Express.js**
- Conexão e mapeamento do Banco de Dados: **TypeORM**
- Framework de testes: **Jest**
- Testes de integração: **Supertest**
- Banco de dados: **Docker (Postgres container)**
- Outros:
  - **Json Web Token**
  - **Bcrypt.js**
  - **Yup**

---
#### Descrição detalhada:
Este é um app para controle de finança pessoais. Onde cada usuário pode criar uma conta. Cada conta pode adicionar e remover transações. Cada transação tem uma categoria.

Posteriormente o front end do app terá um dashboard informando números referentes as transações do usuário. Incluindo:
- Razão entre o dinheiro gasto em cada categoria em relação ao total gasto
- Total gasto por período
- Média de gastos de uma categoria por dia/semana/mês

---
#### Estrutura do Banco de Dados e Endpoints:
![Logo do Markdown](docs/database-model.png)




