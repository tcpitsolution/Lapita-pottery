import useReveal from "../useReveal";

export default function PageHero({
  title,
  kicker = "EFFIE POTTERY",
  image,
  video,
  imageFit = "cover",
}) {
  const ref = useReveal();
  return (
    <section className={`pagehero ${!image && !video ? "pagehero-plain" : ""} ${image && imageFit === "portrait" ? "pagehero-portrait" : ""}`}>
      {video && (
        <video
          className="pagehero-video"
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
      )}
      {!video && image && <div className="pagehero-bg" style={{ backgroundImage: `url("${image}")` }} aria-hidden="true" />}
      <div className="pagehero-overlay" aria-hidden="true" />
      <div className="pagehero-content container">
        <div ref={ref} className="reveal-fade">
          <span className="eyebrow">{kicker}</span>
          <h1>{title}</h1>
        </div>
      </div>
      <span className="pagehero-location">NAKABUTA <i aria-hidden="true">·</i> FIJI</span>
    </section>
  );
}
