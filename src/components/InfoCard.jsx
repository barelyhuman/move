/**
 * Reusable info card component
 */
export const InfoCard = ({ title, children }) => {
  return (
    <div className="border border-stone-300 bg-stone-50 p-4">
      <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
        {title}
      </h3>
      {children}
    </div>
  );
};

