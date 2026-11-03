# Currículo Express Mobile — Sammuel Victor Santana de Souza

Aplicativo mobile multiplataforma desenvolvido com **React Native**, **Expo (SDK 52+)**, **Expo Router**, **React Native Paper (MD3)**, **Zustand** e **Axios**, consumindo a API REST publicada na Vercel e integrada ao PostgreSQL (NeonDB).

## Autor

- **Nome:** Sammuel Victor Santana de Souza
- **Curso:** Sistemas para Internet — Universidade Católica de Pernambuco (UNICAP)
- **Disciplina:** Programação para Dispositivos Móveis (PDM 2026.2)
- **API em Produção (Vercel):** [https://curriculo-api-sammuel.vercel.app](https://curriculo-api-sammuel.vercel.app)
- **Repositório da API (Express):** [https://github.com/sammuelvss/Curriculo-API-Sammuel](https://github.com/sammuelvss/Curriculo-API-Sammuel)
- **Projeto no Expo (OTA Update / QR Code):** [https://expo.dev/accounts/sammuelvictors-team/projects/curriculo-express-sammuel/updates/6b9c857f-07e6-47c6-8201-2849bd798951](https://expo.dev/accounts/sammuelvictors-team/projects/curriculo-express-sammuel/updates/6b9c857f-07e6-47c6-8201-2849bd798951)

---

## Telas e Funcionalidades

1. **Início (`app/index.jsx`):**
   - Visão geral do perfil ativo (nome, cargo, resumo profissional, links de contato para e-mail, telefone, LinkedIn e GitHub, e contadores de formações, experiências e projetos).
   - **Alternador de Perfil Ativo** em tempo real entre os 2 currículos cadastrados no NeonDB (**Sammuel Victor** e **Beatriz Cavalcanti**).
2. **Acadêmico (`app/academico.jsx`):**
   - Listagem dinâmica das formações e residências acadêmicas do perfil selecionado.
3. **Profissional (`app/profissional.jsx`):**
   - Histórico de experiências profissionais com empresa, cargo, período e descrição das atividades.
4. **Projetos (`app/projetos.jsx`):**
   - Galeria de projetos com filtro de busca em tempo real por título ou tecnologia, chips de tecnologias, sistema de favoritos persistido com `AsyncStorage` + `Zustand` e botão de acesso ao repositório.
5. **Sobre (`app/sobre.jsx`):**
   - Detalhes da arquitetura, bibliotecas utilizadas e informações acadêmicas do projeto.
6. **Tema Claro / Escuro (`components/Header.jsx`):**
   - Alternância de tema Material Design 3 com persistência local no dispositivo.

---

## Como Executar

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor do Expo:
   ```bash
   npx expo start
   ```
3. Escaneie o QR Code com o aplicativo **Expo Go** no Android/iOS ou pressione `w` para abrir no navegador.
