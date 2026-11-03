import useReveal from "../useReveal";

export default function ExperienceCard({ item }) {
  const ref = useReveal();
  return (
    <article ref={ref} className="experience-card reveal">
      <div className={`experience-card-image ${item.image ? "" : "no-image"}`}>
        {item.image
          ? <img src={item.image} alt="" loading="lazy" />
          : <span className="experience-card-placeholder" aria-hidden="true">✳</span>}
        <span className="experience-card-index" aria-hidden="true">✳</span>
      </div>
      <div className="experience-card-copy">
        <span className="eyebrow">EFFIE LAPITA POTTERY</span>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </article>
  );
}