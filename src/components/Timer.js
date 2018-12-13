import React from 'react';
import './Timer.css';

const TIMER_FORMAT = 'm:ss';

const Timer = ({ time }) => (
  <div className="Timer">
    <div className="Timer__time">
      {time && time.toFormat(TIMER_FORMAT)}
    </div>
  </div>
);

export default Timer;
