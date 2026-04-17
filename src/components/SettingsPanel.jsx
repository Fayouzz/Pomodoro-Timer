import React, { useEffect, useRef } from 'react';
import { CONFIG_LIMITS } from '../utils/constants';
import styles from './SettingsPanel.module.css';

const FIELDS = [
  { key: 'work',                    label: 'Focus Duration',     unit: 'min', description: 'Length of each work session' },
  { key: 'shortBreak',              label: 'Short Break',        unit: 'min', description: 'Length of each short break' },
  { key: 'longBreak',               label: 'Long Break',         unit: 'min', description: 'Length of the long break after a full cycle' },
  { key: 'sessionsBeforeLongBreak', label: 'Sessions per Cycle', unit: '',    description: 'Number of focus sessions before a long break' },
];

export function SettingsPanel({
  isOpen,
  pendingConfig,
  onUpdate,
  onApply,
  onDiscard,
  onReset,
  isDirty,
}) {
  const panelRef    = useRef(null);
  const firstInputRef = useRef(null);

  // Focus trap + scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => firstInputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape' && isOpen) onDiscard(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onDiscard]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
        onClick={onDiscard}
        aria-hidden="true"
      />

      {/* Panel */}
      <aside
        ref={panelRef}
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Timer settings"
        aria-hidden={!isOpen}
      >
        <div className={styles.panelHeader}>
          <h2 className={styles.title}>Settings</h2>
          <button
            className={styles.closeBtn}
            onClick={onDiscard}
            aria-label="Close settings"
          >
            <CloseIcon />
          </button>
        </div>

        <div className={styles.body}>
          <p className={styles.subtitle}>
            Changing settings will reset the current timer.
          </p>

          <div className={styles.fields}>
            {FIELDS.map((field, idx) => (
              <SettingsField
                key={field.key}
                {...field}
                value={pendingConfig[field.key]}
                limits={CONFIG_LIMITS[field.key]}
                onChange={(val) => onUpdate(field.key, val)}
                inputRef={idx === 0 ? firstInputRef : undefined}
              />
            ))}
          </div>
        </div>

        <div className={styles.footer}>
          <button
            className={styles.resetBtn}
            onClick={onReset}
            aria-label="Reset settings to defaults"
          >
            Reset defaults
          </button>

          <div className={styles.footerActions}>
            <button
              className={styles.cancelBtn}
              onClick={onDiscard}
            >
              Cancel
            </button>
            <button
              className={styles.applyBtn}
              onClick={onApply}
              aria-label="Apply settings and restart timer"
            >
              Apply
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

function SettingsField({ key, label, unit, description, value, limits, onChange, inputRef }) {
  const id = `setting-${label.toLowerCase().replace(/\s+/g, '-')}`;

  const handleChange = (e) => {
    const raw = e.target.value;
    if (raw === '' || /^\d+$/.test(raw)) onChange(raw === '' ? limits.min : parseInt(raw, 10));
  };

  const handleBlur = (e) => {
    const num = parseInt(e.target.value, 10) || limits.min;
    onChange(Math.min(Math.max(num, limits.min), limits.max));
  };

  const decrement = () => onChange(Math.max(value - 1, limits.min));
  const increment = () => onChange(Math.min(value + 1, limits.max));

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.fieldLabel}>
        {label}
        {unit && <span className={styles.fieldUnit}>{unit}</span>}
      </label>
      {description && (
        <p id={`${id}-desc`} className={styles.fieldDesc}>{description}</p>
      )}
      <div className={styles.stepper} role="group" aria-label={`${label} stepper`}>
        <button
          className={styles.stepBtn}
          onClick={decrement}
          aria-label={`Decrease ${label}`}
          disabled={value <= limits.min}
        >−</button>
        <input
          ref={inputRef}
          id={id}
          type="number"
          className={styles.numberInput}
          value={value}
          min={limits.min}
          max={limits.max}
          onChange={handleChange}
          onBlur={handleBlur}
          aria-describedby={description ? `${id}-desc` : undefined}
          aria-label={label}
        />
        <button
          className={styles.stepBtn}
          onClick={increment}
          aria-label={`Increase ${label}`}
          disabled={value >= limits.max}
        >+</button>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}
