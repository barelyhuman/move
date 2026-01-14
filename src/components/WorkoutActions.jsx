/**
 * Workout action buttons component
 */
export const WorkoutActions = ({
  isWorkoutActive,
  allSetsComplete,
  onStartWorkout,
  onFinishWorkout,
  onAddRep
}) => {
  return (
    <div className="space-y-3">
      {!isWorkoutActive ? (
        <button
          onClick={onStartWorkout}
          className="w-full py-4 bg-stone-900 text-white text-sm font-bold uppercase tracking-wide hover:bg-stone-800 transition-colors"
        >
          Start 10-Minute Session
        </button>
      ) : allSetsComplete ? (
        <button
          onClick={onFinishWorkout}
          className="w-full py-4 bg-green-800 text-white text-sm font-bold uppercase tracking-wide hover:bg-green-700 transition-colors"
        >
          Complete Workout
        </button>
      ) : (
        <div className="text-center text-xs text-stone-600">
          Complete all sets to finish
        </div>
      )}

      {!isWorkoutActive && (
        <button
          onClick={onAddRep}
          className="w-full py-3 border border-stone-900 bg-white text-stone-900 text-xs font-bold uppercase tracking-wide hover:bg-stone-100 transition-colors"
        >
          Add +1 Rep (Weekly Progress)
        </button>
      )}
    </div>
  );
};

