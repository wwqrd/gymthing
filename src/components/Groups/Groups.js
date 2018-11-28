import React, { PureComponent } from 'react';
import Group from './Group';
import './Groups.css';

class Groups extends PureComponent {
  render() {
    return (
      <div className="groups-groups">
        {this.props.groups.map(group => (
          <Group group={group} key={group} />
        ))}
      </div>
    );
  }
}

export default Groups;
