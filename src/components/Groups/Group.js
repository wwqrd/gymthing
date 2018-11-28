import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Exercise from './Exercise';
import './Group.css';

class Group extends PureComponent {
  render() {
    return (
      <a className="groups-group">
        <div className="groups-group__exercises">
          { this.props.exercises.map(
            ({ ...props }) =>
              <Exercise {...props} key={props.id} />
          ) }
        </div>
        <div className="groups-group__last-completed">
          {this.props.group}
        </div>
      </a>
    );
  }
}

const mapStateToProps = (state, { group }) => ({
  exercises: state.exercises.filter(
    exercise => group === exercise.group,
  )
});

export { Group };

export default connect(mapStateToProps)(Group);
