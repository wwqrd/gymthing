import React, { PureComponent } from 'react';

class Exercise extends PureComponent {
  render() {
    return (
      <div className="groups-exercise">
        {this.props.name}
      </div>
    );
  }
}

export { Exercise };

export default Exercise;
