/**
 * Time formatting utility - Framework agnostic
 */

/**
 * Formats milliseconds into MM:SS format
 * @param {number} ms - Time in milliseconds
 * @returns {string} Formatted time string (MM:SS)
 */
export const formatTime = (ms) => {
  const minutes = Math.floor(ms / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

