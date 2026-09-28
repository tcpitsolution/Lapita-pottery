import React from "react";
import {Outlet, Link, useLocation} from "react-router-dom";
import {Menu, X, MessageCircle, Facebook, Instagram, Music2} from "lucide-react";
import {useState} from "react";
import {config} from "../config";

const nav = [["About","/about"],["Experiences","/experiences"],["Pottery","/pottery"],["Island Hopping","/island-hopping"],["Gallery","/gallery"],["Reviews","/reviews"],["Contact","/contact"]];

export default function Layout(){
  const [open,setOpen]=useState(false); const loc=useLocation();
  const wa=config.whatsapp ? `https://wa.me/${config.whatsapp.replace(/\D/g,"")}` : "#";
  return <div className="site">
    <header className="nav">
      <Link className="brand" to="/" onClick={()=>setOpen(false)}><span>EFFIE</span><small>LAPITA POTTERY</small></Link>
      <nav className={open?"navlinks open":"navlinks"}>
        {nav.map(([n,p])=><Link className={loc.pathname===p?"active":""} onClick={()=>setOpen(false)} key={p} to={p}>{n}</Link>)}
        <Link className="navbook" onClick={()=>setOpen(false)} to="/booking">BOOK NOW</Link>
      </nav>
      <button className="menubtn" onClick={()=>setOpen(!open)} aria-label="Menu">{open?<X/>:<Menu/>}</button>
    </header>
    <main><Outlet/></main>
    <a className="wa" href={wa} target="_blank" rel="noreferrer"><MessageCircle/><span>Chat with us</span></a>
    <footer className="footer">
      <div className="footergrid">
        <div><div className="brand footbrand"><span>EFFIE</span><small>LAPITA POTTERY & ISLAND HOPPING</small></div><p>Authentic Fijian culture, craftsmanship and unforgettable experiences.</p></div>
        <div><h4>Explore</h4>{nav.slice(0,5).map(([n,p])=><Link key={p} to={p}>{n}</Link>)}</div>
        <div><h4>Visit</h4><p>Nakabuta / Sigatoka, Fiji</p><p>+679 966 5633</p><p>Open 24 Hours</p></div>
        <div><h4>Connect</h4><div className="social">{config.facebook&&<a href={config.facebook}><Facebook/></a>}{config.instagram&&<a href={config.instagram}><Instagram/></a>}{config.tiktok&&<a href={config.tiktok}><Music2/></a>}{config.whatsapp&&<a href={wa}><MessageCircle/></a>}</div><p className="muted">Social links appear after configuration.</p></div>
      </div>
      <div className="copyright">© 2026 Effie Lapita Pottery & Island Hopping. All rights reserved. <span>Powered by <a href={config.tcp}>TCP IT Solution</a></span></div>
    </footer>
  </div>
}