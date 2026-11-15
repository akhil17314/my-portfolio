import { architecture } from '../data/architecture.js';

export default function Architecture() {
  return (
    <section className="section section-alt" id="architecture">
      <div className="container">
        <h2 className="section-title reveal">How the system is put together</h2>
        <div className="arch-grid">
            {architecture.map(({ title, text }) => (
            <div className="arch-card reveal" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
