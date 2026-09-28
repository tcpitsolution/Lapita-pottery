import React from "react";
import useReveal from "../useReveal";
export default function ExperienceCard({item}){
  const ref=useReveal();
  return <article ref={ref} className="expcard reveal reveal-scale"><img src={item.image} alt={item.title} loading="lazy"/><div><span>EXPERIENCE</span><h3>{item.title}</h3><p>{item.text}</p></div></article>}