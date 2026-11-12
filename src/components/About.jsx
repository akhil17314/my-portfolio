import { aboutCards } from '../data/site.js';

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <h2 className="section-title reveal">About me</h2>
        <div className="about-grid">
          <p className="about-lead reveal">
            I'm <strong>Sri Sai Akhil Edupalli</strong>, a System Engineer at Tata Consultancy Services with 2 years of
            experience in frontend development and Generative AI applications — React-based web apps and AI-powered
            chatbots built with practical architecture and clean user experiences. I'm growing into a Full Stack AI
            Engineer, with strong interest in combining product thinking, scalable engineering, and applied AI. One of
            the projects I contributed to is <strong>Invest AI</strong>, a conversational guidance platform in the
            financial domain.
          </p>
          <div className="about-cards reveal">
            {aboutCards.map(({ title, text }) => (
              <div className="about-card" key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
