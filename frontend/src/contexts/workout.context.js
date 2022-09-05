import { createContext, useReducer } from 'react';

export const WorkoutContext = createContext({
  workouts: [],
  addWorkout: () => {},
  deleteWorkout: () => {},
  updateWorkout: () => {},
});

export const WORKOUT_ACTION_TYPES = {
  SET_WORKOUTS: 'SET_WORKOUTS',
  CREATE_WORKOUT: 'CREATE_WORKOUT',
  DELETE_WORKOUT: 'DELETE_WORKOUT',
  UPDATE_WORKOUT: 'UPDATE_WORKOUT',
  WORKOUT_ERROR: 'WORKOUT_ERROR',
};

const workoutReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case WORKOUT_ACTION_TYPES.SET_WORKOUTS:
      return {
        workouts: payload,
      };
    case WORKOUT_ACTION_TYPES.CREATE_WORKOUT:
      return {
        workouts: [payload, ...state.workouts],
      };
    case WORKOUT_ACTION_TYPES.UPDATE_WORKOUT:
      return {
        workouts: state.workouts.map((workout) =>
          workout._id === payload._id ? payload : workout
        ),
      };
    case WORKOUT_ACTION_TYPES.DELETE_WORKOUT:
      return {
        workouts: state.workouts.filter((w) => w._id !== payload._id),
      };
    case WORKOUT_ACTION_TYPES.WORKOUT_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
};

const INITIAL_STATE = {
  workouts: null,
  error: null,
};

export const WorkoutProvider = ({ children }) => {
  const [state, dispatch] = useReducer(workoutReducer, INITIAL_STATE);

  const { workouts } = state;

  const updateWorkoutsReducer = (newWorkouts) => {
    dispatch({ type: WORKOUT_ACTION_TYPES.SET_WORKOUTS, payload: newWorkouts });
  };

  const getWorkouts = async ({ user }) => {
    try {
      const response = await fetch('/api/workouts/', {
        headers: {
          'Authorization:': `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: WORKOUT_ACTION_TYPES.SET_WORKOUTS, payload: json });
      }
    } catch (error) {
      dispatch({
        type: WORKOUT_ACTION_TYPES.WORKOUT_ERROR,
        payload: error,
      });
    }
  };

  const addWorkout = (workoutToAdd) => {
    dispatch({
      type: WORKOUT_ACTION_TYPES.CREATE_WORKOUT,
      payload: workoutToAdd,
    });
  };

  const deleteWorkout = (workoutToRemove) => {
    const existingWorkout = workouts.find(
      (workout) => workout._id === workoutToRemove._id
    );
    if (existingWorkout) {
      dispatch({
        type: WORKOUT_ACTION_TYPES.DELETE_WORKOUT,
        payload: workoutToRemove,
      });
    }
  };

  // workoutToUpdate will be an object
  const updateWorkout = async (workoutToUpdate) => {
    const existingWorkout = workouts.find(
      (workout) => workout._id === workoutToUpdate._id
    );
    if (existingWorkout) {
      try {
        const response = await fetch('/api/workouts/' + existingWorkout._id, {
          method: 'PATCH',
          body: JSON.stringify(workoutToUpdate),
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const json = await response.json();

        if (response.ok) {
          dispatch({
            type: WORKOUT_ACTION_TYPES.UPDATE_WORKOUT,
            payload: json,
          });
        }
      } catch (error) {
        dispatch({
          type: WORKOUT_ACTION_TYPES.WORKOUT_ERROR,
          payload: error,
        });
      }
    }
  };

  const value = {
    workouts,
    addWorkout,
    deleteWorkout,
    updateWorkout,
    getWorkouts,
  };

  return (
    <WorkoutContext.Provider value={value}>{children}</WorkoutContext.Provider>
  );
};
