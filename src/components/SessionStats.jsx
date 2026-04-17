import React from 'react';
import styles from './SessionStats.module.css';

export function SessionStats({ workSessionsCompleted, sessionsBeforeLongBreak }) {
  const dotsTotal = sessionsBeforeLongBreak;
  const dotsFilled = workSessionsCompleted % sessionsBeforeLongBreak;
  const fullCycles = Math.floor(workSessionsCompleted / sessionsBeforeLongBreak);

  return (
    <section
      className={styles.stats}
      aria-label="Session progress"
    >
      {/* Pomodoro dots */}
      <div className={styles.dotsRow} role="group" aria-label={`${dotsFilled} of ${dotsTotal} sessions in current cycle`}>
        {Array.from({ length: dotsTotal }).map((_, i) => (
          <span
            key={i}
            className={`${styles.dot} ${i < dotsFilled ? styles.dotFilled : ''}`}
            aria-hidden="true"
          />
        ))}
      </div>

      {/* Counters */}
      <div className={styles.counters}>
        <div className={styles.counter}>
          <span className={styles.counterValue}>{workSessionsCompleted}</span>
          <span className={styles.counterLabel}>sessions</span>
        </div>

        <div className={styles.divider} aria-hidden="true" />

        <div className={styles.counter}>
          <span className={styles.counterValue}>{fullCycles}</span>
          <span className={styles.counterLabel}>cycles</span>
        </div>
      </div>

      {/* Screen-reader summary */}
      <p className="sr-only" aria-live="polite">
        {workSessionsCompleted} work session{workSessionsCompleted !== 1 ? 's' : ''} completed.
        {fullCycles > 0 ? ` ${fullCycles} full cycle${fullCycles !== 1 ? 's' : ''}.` : ''}
      </p>
    </section>
  );
}
