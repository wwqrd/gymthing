import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Units from '../Units';
import Timer from '../Timer';

class Exercise extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sets: 0,
    };
  }

  handleTimerStart = () => {
    this.setState({ sets: this.state.sets + 1 });
  }

  handleTimerStop = () => {
    this.setState({ sets: 0 });
  }

  handleTimerReset = () => {
    this.setState({ sets: this.state.sets + 1 });
  }

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
        </div>
        <div>
          <Timer
            onStart={this.handleTimerStart}
            onStop={this.handleTimerStop}
            onReset={this.handleTimerReset}
          />
          Set {this.state.sets}/{this.props.sets}
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
