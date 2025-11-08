import { useState } from 'react';
import { parseSentence, WORD_TYPES } from '../utils/lojbanParser';
import './ConstructionMode.css';

export default function ConstructionMode({ availableWords, targetSentence, onComplete }) {
  const [constructedSentence, setConstructedSentence] = useState([]);
  const [parseResult, setParseResult] = useState(null);

  const addWord = (word) => {
    const newSentence = [...constructedSentence, word];
    setConstructedSentence(newSentence);

    // Parse the constructed sentence
    const sentenceText = newSentence.join(' ');
    const result = parseSentence(sentenceText);
    setParseResult(result);

    // Check if correct
    if (targetSentence && arraysEqual(newSentence, targetSentence)) {
      if (onComplete) {
        onComplete(result);
      }
    }
  };

  const removeLastWord = () => {
    const newSentence = constructedSentence.slice(0, -1);
    setConstructedSentence(newSentence);

    if (newSentence.length > 0) {
      const sentenceText = newSentence.join(' ');
      const result = parseSentence(sentenceText);
      setParseResult(result);
    } else {
      setParseResult(null);
    }
  };

  const reset = () => {
    setConstructedSentence([]);
    setParseResult(null);
  };

  const arraysEqual = (a, b) => {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
    return true;
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
    <div className="construction-mode">
      <div className="construction-area">
        <div className="sentence-display">
          {constructedSentence.length === 0 ? (
            <span className="placeholder">Click words below to build your sentence...</span>
          ) : (
            constructedSentence.map((word, idx) => {
              const token = parseResult?.tokens[idx];
              return (
                <span
                  key={idx}
                  className="constructed-word"
                  style={{
                    color: token ? getTokenColor(token.type) : '#333',
                    fontWeight: 'bold'
                  }}
                >
                  {word}
                </span>
              );
            })
          )}
        </div>

        <div className="construction-controls">
          <button
            onClick={removeLastWord}
            disabled={constructedSentence.length === 0}
            className="btn-remove"
          >
            ← Remove Last
          </button>
          <button
            onClick={reset}
            disabled={constructedSentence.length === 0}
            className="btn-reset"
          >
            🔄 Reset
          </button>
        </div>
      </div>

      <div className="word-palette">
        <div className="palette-title">Available Words:</div>
        <div className="word-buttons">
          {availableWords.map((word, idx) => (
            <button
              key={idx}
              onClick={() => addWord(word)}
              className="word-btn"
            >
              {word}
            </button>
          ))}
        </div>
      </div>

      {parseResult && parseResult.tokens.length > 0 && (
        <div className="construction-feedback">
          <div className="parse-info">
            {parseResult.tokens.map((token, idx) => (
              <div key={idx} className="token-info">
                <span style={{ color: getTokenColor(token.type), fontWeight: 'bold' }}>
                  {token.word}
                </span>
                <span className="token-type-small">({token.type})</span>
              </div>
            ))}
          </div>

          {parseResult.warnings && parseResult.warnings.length > 0 && (
            <div className="warnings">
              {parseResult.warnings.map((w, i) => (
                <div key={i} className="warning">⚠️ {w.message}</div>
              ))}
            </div>
          )}

          {parseResult.errors && parseResult.errors.length > 0 && (
            <div className="errors">
              {parseResult.errors.map((e, i) => (
                <div key={i} className="error">❌ {e.message}</div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
