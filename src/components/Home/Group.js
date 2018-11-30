import React from 'react';
import { Link } from 'react-router-dom';
import Exercise from './Exercise';

const Group = ({
  exercises,
  group,
}) => (
  <Link to={`/group/${group}`}>
    <div>
      { exercises.map(Exercise) }
    </div>
    <div>
      {group}
    </div>
  </Link>
);

export { Group };

export default Group;
