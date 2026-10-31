# Juliano de Paula Ignácio Advocacia

Landing page do escritório do **Dr. Juliano de Paula Ignácio** — direito médico, da saúde e do consumidor —, pronta para campanhas de Google Ads. É uma página única ([`index.html`](index.html)) que reúne o melhor dos três modelos criados antes (Tribuna, Átrio e Prumo; ainda disponíveis no histórico do git).

## O que a página tem

| Seção | O que faz |
|-------|-----------|
| **Hero com balança de latão** | Balança com coluna, pratos côncavos, correntes de contas e ponteiro sobre um mostrador. Pende para o lado do cursor com física de mola, os pratos balançam por inércia e um clique dá um “empurrão”. Sem mouse, ela “respira”. Luz quente segue o cursor, com poeira dourada flutuando; o título entra palavra por palavra. |
| **“Seu problema pesa”** | Cena fixa guiada pela rolagem: o peso de ferro “O problema” deixa o prato esquerdo embaixo; conforme a página desce, os discos *Provas*, *A lei* e *Estratégia* caem com gravidade, quicam no prato direito e a balança se equilibra — o ponteiro chega ao zero e aparece “Equilíbrio”. Rolando para cima, os pesos sobem de volta. |
| **Áreas em abas** | Plano de saúde, erro médico (direito médico), SUS e medicamentos e direito do consumidor. A troca é um fade, sem pulo de altura. |
| **Biblioteca** | Estante de madeira com sete livros de couro (nervuras e etiquetas douradas) que sobem e se inclinam perto do cursor. O livro escolhido abre num livro de verdade, em duas páginas, com a folha virando em 3D (a frente leva a página antiga, o verso traz o novo frontispício). Artigos: CF art. 196, CDC arts. 14 e 42, Lei 9.656/98, Lei 14.454/22, Código Civil art. 951 e Código de Ética Médica art. 88. |
| **Checklist de urgência** | “O seu caso pede atenção imediata?” — soma as situações marcadas, mostra o nível e leva o resultado para o formulário. |
| **Prazos da ANS** | Linha do tempo que se desenha com a rolagem, acendendo cada prazo (imediato, 7, 14 e 21 dias úteis). |
| **O advogado** | Retrato em moldura dourada que inclina com o cursor, com reflexo e plaqueta; monograma “JI” até a foto chegar. |
| **Formulário em 3 etapas** | Assunto → situação → contato, com validação em português, máscara de WhatsApp, consentimento LGPD e tela de sucesso que leva o resumo para o WhatsApp. |
| **FAQ, CTA final e WhatsApp flutuante** | As respostas abrem e fecham com animação de altura (nos navegadores que já suportam). |

Também: cursor dourado que acompanha o mouse (vira “Abrir” sobre os livros), botões magnéticos, barra de progresso de leitura e texturas de papel, couro e madeira geradas em SVG (nenhuma imagem para baixar).

**Acessível e robusta:** tudo funciona por teclado; com “reduzir movimento” ativado, as animações param, a balança aparece equilibrada e os livros trocam de página sem animar; sem JavaScript, as áreas, os artigos e o formulário aparecem completos. Em telas de toque não há cursor nem efeitos de hover.

## No celular

Até 699 px a página usa um layout próprio, não uma versão encolhida do desktop:

- **Topo em ordem de leitura:** título, a balança logo abaixo, texto e botões em largura total; os destaques viram etiquetas.
- **Barra fixa de ações** no rodapé da tela (“Contar meu caso” + WhatsApp), no lugar do botão flutuante. Ela aparece depois do topo, some quando o formulário está na tela e respeita a área segura do iPhone.
- **Áreas de atuação em cartões que deslizam para o lado**, com pontos indicando qual está à vista.
- **Livro aberto numa folha que sobe de baixo** (bottom sheet): toque num livro para abrir; feche pelo botão, tocando no fundo, com Esc ou arrastando a barra para baixo.
- **Números numa faixa só**, cena da balança mais curta e com a balança maior, retrato menor, valores em duas colunas e o formulário logo depois do título.
- **Pensado para o toque:** alvos de pelo menos 44 px, resposta visual ao tocar, sem efeitos de hover “grudados” e sem o cursor dourado.

## Animações e desempenho

Tudo que se move em `assets/fx.js` passa por **um único laço de `requestAnimationFrame`** e por **molas integradas em passos fixos** (1/240 s), então o movimento é o mesmo em telas de 60, 90 ou 144 Hz e não “pula” quando a rolagem chega em degraus (roda do mouse). Os elementos se movem **só com `transform` e `opacity`**, sem transições CSS disputando com a animação, e as medidas de layout ficam em cache.

A balança é montada em **camadas** (`<svg>` do mesmo tamanho para a base, o travessão, cada prato e cada peso): o navegador só recompõe as camadas, sem repintar a balança a cada quadro. As tarefas só rodam enquanto a seção está perto da tela.

Medido no Chromium a 60 Hz, rolando a página inteira em degraus com o mouse se movendo, contra a versão anterior:

| | Antes | Agora |
|---|---|---|
| Quadros acima de 33 ms (engasgo visível) | ~9% | ~0,5–1% |
| Quadros acima de 50 ms | ~7% | 0% |
| p95 do intervalo entre quadros | 67–83 ms | 16,8 ms |
| Tempo total da thread principal | ~3,2–4,1 s | ~1,3–1,9 s |
| Rasterização com a balança em movimento | ~280–380 ms a cada 2 s | ~25–50 ms a cada 2 s |

## Antes de publicar

- **Número da OAB:** a página mostra `OAB/SP nº 000.000` (marcado com um comentário no HTML).
- **WhatsApp:** troque `5511970803077` em todo o `index.html` (links `wa.me` e atributo `data-whatsapp` do `<body>`).
- **Foto:** o retrato mostra o monograma “JI”; coloque uma foto em `assets/` e siga o comentário em `.portrait__art` (a moldura e o efeito de profundidade continuam funcionando).
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
  fx.js               laço de animação: balanças, cena de rolagem, estante e leitor,
                      linha do tempo, retrato, botões magnéticos e cursor
  shared/
    base.css          reset e utilidades
    lp.js             formulário em etapas, abas, checklist, contadores, rastreamento
    logo-*.svg        logos
```

Não há build: é HTML, CSS e JavaScript puro. Para ver, abra o `index.html` ou rode `python3 -m http.server 8000`. No GitHub Pages, publique a branch na pasta `/ (root)`.
