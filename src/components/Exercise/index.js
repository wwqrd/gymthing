import { connect } from 'react-redux';
import Exercise from './Exercise';

const mapStateToProps = (state, props) => {
  const exercises = state.exercises;
  const exerciseId = props.match &&
    props.match.params &&
    props.match.params.exerciseId;
  const exercise = exercises.find(
    exercise => exercise.id === exerciseId,
  );

  return {
    ...exercise,
  };
}

export default connect(mapStateToProps)(Exercise);
