import React from 'react';
import { Link } from 'react-router-dom';
import './Exercise.css';

const Exercise = ({
  id,
  name,
  weight,
  reps,
  sets,
  group,
  lastCompleted,
}) => (
  <Link
    className="exercises-exercise"
    to={`/exercise/${id}`}
  >
    <div className="exercises-exercise__field">{group}</div>
    <div className="exercises-exercise__field">{name}</div>
    <div className="exercises-exercise__field">
      { weight && `${weight} | ${reps} | ${sets}` }
    </div>
    <div className="exercises-exercise__field">{lastCompleted}</div>
  </Link>
);

export default Exercise;
