import React, {useState} from "react";
import useReveal from "../useReveal";
import PageHero from "../components/PageHero";

const imgs=[
["POTTERY","https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=85"],
["POTTERY","https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=1200&q=85"],
["CULTURE","https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85"],
["ISLANDS","https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85"],
["VILLAGE","https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=85"],
["POTTERY","https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1200&q=85"]
];

export default function Gallery(){
  const [cat,setCat]=useState("ALL");
  const [light,setLight]=useState(null);
  const filtersRef=useReveal();
  const gridRef=useReveal();
  const shown=cat==="ALL"?imgs:imgs.filter(x=>x[0]===cat);
  return <><PageHero title="Gallery" kicker="MEMORIES MADE IN FIJI" image={imgs[3][1]}/>
  <section className="section container">
    <div ref={filtersRef} className="filters reveal">
      {["ALL","POTTERY","CULTURE","VILLAGE","ISLANDS"].map(x=><button className={cat===x?"selected":""} onClick={()=>setCat(x)} key={x}>{x}</button>)}
    </div>
    <div ref={gridRef} className="gallery reveal">
      {shown.map((x,i)=><button key={i} onClick={()=>setLight(x[1])}><img src={x[1]} alt={x[0]} loading="lazy"/><span>{x[0]}</span></button>)}
    </div>
  </section>
  {light&&<div className="lightbox" onClick={()=>setLight(null)}><img src={light} alt="Gallery enlarged"/></div>}
  </>
}
