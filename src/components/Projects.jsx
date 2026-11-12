import { investAi, skillsRefactor, qaAssistant } from '../data/projects.jsx';

export default function Projects() {
  const projects = [investAi, skillsRefactor, qaAssistant];

  return (
    <section className="section section-alt" id="project">
      <div className="container">
        <h2 className="section-title reveal">Projects</h2>
        <p className="section-sub reveal">
          Selected work highlights with a brief overview.
        </p>
        <div className="achieve-list">
          {projects.map(({ id, title, intro }) => (
            <div className="achieve-item reveal" key={id}>
              <h3>{title}</h3>
              <p>{intro}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
