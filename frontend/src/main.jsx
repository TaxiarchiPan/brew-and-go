import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Coffee, ShoppingBag, Plus, Minus, ArrowLeft, ArrowRight, Check, X, Clock3, MapPin, Sparkles, Trash2 } from 'lucide-react';
import './style.css';

const products = [
  {id:1,name:'Freddo Espresso',category:'Coffee',price:2.2,emoji:'🧊',desc:'Διπλός espresso, χτυπημένος με πάγο'},
  {id:2,name:'Freddo Cappuccino',category:'Coffee',price:2.5,emoji:'☕',desc:'Freddo espresso με αφρόγαλα'},
  {id:3,name:'Iced Latte',category:'Coffee',price:3.2,emoji:'🥤',desc:'Espresso, γάλα και πάγος'},
  {id:4,name:'Cappuccino',category:'Coffee',price:2.5,emoji:'☕',desc:'Espresso με βελούδινο αφρόγαλα'},
  {id:5,name:'Caramel Latte',category:'Signature',price:3.8,emoji:'🍮',desc:'Latte με σιρόπι καραμέλας'},
  {id:6,name:'Spanish Latte',category:'Signature',price:3.8,emoji:'✨',desc:'Espresso με γλυκό συμπυκνωμένο γάλα'},
  {id:7,name:'Strawberry Matcha',category:'Tea & Matcha',price:4.1,emoji:'🍓',desc:'Matcha, γάλα και φράουλα'},
  {id:8,name:'Matcha Latte',category:'Tea & Matcha',price:3.8,emoji:'🍵',desc:'Ιαπωνικό matcha με γάλα'},
  {id:9,name:'Peach Iced Tea',category:'Refreshments',price:2.8,emoji:'🍑',desc:'Κρύο τσάι με ροδάκινο'},
  {id:10,name:'Strawberry Smoothie',category:'Refreshments',price:3.5,emoji:'🍓',desc:'Φρέσκια φράουλα και γιαούρτι'},
  {id:11,name:'Chocolate Croissant',category:'Bakery',price:2.2,emoji:'🥐',desc:'Βουτυρένιο croissant με σοκολάτα'},
  {id:12,name:'Cinnamon Roll',category:'Bakery',price:2.7,emoji:'🍥',desc:'Αφράτο ρολό κανέλας'},
];
const categories = ['All','Coffee','Signature','Tea & Matcha','Refreshments','Bakery'];
const money = n => `${n.toFixed(2).replace('.',',')} €`;

