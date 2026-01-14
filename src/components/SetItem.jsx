/**
 * Individual set item component
 */
export const SetItem = ({
  setNumber,
  exerciseName,
  reps,
  variation,
  isCompleted,
  isActive,
  onComplete
}) => {
  const isHardSet = setNumber === 1;

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        <div className={`text-sm ${isHardSet ? 'font-bold text-stone-900' : 'text-stone-700'}`}>
          Set {setNumber}: {exerciseName} × {reps}
        </div>
        <div className={`text-xs ${isHardSet ? 'text-stone-600' : 'text-stone-500'}`}>
          {variation}
        </div>
      </div>
      {isActive && (
        <button
          onClick={() => onComplete(setNumber)}
          disabled={isCompleted}
          className={`ml-4 w-8 h-8 border border-stone-900 text-xs font-bold ${
            isCompleted
              ? 'bg-stone-900 text-white'
              : 'bg-white text-stone-900 hover:bg-stone-100'
          }`}
        >
          {isCompleted ? '✓' : setNumber}
        </button>
      )}
    </div>
  );
};

