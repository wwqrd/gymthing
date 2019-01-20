import React, { Component } from 'react';
import cx from 'classnames';

// name, min, max
export const PHASES = [
  ['endurance', 0, 1],
  ['hypertrophy', 1, 3],
  ['strength', 3, 5],
];

export const getPhases = time =>
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

class Phases extends Component {
  static defaultProps = {
    active: null,
    complete: null,
  };

  renderPhase = ([phase]) => {
    const { active, complete } = this.props;

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
    return (
      <div className="Exercise__phases">
        {PHASES.map(this.renderPhase)}
      </div>
    );
  }
};

export default Phases;
