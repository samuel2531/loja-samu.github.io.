// server.js - backend mínimo para criar sessão de checkout Stripe e servir arquivos estáticos
const path = require('path');
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 4242;

// Serve os arquivos estáticos (a própria pasta do projeto)
app.use(express.static(path.join(__dirname)));

// Endpoint para retornar a publishable key (cliente)
app.get('/config', (req, res) => {
  res.json({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY || '' });
});

// Criar sessão de checkout
app.post('/create-checkout-session', async (req, res) => {
  try {
    if(!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: 'Stripe secret key não configurada' });
    const Stripe = require('stripe');
    const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

    // Aqui usamos preço fixo do produto (R$ 129,90 -> 12990 centavos)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: { name: 'Luminária LED Premium' },
            unit_amount: 12990
          },
          quantity: 1
        }
      ],
      success_url: `${req.protocol}://${req.get('host')}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.protocol}://${req.get('host')}/aaa.html?canceled=true`
    });

    res.json({ id: session.id });
  } catch (err) {
    console.error('Erro ao criar sessão:', err);
    res.status(500).json({ error: 'Falha ao criar sessão de pagamento' });
  }
});

app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`));
