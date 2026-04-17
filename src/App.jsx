import React, { useState, useEffect } from 'react';
import { TimerDisplay } from './components/TimerDisplay';
import { TimerControls } from './components/TimerControls';
import { SessionBadge } from './components/SessionBadge';
import { SessionStats } from './components/SessionStats';
import { SettingsPanel } from './components/SettingsPanel';
import { BackgroundOrbs } from './components/BackgroundOrbs';
import { useTimer } from './hooks/useTimer';
import { useConfig } from './hooks/useConfig';
import { SESSION_DATA_ATTR } from './utils/constants';
import { buildPageTitle, formatTime } from './utils/time';
import { SESSION_LABELS } from './utils/constants';
import styles from './App.module.css';

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);

  const {
    config,
    pendingConfig,
    updatePending,
    applyConfig,
    resetConfig,
    discardPending,
    isDirty,
  } = useConfig();

  const {
    sessionType,
    timeLeft,
    isRunning,
    workSessionsCompleted,
    progress,
    toggle,
    reset,
    resetAll,
    skipSession,
  } = useTimer(config);

  // Update document title with timer countdown
  useEffect(() => {
    document.title = buildPageTitle(formatTime(timeLeft), SESSION_LABELS[sessionType]);
    return () => { document.title = 'Pomodoro Timer'; };
  }, [timeLeft, sessionType]);

  const handleApplySettings = () => {
    applyConfig();
    setSettingsOpen(false);
    resetAll();
  };

  const handleDiscardSettings = () => {
    discardPending();
    setSettingsOpen(false);
  };

  return (
    <div
      className={styles.app}
      data-session={SESSION_DATA_ATTR[sessionType]}
    >
      <BackgroundOrbs sessionType={sessionType} />

      <div className={styles.layout} role="main">
        {/* Header */}
        <header className={styles.header}>
          <div className={styles.logo}>
            <span className={styles.logoMark} aria-hidden="true">◆</span>
            <span className={styles.logoText}>pomodoro</span>
          </div>

          <button
            className={styles.settingsBtn}
            onClick={() => setSettingsOpen(true)}
            aria-label="Open settings"
            aria-expanded={settingsOpen}
          >
            <SettingsIcon />
          </button>
        </header>

        {/* Main timer area */}
        <section
          className={styles.timerSection}
          aria-label="Timer"
        >
          <SessionBadge sessionType={sessionType} />

          <TimerDisplay
            timeLeft={timeLeft}
            progress={progress}
            isRunning={isRunning}
            sessionType={sessionType}
          />

          <TimerControls
            isRunning={isRunning}
            onToggle={toggle}
            onReset={reset}
            onSkip={skipSession}
          />
        </section>

        {/* Stats */}
        <SessionStats
          workSessionsCompleted={workSessionsCompleted}
          sessionsBeforeLongBreak={config.sessionsBeforeLongBreak}
        />
      </div>

      {/* Settings panel */}
      <SettingsPanel
        isOpen={settingsOpen}
        pendingConfig={pendingConfig}
        onUpdate={updatePending}
        onApply={handleApplySettings}
        onDiscard={handleDiscardSettings}
        onReset={resetConfig}
        isDirty={isDirty}
      />
    </div>
  );
}

function SettingsIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}
