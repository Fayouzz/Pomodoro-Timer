import React from 'react';
import { playTickSound } from '../utils/sound';
import styles from './TimerControls.module.css';

export function TimerControls({ isRunning, onToggle, onReset, onSkip }) {
  const handleToggle = () => {
    playTickSound();
    onToggle();
  };

  const handleReset = () => {
    playTickSound();
    onReset();
  };

  const handleSkip = () => {
    playTickSound();
    onSkip();
  };

  return (
    <div className={styles.controls} role="group" aria-label="Timer controls">
      {/* Secondary: Reset */}
      <button
        className={`${styles.btn} ${styles.btnSecondary}`}
        onClick={handleReset}
        aria-label="Reset current session"
        title="Reset"
      >
        <ResetIcon />
      </button>

      {/* Primary: Play / Pause */}
      <button
        className={`${styles.btn} ${styles.btnPrimary}`}
        onClick={handleToggle}
        aria-label={isRunning ? 'Pause timer' : 'Start timer'}
        aria-pressed={isRunning}
      >
        {isRunning ? <PauseIcon /> : <PlayIcon />}
      </button>

      {/* Secondary: Skip */}
      <button
        className={`${styles.btn} ${styles.btnSecondary}`}
        onClick={handleSkip}
        aria-label="Skip to next session"
        title="Skip"
      >
        <SkipIcon />
      </button>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <rect x="6" y="4" width="4" height="16" rx="1" />
      <rect x="14" y="4" width="4" height="16" rx="1" />
    </svg>
  );
}

function ResetIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="1 4 1 10 7 10" />
      <path d="M3.51 15a9 9 0 1 0 .49-4.95" />
    </svg>
  );
}

function SkipIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <polygon points="5,4 15,12 5,20" />
      <rect x="17" y="4" width="2.5" height="16" rx="1" />
    </svg>
  );
}
