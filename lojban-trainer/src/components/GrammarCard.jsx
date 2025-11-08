import './GrammarCard.css';

export default function GrammarCard({ tip, onContinue }) {
  if (!tip) return null;

  return (
    <div className="grammar-card-overlay">
      <div className="grammar-card">
        <div className="grammar-icon">{tip.icon}</div>
        <h2 className="grammar-title">{tip.title}</h2>
        <div className="grammar-content">
          {tip.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
        {tip.example && (
          <div className="grammar-example">
            <div className="example-lojban">{tip.example.lojban}</div>
            <div className="example-english">= {tip.example.english}</div>
          </div>
        )}
        {tip.progress && (
          <div className="grammar-progress">
            {tip.progress.current} of {tip.progress.total} concepts learned
          </div>
        )}
        <button onClick={onContinue} className="btn-grammar-continue">
          Got it, let's practice! →
        </button>
      </div>
    </div>
  );
}
