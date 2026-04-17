/**
 * sound.js — Web Audio API based notification sounds.
 * No external assets required; synthesized in-browser.
 */

let audioCtx = null;

function getAudioContext() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
}

/**
 * Plays a pleasant multi-tone chime to signal session end.
 * Uses additive synthesis: sine waves + a soft attack/release envelope.
 */
export function playSessionEndSound() {
  try {
    const ctx = getAudioContext();

    // Resume in case context was suspended (browser autoplay policy)
    if (ctx.state === 'suspended') ctx.resume();

    const now = ctx.currentTime;

    // Three-note ascending arpeggio
    const notes = [
      { freq: 523.25, delay: 0,    duration: 0.5 },  // C5
      { freq: 659.25, delay: 0.18, duration: 0.5 },  // E5
      { freq: 783.99, delay: 0.36, duration: 0.8 },  // G5
    ];

    notes.forEach(({ freq, delay, duration }) => {
      const osc  = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + delay);

      // Soft attack, sustain, gentle release
      gain.gain.setValueAtTime(0, now + delay);
      gain.gain.linearRampToValueAtTime(0.18, now + delay + 0.05);
      gain.gain.setValueAtTime(0.15, now + delay + duration - 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + delay + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + delay);
      osc.stop(now + delay + duration);
    });
  } catch (err) {
    // Audio unavailable — fail silently
    console.warn('Audio playback failed:', err);
  }
}

/**
 * Short single tick for UI feedback (button press).
 */
export function playTickSound() {
  try {
    const ctx = getAudioContext();
    if (ctx.state === 'suspended') ctx.resume();

    const now  = ctx.currentTime;
    const osc  = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    /* noop */
  }
}
