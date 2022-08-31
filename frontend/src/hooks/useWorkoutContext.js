import { useContext } from 'react';
import { WorkoutContext } from '../contexts/workout.context';

export const useWorkoutsContext = () => {
  const context = useContext(WorkoutContext);

  if (!context) {
    throw Error('No workouts context...');
  }
  return context;
};
