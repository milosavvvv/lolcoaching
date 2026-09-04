import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import './styles.css';

const plans=[
 {id:'starter',tag:'STARTER',name:'Climb Session',price:'€29',desc:'A focused session to identify what is holding your climb back.',features:['60-minute 1-on-1 session','VOD review of 1 game','Personal improvement checklist','Discord follow-up']},
 {id:'elite',tag:'MOST POPULAR',name:'Elite Coaching',price:'€79',desc:'A complete coaching session built around your champion pool and goals.',features:['90-minute 1-on-1 session','VOD review of up to 3 games','Champion & macro analysis','Custom improvement plan','7 days of Discord support']},
 {id:'premium',tag:'PRO',name:'Pro Package',price:'€149',desc:'High-touch coaching for serious players who want structured progress.',features:['3 × 90-minute sessions','Full VOD & replay analysis','Champion pool optimization','Ranked climbing strategy','30 days of Discord support']}
];

function App(){
 const [loading,setLoading]=useState(''); const [status,setStatus]=useState('');
 async function checkout(id){
  setLoading(id); setStatus('');
  try{
   const apiBase=(import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
   if(!apiBase) throw Error('Checkout is not configured yet. Please contact us.');
   const r=await fetch(`${apiBase}/api/create-checkout-session`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({plan:id})}); const d=await r.json(); if(!r.ok) throw Error(d.error); location.href=d.url;}
  catch(e){setStatus(e.message); setLoading('');}
 }
 return <>
  <nav><a className="brand" href="#top"><span className="mark">S</span> SUMMIT<span className="muted">/COACHING</span></a><div className="navlinks"><a href="#coaching">Coaching</a><a href="#process">How it works</a><a href="#about">About</a><a href="#contact">Contact</a></div><a className="navcta" href="#coaching">Book a session <span>↗</span></a></nav>
  {status && <div className="notice">{status}</div>}
  <main id="top">
   <section className="hero"><div className="eyebrow"><i/> PROFESSIONAL LEAGUE OF LEGENDS COACHING</div><h1>Climb smarter.<br/><em>Play with purpose.</em></h1><p>Personalized coaching for players who are done guessing. Get clear feedback, practical drills, and a game plan built around your goals.</p><div className="heroBtns"><a className="primary" href="#coaching">View coaching <span>↓</span></a><a className="secondary" href="#process">See how it works</a></div><div className="trust"><span>★</span> 1-on-1 coaching <b/> <span>◆</span> Any rank <b/> <span>◈</span> EUW · EUNE · NA</div></section>
   <section className="stats"><div><strong>1:1</strong><span>Personal coaching</span></div><div><strong>VOD</strong><span>Game analysis</span></div><div><strong>30D</strong><span>Support options</span></div><div><strong>100%</strong><span>Player focused</span></div></section>
   <section id="coaching" className="section"><div className="sectionHead"><div><div className="eyebrow">COACHING PLANS</div><h2>Choose your <em>next level.</em></h2></div><p>Every plan is designed to turn vague problems into specific actions you can practice immediately.</p></div><div className="cards">{plans.map((p,i)=><article className={'card '+(i===1?'featured':'')} key={p.id}><div className="cardTop"><span className="tag">{p.tag}</span>{i===1&&<span className="dot">●</span>}</div><h3>{p.name}</h3><p className="desc">{p.desc}</p><div className="price">{p.price}<small> / session{p.id==='premium'?' package':''}</small></div><ul>{p.features.map(x=><li key={x}><span>✓</span>{x}</li>)}</ul><button onClick={()=>checkout(p.id)} disabled={loading===p.id}>{loading===p.id?'Opening checkout…':'Book this plan'} <span>↗</span></button></article>)}</div><p className="secure">Secure payment powered by Stripe · No subscription · You’ll be redirected to Stripe Checkout</p></section>
   <section id="process" className="darkSection"><div className="sectionHead"><div><div className="eyebrow">THE PROCESS</div><h2>Simple. Focused. <em>Effective.</em></h2></div><p>No fluff. We find the bottleneck, build a plan, and give you the tools to fix it.</p></div><div className="steps"><div><span>01</span><h3>Book</h3><p>Pick the coaching plan that fits your current goal and complete secure checkout.</p></div><div><span>02</span><h3>Review</h3><p>Send your summoner details and a replay or VOD before the session.</p></div><div><span>03</span><h3>Improve</h3><p>Leave with clear priorities, drills, and feedback you can apply in ranked.</p></div></div></section>
   <section id="about" className="about"><div className="aboutBox"><div className="eyebrow">COACHING PHILOSOPHY</div><h2>Less “just play more.”<br/><em>More useful feedback.</em></h2><p>Great coaching is not about giving you a thousand things to fix. It’s about finding the few decisions that create the biggest difference, then giving you a repeatable way to improve them.</p><div className="quote">“The goal is not to make you play like me. It’s to make you play your best.”</div></div><div className="aboutSide"><div className="mini"><b>01</b><span>Identify</span><p>Find the highest-impact mistakes in your games.</p></div><div className="mini"><b>02</b><span>Prioritize</span><p>Turn them into a short, actionable improvement plan.</p></div><div className="mini"><b>03</b><span>Repeat</span><p>Practice with intention until better decisions become automatic.</p></div></div></section>
   <section id="contact" className="contact"><div><div className="eyebrow">CONTACT</div><h2>Have a question?</h2><p>Not sure which plan is right for you? Reach out and tell us your current rank, role, and goal.</p></div><a className="primary" href="mailto:coach@example.com">coach@example.com ↗</a></section>
  </main>
  <footer><div className="brand"><span className="mark">S</span> SUMMIT<span className="muted">/COACHING</span></div><span>© 2026 Summit Coaching. League of Legends is a trademark of Riot Games, Inc.</span><a href="#top">Back to top ↑</a></footer>
 </>
}
createRoot(document.getElementById('root')).render(<App/>);
