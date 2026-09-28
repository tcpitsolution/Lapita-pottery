import React from "react";
import useReveal from "../useReveal";
import {reviews} from "../data/reviews";
import ReviewCard from "./ReviewCard";
export default function ReviewsBlock({sidebar=false}){
  const ref=useReveal();
  return <section className={sidebar?"reviews-side":"reviews section"}>
  <div ref={ref} className="reveal">
    <div className="eyebrow">GOOGLE REVIEWS</div><div className="rating">4.6 <span>/ 5</span></div><div className="stars">★★★★★</div><p className="reviewcount">38 Google Reviews</p>
  </div>
  <div className="reviewrow">{reviews.slice(0,sidebar?4:6).map(r=><ReviewCard key={r.name} review={r}/>)}</div>
  {!sidebar&&<a className="button outline" href="/reviews">VIEW ALL REVIEWS</a>}
</section>}
