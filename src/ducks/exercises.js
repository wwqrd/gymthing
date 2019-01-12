import uuid from 'uuid';

const initialState = [
  { id: 'foo', name: 'foo', weight: 44, reps: 4, sets: 3, group: 'alpha' },
  //{ id: 'bar', name: 'bar', weight: 20, reps: 6, sets: 3, group: 'alpha' },
  //{ id: 'bazz', name: 'bazz', weight: 14, reps: 8, sets: 3, group: 'bravo' },
];

const UPDATE_EXERCISE = 'EXERCISES/UPDATE_EXERCISE';
const CREATE_EXERCISE = 'EXERCISES/CREATE_EXERCISE';

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
    case CREATE_EXERCISE:
      return [
        ...state,
        action.payload,
      ];
    default:
      return state;
  }
}

const updateExercise = (id, payload) => ({
  type: UPDATE_EXERCISE,
  id,
  payload,
});

const createExercise = (payload) => ({
  type: CREATE_EXERCISE,
  id: uuid(),
  payload,
});

const actionCreators = {
  updateExercise,
};

const actionTypes = {
  UPDATE_EXERCISE,
};

export {
  actionCreators,
  actionTypes,
};
