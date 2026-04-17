/** Session type identifiers */
export const SESSION_TYPES = Object.freeze({
  WORK:        'work',
  SHORT_BREAK: 'short',
  LONG_BREAK:  'long',
});

/** Human-readable session labels */
export const SESSION_LABELS = Object.freeze({
  [SESSION_TYPES.WORK]:        'Focus',
  [SESSION_TYPES.SHORT_BREAK]: 'Short Break',
  [SESSION_TYPES.LONG_BREAK]:  'Long Break',
});

/** Default timer configuration (in minutes) */
export const DEFAULT_CONFIG = Object.freeze({
  work:                    25,
  shortBreak:               5,
  longBreak:               15,
  sessionsBeforeLongBreak:  4,
});

/** Min/max constraints for config fields */
export const CONFIG_LIMITS = Object.freeze({
  work:                    { min: 1,  max: 90 },
  shortBreak:              { min: 1,  max: 30 },
  longBreak:               { min: 1,  max: 60 },
  sessionsBeforeLongBreak: { min: 2,  max: 8  },
});

/** CSS data-session attribute mapping */
export const SESSION_DATA_ATTR = Object.freeze({
  [SESSION_TYPES.WORK]:        'work',
  [SESSION_TYPES.SHORT_BREAK]: 'short',
  [SESSION_TYPES.LONG_BREAK]:  'long',
});
