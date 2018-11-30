import React from 'react';
import { Link } from 'react-router-dom';

const Exercise = ({ name, id }) => (
  <Link to={`/exercise/${id}`}>
    {name}
  </Link>
);

export default Exercise;
