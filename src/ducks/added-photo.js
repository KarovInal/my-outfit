import { get } from 'lodash';
import random from 'Utils/random';

/* Types */
export const ADD_POINTER = 'ADD_POINTER';

const defaultState = {
  pointers: {},
  editablePoint: '',
  description: ''
};

/* Selectors */

export const getPointersAddedPhoto = state => get(state, 'addedPhoto.pointers', {})

/* Reducer */

const addedPhotoReducer = (state = defaultState, action) => {
  const { type, payload } = action;

  switch(type) {
    case ADD_POINTER:
      return {
        ...state,
        pointers: {
          ...state.pointers,
          [payload.pointerID]: {
            ID: payload.pointerID,
            coordinates: {
              x: payload.coordinates.x,
              y: payload.coordinates.y
            }
          }
        }
      }
    default:
      return state;
  }
};

/* Actions */

export const addPointer = (x, y) => {
  console.log(x, y);
  return {
    type: ADD_POINTER,
    payload: {
      pointerID: random(),
      coordinates: {
        x,
        y
      }
    }
  }
}

export default addedPhotoReducer;
