import uuid from 'uuid';

const blankExercise = {
  weight: 0,
  reps: 0,
  sets: 0,
};

const initialState = [
  //{
    //id: 'foo',
    //name: 'foo',
    //weight: 44,
    //reps: 4,
    //sets: 3,
    //group: 'alpha'
  //},
];

const UPDATE_EXERCISE = 'EXERCISES/UPDATE_EXERCISE';
const NEW_EXERCISE = 'EXERCISES/NEW_EXERCISE';

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case UPDATE_EXERCISE:
      return state.map((exercise) => {
        if (exercise.id !== action.id) { return exercise; }

        return {
          ...exercise,
          ...action.payload,
        };
      });
    case NEW_EXERCISE: {
      const exercise = {
        id: action.id,
        ...blankExercise,
        ...action.payload,
      };

      return [
        ...state,
        exercise,
      ];
    }
    default:
      return state;
  }
}

const updateExercise = (id, payload = {}) => ({
  type: UPDATE_EXERCISE,
  id,
  payload,
});

const newExercise = (payload = {}) => ({
  type: NEW_EXERCISE,
  id: uuid(),
  payload,
});

const actionCreators = {
  updateExercise,
  newExercise,
};

const actionTypes = {
  UPDATE_EXERCISE,
  NEW_EXERCISE,
};

export {
  actionCreators,
  actionTypes,
};
