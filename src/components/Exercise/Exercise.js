import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Units from '../Units';
import Timer from '../Timer';
import './Exercise.css';

const getPhase = (time) => {
  if (time < 0.1) { return 'hypertrophy'; }
  if (time < 0.2) { return 'strength'; }
  return 'endurance';
}

class Exercise extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sets: 0,
      phase: null,
    };
  }

  handleTimerStart = () => {
    this.setState({ sets: this.state.sets + 1, phase: getPhase(0) });
  }

  handleTimerStop = () => {
    this.setState({ sets: 0, phase: null });
  }

  handleTimerTick = (time) => {
    this.setState({ phase: getPhase(time.as('minutes')) });
  }

  handleTimerReset = () => {
    this.setState({ sets: this.state.sets + 1, phase: getPhase(0) });
  }

  render() {
    const phaseClass = this.state.phase ? `Exercise--duration-${this.state.phase}` : '';

    return (
      <div className={`Exercise ${phaseClass}`}>
        <div className="Exercise__meta">
          <Link to={`/group/${this.props.group}`}>
            Back to group {this.props.group}
          </Link>

          <div className="Exercise__name">
            { this.props.name }
          </div>

          <div className="Exercise__stats">
            <div>Weight: <Units value={this.props.weight} type="weight" /></div>
            <div>Reps: {this.props.reps}</div>
          </div>
        </div>

        <div className="Exercise__timer">
          <Timer
            onStart={this.handleTimerStart}
            onStop={this.handleTimerStop}
            onTick={this.handleTimerTick}
            onReset={this.handleTimerReset}
          />
        </div>

        <div className="Exercise__progress">
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
