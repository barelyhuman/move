import { useState, useEffect } from "react";
import { exerciseProgressions } from "../data/exerciseProgressions";
import { DEFAULT_WORKOUT_DATA, TOTAL_SETS } from "../data/constants";
import {
  loadWorkoutData,
  saveWorkoutData,
  mergeWorkoutData,
} from "../utils/persistence";

/**
 * Custom hook for managing workout state
 * @returns {Object} Workout state and controls
 */
export const useWorkout = () => {
  const [currentDay, setCurrentDay] = useState("push");

  // Initialize workout data from localStorage or use defaults
  const [workoutData, setWorkoutData] = useState(() => {
    const persistedData = loadWorkoutData();
    return mergeWorkoutData(persistedData, DEFAULT_WORKOUT_DATA);
  });
  const [completedSets, setCompletedSets] = useState([]);
  const [activeSetReps, setActiveSetReps] = useState(null); // Track per-set reps during active workout
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);

  // Save workout data to localStorage whenever it changes
  useEffect(() => {
    saveWorkoutData(workoutData);
  }, [workoutData]);

  const currentWorkout = workoutData[currentDay];
  const currentExercise =
    exerciseProgressions[currentDay][currentWorkout.exerciseIndex];
  const allSetsComplete = completedSets.length === TOTAL_SETS;

  const addRep = (dayType) => {
    setWorkoutData((prev) => ({
      ...prev,
      [dayType]: {
        ...prev[dayType],
        hardReps: prev[dayType].hardReps + 1,
        easyReps: prev[dayType].easyReps + 1,
      },
    }));
  };

  const reduceRep = (dayType) => {
    setWorkoutData((prev) => ({
      ...prev,
      [dayType]: {
        ...prev[dayType],
        hardReps: Math.max(1, prev[dayType].hardReps - 1),
        easyReps: Math.max(1, prev[dayType].easyReps - 1),
      },
    }));
  };

  const selectExercise = (dayType, exerciseIndex) => {
    setWorkoutData((prev) => ({
      ...prev,
      [dayType]: {
        ...prev[dayType],
        exerciseIndex: exerciseIndex,
        difficulty: exerciseProgressions[dayType][exerciseIndex].difficulty,
      },
    }));
    setShowExerciseSelector(false);
  };

  const completeSet = (setNumber) => {
    setCompletedSets((prev) => [...prev, setNumber]);
  };

  const resetSets = () => {
    setCompletedSets([]);
    setActiveSetReps(null); // Clear per-set reps when resetting
  };

  const initializeActiveSetReps = () => {
    // Initialize per-set reps: Set 1 is hard, Sets 2-4 are easy
    setActiveSetReps({
      1: currentWorkout.hardReps,
      2: currentWorkout.easyReps,
      3: currentWorkout.easyReps,
      4: currentWorkout.easyReps,
    });
  };

  const updateSetReps = (setNumber, newReps) => {
    if (completedSets.includes(setNumber)) {
      // Don't allow modifying completed sets
      return;
    }
    setActiveSetReps((prev) => ({
      ...prev,
      [setNumber]: Math.max(1, newReps), // Ensure minimum 1 rep
    }));
  };

  const incrementSetReps = (setNumber) => {
    if (activeSetReps && activeSetReps[setNumber] !== undefined && !completedSets.includes(setNumber)) {
      updateSetReps(setNumber, activeSetReps[setNumber] + 1);
    }
  };

  const decrementSetReps = (setNumber) => {
    if (activeSetReps && activeSetReps[setNumber] !== undefined && !completedSets.includes(setNumber)) {
      updateSetReps(setNumber, activeSetReps[setNumber] - 1);
    }
  };

  const incrementWeeklyProgress = () => {
    setWeeklyProgress((prev) => prev + 1);
  };

  const changeDay = (day) => {
    setCurrentDay(day);
  };

  return {
    currentDay,
    currentWorkout,
    currentExercise,
    workoutData,
    completedSets,
    activeSetReps,
    weeklyProgress,
    showExerciseSelector,
    allSetsComplete,
    setShowExerciseSelector,
    addRep,
    reduceRep,
    selectExercise,
    completeSet,
    resetSets,
    initializeActiveSetReps,
    incrementSetReps,
    decrementSetReps,
    incrementWeeklyProgress,
    changeDay,
  };
};
