import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Units from '../Units';
import Timer from '../Timer';

class Exercise extends PureComponent {
  render() {
    return (
      <div>
        <Link to={`/group/${this.props.group}`}>
          {this.props.group}
        </Link>
        <div>
          { this.props.name }
        </div>
        <div>
          <div>Weight: <Units value={this.props.weight} type="weight" /></div>
          <div>Reps: {this.props.reps}</div>
          <div>Sets: {this.props.sets}</div>
        </div>
        <div>
          <Timer />
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
