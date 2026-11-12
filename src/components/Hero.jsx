import { heroStats } from '../data/site.js';

export default function Hero() {
  return (
    <header className="hero" id="hero">
      <div className="container">
        <div className="hero-main">
          <div className="hero-copy">
            <p className="hero-identity reveal">
              <strong>Sri Sai Akhil Edupalli</strong>
              <span>System Engineer @ TCS</span>
              <span>Generative AI and Full Stack</span>
            </p>
            <h1 className="reveal">
              I build <span className="highlight-text">modern web and AI-powered applications</span> with a focus on usability, reliability, and impact.
            </h1>
            <p className="hero-sub reveal">
              System Engineer with 2+ years of experience in React development and Generative AI solutions. I have
              worked on <strong>Invest AI</strong> as part of my role, where I contributed to conversational AI
              workflows in a regulated financial domain.
            </p>
            <div className="hero-actions reveal">
              <a href="#about" className="btn btn-primary">View Profile</a>
              <a href="#contact" className="btn btn-ghost">Contact Me</a>
            </div>
          </div>
        </div>
        <div className="hero-stats reveal" aria-label="Professional summary highlights">
          {heroStats.map(({ value, label }) => (
            <div className="stat" key={label}>
              <span className="stat-num">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </header>
  );
}
