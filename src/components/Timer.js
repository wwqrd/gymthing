import React, { Component } from 'react';
import { Duration } from 'luxon';
import './Timer.css';

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

    this.props.onStart();
  }

  stop = () => {
    this.setState({
      active: false,
      time: Duration.fromMillis(0),
    });

    this.props.onStop();
  };

  update = () => {
    if (!this.state.active) { return; }

    const now = new Date();
    const time = Duration.fromMillis(now - this.state.start);

    this.setState({
      time,
    });

    this.props.onTick(time);

    window.requestAnimationFrame(() => this.update());
  }

  toggle = () => {
    if (this.state.active) { return this.stop(); }

    return this.start();
  }

  handleClickTime = () => {
    this.start();
    if (this.state.active) { this.props.onReset(); }
  }

  handleClickDone = (e) => {
    e.stopPropagation();
    this.stop();
  }

  render() {
    return (
      <div className="Timer">
        <div
          onClick={this.handleClickTime}
          className="Timer__time"
        >
          {this.state.time && this.state.time.toFormat(TIMER_FORMAT)}
        </div>
        <button
          className="Timer__stop"
          type="button"
          onClick={this.handleClickDone}
        >Done</button>
      </div>
    );
  }
}

Timer.defaultProps = {
  onReset: () => {},
};

export default Timer;
