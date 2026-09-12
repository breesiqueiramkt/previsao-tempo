# Previsão do Tempo - BrasilAPI (versão mobile)

Aplicação web que consulta a BrasilAPI para buscar cidades e exibir a previsão do tempo, otimizada para uso no celular.

Atividade da disciplina de Desenvolvimento Web I - Fatec (Prof. Arley).

## Tecnologias

- HTML
- CSS
- JavaScript puro (sem frameworks ou bibliotecas)

## O que mudou na versão mobile

- Botão de busca por toque, além do Enter do teclado.
- Layout dos dias de previsão em grade, para não estourar em telas pequenas.
- Campos e botões com tamanho de toque adequado (mínimo 44-48px).
- Ajustes para a área de notch/entalhe do iPhone (safe area).
- Pode ser **adicionado à tela inicial** do celular como um app (PWA), com ícone e abertura rápida.

## Como usar

1. Digite o nome de uma cidade no campo de busca.
2. Toque no botão de busca (🔍) ou pressione Enter/Buscar no teclado.
3. Selecione uma das cidades encontradas na lista.
4. Veja a previsão do tempo para os próximos dias.

## Estrutura do projeto

```
previsao-tempo/
├── index.html
├── manifest.json
├── sw.js
├── css/
│   └── style.css
├── js/
│   └── script.js
├── icons/
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   └── apple-touch-icon.png
└── README.md
```

## API utilizada

[BrasilAPI](https://brasilapi.com.br) - serviços CPTEC de cidade e previsão do tempo.
