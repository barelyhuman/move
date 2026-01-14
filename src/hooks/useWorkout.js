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
    weeklyProgress,
    showExerciseSelector,
    allSetsComplete,
    setShowExerciseSelector,
    addRep,
    reduceRep,
    selectExercise,
    completeSet,
    resetSets,
    incrementWeeklyProgress,
    changeDay,
  };
};
