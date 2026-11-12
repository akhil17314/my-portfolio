import { useEffect, useState } from 'react';
import { navLinks } from '../data/site.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} id="navbar">
      <div className="nav-inner">
        <a href="#hero" className="logo">AI<span>·</span>Eng</a>
        <ul className={`nav-links${open ? ' is-open' : ''}`} id="site-navigation">
          {navLinks.map(({ id, label }) => (
            <li key={id}><a href={`#${id}`} onClick={() => setOpen(false)}>{label}</a></li>
          ))}
        </ul>
        <button
          className="nav-toggle"
          id="navToggle"
          type="button"
          aria-label={open ? 'Close navigation' : 'Open navigation'}
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
        >
          <span></span><span></span><span></span>
        </button>
      </div>
    </nav>
  );
}
