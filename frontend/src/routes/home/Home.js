import Workouts from '../../components/workouts/Workouts';
import WorkoutForm from '../../components/workout-form/WorkoutForm';
import { HomeContainer } from './Home.styles';
import { useEffect } from 'react';
import { useWorkoutsContext } from '../../hooks/useWorkoutContext';
const Home = () => {
  const { workouts, getWorkouts } = useWorkoutsContext();
  useEffect(() => {
    // const fetchWorkouts = async () => {
    //   const res = await fetch('/api/workouts/');
    //   const json = await res.json();
    //   console.log(json);
    //   if (res.ok) {
    //     dispatch({ type: 'SET_WORKOUTS', payload: json });
    //   }
    // };
    // fetchWorkouts();
    getWorkouts();
  }, []);
  return (
    <HomeContainer>
      <Workouts workouts={workouts} />
      <WorkoutForm />
    </HomeContainer>
  );
};

export default Home;
