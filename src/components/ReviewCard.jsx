import React from "react";
import useReveal from "../useReveal";
export default function ReviewCard({review}){
  const ref=useReveal();
  return <article ref={ref} className="reviewcard reveal"><div className="stars">★★★★★</div><p>"{review.text}"</p><strong>{review.name}</strong></article>
}
