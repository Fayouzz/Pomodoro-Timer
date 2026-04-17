import { useState, useEffect, useRef, useCallback } from 'react';
import { SESSION_TYPES, DEFAULT_CONFIG } from '../utils/constants';
import { playSessionEndSound } from '../utils/sound';

/**
 * useTimer — core state machine for the Pomodoro timer.
 * Manages countdown, session transitions, and work-session tracking.
 */
export function useTimer(config = DEFAULT_CONFIG) {
  const [sessionType, setSessionType] = useState(SESSION_TYPES.WORK);
  const [timeLeft, setTimeLeft] = useState(config.work * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [workSessionsCompleted, setWorkSessionsCompleted] = useState(0);
  const [cycleCount, setCycleCount] = useState(0); // full pomodoro cycles

  const intervalRef = useRef(null);
  const configRef = useRef(config);

  // Keep config ref in sync
  useEffect(() => {
    configRef.current = config;
  }, [config]);

  /** Derive duration (seconds) for a given session type */
  const getDuration = useCallback((type, cfg = configRef.current) => {
    switch (type) {
      case SESSION_TYPES.WORK:        return cfg.work * 60;
      case SESSION_TYPES.SHORT_BREAK: return cfg.shortBreak * 60;
      case SESSION_TYPES.LONG_BREAK:  return cfg.longBreak * 60;
      default: return cfg.work * 60;
    }
  }, []);

  /** Advance to the next session in the Pomodoro sequence */
  const advanceSession = useCallback((currentType, currentWorkSessions) => {
    let nextType;
    let nextWorkSessions = currentWorkSessions;
    let nextCycleCount;

    if (currentType === SESSION_TYPES.WORK) {
      const newCount = currentWorkSessions + 1;
      nextWorkSessions = newCount;

      if (newCount % configRef.current.sessionsBeforeLongBreak === 0) {
        nextType = SESSION_TYPES.LONG_BREAK;
        nextCycleCount = (c) => c + 1;
      } else {
        nextType = SESSION_TYPES.SHORT_BREAK;
        nextCycleCount = (c) => c;
      }
    } else {
      nextType = SESSION_TYPES.WORK;
      nextCycleCount = (c) => c;
    }

    return { nextType, nextWorkSessions, nextCycleCount };
  }, []);

  /** Tick — called every second when running */
  useEffect(() => {
    if (!isRunning) return;

    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Session complete
          clearInterval(intervalRef.current);
          playSessionEndSound();

          setSessionType((currentType) => {
            setWorkSessionsCompleted((currentWork) => {
              const { nextType, nextWorkSessions } = advanceSession(currentType, currentWork);

              // Schedule next session start (slight delay for UX)
              setTimeout(() => {
                setSessionType(nextType);
                setTimeLeft(getDuration(nextType));
                setIsRunning(false); // pause between sessions — user confirms
              }, 0);

              return nextWorkSessions;
            });
            return currentType; // temporary; will be overwritten in setTimeout
          });

          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(intervalRef.current);
  }, [isRunning, advanceSession, getDuration]);

  /** When config changes and timer is not running, reset timeLeft for current session */
  useEffect(() => {
    if (!isRunning) {
      setTimeLeft(getDuration(sessionType, config));
    }
  }, [config, sessionType, getDuration, isRunning]);

  // ── Public API ──────────────────────────────────────────────

  const start = useCallback(() => setIsRunning(true), []);
  const pause = useCallback(() => setIsRunning(false), []);
  const toggle = useCallback(() => setIsRunning((r) => !r), []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(getDuration(sessionType));
  }, [sessionType, getDuration]);

  const resetAll = useCallback(() => {
    setIsRunning(false);
    setSessionType(SESSION_TYPES.WORK);
    setTimeLeft(getDuration(SESSION_TYPES.WORK));
    setWorkSessionsCompleted(0);
    setCycleCount(0);
  }, [getDuration]);

  const skipSession = useCallback(() => {
    setIsRunning(false);
    setSessionType((currentType) => {
      setWorkSessionsCompleted((currentWork) => {
        const { nextType, nextWorkSessions } = advanceSession(currentType, currentWork);
        setTimeout(() => {
          setSessionType(nextType);
          setTimeLeft(getDuration(nextType));
        }, 0);
        return nextWorkSessions;
      });
      return currentType;
    });
  }, [advanceSession, getDuration]);

  /** Progress 0–1 for the circular ring */
  const totalDuration = getDuration(sessionType);
  const progress = totalDuration > 0 ? (totalDuration - timeLeft) / totalDuration : 0;

  return {
    sessionType,
    timeLeft,
    isRunning,
    workSessionsCompleted,
    cycleCount,
    progress,
    start,
    pause,
    toggle,
    reset,
    resetAll,
    skipSession,
  };
}
