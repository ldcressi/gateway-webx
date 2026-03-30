const GW_CONFIG = { 
  backendUrl: '', 
  usdtWallet: 'TK6MEvpnazSTucKbc2buBWUCC7FSn56uLp', 
}; 
 
(function () { 
  'use strict'; 
 
  const link = document.createElement('link'); 
  link.rel = 'stylesheet'; 
  link.href = 
'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+M
ono:wght@400;500&display=swap'; 
  document.head.appendChild(link); 
 
  const style = document.createElement('style'); 
  style.textContent = ` 
    #gw-overlay { 
      position:fixed;inset:0;z-index:99999; 
      background:rgba(0,0,0,0.55); 
      display:flex;align-items:center;justify-content:center; 
      padding:16px;opacity:0;transition:opacity 0.25s; 
      font-family:'DM Sans',sans-serif; 
    } 
    #gw-overlay.gw-show { opacity:1; } 
    #gw-modal { 
      background:#fff;border-radius:20px; 
      width:100%;max-width:440px;overflow:hidden; 
      box-shadow:0 20px 60px rgba(0,0,0,0.2); 
      transform:translateY(20px);transition:transform 0.3s; 
    } 
    #gw-overlay.gw-show #gw-modal { transform:translateY(0); } 
    .gw-progress { height:3px;background:#e5e7eb; } 
    .gw-prog-fill { height:100%;background:#111827;transition:width 0.4s;border-radius:0 2px 
2px 0; } 
    .gw-head { padding:20px 22px 
0;display:flex;align-items:center;justify-content:space-between; } 
    .gw-title { font-size:1rem;font-weight:700;color:#111827; } 
    .gw-close { 
      width:30px;height:30px;border-radius:50%;border:none; 
      background:#f3f4f6;cursor:pointer;font-size:1rem; 
      display:flex;align-items:center;justify-content:center; 
      color:#6b7280;transition:background 0.2s; 
    } 
    .gw-close:hover { background:#e5e7eb;color:#111; } 
    .gw-body { padding:18px 22px 22px; } 
    .gw-label { 
      font-size:0.65rem;font-weight:700;text-transform:uppercase; 
      letter-spacing:0.08em;color:#9ca3af;margin-bottom:8px; 
    } 
    .gw-amount-box { 
      background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px; 
      padding:14px 16px;margin-bottom:18px; 
      display:flex;align-items:baseline;gap:6px; 
    } 
    .gw-amt-sym { font-size:0.9rem;color:#6b7280;font-weight:500; } 
    .gw-amt-val { font-family:'DM 
Mono',monospace;font-size:1.6rem;font-weight:500;color:#111827; } 
    .gw-methods { display:flex;flex-direction:column;gap:9px;margin-bottom:18px; } 
    .gw-method { 
      display:flex;align-items:center;gap:12px;padding:14px; 
      border-radius:12px;border:2px solid #e5e7eb;cursor:pointer; 
      transition:all 0.2s;background:#fafafa;position:relative; 
    } 
    .gw-method:hover { border-color:#d1d5db;background:#fff; } 
    .gw-method.gw-sel-usdt { border-color:#26a17b;background:#edfaf5; } 
    .gw-method.gw-sel-mp   { border-color:#009ee3;background:#e8f6fd; } 
    .gw-mico { 
      width:38px;height:38px;border-radius:9px; 
      display:flex;align-items:center;justify-content:center; 
      font-size:1.2rem;flex-shrink:0; 
    } 
    .gw-mico.usdt { background:#e0f7f0; } 
    .gw-mico.mp   { background:#ddf0fb; } 
    .gw-mname { font-size:0.88rem;font-weight:600;color:#111827; } 
    .gw-msub  { font-size:0.7rem;color:#6b7280; } 
    .gw-mtag { 
      position:absolute;top:8px;right:36px; 
      font-size:0.58rem;font-weight:700;padding:2px 6px;border-radius:20px; 
    } 
    .gw-mtag.auto { background:#ecfdf5;color:#059669; } 
    .gw-radio { 
      margin-left:auto;width:20px;height:20px;border-radius:50%; 
      border:2px solid #d1d5db;flex-shrink:0; 
      display:flex;align-items:center;justify-content:center;transition:all 0.2s; 
    } 
    .gw-method.gw-sel-usdt .gw-radio { background:#26a17b;border-color:#26a17b; } 
    .gw-method.gw-sel-mp   .gw-radio { background:#009ee3;border-color:#009ee3; } 
    .gw-radio::after { 
      content:'';width:8px;height:8px;border-radius:50%; 
      background:#fff;display:none; 
    } 
    .gw-method.gw-sel-usdt .gw-radio::after, 
    .gw-method.gw-sel-mp   .gw-radio::after { display:block; } 
    .gw-btn { 
      width:100%;padding:14px;border-radius:12px;border:none; 
      font-family:'DM Sans',sans-serif;font-size:0.92rem;font-weight:700; 
      cursor:pointer;transition:all 0.2s; 
    } 
    .gw-btn-dark { background:#111827;color:#fff; } 
    .gw-btn-dark:hover { background:#1f2937;transform:translateY(-1px); } 
    .gw-btn-dark:disabled { opacity:0.3;cursor:not-allowed;transform:none; } 
    .gw-btn-ghost { 
      background:transparent;color:#6b7280; 
      border:1px solid #e5e7eb;margin-top:8px;font-size:0.82rem; 
    } 
    .gw-btn-ghost:hover { border-color:#d1d5db;color:#111; } 
    .gw-wallet-box { 
      background:#f9fafb;border:1px solid #e5e7eb;border-radius:11px; 
      padding:14px;margin-bottom:12px; 
    } 
    .gw-wallet-row { display:flex;align-items:center;gap:8px; } 
    .gw-addr { 
      font-family:'DM Mono',monospace;font-size:0.7rem; 
      color:#374151;word-break:break-all;line-height:1.5;flex:1; 
    } 
    .gw-copy { 
      flex-shrink:0;background:#e5e7eb;border:none;border-radius:7px; 
      padding:5px 9px;font-size:0.68rem;font-weight:600; 
      cursor:pointer;color:#374151;transition:all 0.2s; 
    } 
    .gw-copy:hover { background:#111827;color:#fff; } 
    .gw-copy.ok    { background:#10b981;color:#fff; } 
    .gw-net-badge { 
      display:inline-flex;align-items:center;gap:4px; 
      font-size:0.63rem;font-weight:700;padding:3px 8px; 
      border-radius:20px;background:#fef3c7;color:#92400e;margin-top:8px; 
    } 
    .gw-warn { 
      background:#fffbeb;border:1px solid #fde68a;border-radius:9px; 
      padding:10px 12px;font-size:0.73rem;color:#92400e; 
      margin-bottom:12px;display:flex;gap:8px;align-items:flex-start;line-height:1.5; 
    } 
    .gw-status { 
      border-radius:10px;padding:12px 14px; 
      display:flex;align-items:center;gap:10px; 
      font-size:0.78rem;font-weight:500;margin-bottom:12px; 
    } 
    .gw-status.wait { background:#f0f9ff;border:1px solid #bae6fd;color:#0369a1; } 
    .gw-status.det  { background:#ecfdf5;border:1px solid #a7f3d0;color:#065f46; } 
    .gw-status.err  { background:#fef2f2;border:1px solid #fecaca;color:#991b1b; } 
    .gw-spin { 
      width:16px;height:16px;border:2px solid currentColor; 
      border-top-color:transparent;border-radius:50%; 
      animation:gw-spin 0.8s linear infinite;flex-shrink:0; 
    } 
    @keyframes gw-spin { to { transform:rotate(360deg); } } 
    .gw-pulse { 
      width:10px;height:10px;border-radius:50%; 
      background:currentColor;flex-shrink:0; 
      animation:gw-pulse 1.5s ease infinite; 
    } 
    @keyframes gw-pulse { 0%,100%{opacity:1}50%{opacity:0.4} } 
    .gw-qr-box { 
      background:#fff;border:1px solid #e5e7eb;border-radius:11px; 
      padding:16px;display:flex;align-items:center;justify-content:center; 
      min-height:140px;margin-bottom:10px; 
    } 
    .gw-qr-box img { max-width:130px; } 
    .gw-mp-link { 
      display:block;text-align:center;color:#009ee3; 
      font-size:0.8rem;font-weight:600;text-decoration:none; 
      padding:10px;background:#e8f6fd;border:1px solid #93d9f5; 
      border-radius:9px;margin-bottom:12px;transition:all 0.2s; 
    } 
    .gw-mp-link:hover { background:#c9eaf9; } 
    .gw-rate-note { 
text-align:center;font-size:0.7rem;color:#9ca3af;line-height:1.6;margin-bottom:10px; } 
    .gw-success { text-align:center;padding:8px 0; } 
    .gw-success-ico { 
      width:60px;height:60px;background:#ecfdf5;border-radius:50%; 
      display:flex;align-items:center;justify-content:center; 
      font-size:26px;margin:0 auto 14px; 
    } 
    .gw-success-title { font-size:1.1rem;font-weight:700;margin-bottom:6px; } 
    .gw-success-sub   { font-size:0.8rem;color:#6b7280;line-height:1.5;margin-bottom:18px; } 
    .gw-summary { 
      background:#f9fafb;border:1px solid #e5e7eb;border-radius:10px; 
      overflow:hidden;margin-bottom:18px;text-align:left; 
    } 
    .gw-sum-row { 
      display:flex;justify-content:space-between;padding:10px 14px; 
      font-size:0.78rem;border-bottom:1px solid #e5e7eb; 
    } 
    .gw-sum-row:last-child { border-bottom:none; } 
    .gw-sum-row .k { color:#6b7280; } 
    .gw-sum-row .v { font-weight:600;font-family:'DM Mono',monospace;font-size:0.75rem; } 
  `; 
  document.head.appendChild(style); 
 
  let gwMethod = null, gwPaymentId = null, gwPollTimer = null; 
  let gwAmount = 0, gwUserId = null, gwOrderId = null; 
 
  function extractWebXData() { 
    const amountInput = document.querySelector( 
      'input[name="amount"], input[name="deposit_amount"], .deposit-amount input, #amount' 
    ); 
    const amount = amountInput ? parseFloat(amountInput.value) || 0 : 0; 
    const userId = 
      (window.authUser && window.authUser.id) || 
      (window.user && window.user.id) || 
      document.querySelector('meta[name="user-id"]')?.content || 
      document.querySelector('[data-user-id]')?.dataset.userId || 
      'unknown'; 
    return { amount, userId }; 
  } 
 
  function interceptWebX() { 
    const attach = (el) => { 
      if (el.dataset.gwHooked) return; 
      el.dataset.gwHooked = '1'; 
      el.addEventListener('submit', function(e) { 
        e.preventDefault(); e.stopImmediatePropagation(); openGateway(); 
      }, true); 
    }; 
    document.querySelectorAll( 
      'form[action*="deposit"], form[action*="fund"], form[action*="add-fund"]' 
    ).forEach(attach); 
 
    new MutationObserver(() => { 
      document.querySelectorAll( 
        'form[action*="deposit"]:not([data-gw-hooked]), 
form[action*="fund"]:not([data-gw-hooked"])' 
      ).forEach(attach); 
    }).observe(document.body, { childList: true, subtree: true }); 
  } 
 
  function openGateway() { 
    const { amount, userId } = extractWebXData(); 
    const finalAmount = amount || 
      parseFloat(document.querySelector('input[type="number"], 
input[type="text"][name*="amount"]')?.value) || 0; 
    if (!finalAmount || finalAmount < 1) { alert('Ingresá el monto primero.'); return; } 
    gwAmount = finalAmount; 
    gwUserId = userId; 
    gwOrderId = 'WX-' + Date.now(); 
    buildModal(); 
    showModal(); 
    setStep1(); 
  } 
 
  function buildModal() { 
    if (document.getElementById('gw-overlay')) return; 
    document.body.insertAdjacentHTML('beforeend', ` 
      <div id="gw-overlay"> 
        <div id="gw-modal"> 
          <div class="gw-progress"><div class="gw-prog-fill" id="gw-prog" 
style="width:33%"></div></div> 
          <div class="gw-head"> 
            <span class="gw-title" id="gw-head-title">Método de pago</span> 
            <button class="gw-close" onclick="gwClose()">✕</button> 
          </div> 
          <div class="gw-body" id="gw-body"></div> 
        </div> 
      </div> 
    `); 
    window.gwClose = function() { 
      clearInterval(gwPollTimer); 
      const ov = document.getElementById('gw-overlay'); 
      ov.classList.remove('gw-show'); 
      setTimeout(() => ov.remove(), 250); 
    }; 
  } 
 
  function showModal() { 
    requestAnimationFrame(() => 
document.getElementById('gw-overlay').classList.add('gw-show')); 
  } 
  function setProgress(pct) { document.getElementById('gw-prog').style.width = pct + '%'; } 
  function setTitle(t) { document.getElementById('gw-head-title').textContent = t; } 
  function setBody(html) { document.getElementById('gw-body').innerHTML = html; } 
 
  function setStep1() { 
    clearInterval(gwPollTimer); 
    gwMethod = null; 
    setProgress(33); 
    setTitle('Elegí cómo pagar'); 
    setBody(` 
      <div class="gw-label">Monto a acreditar</div> 
      <div class="gw-amount-box"> 
        <span class="gw-amt-sym">USD</span> 
        <span class="gw-amt-val">${gwAmount.toFixed(2)}</span> 
      </div> 
      <div class="gw-label">Método de pago</div> 
      <div class="gw-methods"> 
        <div class="gw-method" id="gw-m-usdt" onclick="gwSelectMethod('usdt')"> 
          <div class="gw-mico usdt">₮</div> 
          <div><div class="gw-mname">USDT · TRC20</div><div class="gw-msub">Tether en 
red TRON — 0% comisión</div></div> 
          <span class="gw-mtag auto">
⚡
 Automático</span> 
          <div class="gw-radio"></div> 
        </div> 
        <div class="gw-method" id="gw-m-mp" onclick="gwSelectMethod('mp')"> 
          <div class="gw-mico mp">
?
</div> 
          <div><div class="gw-mname">Mercado Pago</div><div class="gw-msub">QR / Link 
de pago en ARS</div></div> 
          <div class="gw-radio"></div> 
        </div> 
      </div> 
      <button class="gw-btn gw-btn-dark" id="gw-btn-cont" onclick="gwContinue()" 
disabled>Continuar →</button> 
    `); 
    window.gwSelectMethod = function(m) { 
      gwMethod = m; 
      document.getElementById('gw-m-usdt').className = 'gw-method' + (m==='usdt' ? ' 
gw-sel-usdt' : ''); 
      document.getElementById('gw-m-mp').className   = 'gw-method' + (m==='mp'   ? ' 
gw-sel-mp'   : ''); 
      document.getElementById('gw-btn-cont').disabled = false; 
    }; 
    window.gwContinue = function() { 
      if (!gwMethod) return; 
      gwMethod === 'usdt' ? initUSDT() : initMP(); 
    }; 
  } 
 
  async function initUSDT() { 
    setProgress(66); setTitle('Transferencia USDT'); 
    setBody(` 
      <div class="gw-warn"><span>
⚠
</span><div><strong>Enviá el monto 
exacto</strong><br>Cualquier diferencia puede retrasar la verificación.</div></div> 
      <div class="gw-label">Dirección de destino (TRC20)</div> 
      <div class="gw-wallet-box"> 
        <div class="gw-wallet-row"> 
          <div class="gw-addr" id="gw-wallet-addr">${GW_CONFIG.usdtWallet}</div> 
          <button class="gw-copy" id="gw-cp1" 
onclick="gwCopyEl('gw-wallet-addr','gw-cp1')">Copiar</button> 
        </div> 
        <span class="gw-net-badge">
?
 TRON TRC20</span> 
      </div> 
      <div class="gw-label">Monto exacto</div> 
      <div class="gw-wallet-box"> 
        <div class="gw-wallet-row"> 
          <div class="gw-addr" id="gw-usdt-val" 
style="font-size:1.1rem;font-weight:700">${gwAmount.toFixed(2)} USDT</div> 
          <button class="gw-copy" id="gw-cp2" 
onclick="gwCopyText('${gwAmount.toFixed(2)}','gw-cp2')">Copiar</button> 
        </div> 
      </div> 
      <div class="gw-status wait" id="gw-st-usdt"> 
        <div class="gw-spin"></div> 
        <div><strong>Esperando pago...</strong><br><span 
style="font-weight:400">Verificando en blockchain cada 30s</span></div> 
      </div> 
      <button class="gw-btn gw-btn-ghost" onclick="setStep1()">← Cambiar método</button> 
    `); 
    window.gwCopyEl = function(id, btnId) { 
      gwCopyText(document.getElementById(id).textContent.replace(' USDT','').trim(), btnId); 
    }; 
    window.gwCopyText = function(text, btnId) { 
      navigator.clipboard.writeText(text).catch(()=>{}); 
      const btn = document.getElementById(btnId); 
      
if(btn){btn.textContent='✓';btn.classList.add('ok');setTimeout(()=>{btn.textContent='Copiar';bt
n.classList.remove('ok')},2000);} 
    }; 
    try { 
      const res = await fetch(`${GW_CONFIG.backendUrl}/create-payment`, { 
        method:'POST', headers:{'Content-Type':'application/json'}, 
        
body:JSON.stringify({method:'usdt',amount:gwAmount,user_id:gwUserId,order_id:gwOrderId
}) 
      }); 
      const data = await res.json(); 
      gwPaymentId = data.payment_id; 
    } catch(e) { console.warn('[GW] Backend no disponible'); } 
    clearInterval(gwPollTimer); 
    gwPollTimer = setInterval(async ()=>{ 
      if(!gwPaymentId) return; 
      try { 
        const r = await 
fetch(`${GW_CONFIG.backendUrl}/check-payment?id=${gwPaymentId}`); 
        const d = await r.json(); 
        const box = document.getElementById('gw-st-usdt'); 
        if(!box){clearInterval(gwPollTimer);return;} 
        if(d.status==='detected'){box.className='gw-status det';box.innerHTML='<div 
class="gw-pulse"></div><div><strong>¡Pago detectado!</strong><br><span 
style="font-weight:400">Confirmando...</span></div>';} 
        if(d.status==='confirmed'){clearInterval(gwPollTimer);showSuccess(d.tx_hash||'');} 
      } catch(e){} 
    }, 30000); 
  } 
 
  async function initMP() { 
    setProgress(66); setTitle('Pagar con Mercado Pago'); 
    setBody(` 
      <div class="gw-qr-box" id="gw-qr"><div class="gw-spin" 
style="color:#009ee3"></div></div> 
      <a class="gw-mp-link" id="gw-mp-lnk" href="#" target="_blank">
?
 Abrir link de pago 
→</a> 
      <div class="gw-status wait" id="gw-st-mp"> 
        <div class="gw-spin"></div> 
        <div><strong>Esperando confirmación...</strong><br><span 
style="font-weight:400">MP nos notifica al instante</span></div> 
      </div> 
      <div class="gw-rate-note" id="gw-rate">Calculando tipo de cambio...</div> 
      <button class="gw-btn gw-btn-ghost" onclick="setStep1()">← Cambiar método</button> 
    `); 
    try { 
      const res = await fetch(`${GW_CONFIG.backendUrl}/create-payment`, { 
        method:'POST', headers:{'Content-Type':'application/json'}, 
        
body:JSON.stringify({method:'mercadopago',amount:gwAmount,user_id:gwUserId,order_id:
gwOrderId}) 
      }); 
      const data = await res.json(); 
      gwPaymentId = data.payment_id; 
      const qr = document.getElementById('gw-qr'); 
      if(qr) qr.innerHTML = data.qr_image ? `<img src="${data.qr_image}" alt="QR">` : '<span 
style="font-size:0.78rem;color:#9ca3af">Usá el link</span>'; 
      const lnk = document.getElementById('gw-mp-lnk'); 
      if(lnk && data.payment_url) lnk.href = data.payment_url; 
      const rate = document.getElementById('gw-rate'); 
      if(rate && data.ars_amount) rate.innerHTML = `USD ${gwAmount.toFixed(2)} = 
<strong>ARS ${parseFloat(data.ars_amount).toLocaleString('es-AR')}</strong>`; 
    } catch(e){ 
      const box=document.getElementById('gw-st-mp'); 
      if(box){box.className='gw-status err';box.innerHTML='
❌
 Error al conectar. Intentá de 
nuevo.';} 
    } 
    clearInterval(gwPollTimer); 
    gwPollTimer = setInterval(async ()=>{ 
      if(!gwPaymentId) return; 
      try { 
        const r = await 
fetch(`${GW_CONFIG.backendUrl}/check-payment?id=${gwPaymentId}`); 
        const d = await r.json(); 
        if(!document.getElementById('gw-st-mp')){clearInterval(gwPollTimer);return;} 
        if(d.status==='confirmed'){clearInterval(gwPollTimer);showSuccess(d.reference||'');} 
      } catch(e){} 
    }, 8000); 
  } 
 
  function showSuccess(txRef) { 
    setProgress(100); setTitle('¡Listo!'); 
    setBody(` 
      <div class="gw-success"> 
        <div class="gw-success-ico">
✅
</div> 
        <div class="gw-success-title">Pago confirmado</div> 
        <div class="gw-success-sub">Tu saldo fue acreditado automáticamente.</div> 
        <div class="gw-summary"> 
          <div class="gw-sum-row"><span class="k">Monto</span><span class="v">USD 
${gwAmount.toFixed(2)}</span></div> 
          <div class="gw-sum-row"><span class="k">Método</span><span 
class="v">${gwMethod==='usdt'?'USDT TRC20':'Mercado Pago'}</span></div> 
          <div class="gw-sum-row"><span class="k">Estado</span><span class="v" 
style="color:#10b981">✓ Acreditado</span></div> 
          <div class="gw-sum-row"><span class="k">Referencia</span><span 
class="v">${txRef||'—'}</span></div> 
        </div> 
        <button class="gw-btn gw-btn-dark" onclick="location.reload()">Actualizar 
página</button> 
      </div> 
    `); 
  } 
 
  if (document.readyState === 'loading') { 
    document.addEventListener('DOMContentLoaded', interceptWebX); 
  } else { 
    interceptWebX(); 
  } 
 
  window.openPaymentGateway = openGateway; 
})();
