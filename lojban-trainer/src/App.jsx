import { useState, useEffect } from 'react';
import LessonList from './components/LessonList';
import LessonView from './components/LessonView';
import { getLessonById } from './lessons/lessons';
import './App.css';

function App() {
  const [currentLessonId, setCurrentLessonId] = useState(null);
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
      </nav>

      <main className="app-main">
        {!currentLesson ? (
          <LessonList
            onSelectLesson={handleSelectLesson}
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
