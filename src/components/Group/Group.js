import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Exercise from './Exercise';

class Group extends PureComponent {
  render() {
    return (
      <div>
        <div>
          { this.props.exercises.map(
            ({ ...props }) =>
              <Exercise {...props} key={props.id} />
          ) }
        </div>
        <div>
          {this.props.group}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, props) {
  const exercises = state.exercises;
  const groupId = props.match &&
    props.match.params &&
    props.match.params.groupId;
  const groupExercises = exercises.filter(
    exercise => exercise.group === groupId,
  );

  return {
    exercises: groupExercises,
  };
}

export default connect(mapStateToProps)(Group);
