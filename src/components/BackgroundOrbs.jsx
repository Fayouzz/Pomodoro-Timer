import React from 'react';
import { SESSION_TYPES } from '../utils/constants';
import styles from './BackgroundOrbs.module.css';

export function BackgroundOrbs({ sessionType }) {
  return (
    <div className={styles.orbs} aria-hidden="true">
      <div className={`${styles.orb} ${styles.orb1}`} data-session={sessionType} />
      <div className={`${styles.orb} ${styles.orb2}`} data-session={sessionType} />
      <div className={`${styles.orb} ${styles.orb3}`} />
      <div className={styles.noise} />
    </div>
  );
}
