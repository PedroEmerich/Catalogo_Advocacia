# Catálogo Advocacia

Catálogo com **três modelos de landing page para o escritório Juliano de Paula Ignácio Advocacia** — direito médico, da saúde e do consumidor —, prontos para campanhas de Google Ads. Os modelos são chamados pelos nomes das pastas: **Tribuna** (01), **Átrio** (02) e **Prumo** (03).

**Os três modelos trazem as quatro frentes do escritório — plano de saúde, direito médico e erro médico, SUS e medicamentos e direito do consumidor — com o mesmo peso:** descrição, serviços, botão que já seleciona o assunto no formulário e respostas no FAQ para cada uma. O que muda entre eles é a identidade visual, o tom e os recursos de conversão.

| # | Modelo | Estilo | Destaques | Visual |
|---|--------|--------|-----------|--------|
| 01 | [Tribuna](landing-pages/tribuna/index.html) | Clássica e sóbria | Balança no hero que pende para o lado do cursor, formulário na primeira dobra, linha do tempo do atendimento, perfil do Dr. Juliano e FAQ sobre plano de saúde, rol da ANS, erro médico e SUS | Papel creme, azul-marinho e dourado · Cormorant Garamond + Source Sans 3 |
| 02 | [Átrio](landing-pages/atrio/index.html) | Escura e editorial | Luz dourada que segue o cursor, áreas em abas, checklist “o seu caso pede atenção imediata?” que leva o resultado ao formulário, numerais romanos que deslizam com a rolagem | Verde quase preto, marfim e dourado · Playfair Display + Inter |
| 03 | [Prumo](landing-pages/prumo/index.html) | Moderna e acolhedora | “Plano de saúde negou?” com “Conte seu caso” em 3 etapas, cartões pastel por área, prazos de atendimento da ANS com contagem animada, seção para pacientes e profissionais da saúde | Claro, verde-petróleo e tons pastel · Fraunces + Plus Jakarta Sans |

A página inicial ([`index.html`](index.html)) é a vitrine: mostra as prévias, as características de cada modelo e permite ver cada página em desktop, tablet e celular sem sair do catálogo.

## Dados do escritório usados nas páginas

Reunidos a partir dos perfis públicos do advogado (Jusbrasil, Escavador e JurisCorrespondente):

- **Dr. Juliano de Paula Ignácio**, advogado de direito médico, da saúde e do consumidor;
- 10 anos de experiência, com histórico também nas esferas cível e penal;
- atuação em comarcas da capital paulista, do Grande ABC e de Minas Gerais;
- apresentação pessoal do perfil: “Advogado obstinado, pai amoroso, filho dedicado, marido companheiro”.

**Antes de publicar, confirme com o escritório:** o número da OAB (as páginas mostram `OAB/SP nº 000.000`, marcado com um comentário no HTML), o WhatsApp (as páginas usam o de demonstração, `(11) 97080-3077`), e-mail, endereço e uma foto do advogado para o perfil da Tribuna. As páginas vêm com `<meta name="robots" content="noindex">` enquanto forem demonstração.

## Logo

A logo foi criada para o escritório: uma balança da justiça cujo ponto de apoio é um selo com a cruz da saúde, unindo direito e saúde, acompanhada do nome em Cormorant Garamond e da linha “Advocacia · Saúde e Consumidor”. Os textos da logo completa estão convertidos em curvas, então ela aparece igual em qualquer computador.

## Publicidade na advocacia (OAB)

Os textos foram escritos para respeitar o Código de Ética e o **Provimento 205/2021 da OAB**, que regula o marketing jurídico:

- caráter informativo e sóbrio, sem promessa de resultado (“ganhe sua causa”, “garantimos”);
- sem divulgação de preços, descontos ou “consulta gratuita” — o FAQ explica que os honorários seguem a tabela da OAB e são combinados por escrito;
- sem depoimentos de clientes nem números de causas ganhas; a prova social é institucional (anos de atuação, áreas, equipe, registro na OAB);
- nome e número de inscrição do advogado no rodapé e no perfil.

