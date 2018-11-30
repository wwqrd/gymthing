import React, { Component } from 'react';
import { Duration } from 'luxon';

const TIMER_FORMAT = 'm:ss';

class Timer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      start: null,
      time: Duration.fromMillis(0),
      active: false,
    };
  }

  start = () => {
    const now = new Date();

    this.setState({
      start: now,
      active: true,
    }, () => {
      this.update();
    });
  }

  stop = () => {
    this.setState({
      active: false,
      time: Duration.fromMillis(0),
    });
  };

  update = () => {
    if (!this.state.active) { return; }

    const now = new Date();
    const time = Duration.fromMillis(now - this.state.start);

    this.setState({
      time,
    });

    window.requestAnimationFrame(() => this.update());
  }

  toggle = () => {
    if (this.state.active) { return this.stop(); }

    return this.start();
  }

  handleClickTime = () => {
    this.start();
  }

  handleClickDone = (e) => {
    e.stopPropagation();
    this.stop();
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClickTime}>
          {this.state.time && this.state.time.toFormat(TIMER_FORMAT)}
        </div>
        <button type="button" onClick={this.handleClickDone}>Done</button>
      </div>
    );
  }
}

export default Timer;
