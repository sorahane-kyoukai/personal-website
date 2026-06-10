/**
 * Application-wide constants.
 * Centralizes magic numbers used across components.
 */

// ── Scroll & Header ──────────────────────────────────────────────

/** Scroll position (px) at which the header gets its scrolled style. */
export const HEADER_SCROLL_THRESHOLD = 50;

/** Minimum scroll distance (px) before header auto-hides. */
export const HEADER_HIDE_THRESHOLD = 100;

/** Scroll position (px) before reading progress bar becomes visible. */
export const READING_PROGRESS_VISIBILITY_THRESHOLD = 300;

// ── Animation Timing (ms) ─────────────────────────────────────────

/** Duration for copy-to-clipboard success feedback. */
export const COPY_FEEDBACK_DURATION_MS = 2000;

// ── Canvas Particles ──────────────────────────────────────────────

/** Pixel area per star particle (lower = denser). */
export const STAR_DENSITY_PX_PER_PARTICLE = 12000;

/** Minimum frames between meteor spawns. */
export const METEOR_SPAWN_MIN_FRAMES = 60;
