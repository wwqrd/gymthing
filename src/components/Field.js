import React from 'react';
import './Field.css';

const Field = ({
  value,
  unit,
  ...rest,
}) => (
  <div className="Field">
    <input
      type="text"
      value={value}
      className="Field__input"
      {...rest}
    />
    <div className="Field__unit">{unit}</div>
  </div>
);

export default Field;
