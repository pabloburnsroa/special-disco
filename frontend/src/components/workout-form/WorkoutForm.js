import { useState } from 'react';
import {
  FormContainer,
  FormInput,
  FormButton,
  Error,
} from './WorkoutForm.styles';
import { useWorkoutsContext } from '../../hooks/useWorkoutContext';

const defaultFormFields = {
  title: '',
  reps: '',
  weight: '',
};

const WorkoutForm = () => {
  const { addWorkout } = useWorkoutsContext();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const { title, reps, weight } = formFields;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const handleSubmit = async (e) => {
    const workout = { title, reps, weight };
    e.preventDefault();
    try {
      const response = await fetch('/api/workouts', {
        method: 'POST',
        body: JSON.stringify(workout),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const json = await response.json();
      console.log(json);
      // Error handling
      if (!response.ok) {
        setError(json.error);
        setEmptyFields(json.emptyFields);
      }
      // Success response
      if (response.ok) {
        setFormFields(defaultFormFields);
        setEmptyFields([]);
        addWorkout(json);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <h3>Add a new workout</h3>
      <label>Exercise Title:</label>
      <FormInput
        label="Title"
        type="text"
        // required
        onChange={handleChange}
        name="title"
        value={title}
        error={emptyFields.includes('title') ? true : false}
      />
      <label>Reps:</label>
      <FormInput
        label="Reps"
        type="number"
        // required
        onChange={handleChange}
        name="reps"
        value={reps}
        error={emptyFields.includes('reps') ? true : false}
      />
      <label>Weight(kg):</label>
      <FormInput
        label="Weight"
        type="number"
        // required
        onChange={handleChange}
        name="weight"
        value={weight}
        error={emptyFields.includes('weight') ? true : false}
      />
      <FormButton type="submit">Add Workout</FormButton>
      {error && <Error>{error}</Error>}
    </FormContainer>
  );
};

export default WorkoutForm;
