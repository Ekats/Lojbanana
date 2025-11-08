import './GrammarCard.css';

export default function GrammarCard({ tip, onContinue }) {
  if (!tip) return null;

  return (
    <div className="grammar-card-overlay">
      <div className="grammar-card">
        <div className="grammar-icon">{tip.icon}</div>
        <h2 className="grammar-title">{tip.title}</h2>

        {tip.whyItMatters && (
          <div className="grammar-why">
            <div className="why-label">💪 Why This Matters:</div>
            <p>{tip.whyItMatters}</p>
          </div>
        )}

        {tip.howItWorks && (
          <div className="grammar-how">
            <div className="how-label">📖 How It Works:</div>
            <p>{tip.howItWorks}</p>
          </div>
        )}

        {tip.example && (
          <div className="grammar-example">
            <div className="example-label">✨ Example:</div>
            <div className="example-lojban">{tip.example.lojban}</div>
            <div className="example-english">= {tip.example.english}</div>
          </div>
        )}

        {tip.nextUp && (
          <div className="grammar-next">
            <div className="next-label">⏭️ Next Up:</div>
            <p>{tip.nextUp}</p>
          </div>
        )}

        {tip.progress && (
          <div className="grammar-progress">
            📚 {tip.progress.current} of {tip.progress.total} concepts learned
          </div>
        )}

        <button onClick={onContinue} className="btn-grammar-continue">
          Got it, let's practice! →
        </button>
      </div>
    </div>
  );
}
