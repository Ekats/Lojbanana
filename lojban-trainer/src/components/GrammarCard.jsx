import './GrammarCard.css';

export default function GrammarCard({ tip, onContinue }) {
  if (!tip) return null;

  return (
    <div className="grammar-card-overlay">
      <div className="grammar-card">
        <div className="grammar-icon">{tip.icon}</div>
        <h2 className="grammar-title">{tip.title}</h2>

        {tip.content && (
          <div className="grammar-content">
            <p>{tip.content}</p>
          </div>
        )}

        {tip.example && (
          <div className="grammar-example">
            <div className="example-lojban">{tip.example.lojban}</div>
            <div className="example-english">= {tip.example.english}</div>
          </div>
        )}

        <button onClick={onContinue} className="btn-grammar-continue">
          Got it! →
        </button>
      </div>
    </div>
  );
}
