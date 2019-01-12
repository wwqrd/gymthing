import React from 'react';
import './Field.css';

const Field = ({
  value,
  unit,
  onChange,
  ...rest,
}) => (
  <div className="Field">
    <input
      type="text"
      value={value}
      className="Field__input"
      onChange={(e) => {
        const value = e.target.value;
        onChange(value);
      }}
      {...rest}
    />
    <div className="Field__unit">{unit}</div>
  </div>
);

Field.defaultProps = {
  onChange: () => {},
};

export default Field;
