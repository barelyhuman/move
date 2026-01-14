import { SetItem } from './SetItem';

/**
 * Workout display component
 */
export const WorkoutDisplay = ({
  exercise,
  workout,
  completedSets,
  activeSetReps,
  isWorkoutActive,
  onShowExerciseSelector,
  onCompleteSet,
  onIncrementSetReps,
  onDecrementSetReps
}) => {
  // Helper to get reps for a set
  const getRepsForSet = (setNumber) => {
    // During active workout, use per-set reps if available
    if (isWorkoutActive && activeSetReps) {
      return activeSetReps[setNumber];
    }
    // Otherwise use default hard/easy reps
    return setNumber === 1 ? workout.hardReps : workout.easyReps;
  };

  return (
    <div className="border border-stone-900 bg-white">
      <div className="px-4 py-3 border-b border-stone-900 bg-stone-50 flex justify-between items-center">
        <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
          Today's Movement
        </h2>
        <button
          onClick={onShowExerciseSelector}
          disabled={isWorkoutActive}
          className={`text-xs font-bold uppercase tracking-wide px-2 py-1 border border-stone-900 ${
            isWorkoutActive
              ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
              : 'bg-white text-stone-900 hover:bg-stone-100'
          }`}
        >
          Change
        </button>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-stone-900">
            {exercise.name}
          </h3>
          <div className="text-xs text-stone-600">
            Level {exercise.difficulty}
          </div>
        </div>
        <p className="text-xs text-stone-600 mb-4">
          One hard set. Three adaptive sets. Done.
        </p>

        <div className="space-y-3">
          {/* Set 1 - Hard */}
          <SetItem
            setNumber={1}
            exerciseName={exercise.name}
            reps={getRepsForSet(1)}
            variation="Hardest variation"
            isCompleted={completedSets.includes(1)}
            isActive={isWorkoutActive}
            onComplete={onCompleteSet}
            onIncrementReps={onIncrementSetReps}
            onDecrementReps={onDecrementSetReps}
          />

          {/* Sets 2-4 - Easy */}
          {[2, 3, 4].map((setNum) => (
            <SetItem
              key={setNum}
              setNumber={setNum}
              exerciseName={exercise.easy}
              reps={getRepsForSet(setNum)}
              variation="Adaptive variation"
              isCompleted={completedSets.includes(setNum)}
              isActive={isWorkoutActive}
              onComplete={onCompleteSet}
              onIncrementReps={onIncrementSetReps}
              onDecrementReps={onDecrementSetReps}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

