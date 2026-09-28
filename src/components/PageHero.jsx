import React from "react";
import useReveal from "../useReveal";
export default function PageHero({title,kicker="EFFIE POTTERY",image}){
  const ref=useReveal();
  return <section className="pagehero" style={{backgroundImage:`linear-gradient(90deg,rgba(24,17,13,.8),rgba(24,17,13,.25)),url(${image})`}}><div className="container"><div ref={ref} className="reveal reveal-fade"><div className="eyebrow">{kicker}</div><h1>{title}</h1></div></div></section>}