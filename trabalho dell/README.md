# Site de demonstração — Loja de produto

Este repositório contém uma página simples para vender um produto (landing page) com exemplos de integração cliente-side (PayPal) e um backend mínimo para pagamentos com cartão via Stripe.

Arquivos principais:
- `aaa.html` — página principal (landing).
- `styles.css` — estilos da página.
- `script.js` — lógica para o modal de checkout (simulado) e integrações com PayPal/Stripe.
- `server.js` — backend mínimo (Express) para criar sessões de pagamento do Stripe.
- `success.html` — página de sucesso após checkout do Stripe.
- `.env.example` — exemplo de variáveis de ambiente para o backend.

Como testar rapidamente (sem backend):
1. Abra o Explorador de Arquivos e vá para `c:\Users\samuel\Documents\trabalho dell`.
2. Dê um duplo-clique em `aaa.html` para abrir no navegador.
3. Use o botão "Comprar agora" para testar o modal de checkout simulado.

Botão de pagamento real (PayPal)
--------------------------------
Este projeto inclui um exemplo de botão do PayPal integrado no cliente. Para testar o PayPal em modo sandbox:

1. Crie uma conta no PayPal Developer: https://developer.paypal.com/
2. Crie um app e copie o "Client ID" da sandbox.
3. No arquivo `aaa.html`, substitua `YOUR_SANDBOX_CLIENT_ID` no script do PayPal pelo Client ID de sandbox.
4. Abra `aaa.html` no navegador e clique no botão do PayPal para testar o fluxo.

Observação: a integração PayPal aqui é client-side apenas para demonstração. Em produção recomenda-se que a criação/validação de pedidos e webhooks sejam tratados por um backend.

Backend (Stripe) — instalação e execução local
---------------------------------------------
Para pagamentos com cartão via Stripe (mais seguro e recomendado para produção), o projeto inclui um backend em Node/Express que cria sessões de Checkout.

1. Crie uma conta de teste no Stripe: https://dashboard.stripe.com/register e obtenha as chaves de teste.
2. Copie `.env.example` para `.env` e cole suas chaves de teste:

   STRIPE_PUBLISHABLE_KEY=pk_test_xxx
   STRIPE_SECRET_KEY=sk_test_xxx

3. No terminal (PowerShell) rode:

```powershell
cd "c:\Users\samuel\Documents\trabalho dell"
npm install
node server.js
```

4. Abra no navegador: http://localhost:4242/aaa.html
5. Clique em "Pagar com cartão" — você será redirecionado ao checkout do Stripe (modo teste).

Observações de segurança:
- Nunca comite sua `STRIPE_SECRET_KEY`. Use variáveis de ambiente em produção.
- Em produção, verifique pagamentos com webhooks do Stripe e crie sessões/ordens no servidor (não confie apenas no cliente).

Suporte e próximos passos
-------------------------
- Posso ajudar a trocar o produto, adicionar imagens, ou implementar armazenamento de pedidos em um banco de dados.
- Se preferir outro provedor (Mercado Pago, PagSeguro), eu posso adaptar o backend para ele.
# Site de demonstração — Loja de produto

Este repositório contém uma página estática simples para vender um produto (landing page) usando apenas HTML/CSS/JS.

Arquivos:
- `aaa.html` — página principal (abra no navegador).
- `styles.css` — estilos da página.
- `script.js` — lógica para o modal de checkout (simulado).

Como testar localmente:
1. Abra o explorador de arquivos e navegue até a pasta `trabalho dell`.
2. Clique duas vezes no arquivo `aaa.html` para abrir no navegador, ou abra o navegador e arraste o arquivo para ele.

Fluxo disponível:
- Clique em "Comprar agora" para abrir o modal de checkout.
- Preencha nome e e‑mail e confirme para ver a simulação de confirmação de pedido.

Observações:
- Este é um exemplo estático; não há integração real com meios de pagamento. Para produção, integre com um gateway (Stripe, PagSeguro, MercadoPago, etc.) e adote boas práticas de segurança e validação no servidor.
