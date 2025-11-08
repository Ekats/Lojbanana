import { useState } from 'react';
import InteractiveParser from './InteractiveParser';
import ConstructionMode from './ConstructionMode';
import { getNextLesson, getPreviousLesson } from '../lessons/lessons';
import './LessonView.css';

export default function LessonView({ lesson, onNavigate, progress, onProgress }) {
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [exerciseComplete, setExerciseComplete] = useState(false);

  const currentExercise = lesson.exercises[currentExerciseIndex];
  const nextLesson = getNextLesson(lesson.id);
  const previousLesson = getPreviousLesson(lesson.id);

  const handleExerciseComplete = (answer) => {
    setUserAnswer(answer);
    setExerciseComplete(true);

    // Update progress
    if (onProgress) {
      onProgress(lesson.id, currentExerciseIndex, answer);
    }
  };

  const handleNext = () => {
    if (currentExerciseIndex < lesson.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setUserAnswer(null);
      setShowHint(false);
      setExerciseComplete(false);
    } else if (nextLesson) {
      onNavigate(nextLesson.id);
      setCurrentExerciseIndex(0);
      setUserAnswer(null);
      setShowHint(false);
      setExerciseComplete(false);
    }
  };

  const handlePrevious = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      setUserAnswer(null);
      setShowHint(false);
      setExerciseComplete(false);
    }
  };

  const renderExercise = () => {
    const ex = currentExercise;

    switch (ex.type) {
      case 'info':
        return (
          <div className="exercise-info">
            <p>{ex.question}</p>
            <button onClick={() => handleExerciseComplete(true)} className="btn-primary">
              Next
            </button>
          </div>
        );

      case 'parse':
        return (
          <div className="exercise-parse">
            <h3>Exercise:</h3>
            <p className="exercise-question">{ex.question}</p>
            {ex.hint && showHint && (
              <div className="hint">💡 {ex.hint}</div>
            )}
            <InteractiveParser
              onParse={(result) => {
                if (ex.answer === null) {
                  // Free form - any parse is accepted
                  if (result.tokens.length > 0) {
                    handleExerciseComplete(result);
                  }
                } else {
                  // Check if answer matches
                  const userInput = result.tokens.map(t => t.word).join(' ');
                  if (userInput.trim() === ex.answer.trim()) {
                    handleExerciseComplete(result);
                  }
                }
              }}
            />
            {!exerciseComplete && (
              <button onClick={() => setShowHint(!showHint)} className="btn-hint">
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
            {exerciseComplete && (
              <div className="exercise-success">
                ✅ Correct! {ex.explanation || ''}
                <button onClick={handleNext} className="btn-primary">
                  Continue
                </button>
              </div>
            )}
          </div>
        );

      case 'multiple-choice':
        return (
          <div className="exercise-multiple-choice">
            <h3>Question:</h3>
            <p className="exercise-question">{ex.question}</p>
            {ex.hint && showHint && (
              <div className="hint">💡 {ex.hint}</div>
            )}
            <div className="options">
              {ex.options.map((option, idx) => (
                <button
                  key={idx}
                  className={`option-btn ${
                    userAnswer === idx
                      ? idx === ex.answer
                        ? 'correct'
                        : 'incorrect'
                      : ''
                  }`}
                  onClick={() => {
                    setUserAnswer(idx);
                    if (idx === ex.answer) {
                      handleExerciseComplete(idx);
                    }
                  }}
                  disabled={exerciseComplete}
                >
                  {option}
                </button>
              ))}
            </div>
            {userAnswer !== null && userAnswer !== ex.answer && (
              <div className="exercise-feedback incorrect-feedback">
                ❌ Try again!
              </div>
            )}
            {exerciseComplete && (
              <div className="exercise-success">
                ✅ Correct! {ex.explanation}
                <button onClick={handleNext} className="btn-primary">
                  Continue
                </button>
              </div>
            )}
            {!exerciseComplete && (
              <button onClick={() => setShowHint(!showHint)} className="btn-hint">
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
          </div>
        );

      case 'construct':
        return (
          <div className="exercise-construct">
            <h3>Construction Exercise:</h3>
            <p className="exercise-question">{ex.question}</p>
            {ex.hint && showHint && (
              <div className="hint">💡 {ex.hint}</div>
            )}
            <ConstructionMode
              availableWords={ex.availableWords}
              targetSentence={ex.answer}
              onComplete={(result) => {
                handleExerciseComplete(result);
              }}
            />
            {!exerciseComplete && (
              <button onClick={() => setShowHint(!showHint)} className="btn-hint">
                {showHint ? 'Hide Hint' : 'Show Hint'}
              </button>
            )}
            {exerciseComplete && (
              <div className="exercise-success">
                ✅ Perfect! {ex.explanation || ''}
                <button onClick={handleNext} className="btn-primary">
                  Continue
                </button>
              </div>
            )}
          </div>
        );

      default:
        return <div>Unknown exercise type</div>;
    }
  };

  return (
    <div className="lesson-view">
      <div className="lesson-header">
        <h1>{lesson.title}</h1>
        <p className="lesson-description">{lesson.description}</p>
      </div>

      <div className="lesson-content">
        <div className="content-text">
          {lesson.content.split('\n').map((line, idx) => {
            if (line.startsWith('# ')) {
              return <h2 key={idx}>{line.substring(2)}</h2>;
            } else if (line.startsWith('## ')) {
              return <h3 key={idx}>{line.substring(3)}</h3>;
            } else if (line.startsWith('**') && line.endsWith('**')) {
              return <p key={idx}><strong>{line.slice(2, -2)}</strong></p>;
            } else if (line.startsWith('- ')) {
              return <li key={idx}>{line.substring(2)}</li>;
            } else if (line.trim().startsWith('```')) {
              return <pre key={idx}><code>{line}</code></pre>;
            } else if (line.trim()) {
              return <p key={idx}>{line}</p>;
            }
            return <br key={idx} />;
          })}
        </div>
      </div>

      <div className="exercise-section">
        <div className="exercise-progress">
          Exercise {currentExerciseIndex + 1} of {lesson.exercises.length}
        </div>
        {renderExercise()}
      </div>

      <div className="lesson-navigation">
        {previousLesson && (
          <button onClick={() => onNavigate(previousLesson.id)} className="btn-secondary">
            ← Previous Lesson
          </button>
        )}
        {currentExerciseIndex > 0 && (
          <button onClick={handlePrevious} className="btn-secondary">
            ← Previous Exercise
          </button>
        )}
        <div className="nav-spacer" />
        {currentExerciseIndex < lesson.exercises.length - 1 && exerciseComplete && (
          <button onClick={handleNext} className="btn-primary">
            Next Exercise →
          </button>
        )}
        {currentExerciseIndex === lesson.exercises.length - 1 && nextLesson && exerciseComplete && (
          <button onClick={() => onNavigate(nextLesson.id)} className="btn-primary">
            Next Lesson: {nextLesson.title} →
          </button>
        )}
      </div>
    </div>
  );
}
