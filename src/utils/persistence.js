/**
 * Utility functions for persisting workout data to localStorage
 */

const STORAGE_KEY = 'move_workout_data';

/**
 * Load persisted workout data from localStorage
 * @returns {Object|null} The persisted workout data or null if not found
 */
export const loadWorkoutData = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading workout data from localStorage:', error);
  }
  return null;
};

/**
 * Save workout data to localStorage
 * @param {Object} workoutData - The workout data to persist
 */
export const saveWorkoutData = (workoutData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workoutData));
  } catch (error) {
    console.error('Error saving workout data to localStorage:', error);
  }
};

/**
 * Merge persisted data with default data, ensuring all required fields exist
 * @param {Object} persistedData - Data loaded from localStorage
 * @param {Object} defaultData - Default workout data structure
 * @returns {Object} Merged workout data
 */
export const mergeWorkoutData = (persistedData, defaultData) => {
  if (!persistedData) {
    return defaultData;
  }

  const merged = { ...defaultData };
  
  // Merge each day's data, ensuring all required fields exist
  Object.keys(defaultData).forEach((day) => {
    if (persistedData[day]) {
      merged[day] = {
        ...defaultData[day],
        ...persistedData[day],
        // Ensure required fields exist
        hardReps: persistedData[day].hardReps ?? defaultData[day].hardReps,
        easyReps: persistedData[day].easyReps ?? defaultData[day].easyReps,
        exerciseIndex: persistedData[day].exerciseIndex ?? defaultData[day].exerciseIndex,
        difficulty: persistedData[day].difficulty ?? defaultData[day].difficulty,
      };
    }
  });

  return merged;
};

