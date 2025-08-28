import React, { useMemo, useState } from "react";
import { ShoppingCart, Brain, X, Plus, Minus, ShieldCheck, CreditCard, Sparkles, Mail } from "lucide-react";

// --- Demo data (reemplaza con tus propios productos/arte original!) ---
const PRODUCTS = [
  {
    id: "sticker-pack",
    name: "Pack de stickers ‘Brain’ (PNG)",
    price: 3.5,
    description: "15 stickers digitales en PNG transparentes, listos para usar en chat y redes.",
    image: (
      <svg viewBox="0 0 400 300" className="w-full h-48 rounded-2xl shadow-inner">
        <defs>
          <linearGradient id="g1" x1="0" x2="1">
            <stop offset="0%" stopOpacity="1" stopColor="#c084fc" />
            <stop offset="100%" stopOpacity="1" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g1)" />
        <g transform="translate(110,65)">
          <rect x="-10" y="-10" width="210" height="140" rx="16" fill="white" opacity="0.25" />
          <g>
            <circle cx="40" cy="60" r="35" fill="#fff" opacity="0.85" />
            <circle cx="90" cy="50" r="40" fill="#fff" opacity="0.85" />
            <circle cx="140" cy="62" r="32" fill="#fff" opacity="0.85" />
          </g>
        </g>
      </svg>
    ),
  },
  {
    id: "wallpapers",
    name: "Fondos de pantalla ‘Brainrot’ (4K)",
    price: 4.99,
    description: "8 fondos 4K con arte original estilo ‘brain’.",
    image: (
      <svg viewBox="0 0 400 300" className="w-full h-48 rounded-2xl shadow-inner">
        <defs>
          <linearGradient id="g2" x1="0" x2="1">
            <stop offset="0%" stopOpacity="1" stopColor="#22c55e" />
            <stop offset="100%" stopOpacity="1" stopColor="#06b6d4" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g2)" />
        <g transform="translate(70,80)" opacity="0.9">
          <path d="M0,40 C40,-20 120,-20 160,40 C200,100 280,100 320,40 L320,140 L0,140 Z" fill="#fff"/>
        </g>
      </svg>
    ),
  },
  {
    id: "sound-pack",
    name: "Pack de sonidos/memes (MP3)",
    price: 2.99,
    description: "20 sonidos originales para vídeos y streams.",
    image: (
      <svg viewBox="0 0 400 300" className="w-full h-48 rounded-2xl shadow-inner">
        <defs>
          <linearGradient id="g3" x1="0" x2="1">
            <stop offset="0%" stopOpacity="1" stopColor="#f97316" />
            <stop offset="100%" stopOpacity="1" stopColor="#ef4444" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#g3)" />
        <g transform="translate(70,80)" opacity="0.9">
          <rect x="0" y="0" width="260" height="80" rx="12" fill="#fff"/>
          <rect x="20" y="20" width="120" height="40" rx="6" fill="#f97316" opacity="0.85"/>
          <circle cx="200" cy="40" r="20" fill="#ef4444" opacity="0.85"/>
        </g>
      </svg>
    ),
  },
];

const currency = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });

