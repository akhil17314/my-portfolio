import {
  duties, projectBullets, education, certifications, summary, headline, targetRoles,
} from '../data/experience.js';

export default function Experience() {
  return (
    <section className="section section-alt" id="experience">
      <div className="container">
        <h2 className="section-title reveal">Experience, education &amp; certifications</h2>
        <p className="section-sub reveal">Work history, education, and certifications.</p>
        <div className="resume-grid">
          <div className="resume-card reveal">
            <h3>System Engineer — Tata Consultancy Services <small>(July 2024 – Present)</small></h3>
            <ul className="bullet-list">{duties.map((d) => <li key={d}>{d}</li>)}</ul>
          </div>
          <div className="resume-card reveal">
            <h3>Education</h3>
            <p><strong>{education.degree}</strong> — {education.detail}</p>
          </div>
          <div className="resume-card reveal">
            <h3>Certifications</h3>
            <ul className="bullet-list">{certifications.map((c) => <li key={c}>{c}</li>)}</ul>
          </div>
          <div className="resume-card reveal">
            <h3>One-line summary</h3>
            <p>{summary}</p>
          </div>
          <div className="resume-card reveal">
            <h3>Project overview</h3>
            <ul className="bullet-list">{projectBullets.map((b) => <li key={b}>{b}</li>)}</ul>
          </div>
          <div className="resume-card reveal">
            <h3>LinkedIn headline</h3>
            <p>{headline}</p>
          </div>
          <div className="resume-card reveal">
            <h3>Target roles</h3>
            <p>{targetRoles}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
