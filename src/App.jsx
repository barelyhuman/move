import { useTimer } from './hooks/useTimer';
import { useWorkout } from './hooks/useWorkout';
import { WEEKLY_GOAL } from './data/constants';
import { Header } from './components/Header';
import { ProgressBar } from './components/ProgressBar';
import { DaySelector } from './components/DaySelector';
import { TimerDisplay } from './components/TimerDisplay';
import { ExerciseSelectorModal } from './components/ExerciseSelectorModal';
import { WorkoutDisplay } from './components/WorkoutDisplay';
import { WorkoutActions } from './components/WorkoutActions';
import { InfoCard } from './components/InfoCard';

const App = () => {
  const timer = useTimer();
  const workout = useWorkout();

  const handleStartWorkout = () => {
    timer.start();
    workout.resetSets();
    workout.initializeActiveSetReps(); // Initialize per-set reps when workout starts
  };

  const handleFinishWorkout = () => {
    timer.stop();
    workout.resetSets();
    workout.incrementWeeklyProgress();
  };

  return (
    <div className="min-h-screen bg-stone-50 font-mono">
      {/* Exercise Selector Modal */}
      {workout.showExerciseSelector && (
        <ExerciseSelectorModal
          currentDay={workout.currentDay}
          currentExerciseIndex={workout.currentWorkout.exerciseIndex}
          isWorkoutActive={timer.isActive}
          onSelectExercise={workout.selectExercise}
          onClose={() => workout.setShowExerciseSelector(false)}
        />
      )}

      <Header />

      <div className="max-w-md mx-auto px-6 py-8">
        <ProgressBar current={workout.weeklyProgress} total={WEEKLY_GOAL} />

        <DaySelector
          currentDay={workout.currentDay}
          onDayChange={workout.changeDay}
          isDisabled={timer.isActive}
        />

        {timer.isActive && <TimerDisplay elapsedTime={timer.elapsedTime} />}

        <div className="space-y-6">
          <WorkoutDisplay
            exercise={workout.currentExercise}
            workout={workout.currentWorkout}
            completedSets={workout.completedSets}
            activeSetReps={workout.activeSetReps}
            isWorkoutActive={timer.isActive}
            onShowExerciseSelector={() => workout.setShowExerciseSelector(true)}
            onCompleteSet={workout.completeSet}
            onIncrementSetReps={workout.incrementSetReps}
            onDecrementSetReps={workout.decrementSetReps}
          />

          <WorkoutActions
            isWorkoutActive={timer.isActive}
            allSetsComplete={workout.allSetsComplete}
            onStartWorkout={handleStartWorkout}
            onFinishWorkout={handleFinishWorkout}
            onAddRep={() => workout.addRep(workout.currentDay)}
            onReduceRep={() => workout.reduceRep(workout.currentDay)}
          />

          <InfoCard title="Progress">
            <div className="text-xs text-stone-600 space-y-1">
              
                Progress by adding +1 rep weekly. When you can do 20 reps easily,
                consider moving to the next exercise level.
            </div>
          </InfoCard>

          <InfoCard title="The Method">
            <p className="text-xs text-stone-600 leading-relaxed">
              This isn't for impressive physiques. It's for adding movement to your life.
              One hard set, three adaptive sets. Progress by +1 rep weekly.
              Simple. Sustainable. Functional.
            </p>
            <p className="text-xs text-stone-600 leading-relaxed"> 
              Refrenced from <a class="text-stone-900 underline underline-offset-4" href="https://reaper.is/writing/20230401-minimalism-in-workouts" target="_blank">this blog post</a> by Reaper.
            </p>
          </InfoCard>
        </div>
      </div>
    </div>
  );
};

export default App;
