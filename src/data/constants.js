/**
 * Application constants - Framework agnostic
 */

export const DAY_ORDER = ['push', 'pull', 'legs', 'core'];

export const DAY_NAMES = {
  push: 'Push',
  pull: 'Pull',
  legs: 'Legs',
  core: 'Core'
};

export const DEFAULT_WORKOUT_DATA = {
  push: { hardReps: 1, easyReps: 2, exerciseIndex: 3, difficulty: 4 },
  pull: { hardReps: 1, easyReps: 2, exerciseIndex: 5, difficulty: 6 },
  legs: { hardReps: 5, easyReps: 8, exerciseIndex: 2, difficulty: 3 },
  core: { hardReps: 10, easyReps: 15, exerciseIndex: 2, difficulty: 3 }
};

export const TOTAL_SETS = 4;
export const WEEKLY_GOAL = 8;

