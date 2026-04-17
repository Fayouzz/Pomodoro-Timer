import { useState, useCallback } from 'react';
import { DEFAULT_CONFIG, CONFIG_LIMITS } from '../utils/constants';

const STORAGE_KEY = 'pomodoro-config';

function loadConfig() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    return { ...DEFAULT_CONFIG, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_CONFIG;
  }
}

/**
 * useConfig — manages user-configurable timer intervals.
 * Persists settings to localStorage.
 */
export function useConfig() {
  const [config, setConfig] = useState(loadConfig);
  const [pendingConfig, setPendingConfig] = useState(loadConfig);

  const updatePending = useCallback((key, value) => {
    const clamped = Math.min(
      Math.max(Number(value), CONFIG_LIMITS[key].min),
      CONFIG_LIMITS[key].max
    );
    setPendingConfig((prev) => ({ ...prev, [key]: clamped }));
  }, []);

  const applyConfig = useCallback(() => {
    setConfig(pendingConfig);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pendingConfig));
    } catch {
      // localStorage unavailable — silently ignore
    }
    return pendingConfig;
  }, [pendingConfig]);

  const resetConfig = useCallback(() => {
    setConfig(DEFAULT_CONFIG);
    setPendingConfig(DEFAULT_CONFIG);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch { /* noop */ }
  }, []);

  const discardPending = useCallback(() => {
    setPendingConfig(config);
  }, [config]);

  const isDirty = JSON.stringify(config) !== JSON.stringify(pendingConfig);

  return {
    config,
    pendingConfig,
    updatePending,
    applyConfig,
    resetConfig,
    discardPending,
    isDirty,
  };
}
