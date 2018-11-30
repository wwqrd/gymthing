import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

class Exercise extends PureComponent {
  render() {
    return (
      <div>
        <div>
          { this.props.id }
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
  const exerciseId = props.match &&
    props.match.params &&
    props.match.params.exerciseId;
  const exercise = exercises.find(
    exercise => exercise.id === exerciseId,
  );

  console.log({ exercise, exercises });

  return {
    ...exercise,
  };
}

export default connect(mapStateToProps)(Exercise);
