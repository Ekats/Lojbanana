import { useState, useEffect } from 'react';
import { generateWrongAnswers } from '../utils/vocabularyLevels';
import './VocabularyExercise.css';

export default function VocabularyExercise({ word, exerciseType, levelId, onComplete, onSkip }) {
  const [userAnswer, setUserAnswer] = useState('');
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [options, setOptions] = useState([]);
  const [constructedWords, setConstructedWords] = useState([]);
  const [showPeek, setShowPeek] = useState(false);

  useEffect(() => {
    if (exerciseType === 'multiple-choice-lojban' || exerciseType === 'multiple-choice-english') {
      const wrongAnswers = generateWrongAnswers(word, levelId, 3);
      const allOptions = [word, ...wrongAnswers];
      setOptions(allOptions.sort(() => Math.random() - 0.5));
    }

    if (exerciseType === 'construct-sentence') {
      // Get words from example sentence
      const example = word.examples[0];
      const sentence = example.split('=')[0].trim();
      const words = sentence.split(' ');
      setOptions([...words].sort(() => Math.random() - 0.5));
    }
  }, [word, exerciseType]);

  const handleTextSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === word.english.toLowerCase().trim();
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    }
  };

  const handleMultipleChoice = (option) => {
    setSelectedOption(option);
    const correct = option.lojban === word.lojban;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    }
  };

  const handleConstructWord = (wordToAdd) => {
    setConstructedWords([...constructedWords, wordToAdd]);
  };

  const handleRemoveLastWord = () => {
    setConstructedWords(constructedWords.slice(0, -1));
  };

  const handleCheckConstruction = () => {
    const example = word.examples[0];
    const correctSentence = example.split('=')[0].trim();
    const userSentence = constructedWords.join(' ');

    const correct = userSentence === correctSentence;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setTimeout(() => {
        onComplete(true);
      }, 1500);
    }
  };

  const handlePeek = () => {
    setShowPeek(true);
    setTimeout(() => {
      setShowPeek(false);
    }, 2000); // Show for 2 seconds
  };

  const renderExercise = () => {
    switch (exerciseType) {
      case 'flashcard':
        return (
          <div className="flashcard-exercise">
            <div className="flashcard">
              <div className="flashcard-lojban">{word.lojban}</div>
              <div className="flashcard-english">{word.english}</div>
              {word.places && word.places.length > 0 && (
                <div className="flashcard-places">
                  {word.places.map((place, idx) => (
                    <div key={idx} className="place-info">{place}</div>
                  ))}
                </div>
              )}
              {word.examples && (
                <div className="flashcard-examples">
                  {word.examples.map((ex, idx) => (
                    <div key={idx} className="example">{ex}</div>
                  ))}
                </div>
              )}
            </div>
            <div className="flashcard-actions">
              <button onClick={() => onComplete(true)} className="btn-got-it">
                Got it! ✓
              </button>
              <button onClick={() => onSkip()} className="btn-skip">
                Skip
              </button>
            </div>
          </div>
        );

      case 'translate-to-english':
        return (
          <div className="translate-exercise">
            <div className="question">
              <h3>What does this mean in English?</h3>
              <div className="lojban-word">{word.lojban}</div>
              {showPeek && (
                <div className="peek-overlay">
                  <div className="peek-answer">{word.english}</div>
                </div>
              )}
            </div>
            <button onClick={handlePeek} className="btn-peek" disabled={showPeek}>
              👁️ Peek
            </button>
            <input
              type="text"
              className="answer-input"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTextSubmit()}
              placeholder="Type the English meaning..."
              autoFocus
            />
            <button
              onClick={handleTextSubmit}
              className="btn-check"
              disabled={!userAnswer.trim()}
            >
              Check
            </button>
          </div>
        );

      case 'multiple-choice-lojban':
        return (
          <div className="multiple-choice-exercise">
            <div className="question">
              <h3>Which word means "{word.english}"?</h3>
              {showPeek && (
                <div className="peek-overlay">
                  <div className="peek-answer">{word.lojban}</div>
                </div>
              )}
            </div>
            <button onClick={handlePeek} className="btn-peek" disabled={showPeek || showFeedback}>
              👁️ Peek
            </button>
            <div className="options-grid">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${
                    selectedOption?.lojban === option.lojban
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }`}
                  onClick={() => handleMultipleChoice(option)}
                  disabled={showFeedback}
                >
                  <div className="option-lojban">{option.lojban}</div>
                  <div className="option-hint">{option.category}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'multiple-choice-english':
        return (
          <div className="multiple-choice-exercise">
            <div className="question">
              <h3>What does "{word.lojban}" mean?</h3>
              {showPeek && (
                <div className="peek-overlay">
                  <div className="peek-answer">{word.english}</div>
                </div>
              )}
            </div>
            <button onClick={handlePeek} className="btn-peek" disabled={showPeek || showFeedback}>
              👁️ Peek
            </button>
            <div className="options-grid">
              {options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${
                    selectedOption?.lojban === option.lojban
                      ? isCorrect
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }`}
                  onClick={() => handleMultipleChoice(option)}
                  disabled={showFeedback}
                >
                  <div className="option-english">{option.english}</div>
                </button>
              ))}
            </div>
          </div>
        );

      case 'construct-sentence':
        return (
          <div className="construct-exercise">
            <div className="question">
              <h3>Build this sentence:</h3>
              <div className="target-english">
                {word.examples[0].split('=')[1].trim()}
              </div>
              {showPeek && (
                <div className="peek-overlay">
                  <div className="peek-answer">{word.examples[0].split('=')[0].trim()}</div>
                </div>
              )}
            </div>
            <button onClick={handlePeek} className="btn-peek" disabled={showPeek || showFeedback}>
              👁️ Peek
            </button>

            <div className="construction-area">
              <div className="constructed-sentence">
                {constructedWords.length === 0 ? (
                  <span className="placeholder">Click words below...</span>
                ) : (
                  constructedWords.map((w, idx) => (
                    <span key={idx} className="constructed-word">{w}</span>
                  ))
                )}
              </div>
              <div className="construction-controls">
                <button
                  onClick={handleRemoveLastWord}
                  disabled={constructedWords.length === 0}
                  className="btn-remove"
                >
                  ← Remove
                </button>
                <button
                  onClick={handleCheckConstruction}
                  disabled={constructedWords.length === 0}
                  className="btn-check"
                >
                  Check
                </button>
              </div>
            </div>

            <div className="word-bank">
              {options.map((w, idx) => (
                <button
                  key={idx}
                  onClick={() => handleConstructWord(w)}
                  className="word-btn"
                >
                  {w}
                </button>
              ))}
            </div>
          </div>
        );

      default:
        return <div>Unknown exercise type</div>;
    }
  };

  return (
    <div className="vocabulary-exercise">
      {renderExercise()}

      {showFeedback && (
        <div className={`feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
          {isCorrect ? (
            <>
              <div className="feedback-icon">✓</div>
              <div className="feedback-text">
                <strong>Correct!</strong>
                <p>{word.lojban} = {word.english}</p>
              </div>
            </>
          ) : (
            <>
              <div className="feedback-icon">✗</div>
              <div className="feedback-text">
                <strong>Not quite!</strong>
                <p>The correct answer is: <strong>{word.lojban}</strong> = {word.english}</p>
                {word.examples && (
                  <p className="example">Example: {word.examples[0]}</p>
                )}
              </div>
              <button onClick={() => setShowFeedback(false)} className="btn-try-again">
                Try Again
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
