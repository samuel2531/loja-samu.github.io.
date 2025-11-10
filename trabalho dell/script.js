// script.js - comportamento simples para abrir modal de compra e simular checkout
document.addEventListener('DOMContentLoaded', function(){
  const buyBtn = document.getElementById('buyBtn');
  const modal = document.getElementById('buyModal');
  const closeModal = document.getElementById('closeModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const form = document.getElementById('checkoutForm');
  const result = document.getElementById('checkoutResult');

  // Ajusta ano no rodapé
  const yearSpan = document.getElementById('year');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  function open() { modal.classList.remove('hidden'); result.textContent = ''; modal.querySelector('input,select')?.focus(); }
  function close() { modal.classList.add('hidden'); }

  buyBtn?.addEventListener('click', open);
  closeModal?.addEventListener('click', close);
  cancelBtn?.addEventListener('click', close);

  // Fechar com ESC
  document.addEventListener('keydown', function(e){ if(e.key === 'Escape') close(); });

  // Fechar clicando fora do conteúdo
  modal?.addEventListener('click', function(e){ if(e.target === modal) close(); });

  // Submissão do formulário (simulada)
  form?.addEventListener('submit', function(e){
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const payment = document.getElementById('payment').value;

    if(!name || !email){
      result.textContent = 'Por favor, preencha nome e e‑mail.';
      return;
    }

    // Simula processamento
    result.textContent = 'Processando pagamento...';
    setTimeout(() => {
      const orderId = 'PED' + Date.now().toString().slice(-6);
      result.innerHTML = `Compra confirmada! Obrigado, ${escapeHtml(name)}. Pedido <strong>${orderId}</strong>. Enviaremos confirmação para <strong>${escapeHtml(email)}</strong>.`;
      // Desabilita o formulário para evitar reenvio
      Array.from(form.elements).forEach(el => el.disabled = true);
      // Fecha o modal depois de 4s
      setTimeout(() => { close(); resetForm(); }, 4000);
    }, 900);
  });

  function resetForm(){
    form.reset();
    Array.from(form.elements).forEach(el => el.disabled = false);
    result.textContent = '';
  }

  // Pequena função de escape para evitar injeção no innerHTML
  function escapeHtml(str){ return String(str).replace(/[&<>"']/g, function(m){ return ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]); }); }
  
// -------------------------
// Stripe client-side: cria sessão no servidor e redireciona para checkout
// Requer que você rode o backend (server.js) e defina as chaves no .env
async function initStripe(){
  if(!location.protocol.startsWith('http')){
    console.warn('Stripe: carregamento via file:// não suportado — abra a página via http://localhost:4242/aaa.html após iniciar o servidor.');
    return;
  }

  try{
    const cfg = await fetch('/config');
    const { publishableKey } = await cfg.json();
    if(!publishableKey){
      console.warn('Stripe publishable key não fornecida pelo servidor. Verifique .env.');
      return;
    }

    const stripe = Stripe(publishableKey);
    const stripeBtn = document.getElementById('stripeBtn');
    stripeBtn?.addEventListener('click', async function(){
      try{
        const res = await fetch('/create-checkout-session', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify({}) });
        const data = await res.json();
        if(data.id){
          const { error } = await stripe.redirectToCheckout({ sessionId: data.id });
          if(error) console.error('Stripe redirect error', error);
        } else {
          console.error('Resposta inválida do servidor ao criar sessão', data);
        }
      }catch(err){
        console.error('Erro ao solicitar sessão de checkout', err);
      }
    });
  }catch(e){
    console.error('Erro inicializando integração Stripe', e);
  }
}

initStripe();

});
