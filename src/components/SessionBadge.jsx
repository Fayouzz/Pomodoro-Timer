import React from 'react';
import { SESSION_LABELS } from '../utils/constants';
import styles from './SessionBadge.module.css';

export function SessionBadge({ sessionType }) {
  const label = SESSION_LABELS[sessionType];

  return (
    <div
      className={styles.badge}
      role="status"
      aria-live="polite"
      aria-label={`Current session: ${label}`}
    >
      <span className={styles.dot} aria-hidden="true" />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
