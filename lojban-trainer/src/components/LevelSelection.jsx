import { useState, useEffect } from 'react';
import { vocabularyLevels, isLevelUnlocked } from '../utils/vocabularyLevels';
import './LevelSelection.css';

export default function LevelSelection({ onSelectLevel, onExit }) {
  const [totalXP, setTotalXP] = useState(0);
  const [levelProgress, setLevelProgress] = useState({});

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem('vocab-progress');
    if (savedProgress) {
      try {
        const progress = JSON.parse(savedProgress);
        setTotalXP(progress.totalXP || 0);
        setLevelProgress(progress.levelProgress || {});
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  const getLevelStatus = (level) => {
    const unlocked = isLevelUnlocked(level.id, totalXP);
    const progress = levelProgress[level.id];

    if (!unlocked) {
      return { status: 'locked', label: `🔒 ${level.requiredXP} XP needed` };
    }

    if (progress && progress.completed) {
      return { status: 'completed', label: '✓ Completed' };
    }

    if (progress && progress.wordsLearned > 0) {
      const percent = Math.round((progress.wordsLearned / level.words.length) * 100);
      return { status: 'in-progress', label: `${percent}% complete` };
    }

    return { status: 'available', label: 'Start' };
  };

  return (
    <div className="level-selection">
      <div className="level-selection-header">
        <button onClick={onExit} className="btn-back">← Back</button>
        <h1>Choose a Level</h1>
        <div className="xp-display">
          <span className="xp-icon">⭐</span>
          <span className="xp-amount">{totalXP} XP</span>
        </div>
      </div>

      <div className="levels-container">
        {vocabularyLevels.map((level) => {
          const { status, label } = getLevelStatus(level);
          const unlocked = status !== 'locked';

          return (
            <div
              key={level.id}
              className={`level-card ${status}`}
              onClick={() => unlocked && onSelectLevel(level.id)}
              style={{ cursor: unlocked ? 'pointer' : 'not-allowed' }}
            >
              <div className="level-icon">{level.icon}</div>
              <div className="level-info">
                <div className="level-header">
                  <h3>{level.name}</h3>
                  <div className="level-number">Level {level.id}</div>
                </div>
                <p className="level-description">{level.description}</p>
                <div className="level-meta">
                  <span className="word-count">{level.words.length} words</span>
                  <span className="level-status-label">{label}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="level-selection-footer">
        <div className="progress-summary">
          <h3>Your Progress</h3>
          <div className="summary-stats">
            <div className="stat">
              <div className="stat-value">{Object.keys(levelProgress).filter(id => levelProgress[id]?.completed).length}</div>
              <div className="stat-label">Levels Completed</div>
            </div>
            <div className="stat">
              <div className="stat-value">{totalXP}</div>
              <div className="stat-label">Total XP</div>
            </div>
            <div className="stat">
              <div className="stat-value">
                {vocabularyLevels.filter(l => isLevelUnlocked(l.id, totalXP)).length}
              </div>
              <div className="stat-label">Levels Unlocked</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
