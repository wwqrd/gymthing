
const initialState = [
  { id: 'foo', name: 'foo', weight: 44, reps: 4, group: 'alpha' },
  { id: 'bar', name: 'bar', weight: 20, reps: 6, group: 'alpha' },
  { id: 'bazz', name: 'bazz', weight: 14, reps: 8, group: 'bravo' },
];

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    default:
      return state;
  }
}


const actionCreators = {

};

const actionTypes = {

};

export {
  actionCreators,
  actionTypes,
};
