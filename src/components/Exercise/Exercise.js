import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Units from '../Units';
import Timer from '../Timer';
import './Exercise.css';

const PHASES = [
  'endurance',
  'power',
  'hypertrophy',
  'strength',
];

const getPhases = (time) => {
  let phases = [];
  if (time < 1) { phases.push('endurance'); }
  if (time > 1 && time < 2) { phases.push('power'); }
  if (time < 2) { phases.push('hypertrophy'); }
  if (time > 2 && time < 5) { phases.push('strength'); }
  return phases;
}

class Exercise extends PureComponent {
  static defaultProps = {
    sets: 3,
    weight: 0,
    reps: 0,
  };

  constructor(props) {
    super(props);

    this.state = {
      completedSets: 0,
      active: false,
      phases: [],
    };
  }

  get isOverResting() {
    return this.state.active && this.state.phases.length === 0;
  };

  handleTimerStart = () => {
    this.setState({
      completedSets: this.state.completedSets + 1,
      active: true,
      phases: getPhases(0),
    });
  }

  handleTimerStop = () => {
    this.setState({
      completedSets: 0,
      active: false,
      phases: [],
    });
  }

  handleTimerTick = (time) => {
    this.setState({
      phases: getPhases(time.as('minutes'))
    });
  }

  handleTimerReset = () => {
    this.setState({
      completedSets: this.state.completedSets + 1,
      phases: getPhases(0)
    });
  }

  renderPhase = (phase) => {
    const phaseClasses = cx(
      'Exercise__phase',
      { 'Exercise__phase--active': this.state.phases.includes(phase) },
    );

    return <div className={phaseClasses}>{phase}</div>;
  };

  render() {
    const exerciseClasses = cx(
      'Exercise',
      this.state.phases.map(phase => `Exercise--phase-${phase}`),
      { 'Exercise--over-resting': this.isOverResting },
    );

    return (
      <div className={`${exerciseClasses}`}>
        <div className="Exercise__meta">
          <div className="Exercise__phases">
            {PHASES.map(this.renderPhase)}
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
          Completed sets: {this.state.completedSets}
        </div>
      </div>
    );
  }
}

export default Exercise;