function App(){
  const [step,setStep]=useState('welcome');
  const [orderType,setOrderType]=useState('Take Away');
  const [category,setCategory]=useState('All');
  const [cart,setCart]=useState([]);
  const [selected,setSelected]=useState(null);
  const [size,setSize]=useState('M');
  const [milk,setMilk]=useState('Κανονικό');
  const [extras,setExtras]=useState([]);
  const [qty,setQty]=useState(1);
  const [orderNo,setOrderNo]=useState(1237);
  const [payment,setPayment]=useState('Κάρτα');
  const [table,setTable]=useState('12');
  const [name,setName]=useState('');
  const [search,setSearch]=useState('');

  const filtered=useMemo(()=>products.filter(
    p=>(category==='All'||p.category===category)&&p.name.toLowerCase().includes(search.toLowerCase())),[category,search]);
  const total=cart.reduce((s,i)=>s+i.price*i.qty,0);
  const addToCart=()=>{
    const extraCost=extras.reduce((s,e)=>s+(e==='Extra shot'?0.5:e==='Syrup'?0.4:0.4),0);
    const item={...selected,price:selected.price+(size==='L'?0.5:size==='S'?-0.3:0)+extraCost,qty,size,milk,extras:[...extras]};
    setCart(old=>[...old,item]);setSelected(null);setQty(1);setExtras([]);setStep('menu');
  };
  const changeQty=(idx,delta)=>
    setCart(old=>old.map((x,i)=>i===idx?{...x,qty:Math.max(1,x.qty+delta)}:x));
  const finish=()=>{setOrderNo(n=>n+1);setStep('done')};
  const reset=()=>{setCart([]);setStep('welcome');setCategory('All');setSearch('')};

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand" onClick={()=>setStep('welcome')}>
        <span className="brand-mark">☕
          </span><span>BREW <b>&</b> GO</span></div>
          <div className="top-right">
            <span className="open-pill">
              <i/> OPEN NOW</span>
              <button className="cart-top" onClick={()=>setStep('cart')}>
                <ShoppingBag size={18}/><span>{cart.reduce((s,x)=>s+x.qty,0)}
              </span></button></div></header>
    <main>
      {step==='welcome'&&<section className="welcome">
        <div className="welcome-copy">
          <span className="eyebrow">
            <Sparkles size={15}/> YOUR DAILY HAPPY PLACE</span>
            <h1>Good coffee.<br/>
            <em>Good mood.</em></h1>
            <p>Ο καφές σου, ακριβώς όπως τον αγαπάς. Διάλεξε, προσαρμόσε και απόλαυσε!</p>
            <button className="primary big" onClick={()=>setStep('type')}>Ξεκίνα παραγγελία <ArrowRight size={19}/></button>
            <div className="welcome-notes"><span>☀️ Freshly made</span>
            <span>♡ Made with love</span>
            <span>⚡ Quick & easy</span>
            </div></div>
        <div className="hero-art">
          <div className="sun-shape"/>
          <div className="hero-cup">🥤</div>
          <div className="float f1">☕</div>
          <div className="float f2">✦</div>
          <div className="hero-sticker">LIFE HAPPENS,<br/>COFFEE HELPS!</div></div>
      </section>}

      {step==='type'&&<section className="narrow">
        <button className="back" onClick={()=>setStep('welcome')}>
          <ArrowLeft size={17}/> Πίσω</button>
          <div className="section-heading">
            <span className="eyebrow">STEP 01 · LET'S GET STARTED</span>
            <h2>Πώς θα απολαύσεις<br/>τον καφέ σου;</h2>
            <p>Επίλεξε τον τρόπο παραγγελίας σου.</p></div>
            <div className="type-grid">

        <button className={`type-card dine ${orderType==='Dine In'?'chosen':''}`} 
          onClick={()=>setOrderType('Dine In')}>
            <span className="type-emoji">🪑</span>
            <span><b>Dine In</b>
            <small>Απόλαυσέ το στον χώρο μας</small>
            </span><ArrowRight/></button>

        <button className={`type-card takeaway ${orderType==='Take Away'?'chosen':''}`} 
        onClick={()=>setOrderType('Take Away')}><span className="type-emoji">🥤</span>
        <span><b>Take Away</b><small>Πάρε τον καφέ σου μαζί</small>
        </span><ArrowRight/></button>

      </div>{orderType==='Dine In'&& <label className="table-field"> Αριθμός τραπεζιού <input value={table} 
        onChange={e=>setTable(e.target.value)} placeholder="π.χ. 12"/>
        </label>}

        <button className="primary full" 
        onClick={()=>setStep('menu')}>Συνέχεια στο μενού 
        <ArrowRight size={18}/></button></section>}

      {step==='menu'&&<section className="menu-layout">
        <div className="menu-main"><div className="menu-title"><div>
          <span className="eyebrow">MADE FRESH FOR YOU</span><h2>Τι θα πιεις σήμερα;</h2>
          <p>Μικρές απολαύσεις, μεγάλες στιγμές.</p></div>
          
          <div className="order-chip">{orderType==='Dine In'?'🪑 Dine In':'🥤 Take Away'} 
            <button onClick={()=>setStep('type')}>Αλλαγή</button></div></div>
            
            <input className="search" placeholder="⌕  Αναζήτησε το αγαπημένο σου..." value={search} 
            onChange={e=>setSearch(e.target.value)}/>
            
            <div className="categories">{
            categories.map(c=><button key={c} className={category===c?'active':''} 
            onClick={()=>setCategory(c)}>{c==='All'?'Όλα':c}</button>)}</div>
            
            <div className="product-grid">{
            filtered.map(p=><button className="product-card" key={p.id} 
            onClick={()=>{setSelected(p);setSize('M');setMilk('Κανονικό');setExtras([]);setQty(1)}}>
            
            <div className={`product-art art-${p.id%5}`}><span>{p.emoji}</span>
            <i>+</i></div>
            <div className="product-info"><b>{p.name}</b>
            <small>{p.desc}</small><strong>{money(p.price)}</strong></div></button>)}</div></div>
            
            <aside className="cart-panel"><div className="cart-head"><h3>Το καλάθι σου</h3>
            
            <span>{cart.length} items</span></div>{cart.length===0?
            <div className="empty-cart"><div>🛍️</div><b>Το καλάθι είναι άδειο</b>
            <p>Οι αγαπημένες σου επιλογές θα εμφανιστούν εδώ.</p>
            </div>:<>{cart.map((x,i)=>
            <div className="cart-line" key={i}>
              <span className="mini-emoji">{x.emoji}</span>
              <div className="line-info"><b>{x.name}</b><small>{x.size} · {x.milk}</small>
              <div className="quantity"><button onClick={()=>changeQty(i,-1)}>
                <Minus size={12}/></button><span>{x.qty}</span><button onClick={()=>changeQty(i,1)}>
                  <Plus size={12}/></button></div></div><strong>{money(x.price*x.qty)}</strong>
                  <button className="remove" onClick={()=>setCart(old=>old.filter((_,j)=>j!==i))}>
                    <Trash2 size={14}/></button></div>)}</>}
                    <div className="cart-total"><span>Σύνολο</span><b>{money(total)}</b></div>
                    <button className="primary full" disabled={!cart.length} 
                    onClick={()=>setStep('checkout')}>Ολοκλήρωση παραγγελίας 
                    <ArrowRight size={17}/></button>
                    <p className="secure-note">♡ Φτιαγμένο με αγάπη, σερβιρισμένο με χαμόγελο</p>
                    </aside></section>}

      {step==='checkout'&&
      <section className="narrow">
        <button className="back" 
        onClick={()=>setStep('menu')}>
          <ArrowLeft size={17}/> Επιστροφή στο μενού</button>
          <div className="section-heading">
            <span className="eyebrow">ALMOST THERE</span>
            <h2>Ολοκλήρωση<br/>παραγγελίας</h2>
            <p>Μια τελευταία επιλογή και ο καφές σου ετοιμάζεται!</p></div>
            <div className="checkout-card"><h3>Τρόπος πληρωμής</h3>
            <div className="payment-options">{['Κάρτα','Μετρητά','Apple Pay'].map(p=><button className={payment===p?'selected':''} 
            
            onClick={()=>setPayment(p)} 
              key={p}>{p==='Κάρτα'?'💳':p==='Μετρητά'?'💵':''}<b>{p}</b></button>)}
            </div>
            <label className="table-field">Όνομα (προαιρετικό)<input value={name} 
            onChange={e=>setName(e.target.value)} placeholder="π.χ. Μαρία"/></label>
            <div className="checkout-total"><span>Σύνολο πληρωμής</span>
            <b>{money(total)}</b></div>
            <button className="primary full" onClick={finish}>Επιβεβαίωση παραγγελίας 
              <Check size={18}/></button>
              <small className="demo-note">Demo checkout — δεν πραγματοποιείται πραγματική χρέωση.</small></div></section>}

      {step==='done'&&
      <section className="narrow done">
        <div className="success-icon">
          <Check size={42}/></div>
          <span className="eyebrow">ORDER CONFIRMED</span>
          <h2>Ευχαριστούμε{name?`, ${name}`:''}!</h2>
          <p>Η παραγγελία σου καταχωρήθηκε με επιτυχία.</p>
          <div className="order-number"><small>ΑΡΙΘΜΟΣ ΠΑΡΑΓΓΕΛΙΑΣ</small><b>#{orderNo}</b></div>
          <div className="timeline"><div className="timeline-item current"><span>✓</span>
          <div><b>Καταχωρήθηκε</b><small>Μόλις τώρα</small></div></div>
          <div className="timeline-item"><span>
            <Clock3 size={16}/></span>
            <div><b>Ετοιμάζεται</b>
            <small>2–5 λεπτά</small></div></div>
            <div className="timeline-item"><span>☕</span>
            <div><b>{orderType==='Dine In'?'Σερβίρεται στο τραπέζι':'Έτοιμο για παραλαβή'}</b>
            <small>{orderType==='Dine In'?`Τραπέζι ${table}`:'Θα εμφανιστεί ειδοποίηση'}
              </small></div></div></div>
              <button className="primary full" 
              onClick={reset}>Νέα παραγγελία</button></section>}
    </main>
    {selected&&<div className="modal-backdrop" 
    onClick={()=>setSelected(null)}>
      <div className="product-modal" 
      onClick={e=>e.stopPropagation()}>
        <button className="close" 
        onClick={()=>setSelected(null)}><X/></button>
        <div className="modal-art">{selected.emoji}</div>
        <span className="eyebrow">
          {selected.category.toUpperCase()}</span>
          <h2>{selected.name}</h2><p>{selected.desc}</p>
          <h4>Μέγεθος</h4>
          <div className="choice-row">{['S','M','L'].map(s=><button className={size===s?'selected':''} 
          onClick={()=>setSize(s)} key={s}>{s}
          <small>{s==='S'?'250ml':s==='M'?'350ml':'450ml'}</small></button>)}</div>
          <h4>Επιλογή γάλακτος</h4>
          <div className="choice-row milk">{['Κανονικό','Αμυγδάλου','Βρώμης'].map(m=><button className={milk===m?'selected':''} 
          onClick={()=>setMilk(m)} key={m}>{m}</button>)}</div>
          <h4>Extras</h4><div className="extras">{['Extra shot','Syrup','Whipped cream'].map(e=><label key={e}>
            <input type="checkbox" checked={extras.includes(e)} 
            onChange={ev=>setExtras(old=>ev.target.checked?[...old,e]:old.filter(x=>x!==e))}/>{e}</label>)}</div>
            <button className="primary full" 
            onClick={addToCart}>Προσθήκη στο καλάθι · 
            {money(selected.price+(size==='L'?.5:size==='S'?-.3:0)+extras.reduce((s,e)=>s+(e==='Extra shot'?.5:.4),0))}</button>
            </div></div>}

    <footer>
      <span>© 2026 BREW & GO</span>
      <span>YOUR COFFEE. YOUR MOMENT. ☀️</span>
      <span><MapPin size={13}/> Made for coffee lovers</span>
    </footer>
  </div>
}
createRoot(document.getElementById('root')).render(<App/>);
