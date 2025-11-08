import { useState, useEffect } from 'react';
import VocabularyExercise from './VocabularyExercise';
import { getRandomWords, getAllVocabulary } from '../utils/vocabulary';
import './VocabularyTrainer.css';

export default function VocabularyTrainer({ onExit }) {
  const [sessionWords, setSessionWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [lives, setLives] = useState(3);
  const [sessionStats, setSessionStats] = useState({
    correct: 0,
    incorrect: 0,
    totalXP: 0
  });
  const [isSessionComplete, setIsSessionComplete] = useState(false);
  const [exerciseTypes, setExerciseTypes] = useState([]);

  // Load or initialize progress
  useEffect(() => {
    const savedProgress = localStorage.getItem('vocab-progress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setStreak(progress.streak || 0);
    }

    // Start a new session
    startNewSession();
  }, []);

  const startNewSession = () => {
    // Get 10 random words for this session
    const words = getRandomWords(10);
    setSessionWords(words);
    setCurrentIndex(0);
    setLives(3);
    setSessionStats({
      correct: 0,
      incorrect: 0,
      totalXP: 0
    });
    setIsSessionComplete(false);

    // Generate exercise types for each word
    const types = words.map(() => {
      const allTypes = [
        'flashcard',
        'translate-to-english',
        'multiple-choice-lojban',
        'multiple-choice-english',
        'construct-sentence'
      ];
      return allTypes[Math.floor(Math.random() * allTypes.length)];
    });
    setExerciseTypes(types);
  };

  const handleExerciseComplete = (isCorrect) => {
    if (isCorrect) {
      const xpGained = 10 + (streak * 2); // Bonus XP for streak
      setScore(score + xpGained);
      setStreak(streak + 1);
      setSessionStats(prev => ({
        ...prev,
        correct: prev.correct + 1,
        totalXP: prev.totalXP + xpGained
      }));
    } else {
      setStreak(0);
      setLives(lives - 1);
      setSessionStats(prev => ({
        ...prev,
        incorrect: prev.incorrect + 1
      }));

      if (lives - 1 <= 0) {
        // Session failed
        endSession(false);
        return;
      }
    }

    // Move to next exercise
    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete!
      endSession(true);
    }
  };

  const handleSkip = () => {
    // Move to next without penalty but no XP
    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      endSession(true);
    }
  };

  const endSession = (completed) => {
    setIsSessionComplete(true);

    // Save progress
    const savedProgress = localStorage.getItem('vocab-progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : {
      totalXP: 0,
      streak: 0,
      sessionsCompleted: 0,
      wordsLearned: new Set()
    };

    if (completed) {
      progress.totalXP = (progress.totalXP || 0) + sessionStats.totalXP;
      progress.streak = streak;
      progress.sessionsCompleted = (progress.sessionsCompleted || 0) + 1;

      // Add words to learned set
      if (!progress.wordsLearned) progress.wordsLearned = [];
      sessionWords.forEach(word => {
        if (!progress.wordsLearned.includes(word.lojban)) {
          progress.wordsLearned.push(word.lojban);
        }
      });
    } else {
      progress.streak = 0;
    }

    localStorage.setItem('vocab-progress', JSON.stringify(progress));
  };

  const currentWord = sessionWords[currentIndex];
  const currentExerciseType = exerciseTypes[currentIndex];
  const progress = ((currentIndex + 1) / sessionWords.length) * 100;

  if (sessionWords.length === 0) {
    return (
      <div className="vocabulary-trainer">
        <div className="loading">Loading vocabulary...</div>
      </div>
    );
  }

  if (isSessionComplete) {
    const passed = lives > 0;
    return (
      <div className="vocabulary-trainer">
        <div className="session-complete">
          <div className={`result-icon ${passed ? 'passed' : 'failed'}`}>
            {passed ? '🎉' : '😢'}
          </div>
          <h1>{passed ? 'Great Work!' : 'Session Failed'}</h1>

          <div className="session-stats">
            <div className="stat">
              <div className="stat-value">{sessionStats.totalXP}</div>
              <div className="stat-label">XP Earned</div>
            </div>
            <div className="stat">
              <div className="stat-value">{sessionStats.correct}</div>
              <div className="stat-label">Correct</div>
            </div>
            <div className="stat">
              <div className="stat-value">{sessionStats.incorrect}</div>
              <div className="stat-label">Incorrect</div>
            </div>
            <div className="stat">
              <div className="stat-value">{streak}</div>
              <div className="stat-label">Best Streak</div>
            </div>
          </div>

          <div className="session-actions">
            <button onClick={startNewSession} className="btn-continue">
              Practice Again
            </button>
            <button onClick={onExit} className="btn-exit">
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vocabulary-trainer">
      {/* Header */}
      <div className="trainer-header">
        <button onClick={onExit} className="btn-close">✕</button>

        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>

        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-icon">🔥</span>
            <span className="stat-number">{streak}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⭐</span>
            <span className="stat-number">{score}</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">❤️</span>
            <span className="stat-number">{lives}</span>
          </div>
        </div>
      </div>

      {/* Exercise */}
      <div className="trainer-content">
        <div className="exercise-counter">
          Question {currentIndex + 1} of {sessionWords.length}
        </div>

        <VocabularyExercise
          word={currentWord}
          exerciseType={currentExerciseType}
          onComplete={handleExerciseComplete}
          onSkip={handleSkip}
        />
      </div>
    </div>
  );
}
