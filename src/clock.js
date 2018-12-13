import { Duration } from 'luxon';

const defaultCallbacks = {
  onStart: () => {},
  onStop: () => {},
  onReset: () => {},
  onTick: () => {},
};

class Clock {
  constructor(callbacks) {
    this.active = false;
    this.clock = {
      start: null,
      time: Duration.fromMillis(0),
    };
    this.requestId = null;
    this.callbacks = {
      ...defaultCallbacks,
      ...callbacks,
    };
  }

  get time() {
    return this.clock.time;
  }

  setClock = (clock) => {
    const newClock = {
      ...this.clock,
      ...clock,
    };

    this.clock = newClock;
  };

  start = () => {
    if (this.active) {
      this.callbacks.onReset();
    }

    this.active = true;

    this.setClock({
      start: new Date(),
      time: Duration.fromMillis(0),
    });

    this.update();
    this.callbacks.onStart();
  }

  stop = () => {
    this.active = false;
    window.cancelAnimationFrame(this.requestId);

    this.setClock({
      start: null,
      time: Duration.fromMillis(0),
    });

    this.callbacks.onStop();
  };

  tick = () => {
    const now = new Date();
    const time = Duration.fromMillis(now - this.clock.start);

    this.callbacks.onTick(time);

    this.setClock({
      time,
    });
  }

  update = () => {
    if (!this.active) { return; }
    this.tick();
    this.requestId = window.requestAnimationFrame(() => this.update());
  }

  toggle = () => {
    if (this.active) {
      this.stop();
      return;
    }

    this.start();
  }
}

export default (callbacks) => new Clock(callbacks);
