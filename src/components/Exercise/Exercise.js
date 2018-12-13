import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Units from '../Units';
import clock from '../../clock';
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

    this.clock = clock({
      onTick: this.handleTimerTick,
      onReset: this.handleTimerReset,
    });

    this.state = {
      completedSets: 0,
      active: false,
      time: this.clock.time,
      phases: [],
    };
  }

  get isOverResting() {
    return this.state.active && this.state.phases.length === 0;
  };

  handleClick = () => {
    if (this.state.active) {
      this.clock.stop();

      this.setState({
        completedSets: this.state.completedSets + 1,
        active: false,
        time: this.clock.time,
        phases: [],
      });

      return;
    }

    this.setState({
      active: true,
      phases: getPhases(0),
    });

    this.clock.start();
  }

  handleFinishExercise = (e) => {
    e.stopPropagation();

    this.setState({
      completedSets: 0,
      active: false,
      phases: [],
    });

    this.clock.stop();
  }

  handleTimerTick = (time) => {
    this.setState({
      time: time,
      phases: getPhases(time.as('minutes'))
    });
  }

  handleTimerReset = () => {
    // this.setState({
    //   completedSets: this.state.completedSets + 1,
    //   phases: getPhases(0)
    // });
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
      <div
        className={`${exerciseClasses}`}
        onClick={this.handleClick}
      >
        <div className="Exercise__meta">
          <div className="Exercise__phases">
            {PHASES.map(this.renderPhase)}
          </div>
        </div>
        <div className="Exercise__timer">
          <Timer time={this.state.time} />
        </div>
        <div className="Exercise__progress">
          <div className="Exercise__sets">Completed sets: {this.state.completedSets}</div>
          <button type="button" onClick={this.handleFinishExercise}>Finish exercise (reset)</button>
        </div>
      </div>
    );
  }
}

export default Exercise;
