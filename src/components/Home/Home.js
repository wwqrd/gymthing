import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { map, groupBy } from 'lodash';
import Group from './Group';

class Home extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { addGroup: false };
  }

  onAddGroup = () => {
    this.setState({ addGroup: true });
  }

  render() {
    return (
      <div>
        { this.state.addGroup && <Redirect to="/group/new" /> }
        <button onClick={this.onAddGroup}>Create new group</button>
        <div>
          {map(
            this.props.groups,
            (exercises, group) =>
              <Group
                key={group}
                exercises={exercises}
                group={group}
              />
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const exercises = state.exercises;
  const groups = groupBy(exercises, 'group');

  return {
    groups,
  };
}

export default connect(mapStateToProps)(Home);
