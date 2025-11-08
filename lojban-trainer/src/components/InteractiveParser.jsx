import { useState } from 'react';
import { parseSentence, WORD_TYPES } from '../utils/lojbanParser';
import './InteractiveParser.css';

export default function InteractiveParser({ initialText = '', onParse }) {
  const [input, setInput] = useState(initialText);
  const [result, setResult] = useState(null);

  const handleParse = () => {
    const parsed = parseSentence(input);
    setResult(parsed);
    if (onParse) {
      onParse(parsed);
    }
  };

  const handleInputChange = (e) => {
    const newInput = e.target.value;
    setInput(newInput);

    // Real-time parsing
    if (newInput.trim()) {
      const parsed = parseSentence(newInput);
      setResult(parsed);
      if (onParse) {
        onParse(parsed);
      }
    } else {
      setResult(null);
    }
  };

  const getTokenColor = (type) => {
    const colors = {
      [WORD_TYPES.SELBRI]: '#ff6b6b',
      [WORD_TYPES.SUMTI]: '#4ecdc4',
      [WORD_TYPES.GADRI]: '#45b7d1',
      [WORD_TYPES.CONNECTOR]: '#ffa502',
      [WORD_TYPES.CMAVO]: '#95afc0',
      [WORD_TYPES.NUMBER]: '#a29bfe',
      [WORD_TYPES.CMENE]: '#fd79a8',
      [WORD_TYPES.UNKNOWN]: '#dfe6e9'
    };
    return colors[type] || '#dfe6e9';
  };

  return (
    <div className="interactive-parser">
      <div className="parser-input-container">
        <textarea
          className="parser-input"
          value={input}
          onChange={handleInputChange}
          placeholder="Type Lojban here... (e.g., mi tavla)"
          rows={3}
        />
      </div>

      {result && result.tokens.length > 0 && (
        <div className="parser-result">
          <div className="tokens-display">
            {result.tokens.map((token, i) => (
              <div
                key={i}
                className={`token ${token.valid ? 'valid' : 'invalid'}`}
                style={{
                  borderColor: getTokenColor(token.type),
                  backgroundColor: token.valid ? `${getTokenColor(token.type)}15` : '#fff5f5'
                }}
              >
                <div className="token-word">{token.word}</div>
                <div className="token-type">{token.type}</div>
                <div className="token-meaning">{token.meaning}</div>
                {token.places && token.places.length > 0 && (
                  <div className="token-places">
                    {token.places.map((place, idx) => (
                      <div key={idx} className="place">{place}</div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {result.errors && result.errors.length > 0 && (
            <div className="validation-errors">
              <h4>❌ Errors:</h4>
              {result.errors.map((error, i) => (
                <div key={i} className="error-message">{error.message}</div>
              ))}
            </div>
          )}

          {result.warnings && result.warnings.length > 0 && (
            <div className="validation-warnings">
              <h4>⚠️ Suggestions:</h4>
              {result.warnings.map((warning, i) => (
                <div key={i} className="warning-message">{warning.message}</div>
              ))}
            </div>
          )}

          {result.valid && result.errors.length === 0 && (
            <div className="validation-success">
              ✅ Valid Lojban structure!
            </div>
          )}
        </div>
      )}

      <div className="parser-legend">
        <div className="legend-title">Color Guide:</div>
        <div className="legend-items">
          <span className="legend-item" style={{ color: getTokenColor(WORD_TYPES.SELBRI) }}>
            ● Predicate
          </span>
          <span className="legend-item" style={{ color: getTokenColor(WORD_TYPES.SUMTI) }}>
            ● Argument
          </span>
          <span className="legend-item" style={{ color: getTokenColor(WORD_TYPES.GADRI) }}>
            ● Article
          </span>
          <span className="legend-item" style={{ color: getTokenColor(WORD_TYPES.CONNECTOR) }}>
            ● Connector
          </span>
        </div>
      </div>
    </div>
  );
}
