/**
 * letter-points.js — Generates 3D point cloud coordinates for letters R O O H I
 * Used for particle reveal animation when all constellation nodes are unlocked.
 */

/**
 * Generate a point cloud for a single letter using a simple grid-based approach
 * Each letter is defined as a 2D pattern, then expanded to 3D with some Z variation
 */

const LETTER_PATTERNS = {
  R: `
    ●●●●
    ●   ●
    ●●●●
    ●  ●
    ●   ●
  `,
  O: `
    ●●●●
    ●   ●
    ●   ●
    ●   ●
    ●●●●
  `,
  O2: `
    ●●●●
    ●   ●
    ●   ●
    ●   ●
    ●●●●
  `,
  H: `
    ●   ●
    ●   ●
    ●●●●
    ●   ●
    ●   ●
  `,
  I: `
    ●●●●
      ●
      ●
      ●
    ●●●●
  `,
};

/**
 * Parse a letter pattern string and return array of [x, y] coordinates
 * @param {string} pattern - ASCII art pattern with ● for points
 * @param {number} offsetX - Horizontal offset for this letter
 * @returns {Array<[number, number]>} Array of [x, y] grid coordinates
 */
function parseLetterPattern(pattern, offsetX = 0) {
  const lines = pattern.trim().split('\n');
  const points = [];

  lines.forEach((line, y) => {
    for (let x = 0; x < line.length; x++) {
      if (line[x] === '●') {
        points.push([offsetX + x * 0.6, -y * 0.6]);
      }
    }
  });

  return points;
}

/**
 * Generate full 3D point cloud for "ROOHI"
 * @param {number} particleCount - Total particles to distribute across all letters
 * @returns {Array<[number, number, number]>} Array of [x, y, z] coordinates
 */
export function generateROOHIPoints(particleCount = 500) {
  const letterOffsets = {
    R: 0,
    O: 4.5,
    O2: 9,
    H: 13.5,
    I: 18,
  };

  const all2DPoints = [];

  // Parse all letter patterns
  Object.entries(LETTER_PATTERNS).forEach(([letter, pattern]) => {
    const offset = letterOffsets[letter];
    const points = parseLetterPattern(pattern, offset);
    all2DPoints.push(...points);
  });

  // Calculate how many times to repeat the pattern to get desired particle count
  const pointsPerPattern = all2DPoints.length;
  const repetitions = Math.ceil(particleCount / pointsPerPattern);

  // Generate 3D points by repeating the 2D pattern with Z variation
  const points3D = [];
  for (let rep = 0; rep < repetitions && points3D.length < particleCount; rep++) {
    all2DPoints.forEach(([x, y]) => {
      if (points3D.length < particleCount) {
        const z = (Math.random() - 0.5) * 4; // Slight Z variation for depth
        points3D.push([x, y, z]);
      }
    });
  }

  return points3D.slice(0, particleCount);
}

/**
 * Scale letter points for mobile (fewer particles but still readable)
 * @param {number} baseCount - Base particle count for desktop
 * @returns {number} Scaled count for mobile
 */
export function getParticleCountForScreen(baseCount = 500) {
  if (typeof window === 'undefined') return baseCount;
  const isMobile = window.innerWidth < 768;
  return isMobile ? Math.floor(baseCount * 0.5) : baseCount;
}

/**
 * Center the letter points around origin (0, 0, 0)
 * @param {Array<[number, number, number]>} points
 * @returns {Array<[number, number, number]>}
 */
export function centerPoints(points) {
  if (points.length === 0) return points;

  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  points.forEach(([x, y, z]) => {
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, x);
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
    minZ = Math.min(minZ, z);
    maxZ = Math.max(maxZ, z);
  });

  const centerX = (minX + maxX) / 2;
  const centerY = (minY + maxY) / 2;
  const centerZ = (minZ + maxZ) / 2;

  return points.map(([x, y, z]) => [x - centerX, y - centerY, z - centerZ]);
}
