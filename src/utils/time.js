/**
 * Formats seconds into MM:SS display string.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Returns a human-readable time label for accessibility.
 * @param {number} totalSeconds
 * @returns {string}
 */
export function formatTimeVerbose(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const parts = [];
  if (minutes > 0) parts.push(`${minutes} minute${minutes !== 1 ? 's' : ''}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds !== 1 ? 's' : ''}`);
  return parts.join(' and ') || '0 seconds';
}

/**
 * Returns an appropriate document title string.
 * @param {string} timeStr
 * @param {string} sessionLabel
 * @returns {string}
 */
export function buildPageTitle(timeStr, sessionLabel) {
  return `${timeStr} — ${sessionLabel} | Pomodoro`;
}