Ao personalizar, mantenha essa linha. Referências citadas nas páginas — Lei 14.454/2022 (rol da ANS), prazos máximos de atendimento da ANS (imediato, 7, 14 e 21 dias úteis), prazo de 5 anos para indenização por erro médico e critérios do STF para medicamentos pelo SUS — são regras gerais e vêm acompanhadas do aviso de que cada caso precisa de análise individual.

## Interações de scroll e cursor

Tribuna e Átrio têm uma camada de interações própria em `landing-pages/<modelo>/fx.js`, puramente decorativa. Sem esse arquivo, sem JavaScript ou com “reduzir movimento” ativado no sistema, a página continua completa e estática. Efeitos de cursor só aparecem com mouse.

- **Tribuna — a balança:** a balança do hero inclina para o lado do cursor e volta ao equilíbrio quando ele sai; sem mouse, oscila de leve com a rolagem.
- **Átrio — luz e profundidade:** uma luz dourada acompanha o cursor no hero, os numerais romanos vazados atrás dos títulos deslizam com a rolagem e os atalhos “01 Trabalhista…” do hero já abrem a aba da área.

## Como visualizar

Não há build nem dependências: é HTML, CSS e JavaScript puro.

- **Direto no navegador:** abra o arquivo `index.html`.
- **Servidor local (opcional):**

  ```bash
  python3 -m http.server 8000
  ```

  e acesse `http://localhost:8000`.
- **GitHub Pages:** em *Settings → Pages*, escolha *Deploy from a branch*, selecione a branch e a pasta `/ (root)`.

## Estrutura

```
index.html                  catálogo (vitrine dos modelos)
assets/
  catalog.css, catalog.js   estilos e pré-visualização do catálogo
  previews/                 capturas usadas nos cartões do catálogo
  shared/
    base.css                reset, utilidades e estados comuns
    lp.js                   comportamentos compartilhados (formulários, abas, checklist…)
    logo-ji.svg             marca do escritório (balança + cruz da saúde); também é o favicon
    logo-ji-light.svg       marca em versão clara
    logo-juliano.svg        logo completa (marca + nome) para fundos claros
    logo-juliano-light.svg  logo completa para fundos escuros
landing-pages/
  tribuna/   atrio/   prumo/
    index.html              conteúdo da página
    style.css               identidade visual (variáveis no topo)
    fx.js                   interações de scroll e cursor (Tribuna e Átrio, opcional)
scripts/capturar-previews.js  regenera as imagens de assets/previews
```

## O que os modelos incluem

- **As quatro frentes completas:** plano de saúde, direito médico, SUS e medicamentos e direito do consumidor, cada uma com serviços e botão que já marca o assunto no formulário; FAQ cobrindo todas as frentes.
- **Palavras-chave das buscas** (advogado de plano de saúde, negativa de cobertura, erro médico, medicamento pelo SUS, direito do consumidor) nas headlines e seções, então qualquer grupo de anúncios pode apontar para qualquer modelo.
- **Formulário de contato** com validação em português, máscara de WhatsApp, consentimento LGPD, foco no primeiro erro e tela de sucesso com atalho para o WhatsApp levando o resumo do que foi preenchido.
- **Parâmetros de campanha preservados:** `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content`, `gclid`, `gbraid`, `wbraid` e a página de origem são enviados como campos ocultos.
- **Eventos de conversão no `dataLayer`:** `generate_lead` (envio do formulário) e `whatsapp_click` (qualquer link de WhatsApp, com `link_location`).
- **Credibilidade institucional, processo de atendimento, FAQ** e botão flutuante de WhatsApp.
- **Responsiva e acessível:** navegação por teclado, link “pular para o conteúdo”, contraste adequado e animações desligadas para quem prefere menos movimento. Sem JavaScript, o conteúdo continua visível e os formulários usam a validação nativa do navegador.

## Como adaptar ou reaproveitar um modelo

