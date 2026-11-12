import { contact } from '../data/site.js';

export default function Contact() {
  return (
    <section className="section" id="contact">
      <div className="container contact-container">
        <h2 className="section-title reveal">Let's build something reliable together</h2>
        <p className="section-sub reveal">Open to Full Stack AI and Applied AI engineering roles. Based in Chennai, India · {contact.phone}.</p>
        <div className="contact-actions reveal">
          <a href={`mailto:${contact.email}`} className="btn btn-primary">{contact.email}</a>
          <a href={contact.phoneHref} className="btn btn-ghost">{contact.phone}</a>
          <a href={contact.github} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href={contact.linkedin} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
