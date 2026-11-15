import { achievements } from '../data/architecture.js';

export default function Achievements() {
  return (
    <section className="section" id="achievements">
      <div className="container">
        <h2 className="section-title reveal">What I solved</h2>
        <div className="achieve-list">
          {achievements.map(({ title, text }) => (
            <div className="achieve-item reveal" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
