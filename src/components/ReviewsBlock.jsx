import useReveal from "../useReveal";
import { reviews } from "../data/reviews";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function ReviewsBlock() {
  const headRef = useReveal();
  const gridRef = useReveal();
  return (
    <section className="reviews-section">
      <div className="container">
        <div ref={headRef} className="reviews-header reveal">
          <span className="eyebrow">Google Reviews</span>
          <h2>What Our <em>Guests Say</em></h2>
          <div className="rating-display">
            <span className="rating-num">4.6</span>
            <div className="rating-info">
              <span className="stars">★★★★★</span>
              <span className="review-count">38 reviews</span>
            </div>
          </div>
        </div>
        <div ref={gridRef} className="reviews-grid reveal d2">
          {reviews.slice(0, 3).map(r => (
            <div className="review-card" key={r.name}>
              <div className="review-card-stars" aria-hidden="true">★★★★★</div>
              <p>"{r.text}"</p>
              <span className="review-card-author">{r.name}</span>
            </div>
          ))}
        </div>
        <div className="reviews-link-row">
          <Link className="text-link" to="/reviews">Read more guest feedback <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </section>
  );
}
