import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Units from '../Units';
import clock from '../../clock';
import Timer from '../Timer';
import Field from '../Field';
import Phases, { PHASES, getPhases } from './Phases';
import { actionCreators } from '../../ducks/exercises';
import './Exercise.css';

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
    name: '',
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

  handleUpdateField = property =>
    (value) => {
      const values = {
        [property]: value,
      };
      this.props.updateExercise(values);
      console.log(this.props.id, values);
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
      >
        <div className="Exercise__timer-meta">
          <Phases {...this.state.phases} />
        </div>
        <div
          className="Exercise__timer"
          onClick={this.handleClick}
        >
          <Timer time={this.state.time} />
        </div>
        <div className="Exercise__meta">
          <Parameter label="Name">
            <Field
              value={this.props.name}
              onChange={this.handleUpdateField('name')}
            />
          </Parameter>
          <Parameter label="Weight">
            <Field
              value={this.props.weight}
              onChange={this.handleUpdateField('weight')}
              unit="kg"
            />
          </Parameter>
          <Parameter label="Reps">
            <Field
              value={this.props.reps}
              onChange={this.handleUpdateField('reps')}
            />
          </Parameter>
          <Parameter label="Sets">
            {this.state.completedSets} /
            <Field
              value={this.props.sets}
              onChange={this.handleUpdateField('sets')}
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

const mapStateToProps = (state, props) => {
  const exercise = state.exercises.find(({ id }) => id === props.match.params.id);

  if (!exercise) { return {}; }

  return {
    id: props.match.params.id,
    weight: exercise.weight,
    reps: exercise.reps,
    sets: exercise.sets,
  };
};

const mapDispatchToProps = (dispatch, props) => ({
  updateExercise: values =>
    dispatch(actionCreators.updateExercise(props.match.params.id, values)),
});

export { Exercise };

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Exercise);
