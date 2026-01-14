import { DAY_ORDER, DAY_NAMES } from '../data/constants';

/**
 * Day selector component
 */
export const DaySelector = ({ currentDay, onDayChange, isDisabled }) => {
  return (
    <div className="grid grid-cols-4 mb-8 border border-stone-900">
      {DAY_ORDER.map((day) => (
        <button
          key={day}
          onClick={() => !isDisabled && onDayChange(day)}
          disabled={isDisabled}
          className={`py-3 px-2 text-xs font-bold uppercase tracking-wide border-r border-stone-900 last:border-r-0 transition-colors ${
            currentDay === day
              ? 'bg-stone-900 text-white'
              : isDisabled
                ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                : 'bg-white text-stone-900 hover:bg-stone-100'
          }`}
        >
          {DAY_NAMES[day]}
        </button>
      ))}
    </div>
  );
};

