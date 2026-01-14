import React, { useState, useEffect } from 'react';

const App = () => {
  const [currentDay, setCurrentDay] = useState('push');
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  
  // Exercise progressions for each category
  const exerciseProgressions = {
    push: [
      { name: 'Wall Push-ups', easy: 'Incline Wall Push-ups', difficulty: 1 },
      { name: 'Incline Push-ups', easy: 'Higher Incline Push-ups', difficulty: 2 },
      { name: 'Knee Push-ups', easy: 'Assisted Knee Push-ups', difficulty: 3 },
      { name: 'Push-ups', easy: 'Knee Push-ups', difficulty: 4 },
      { name: 'Diamond Push-ups', easy: 'Close-grip Push-ups', difficulty: 5 },
      { name: 'Pike Push-ups', easy: 'Incline Pike Push-ups', difficulty: 6 },
      { name: 'Archer Push-ups', easy: 'Wide Push-ups', difficulty: 7 },
      { name: 'One-arm Push-ups', easy: 'Assisted One-arm Push-ups', difficulty: 8 }
    ],
    pull: [
      { name: 'Dead Hang', easy: 'Assisted Hang', difficulty: 1 },
      { name: 'Scapular Pulls', easy: 'Assisted Scapular Pulls', difficulty: 2 },
      { name: 'Inverted Rows', easy: 'High Inverted Rows', difficulty: 3 },
      { name: 'Negative Pull-ups', easy: 'Assisted Negatives', difficulty: 4 },
      { name: 'Assisted Pull-ups', easy: 'Band-assisted Pull-ups', difficulty: 5 },
      { name: 'Pull-ups', easy: 'Assisted Pull-ups', difficulty: 6 },
      { name: 'Chin-ups', easy: 'Assisted Chin-ups', difficulty: 7 },
      { name: 'Wide Pull-ups', easy: 'Regular Pull-ups', difficulty: 8 },
      { name: 'Archer Pull-ups', easy: 'Wide Pull-ups', difficulty: 9 },
      { name: 'One-arm Pull-ups', easy: 'Assisted One-arm Pull-ups', difficulty: 10 }
    ],
    legs: [
      { name: 'Wall Sits', easy: 'Supported Wall Sits', difficulty: 1 },
      { name: 'Chair-assisted Squats', easy: 'Box Squats', difficulty: 2 },
      { name: 'Squats', easy: 'Chair-assisted Squats', difficulty: 3 },
      { name: 'Jump Squats', easy: 'Squats', difficulty: 4 },
      { name: 'Single-leg Squats', easy: 'Assisted Pistol Squats', difficulty: 5 },
      { name: 'Pistol Squats', easy: 'Single-leg Squats', difficulty: 6 },
      { name: 'Shrimp Squats', easy: 'Pistol Squats', difficulty: 7 }
    ],
    core: [
      { name: 'Dead Bug (seconds)', easy: 'Supported Dead Bug (seconds)', difficulty: 1 },
      { name: 'Knee Plank (seconds)', easy: 'Incline Plank (seconds)', difficulty: 2 },
      { name: 'Plank (seconds)', easy: 'Knee Plank (seconds)', difficulty: 3 },
      { name: 'Side Plank (seconds)', easy: 'Knee Side Plank (seconds)', difficulty: 4 },
      { name: 'Plank to Push-up', easy: 'Knee Plank to Push-up', difficulty: 5 },
      { name: 'L-sit (seconds)', easy: 'Bent-knee L-sit (seconds)', difficulty: 6 },
      { name: 'Human Flag (seconds)', easy: 'Assisted Human Flag (seconds)', difficulty: 7 }
    ]
  };

  const [workoutData, setWorkoutData] = useState({
    push: { hardReps: 1, easyReps: 2, exerciseIndex: 3, difficulty: 4 }, // Default to regular push-ups
    pull: { hardReps: 1, easyReps: 2, exerciseIndex: 5, difficulty: 6 }, // Default to pull-ups
    legs: { hardReps: 5, easyReps: 8, exerciseIndex: 2, difficulty: 3 }, // Default to squats
    core: { hardReps: 10, easyReps: 15, exerciseIndex: 2, difficulty: 3 } // Default to plank
  });
  
  const [completedSets, setCompletedSets] = useState([]);
  const [weeklyProgress, setWeeklyProgress] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let interval;
    if (startTime) {
      interval = setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [startTime]);

  const dayOrder = ['push', 'pull', 'legs', 'core'];
  const dayNames = {
    push: 'Push',
    pull: 'Pull', 
    legs: 'Legs',
    core: 'Core'
  };

  const startWorkout = () => {
    setStartTime(Date.now());
    setCompletedSets([]);
  };

  const completeSet = (setNumber) => {
    setCompletedSets(prev => [...prev, setNumber]);
  };

  const finishWorkout = () => {
    setStartTime(null);
    setElapsedTime(0);
    setCompletedSets([]);
    setWeeklyProgress(prev => prev + 1);
  };

  const addRep = (dayType) => {
    setWorkoutData(prev => ({
      ...prev,
      [dayType]: {
        ...prev[dayType],
        hardReps: prev[dayType].hardReps + 1,
        easyReps: prev[dayType].easyReps + 1
      }
    }));
  };

  const selectExercise = (dayType, exerciseIndex) => {
    setWorkoutData(prev => ({
      ...prev,
      [dayType]: {
        ...prev[dayType],
        exerciseIndex: exerciseIndex,
        difficulty: exerciseProgressions[dayType][exerciseIndex].difficulty
      }
    }));
    setShowExerciseSelector(false);
  };

  const formatTime = (ms) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const currentWorkout = workoutData[currentDay];
  const currentExercise = exerciseProgressions[currentDay][currentWorkout.exerciseIndex];
  const isWorkoutActive = startTime !== null;
  const allSetsComplete = completedSets.length === 4;

  return (
    <div className="min-h-screen bg-stone-50 font-mono">
      {/* Exercise Selector Modal */}
      {showExerciseSelector && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-stone-900 max-w-md w-full max-h-96 overflow-y-auto">
            <div className="px-4 py-3 border-b border-stone-900 bg-stone-50 sticky top-0">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                  Choose {dayNames[currentDay]} Exercise
                </h3>
                <button
                  onClick={() => setShowExerciseSelector(false)}
                  className="w-6 h-6 border border-stone-900 text-xs font-bold hover:bg-stone-100"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="p-0">
              {exerciseProgressions[currentDay].map((exercise, index) => (
                <button
                  key={index}
                  onClick={() => selectExercise(currentDay, index)}
                  disabled={isWorkoutActive}
                  className={`w-full p-3 text-left border-b border-stone-200 last:border-b-0 hover:bg-stone-50 transition-colors ${
                    currentWorkout.exerciseIndex === index ? 'bg-stone-100' : ''
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
                      {currentWorkout.exerciseIndex === index && (
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
      )}

      {/* Header */}
      <div className="border-b border-stone-900 bg-white">
        <div className="max-w-md mx-auto px-6 py-4">
          <h1 className="text-xl font-bold text-stone-900 tracking-tight">
            MINIMAL
          </h1>
          <p className="text-xs text-stone-600 mt-1">
            Functional movement. Nothing more.
          </p>
        </div>
      </div>

      <div className="max-w-md mx-auto px-6 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs text-stone-600 uppercase tracking-wide">
              Weekly Progress
            </span>
            <span className="text-xs text-stone-900 font-bold">
              {weeklyProgress}/8
            </span>
          </div>
          <div className="h-1 bg-stone-200">
            <div 
              className="h-1 bg-stone-900 transition-all duration-500"
              style={{ width: `${(weeklyProgress / 8) * 100}%` }}
            />
          </div>
        </div>

        {/* Day Selector */}
        <div className="grid grid-cols-4 mb-8 border border-stone-900">
          {dayOrder.map((day, index) => (
            <button
              key={day}
              onClick={() => !isWorkoutActive && setCurrentDay(day)}
              disabled={isWorkoutActive}
              className={`py-3 px-2 text-xs font-bold uppercase tracking-wide border-r border-stone-900 last:border-r-0 transition-colors ${
                currentDay === day
                  ? 'bg-stone-900 text-white'
                  : isWorkoutActive 
                    ? 'bg-stone-100 text-stone-400 cursor-not-allowed'
                    : 'bg-white text-stone-900 hover:bg-stone-100'
              }`}
            >
              {dayNames[day]}
            </button>
          ))}
        </div>

        {/* Timer */}
        {isWorkoutActive && (
          <div className="text-center mb-8 py-4 border border-stone-900 bg-white">
            <div className="text-2xl font-bold text-stone-900 font-mono">
              {formatTime(elapsedTime)}
            </div>
            <div className="text-xs text-stone-600 mt-1">
              Keep it simple. Keep moving.
            </div>
          </div>
        )}

        {/* Workout Display */}
        <div className="space-y-6">
          <div className="border border-stone-900 bg-white">
            <div className="px-4 py-3 border-b border-stone-900 bg-stone-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-stone-900 uppercase tracking-wide">
                Today's Movement
              </h2>
              <button
                onClick={() => setShowExerciseSelector(true)}
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
                  {currentExercise.name}
                </h3>
                <div className="text-xs text-stone-600">
                  Level {currentExercise.difficulty}
                </div>
              </div>
              <p className="text-xs text-stone-600 mb-4">
                One hard set. Three adaptive sets. Done.
              </p>

              {/* Sets */}
              <div className="space-y-3">
                {/* Set 1 - Hard */}
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="text-sm font-bold text-stone-900">
                      Set 1: {currentExercise.name} × {currentWorkout.hardReps}
                    </div>
                    <div className="text-xs text-stone-600">
                      Hardest variation
                    </div>
                  </div>
                  {isWorkoutActive && (
                    <button
                      onClick={() => completeSet(1)}
                      disabled={completedSets.includes(1)}
                      className={`ml-4 w-8 h-8 border border-stone-900 text-xs font-bold ${
                        completedSets.includes(1)
                          ? 'bg-stone-900 text-white'
                          : 'bg-white text-stone-900 hover:bg-stone-100'
                      }`}
                    >
                      {completedSets.includes(1) ? '✓' : '1'}
                    </button>
                  )}
                </div>

                {/* Sets 2-4 - Easy */}
                {[2, 3, 4].map((setNum) => (
                  <div key={setNum} className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="text-sm text-stone-700">
                        Set {setNum}: {currentExercise.easy} × {currentWorkout.easyReps}
                      </div>
                      <div className="text-xs text-stone-500">
                        Adaptive variation
                      </div>
                    </div>
                    {isWorkoutActive && (
                      <button
                        onClick={() => completeSet(setNum)}
                        disabled={completedSets.includes(setNum)}
                        className={`ml-4 w-8 h-8 border border-stone-900 text-xs font-bold ${
                          completedSets.includes(setNum)
                            ? 'bg-stone-900 text-white'
                            : 'bg-white text-stone-900 hover:bg-stone-100'
                        }`}
                      >
                        {completedSets.includes(setNum) ? '✓' : setNum}
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="space-y-3">
            {!isWorkoutActive ? (
              <button
                onClick={startWorkout}
                className="w-full py-4 bg-stone-900 text-white text-sm font-bold uppercase tracking-wide hover:bg-stone-800 transition-colors"
              >
                Start 10-Minute Session
              </button>
            ) : allSetsComplete ? (
              <button
                onClick={finishWorkout}
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
                onClick={() => addRep(currentDay)}
                className="w-full py-3 border border-stone-900 bg-white text-stone-900 text-xs font-bold uppercase tracking-wide hover:bg-stone-100 transition-colors"
              >
                Add +1 Rep (Weekly Progress)
              </button>
            )}
          </div>

          {/* Current Progress Info */}
          <div className="border border-stone-300 bg-stone-50 p-4">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
              Current Progress
            </h3>
            <div className="text-xs text-stone-600 space-y-1">
              <div>Hard Set: {currentWorkout.hardReps} reps</div>
              <div>Easy Sets: {currentWorkout.easyReps} reps each</div>
              <div>Exercise Level: {currentExercise.difficulty}/10</div>
              <div className="pt-2 text-stone-500">
                Progress by adding +1 rep weekly. When you can do 20 reps easily, 
                consider moving to the next exercise level.
              </div>
            </div>
          </div>

          {/* Philosophy */}
          <div className="border border-stone-300 bg-stone-50 p-4">
            <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide mb-2">
              The Method
            </h3>
            <p className="text-xs text-stone-600 leading-relaxed">
              This isn't for impressive physiques. It's for adding movement to your life. 
              One hard set, three adaptive sets. Progress by +1 rep weekly. 
              Simple. Sustainable. Functional.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;