export default function BrainrotShop() {
  const [cart, setCart] = useState({});
  const [email, setEmail] = useState("");
  const items = useMemo(() => Object.entries(cart).map(([id, qty]) => ({
    ...PRODUCTS.find(p => p.id === id),
    qty
  })), [cart]);

  const subtotal = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  function add(id, by = 1) {
    setCart(prev => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + by) }));
  }

  function remove(id) {
    setCart(prev => {
      const p = { ...prev };
      delete p[id];
      return p;
    });
  }

  function checkout() {
    if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      alert("Introduce un email válido para enviar los archivos digitales tras la compra.");
      return;
    }
    if (items.length === 0) {
      alert("Tu carrito está vacío.");
      return;
    }
    alert(`(DEMO) Procediendo al pago seguro por ${currency(subtotal)}. Tras el pago enviaremos los enlaces de descarga a ${email}.`);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-100">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-slate-900/70 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-2xl bg-white/10 shadow">
              <Brain className="w-6 h-6" />
            </div>
            <div className="leading-tight">
              <p className="font-semibold">Roba un Brainrot — Tienda</p>
              <p className="text-xs text-slate-400">Arte y packs digitales — DEMO</p>
            </div>
          </div>
          <button className="relative px-4 py-2 rounded-2xl bg-white/10 hover:bg-white/15 transition flex items-center gap-2" onClick={() => {
            const el = document.getElementById("cart");
            el?.classList.remove("translate-x-full");
          }}>
            <ShoppingCart className="w-5 h-5" />
            <span>Carrito</span>
            {items.length > 0 && (
              <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40">{items.reduce((s,i)=>s+i.qty,0)}</span>
            )}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Lanza tu mini‑tienda <span className="inline-flex items-center gap-2">brain<Sparkles className="w-6 h-6"/></span> en minutos
            </h1>
            <p className="mt-4 text-slate-300">
              Vende arte original inspirado en el fenómeno ‘brainrot’. Mantente siempre dentro de las
              normas: crea tus propios diseños, nombres y sonidos. ¡Nada de activos de Roblox ni de terceros sin licencia!
            </p>
            <ul className="mt-6 space-y-2 text-slate-300 text-sm">
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Descargas digitales automáticas por email</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Pago seguro (Stripe/PayPal)</li>
              <li className="flex items-center gap-2"><ShieldCheck className="w-4 h-4"/> Sin comisiones ocultas</li>
            </ul>
          </div>
          <div className="rounded-3xl p-6 bg-white/5 border border-white/10 shadow-xl">
            <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-fuchsia-500/40 to-sky-400/40 grid place-items-center">
              <Brain className="w-24 h-24" />
            </div>
            <p className="text-xs text-slate-400 mt-3">Imagen de ejemplo. Sustituye por tu propio arte.</p>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="flex items-end justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-semibold">Productos digitales</h2>
          <p className="text-xs text-slate-400">Demo — precios e imágenes ficticios</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PRODUCTS.map(p => (
            <article key={p.id} className="rounded-3xl border border-white/10 bg-white/5 hover:bg-white/10 transition shadow">
              <div className="p-4">{p.image}</div>
              <div className="px-4 pb-4">
                <h3 className="font-semibold text-lg">{p.name}</h3>
                <p className="text-sm text-slate-300 mt-1">{p.description}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-base font-bold">{currency(p.price)}</span>
                  <button onClick={() => add(p.id, 1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/40 hover:bg-emerald-500/30 text-emerald-100">
                    <Plus className="w-4 h-4"/> Añadir
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-10 text-sm text-slate-400">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div>
            <p className="font-medium text-slate-200">Aviso importante</p>
            <p className="mt-2">Esta demo es educativa. Para vender, usa solo <span className="text-slate-200">arte original</span> y respeta las marcas y términos de servicio de Roblox y de cada juego. Si tu hijo es menor, el titular de la tienda y cuenta de cobro debe ser un adulto.</p>
          </div>
          <div>
            <p className="font-medium text-slate-200">Legal</p>
            <ul className="mt-2 space-y-1">
              <li>Política de privacidad (ejemplo)</li>
              <li>Términos de compra (ejemplo)</li>
              <li>Información de reembolso (descargas digitales)</li>
            </ul>
          </div>
          <div>
            <p className="font-medium text-slate-200">Contacto</p>
            <p className="mt-2">Escribe a <span className="text-slate-200">tu‑email@dominio.com</span></p>
          </div>
        </div>
      </footer>

      {/* Cart Drawer */}
      <aside id="cart" className="fixed top-0 right-0 h-full w-full sm:w-[420px] bg-slate-900 border-l border-white/10 shadow-2xl transform translate-x-full transition-transform duration-300 z-50">
        <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
          <p className="font-semibold flex items-center gap-2"><ShoppingCart className="w-5 h-5"/> Tu carrito</p>
          <button onClick={() => document.getElementById("cart")?.classList.add("translate-x-full") } className="p-2 rounded-xl bg-white/5 hover:bg-white/10">
            <X className="w-5 h-5"/>
          </button>
        </div>
        <div className="p-4 space-y-3 max-h-[55%] overflow-auto">
          {items.length === 0 && (
            <p className="text-slate-400">Aún no hay productos en el carrito.</p>
          )}
          {items.map(it => (
            <div key={it.id} className="flex items-center gap-3 border border-white/10 rounded-2xl p-3 bg-white/5">
              <div className="w-16 h-12 rounded-xl overflow-hidden bg-white/10 grid place-items-center"><Brain className="w-5 h-5"/></div>
              <div className="flex-1">
                <p className="font-medium">{it.name}</p>
                <p className="text-xs text-slate-400">{currency(it.price)} · x{it.qty}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => add(it.id, -1)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><Minus className="w-4 h-4"/></button>
                <button onClick={() => add(it.id, +1)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><Plus className="w-4 h-4"/></button>
                <button onClick={() => remove(it.id)} className="p-2 rounded-xl bg-white/5 hover:bg-white/10"><X className="w-4 h-4"/></button>
              </div>
            </div>
          ))}
        </div>

        {/* Email & Summary */}
        <div className="px-4 py-4 border-t border-white/10 space-y-3">
          <div>
            <label className="text-sm text-slate-300 flex items-center gap-2" htmlFor="email"><Mail className="w-4 h-4"/> Email para envío de descargas</label>
            <input id="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu‑email@dominio.com" className="mt-2 w-full rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"/>
            <p className="text-xs text-slate-400 mt-1">Usaremos este email para entregar los archivos digitales tras el pago.</p>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Subtotal</span>
            <span className="font-semibold">{currency(subtotal)}</span>
          </div>
          <button onClick={checkout} className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 hover:bg-emerald-500/30">
            <CreditCard className="w-5 h-5"/> Pagar ahora
          </button>
          <p className="text-xs text-slate-400">Al continuar aceptas los términos de compra. Las descargas digitales normalmente no tienen reembolso, salvo por ley aplicable.</p>
        </div>
      </aside>

      {/* Drawer backdrop */}
      <div onClick={() => document.getElementById("cart")?.classList.add("translate-x-full") } className="fixed inset-0 bg-black/40 hidden" id="backdrop" />
    </div>
  );
}
