// import { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../../hooks/useWorkoutContext';
import Workout from '../workout/Workout';
import { WorkoutsContainer } from './Workouts.styles';

const Workouts = ({ workouts }) => {
  // const { workouts } = useWorkoutsContext();
  // const [workouts, setWorkouts] = useState(null);

  return (
    <WorkoutsContainer>
      Workouts go here...
      {workouts &&
        workouts.map((workout) => (
          <Workout workout={workout} key={workout._id} />
        ))}
    </WorkoutsContainer>
  );
};

export default Workouts;
