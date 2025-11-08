import { useState, useEffect } from 'react';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import VocabularyTrainer from './components/VocabularyTrainer';
import { getLessonById } from './lessons/lessons';
import './App.css';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(null);
  const [showVocabulary, setShowVocabulary] = useState(false);
  const [progress, setProgress] = useState({});

  // Load progress from localStorage
  useEffect(() => {
    const savedProgress = localStorage.getItem('lojban-progress');
    if (savedProgress) {
      try {
        setProgress(JSON.parse(savedProgress));
      } catch (e) {
        console.error('Failed to load progress:', e);
      }
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    if (Object.keys(progress).length > 0) {
      localStorage.setItem('lojban-progress', JSON.stringify(progress));
    }
  }, [progress]);

  const handleSelectLesson = (lessonId) => {
    setCurrentLessonId(lessonId);
  };

  const handleNavigateToHome = () => {
    setCurrentLessonId(null);
    setShowVocabulary(false);
  };

  const handleStartVocabulary = () => {
    setCurrentLessonId(null);
    setShowVocabulary(true);
  };

  const handleProgress = (lessonId, exerciseIndex, answer) => {
    setProgress((prev) => ({
      ...prev,
      [lessonId]: {
        ...prev[lessonId],
        [exerciseIndex]: {
          completed: true,
          answer,
          timestamp: new Date().toISOString()
        }
      }
    }));
  };

  const handleClearData = async () => {
    if (window.confirm('Clear all progress and cached data? This cannot be undone!')) {
      // Clear localStorage
      localStorage.clear();

      // Clear service worker caches
      if ('caches' in window) {
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
      }

      // Reload the page
      window.location.reload();
    }
  };

  const currentLesson = currentLessonId ? getLessonById(currentLessonId) : null;

  return (
    <div className="app">
      <nav className="app-nav">
        <button onClick={handleNavigateToHome} className="home-btn">
          🏠 Lojban Logic Trainer
        </button>
        {currentLesson && (
          <div className="breadcrumb">
            <span className="separator">›</span>
            <span className="current-lesson">{currentLesson.title}</span>
          </div>
        )}
        {showVocabulary && (
          <div className="breadcrumb">
            <span className="separator">›</span>
            <span className="current-lesson">Vocabulary Practice</span>
          </div>
        )}
        <button onClick={handleClearData} className="clear-data-btn" title="Clear all progress and cache">
          🗑️ Clear Data
        </button>
      </nav>

      <main className="app-main">
        {showVocabulary ? (
          <VocabularyTrainer onExit={handleNavigateToHome} />
        ) : !currentLesson ? (
          <LessonList
            onSelectLesson={handleSelectLesson}
            onStartVocabulary={handleStartVocabulary}
            progress={progress}
          />
        ) : (
          <LessonView
            lesson={currentLesson}
            onNavigate={handleSelectLesson}
            progress={progress}
            onProgress={handleProgress}
          />
        )}
      </main>

      <footer className="app-footer">
        <p>
          Lojban Logic Trainer - Teaching Lojban as a formal logic system
        </p>
        <p className="footer-note">
          Built to teach Lojban like programming: predicates as functions,
          arguments as parameters, logic as boolean operators.
        </p>
      </footer>
    </div>
  );
}

export default App;
