import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Exercise from './Exercise';
import { actionCreators as exerciseActions } from '../../ducks/exercises';

const Execises = ({
  newExercise,
  exercises,
}) => {
  const renderedExercises = exercises
    .map(exercise => (
      <Exercise
        key={exercise.id}
        {...exercise}
      />
    ));

  return (
    <div>
      <div>
        {renderedExercises}
      </div>
      <button onClick={newExercise}>Create new exercise</button>
    </div>
  );
}

const mapStateToProps = (state) => {
  const exercises = state.exercises;

  return {
    exercises,
  };
};

const mapDispatchToProps = dispatch => ({
  newExercise: bindActionCreators(exerciseActions.newExercise, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Execises);
