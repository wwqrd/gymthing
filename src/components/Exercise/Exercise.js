import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Units from '../Units';
import clock from '../../clock';
import Timer from '../Timer';
import Field from '../Field';
import './Exercise.css';

// name, min, max
const PHASES = [
  ['endurance', 0, 1],
  ['hypertrophy', 1, 3],
  ['strength', 3, 5],
];

const getPhases = time =>
  PHASES.reduce(
    (acc, [name, min, max]) => {
      if (time >= min && time < max) {
        acc.active.push(name);
      }
      if (time >= max) {
        acc.complete.push(name);
      }

      return acc;
    },
    { active: [], complete: [] },
  );

const initialState = {
  completedSets: 0,
  active: false,
  time: null,
  phases: {
    active: [],
    complete: [],
  },
};

const Parameter = ({
  label,
  children,
}) => (
  <div className="Exercise__parameter">
    <div className="Exercise__label">{label}</div>
    <div className="Exercise__value">
      {children}
    </div>
  </div>
);

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
      onStart: this.handleTimerStart,
      onStop: this.handleTimerStop,
    });

    this.state = {
      ...initialState,
      time: this.clock.time,
    };
  }

  get isOverResting() {
    return this.state.active && this.state.phases.complete.length === PHASES.length;
  };

  start() {
    this.setState({
      active: true,
      phases: {
        active: [],
        complete: [],
      },
    });

    this.clock.start();
  }

  stop() {
    this.clock.stop();
    this.clock.reset();

    this.setState({
      ...initialState,
      completedSets: this.state.completedSets + 1,
      time: this.clock.time,
    });
  }

  toggle() {
    if (this.state.active) {
      this.stop();

      return;
    }

    this.start();
  }

  finishExercise() {
    this.clock.stop();
    this.clock.reset();

    this.setState({
      ...initialState,
      completedSets: 0,
      time: this.clock.time,
    });
  }

  updateTime = (time) => {
    const minutes = time.as('minutes');
    const phases = getPhases(minutes);

    this.setState({
      time,
      phases,
    });
  }

  handleClick = () => {
    this.toggle();
  }

  handleFinishExercise = (e) => {
    e.stopPropagation();

    this.finishExercise();
  }

  handleTimerStart = (time) => {
    this.updateTime(time);
  }

  handleTimerStop = (time) => {
    this.updateTime(time);
  }

  handleTimerTick = (time) => {
    this.updateTime(time);
  }

  handleTimerReset = (time) => {
    this.updateTime(time);
  }

  renderPhase = ([phase]) => {
    const { active, complete } = this.state.phases;

    const phaseClasses = cx(
      'Exercise__phase',
      {
        'Exercise__phase--active': active.includes(phase),
        'Exercise__phase--complete': complete.includes(phase),
      },
    );

    return <div className={phaseClasses}>{phase}</div>;
  };

  render() {
    const exerciseClasses = cx(
      'Exercise',
      this.state.phases.active.map(phase => `Exercise--phase-${phase}`),
      {
        'Exercise--active': this.state.active,
        'Exercise--over-resting': this.isOverResting,
      },
    );

    return (
      <div
        className={`${exerciseClasses}`}
        onClick={this.handleClick}
      >
        <div className="Exercise__timer-meta">
          <div className="Exercise__phases">
            {PHASES.map(this.renderPhase)}
          </div>
        </div>
        <div className="Exercise__timer">
          <Timer time={this.state.time} />
        </div>
        <div className="Exercise__meta">
          <Parameter label="Weight">
            <Field
              value={this.props.weight}
              unit="kg"
            />
          </Parameter>
          <Parameter label="Reps">
            <Field
              value={this.props.reps}
            />
          </Parameter>
          <Parameter label="Sets">
            {this.state.completedSets} /
            <Field
              value={this.props.sets}
            />
          </Parameter>
        </div>
        <div className="Exercise__controls">
          <button
            type="button"
            className="Exercise__finish"
            onClick={this.handleFinishExercise}
          >Finish exercise (reset)</button>
        </div>
      </div>
    );
  }
}

export default Exercise;
