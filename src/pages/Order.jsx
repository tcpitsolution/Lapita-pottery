import React, {useState} from "react";
import useReveal from "../useReveal";
import PageHero from "../components/PageHero";
import {products} from "../data/products";

export default function Order(){
  const [cart,setCart]=useState([]);
  const add=p=>setCart(c=>[...c,p]);
  const total=cart.reduce((a,p)=>a+p.price,0);
  const gridRef=useReveal();
  const cartRef=useReveal();
  return <><PageHero title="Pottery & Souvenirs" kicker="ORDER" image={products[0].image}/>
  <section className="section container">
    <div ref={gridRef} className="productgrid reveal">
      {products.map(p=><article className="product" key={p.id}>
        <img src={p.image} alt={p.name}/>
        <div><h3>{p.name}</h3><p>{p.description}</p><strong>{p.price?`$${p.price}`:"Price to be confirmed"}</strong><button className="button small" onClick={()=>add(p)}>ADD TO ORDER</button></div>
      </article>)}
    </div>
    <aside ref={cartRef} className="cart reveal">
      <div className="eyebrow">YOUR ORDER</div>
      <h2>{cart.length} item{cart.length===1?"":"s"}</h2>
      {cart.map((p,i)=><p key={i}>{p.name}</p>)}
      <hr/><strong>Total: {total?`$${total}`:"To be confirmed"}</strong>
      <button className="button" disabled={!cart.length}>PLACE ORDER</button>
    </aside>
  </section></>
}
