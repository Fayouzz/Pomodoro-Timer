import React, { useMemo } from 'react';
import { formatTime, formatTimeVerbose } from '../utils/time';
import styles from './TimerDisplay.module.css';

const RADIUS = 130;
const STROKE  = 6;
const SIZE    = (RADIUS + STROKE) * 2 + 16; // canvas size
const CX      = SIZE / 2;
const CY      = SIZE / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function TimerDisplay({ timeLeft, progress, isRunning, sessionType }) {
  const timeStr      = formatTime(timeLeft);
  const verboseLabel = formatTimeVerbose(timeLeft);

  const dashOffset = useMemo(
    () => CIRCUMFERENCE * (1 - progress),
    [progress]
  );

  return (
    <div className={styles.wrapper}>
      <svg
        className={styles.ring}
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        aria-hidden="true"
        role="presentation"
      >
        {/* Definitions */}
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Track ring */}
        <circle
          cx={CX} cy={CY} r={RADIUS}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth={STROKE}
        />

        {/* Progress arc */}
        <circle
          className={styles.progressArc}
          cx={CX} cy={CY} r={RADIUS}
          fill="none"
          stroke="var(--accent-current)"
          strokeWidth={STROKE}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${CX} ${CY})`}
          filter="url(#glow)"
        />

        {/* Dot at arc end */}
        {progress > 0.01 && (
          <DotOnArc
            progress={progress}
            cx={CX} cy={CY} r={RADIUS}
          />
        )}
      </svg>

      {/* Time text (center) */}
      <div
        className={`${styles.timeDisplay} ${isRunning ? styles.running : ''}`}
        aria-live="off"
        aria-label={`Time remaining: ${verboseLabel}`}
        role="timer"
      >
        <span className={styles.timeText}>{timeStr}</span>
      </div>
    </div>
  );
}

/** Small glowing dot that travels along the arc */
function DotOnArc({ progress, cx, cy, r }) {
  const angle = (progress * 360 - 90) * (Math.PI / 180);
  const x     = cx + r * Math.cos(angle);
  const y     = cy + r * Math.sin(angle);

  return (
    <circle
      cx={x} cy={y} r={5}
      fill="var(--accent-current)"
      filter="url(#glow)"
      className="dotAnim"
    />
  );
}
