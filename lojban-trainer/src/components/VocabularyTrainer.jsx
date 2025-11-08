import { useState, useEffect } from 'react';
import LevelSelection from './LevelSelection';
import VocabularyExercise from './VocabularyExercise';
import GrammarCard from './GrammarCard';
import { getLevelById, vocabularyLevels, isLevelUnlocked, generateSentences, getWordsForLevel } from '../utils/vocabularyLevels';
import './VocabularyTrainer.css';

export default function VocabularyTrainer({ onExit }) {
  const [currentLevel, setCurrentLevel] = useState(null);
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
  const [levelSelectionKey, setLevelSelectionKey] = useState(0);
  const [showGrammarCard, setShowGrammarCard] = useState(false);
  const [grammarTipToShow, setGrammarTipToShow] = useState(null);
  const [tipsShownThisSession, setTipsShownThisSession] = useState([]);

  const handleSelectLevel = (levelId) => {
    const level = getLevelById(levelId);
    if (!level) return;

    setCurrentLevel(level);
    startLevelSession(level);
  };

  const startLevelSession = (level) => {
    // Build exercise sequence: interleave words with sentence practice
    const words = [...getWordsForLevel(level)];
    const shuffledWords = words.sort(() => Math.random() - 0.5);

    // Create exercises array with words and their types
    const exercises = [];
    const types = [];

    const getExerciseType = (idx) => {
      if (level.id <= 3) {
        // Early levels: only multiple choice
        const beginnerTypes = ['multiple-choice-english', 'multiple-choice-lojban'];
        return beginnerTypes[idx % beginnerTypes.length];
      } else if (level.id <= 6) {
        // Mid levels: add text input
        const midTypes = ['multiple-choice-english', 'multiple-choice-lojban', 'translate-to-english'];
        return midTypes[Math.floor(Math.random() * midTypes.length)];
      } else {
        // Later levels: all exercise types
        const allTypes = ['translate-to-english', 'multiple-choice-lojban', 'multiple-choice-english'];
        return allTypes[Math.floor(Math.random() * allTypes.length)];
      }
    };

    // Strategy: Learn half words, practice with sentences, learn rest, practice more
    const halfPoint = Math.ceil(shuffledWords.length / 2);

    // First half of words
    shuffledWords.slice(0, halfPoint).forEach((word, idx) => {
      exercises.push(word);
      types.push(getExerciseType(idx));
    });

    // Generate and add sentence exercises dynamically
    const generatedSentences = generateSentences(level.id, 6);
    if (generatedSentences.length > 0) {
      const halfSentences = Math.ceil(generatedSentences.length / 2);
      generatedSentences.slice(0, halfSentences).forEach(sentence => {
        exercises.push(sentence);
        types.push('fill-blank');
      });
    }

    // Second half of words
    shuffledWords.slice(halfPoint).forEach((word, idx) => {
      exercises.push(word);
      types.push(getExerciseType(idx + halfPoint));
    });

    // Add remaining sentence exercises
    if (generatedSentences.length > 0) {
      const halfSentences = Math.ceil(generatedSentences.length / 2);
      generatedSentences.slice(halfSentences).forEach(sentence => {
        exercises.push(sentence);
        types.push('fill-blank');
      });
    }

    setSessionWords(exercises);
    setExerciseTypes(types);
    setCurrentIndex(0);
    setLives(3);
    setStreak(0);
    setSessionStats({
      correct: 0,
      incorrect: 0,
      totalXP: 0
    });
    setIsSessionComplete(false);
    setTipsShownThisSession([]); // Reset tips for new session
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

    // Check if we should show a grammar tip after this exercise
    const exerciseNumber = currentIndex + 1;
    if (currentLevel.grammarTips) {
      const tipToShow = currentLevel.grammarTips.find(
        tip => tip.showAfterExercise === exerciseNumber && !tipsShownThisSession.includes(tip.showAfterExercise)
      );

      if (tipToShow) {
        setGrammarTipToShow(tipToShow);
        setShowGrammarCard(true);
        setTipsShownThisSession([...tipsShownThisSession, tipToShow.showAfterExercise]);
        return; // Don't advance yet, will advance when they dismiss the tip
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
      levelProgress: {}
    };

    if (completed) {
      progress.totalXP = (progress.totalXP || 0) + sessionStats.totalXP;
      progress.streak = streak;
      progress.sessionsCompleted = (progress.sessionsCompleted || 0) + 1;

      // Track level progress
      if (!progress.levelProgress) progress.levelProgress = {};
      if (!progress.levelProgress[currentLevel.id]) {
        progress.levelProgress[currentLevel.id] = {
          wordsLearned: 0,
          completed: false
        };
      }

      const levelProg = progress.levelProgress[currentLevel.id];
      const wordCount = getWordsForLevel(currentLevel).length;
      levelProg.wordsLearned = wordCount;
      levelProg.completed = sessionStats.correct >= Math.floor(wordCount * 0.7); // 70% to complete

      localStorage.setItem('vocab-progress', JSON.stringify(progress));
    }
  };

  const handleBackToLevels = () => {
    setCurrentLevel(null);
    setIsSessionComplete(false);
    setLevelSelectionKey(prev => prev + 1); // Force LevelSelection to reload
  };

  const handleGrammarCardContinue = () => {
    setShowGrammarCard(false);
    setGrammarTipToShow(null);

    // Now advance to next exercise
    if (currentIndex < sessionWords.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      // Session complete!
      endSession(true);
    }
  };

  // Show level selection if no level selected
  if (!currentLevel) {
    return <LevelSelection key={levelSelectionKey} onSelectLevel={handleSelectLevel} onExit={onExit} />;
  }

  const currentWord = sessionWords[currentIndex];
  const currentExerciseType = exerciseTypes[currentIndex];
  const progress = ((currentIndex + 1) / sessionWords.length) * 100;

  if (sessionWords.length === 0) {
    return (
      <div className="vocabulary-trainer">
        <div className="loading">Loading level...</div>
      </div>
    );
  }

  if (isSessionComplete) {
    const passed = lives > 0;

    // Get current progress
    const savedProgress = localStorage.getItem('vocab-progress');
    const progress = savedProgress ? JSON.parse(savedProgress) : { totalXP: 0, levelProgress: {} };
    const totalXP = progress.totalXP || 0;
    const levelProgress = progress.levelProgress || {};

    // Find next level
    const nextLevel = vocabularyLevels.find(level => level.id === currentLevel.id + 1);
    const isNextLevelUnlocked = nextLevel && isLevelUnlocked(nextLevel.id, levelProgress);

    return (
      <div className="vocabulary-trainer">
        <div className="session-complete">
          <div className={`result-icon ${passed ? 'passed' : 'failed'}`}>
            {passed ? '🎉' : '😢'}
          </div>
          <h1>{passed ? 'Great Work!' : 'Session Failed'}</h1>
          <p className="level-name">{currentLevel.name}</p>
          <p className="total-xp-display">Total XP: {totalXP}</p>

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
            {nextLevel && (
              <button
                onClick={() => handleSelectLevel(nextLevel.id)}
                className={`btn-next-level ${!isNextLevelUnlocked ? 'locked' : ''}`}
                disabled={!isNextLevelUnlocked}
              >
                {isNextLevelUnlocked
                  ? `Next Level: ${nextLevel.icon} ${nextLevel.name} →`
                  : `🔒 Next Level: ${nextLevel.icon} ${nextLevel.name} (Complete this level first)`
                }
              </button>
            )}
            <button onClick={() => startLevelSession(currentLevel)} className="btn-continue">
              Practice Again
            </button>
            <button onClick={handleBackToLevels} className="btn-secondary">
              Choose Level
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
        <button onClick={handleBackToLevels} className="btn-close">✕</button>

        <div className="level-badge">
          <span className="level-icon-small">{currentLevel.icon}</span>
          <span className="level-name-small">{currentLevel.name}</span>
        </div>

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
          Word {currentIndex + 1} of {sessionWords.length}
        </div>

        <VocabularyExercise
          word={currentWord}
          exerciseType={currentExerciseType}
          levelId={currentLevel.id}
          onComplete={handleExerciseComplete}
          onSkip={handleSkip}
        />
      </div>

      {/* Grammar Card - shown after completing a level */}
      {showGrammarCard && grammarTipToShow && (
        <GrammarCard tip={grammarTipToShow} onContinue={handleGrammarCardContinue} />
      )}
    </div>
  );
}