1. **Copie** a pasta `landing-pages/<modelo>` junto com `assets/shared` (ajuste os caminhos `../../assets/shared/` se mudar a estrutura).
2. **Marca e textos:** ajuste logo, nome, número da OAB, áreas, endereço e textos. Cores e fontes ficam nas variáveis no topo do `style.css`; o link das Google Fonts fica no `<head>`.
3. **WhatsApp:** substitua `5511970803077` (DDI + DDD + número) em todo o `index.html` — ele aparece nos links `wa.me` e no atributo `data-whatsapp` do `<body>`. A mensagem inicial de cada formulário fica em `data-wa-intro`.
4. **Receber os contatos:** por padrão o formulário valida, mostra a tela de sucesso e oferece continuar no WhatsApp. Para enviar os dados a um serviço, adicione `action` ao `<form>`:

   ```html
   <form class="lead-form" method="post" data-lead-form action="https://formspree.io/f/SEU_ID" …>
   ```

   O envio é feito via `fetch` (POST com `FormData`). Funciona com Formspree, Getform, webhooks de RD Station/HubSpot/Make/Zapier ou uma API própria. Se o envio falhar, o visitante vê uma mensagem de erro e o caminho pelo WhatsApp continua disponível.
5. **Rastreamento:** instale o Google Tag Manager no `<head>` e crie gatilhos de *evento personalizado* para `generate_lead` e `whatsapp_click` (conversões do Google Ads/GA4).
6. **Publicação:** remova a meta tag `noindex`, preencha `og:url`/`og:image` se quiser e revise o rodapé (razão social, registro da sociedade na OAB, endereço, política de privacidade).

## Recursos do `lp.js` (por atributo)

| Atributo | Onde usar | O que faz |
|----------|-----------|-----------|
| `data-lead-form` | `<form>` | Validação, campos ocultos de campanha, envio (com ou sem `action`), evento `generate_lead` e tela de sucesso (`[data-form-success]`, `[data-success-name]`, `[data-success-whatsapp]`). |
| `data-mask="phone"` | `<input type="tel">` | Máscara `(11) 91234-5678`; aceita números colados com `+55`. |
| `data-step` | blocos dentro do formulário | Formulário em etapas com `[data-step-next]`, `[data-step-prev]`, `[data-step-status]` e `[data-step-progress]`. |
| `data-prefill="campo=valor"` | links e botões | Preenche um campo do formulário antes de rolar até ele (área escolhida). |
| `data-tabs` | contêiner de abas | Abas acessíveis (`role="tab"`/`tabpanel`) com setas, Home e End. |
| `data-risk` | checklist | Soma os pesos (`data-weight`) das caixas marcadas, mostra o nível (`data-risk-level`) e prepara a mensagem do formulário. Textos da mensagem em `data-risk-intro` e `data-risk-empty`. |
| `data-count` | números | Contagem animada ao aparecer na tela (`data-prefix`, `data-suffix`, `data-decimals`). |
| `data-reveal` | qualquer bloco | Revelação suave ao rolar (`style="--delay: .1s"` para escalonar). |
| `data-js-only` / `data-no-js` | qualquer elemento | Mostra só com JavaScript ativo / só sem JavaScript. |
| `data-header`, `data-nav`, `data-nav-toggle` | cabeçalho | Estado ao rolar e menu mobile. |

## Atualizar as prévias do catálogo

Depois de mudar o visual de alguma página, regenere as imagens de `assets/previews`:

```bash
npm install
```

```bash
npx playwright install chromium
```

```bash
npm run previews
```

## Referências

Estrutura inspirada no [Catálogo Devs](https://pedroemerich.github.io/Catalogo_Devs/) (mesma vitrine, mesmos scripts compartilhados), adaptada ao padrão das landing pages de escritórios anunciadas no Google: hero com proposta clara e formulário, áreas de atuação, processo de atendimento, credenciais, FAQ e CTA final com WhatsApp. Os textos, marcas e layouts deste repositório são originais.
