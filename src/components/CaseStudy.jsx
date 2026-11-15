export default function CaseStudy({ id, title, intro, rows, stack }) {
  return (
    <section className="section" id={id}>
      <div className="container">
        <h2 className="section-title reveal">{title}</h2>
        <p className="section-sub reveal">{intro}</p>
        <div className="case-study reveal">
          {rows.map(({ heading, content, list }) => (
            <div className="case-row" key={heading}>
              <h3>{heading}</h3>
              {list ? (
                <ul className="bullet-list">{list.map((li, i) => <li key={i}>{li}</li>)}</ul>
              ) : (
                <p>{content}</p>
              )}
            </div>
          ))}
          <div className="case-row">
            <h3>Tech Stack</h3>
            <div className="stack-pills">
              {stack.map((s) => <span key={s}>{s}</span>)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
