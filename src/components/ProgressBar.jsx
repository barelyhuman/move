/**
 * Progress bar component
 */
export const ProgressBar = ({ current, total }) => {
  const percentage = (current / total) * 100;

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-stone-600 uppercase tracking-wide">
          Weekly Progress
        </span>
        <span className="text-xs text-stone-900 font-bold">
          {current}/{total}
        </span>
      </div>
      <div className="h-1 bg-stone-200">
        <div
          className="h-1 bg-stone-900 transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

