# Juliano de Paula Ignácio Advocacia

Landing page do escritório do **Dr. Juliano de Paula Ignácio** — direito médico, da saúde e do consumidor —, pronta para campanhas de Google Ads. É uma página única ([`index.html`](index.html)) que reúne o melhor dos três modelos criados antes (Tribuna, Átrio e Prumo; ainda disponíveis no histórico do git).

## O que a página tem

| Seção | O que faz |
|-------|-----------|
| **Hero com balança** | Balança dourada com física de mola: pende para o lado do cursor, balança os pratos conforme a velocidade e leva um “empurrão” no clique. Sem mouse, oscila de leve. A luz de fundo acompanha o cursor. |
| **“Seu problema pesa”** | Cena fixa guiada pela rolagem: o prato esquerdo começa embaixo com “O problema” e, conforme a página desce, *Provas*, *A lei* e *Estratégia* caem no prato direito até a balança se equilibrar, enquanto os passos do atendimento acendem ao lado. |
| **Áreas em abas** | Plano de saúde, erro médico (direito médico), SUS e medicamentos e direito do consumidor, com botão que já marca o assunto no formulário. |
| **Biblioteca** | Estante com sete livros que sobem e se inclinam conforme o cursor passa. Ao clicar, o livro sai da estante e abre no artigo correspondente (CF art. 196, CDC arts. 14 e 42, Lei 9.656/98, Lei 14.454/22, Código Civil art. 951, Código de Ética Médica art. 88), com atalho para o formulário. |
| **Checklist de urgência** | “O seu caso pede atenção imediata?” — soma as situações marcadas, mostra o nível e leva o resultado para o formulário. |
| **Prazos da ANS** | Prazos máximos de atendimento dos planos (imediato, 7, 14 e 21 dias úteis) com contagem animada. |
| **O advogado** | Perfil com 10 anos de experiência, atuação em SP, Grande ABC e MG e a apresentação do próprio perfil (“Advogado obstinado, pai amoroso…”). |
| **Formulário em 3 etapas** | Assunto → situação → contato, com validação em português, máscara de WhatsApp, consentimento LGPD e tela de sucesso que leva o resumo para o WhatsApp. |
| **FAQ, CTA final e WhatsApp flutuante** | Dúvidas sobre negativa do plano, rol da ANS, reajuste, erro médico, SUS e honorários. |

Barra de progresso de leitura no cabeçalho, revelações ao rolar e contadores completam a camada de interação.

**Acessível e robusta:** tudo funciona por teclado; com “reduzir movimento” ativado, as animações param e a balança aparece já equilibrada; sem JavaScript, as áreas, os artigos dos livros e o formulário aparecem completos.

## Antes de publicar

- **Número da OAB:** a página mostra `OAB/SP nº 000.000` (marcado com um comentário no HTML).
- **WhatsApp:** troque `5511970803077` em todo o `index.html` (links `wa.me` e atributo `data-whatsapp` do `<body>`).
- **Foto:** o perfil mostra as iniciais “JI”; coloque uma foto em `assets/` e siga o comentário em `.lawyer__photo`.
- **E-mail e endereço**, se quiser exibi-los no rodapé.
- **Receber os contatos:** adicione `action="https://…"` ao `<form>` (Formspree, Getform, webhook de RD Station/HubSpot/Make/Zapier). Sem `action`, o formulário mostra a tela de sucesso e oferece continuar no WhatsApp.
- **Rastreamento:** instale o Google Tag Manager e use os eventos `generate_lead` e `whatsapp_click` do `dataLayer`. Os parâmetros `utm_*`, `gclid`, `gbraid` e `wbraid` seguem com o contato como campos ocultos.
- Remova a meta tag `noindex`.

## Publicidade na advocacia (OAB)

Os textos seguem o Provimento 205/2021: caráter informativo, sem promessa de resultado, sem preços ou “consulta gratuita”, sem depoimentos de clientes nem número de processos. As referências legais vêm resumidas ou citadas com o aviso de que cada caso precisa de análise individual.

## Logo

Balança da justiça com um selo da cruz da saúde no ponto de apoio, acompanhada do nome em Cormorant Garamond e da linha “Advocacia · Saúde e Consumidor”. Arquivos em `assets/shared/`: `logo-ji.svg` (marca e favicon), `logo-ji-light.svg`, `logo-juliano.svg` (completa, fundo claro) e `logo-juliano-light.svg` (completa, fundo escuro). Os textos da logo completa estão em curvas.

## Estrutura

```
index.html            a landing page
assets/
  style.css           identidade visual (variáveis no topo)
  fx.js               balanças, cena de rolagem, estante de livros e luz do cursor
  shared/
    base.css          reset e utilidades
    lp.js             formulário em etapas, abas, checklist, contadores, rastreamento
    logo-*.svg        logos
```

Não há build: é HTML, CSS e JavaScript puro. Para ver, abra o `index.html` ou rode `python3 -m http.server 8000`. No GitHub Pages, publique a branch na pasta `/ (root)`.
