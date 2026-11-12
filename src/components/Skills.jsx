import { skills } from '../data/skills.js';

export default function Skills() {
  return (
    <section className="section section-alt" id="skills">
      <div className="container">
        <h2 className="section-title reveal">Skills matrix</h2>
        <p className="section-sub reveal">Extracted directly from the production dependency manifest, infrastructure code, and source tree.</p>
        <div className="skills-grid">
          {skills.map(({ title, tags }) => (
            <div className="skill-card reveal" key={title}>
              <h3>{title}</h3>
              <ul className="tag-list">
                {tags.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
