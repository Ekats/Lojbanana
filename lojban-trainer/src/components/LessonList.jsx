import { lessons } from '../lessons/lessons';
import './LessonList.css';

export default function LessonList({ onSelectLesson, progress }) {
  const getLessonProgress = (lessonId) => {
    if (!progress || !progress[lessonId]) {
      return 0;
    }
    const lesson = lessons.find(l => l.id === lessonId);
    if (!lesson) return 0;

    const completedExercises = Object.keys(progress[lessonId]).length;
    const totalExercises = lesson.exercises.length;
    return Math.round((completedExercises / totalExercises) * 100);
  };

  return (
    <div className="lesson-list">
      <div className="lesson-list-header">
        <h1>Lojban Logic Trainer</h1>
        <p className="tagline">Learn Lojban as a formal logic system</p>
      </div>

      <div className="intro-section">
        <h2>What is this?</h2>
        <p>
          This app teaches <strong>Lojban</strong> - not as a natural language,
          but as a <strong>speakable formal logic system</strong>.
        </p>
        <p>
          Think of it like learning programming: predicates are functions,
          arguments are parameters, and logical connectives are boolean operators.
        </p>
        <div className="features">
          <div className="feature">
            <span className="feature-icon">🎯</span>
            <div>
              <strong>Zero Ambiguity</strong>
              <p>Every sentence has exactly one parse</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <div>
              <strong>Explicit Logic</strong>
              <p>All logical relationships are marked</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🤖</span>
            <div>
              <strong>Machine-Parseable</strong>
              <p>Perfect for human-AI communication</p>
            </div>
          </div>
          <div className="feature">
            <span className="feature-icon">🧠</span>
            <div>
              <strong>First-Order Logic</strong>
              <p>Express formal logic in natural speech</p>
            </div>
          </div>
        </div>
      </div>

      <div className="lessons-section">
        <h2>Curriculum</h2>
        <div className="lessons-grid">
          {lessons.map((lesson) => {
            const progressPercent = getLessonProgress(lesson.id);
            const isStarted = progressPercent > 0;
            const isComplete = progressPercent === 100;

            return (
              <div
                key={lesson.id}
                className={`lesson-card ${isStarted ? 'started' : ''} ${isComplete ? 'complete' : ''}`}
                onClick={() => onSelectLesson(lesson.id)}
              >
                <div className="lesson-number">
                  {isComplete ? '✓' : lesson.id}
                </div>
                <div className="lesson-info">
                  <h3>{lesson.title}</h3>
                  <p>{lesson.description}</p>
                  {isStarted && (
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progressPercent}%` }}
                      />
                      <span className="progress-text">{progressPercent}%</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="getting-started">
        <h2>Ready to start?</h2>
        <p>Click on "Introduction: What is Lojban?" above to begin your journey into logical precision.</p>
        <p className="note">
          <strong>Note:</strong> This app focuses on teaching Lojban as a logic system,
          not conversational fluency. You'll learn to express precise, unambiguous
          statements - perfect for specs, requirements, and formal reasoning.
        </p>
      </div>
    </div>
  );
}
