import { formatTime } from '../utils/timeFormatter';

/**
 * Timer display component
 */
export const TimerDisplay = ({ elapsedTime }) => {
  return (
    <div className="text-center mb-8 py-4 border border-stone-900 bg-white">
      <div className="text-2xl font-bold text-stone-900 font-mono">
        {formatTime(elapsedTime)}
      </div>
      <div className="text-xs text-stone-600 mt-1">
        Keep it simple. Keep moving.
      </div>
    </div>
  );
};

