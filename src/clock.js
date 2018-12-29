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
    window.cancelAnimationFrame(this.requestId);

    if (this.active) {
      this.reset();
    }

    this.active = true;

    this.setClock({
      start: new Date(),
      time: Duration.fromMillis(0),
    });

    this.update();
    this.callbacks.onStart(this.clock.time);
  }

  stop = () => {
    window.cancelAnimationFrame(this.requestId);
    this.active = false;

    this.callbacks.onStop(this.clock.time);
  };

  reset = () => {
    window.cancelAnimationFrame(this.requestId);
    this.callbacks.onReset(this.clock.time);

    this.setClock({
      start: new Date(),
      time: Duration.fromMillis(0),
    });
  };

  tick = () => {
    const now = new Date();
    const d = now - this.clock.start
    const time = Duration.fromMillis(d);

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
