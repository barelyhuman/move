import { exerciseProgressions } from '../data/exerciseProgressions';
import { DAY_NAMES } from '../data/constants';

/**
 * Exercise selector modal component
 */
export const ExerciseSelectorModal = ({
  currentDay,
  currentExerciseIndex,
  isWorkoutActive,
  onSelectExercise,
  onClose
}) => {
  const exercises = exerciseProgressions[currentDay];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white border border-stone-900 max-w-md w-full max-h-96 overflow-y-auto">
        <div className="px-4 py-3 border-b border-stone-900 bg-stone-50 sticky top-0">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
              Choose {DAY_NAMES[currentDay]} Exercise
            </h3>
            <button
              onClick={onClose}
              className="w-6 h-6 border border-stone-900 text-xs font-bold hover:bg-stone-100"
            >
              ×
            </button>
          </div>
        </div>
        <div className="p-0">
          {exercises.map((exercise, index) => (
            <button
              key={index}
              onClick={() => onSelectExercise(currentDay, index)}
              disabled={isWorkoutActive}
              className={`w-full p-3 text-left border-b border-stone-200 last:border-b-0 hover:bg-stone-50 transition-colors ${
                currentExerciseIndex === index ? 'bg-stone-100' : ''
              } ${isWorkoutActive ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="text-sm font-bold text-stone-900">
                    {exercise.name}
                  </div>
                  <div className="text-xs text-stone-600 mt-1">
                    Easy: {exercise.easy}
                  </div>
                </div>
                <div className="ml-3 text-right">
                  <div className="text-xs text-stone-500">
                    Level {exercise.difficulty}
                  </div>
                  {currentExerciseIndex === index && (
                    <div className="text-xs text-stone-900 font-bold mt-1">
                      CURRENT
                    </div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

