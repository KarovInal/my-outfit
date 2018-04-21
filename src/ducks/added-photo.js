import { get } from 'lodash';

/* Types */
export const ADD_POINTER = 'ADD_POINTER';
export const EDIT_DATA_POINTER = 'EDIT_DATA_POINTER';
export const REMOVE_EDIT_POINTER = 'REMOVE_EDIT_POINTER';
export const SET_CURRENT_POINTER = 'SET_CURRENT_POINTER';
export const REMOVE_CURRENT_POINTER = 'REMOVE_CURRENT_POINTER';

export const EDIT_MOD = 'EDIT_MOD';
export const ADD_MOD = 'ADD_MOD';

/*
  pointers - список точек
  currentPointer - id добавляемой точки
  description - описание лука
*/

const defaultState = {
  pointers: {},
  currentPointer: {},
  description: ''
};

/* Selectors */

export const getPointersAddedPhoto = state => get(state, 'addedPhoto.pointers', {});
export const getCurrentPointerAdd = state => {
  const currentPointer = get(state, 'addedPhoto.currentPointer', {});
  const currentPointerMod = get(currentPointer, 'mod', '');
  const currentPointerID = get(currentPointer, 'ID', '');

  if(currentPointerMod === ADD_MOD) {
    const pointObject = get(state, ['addedPhoto', 'pointers', currentPointerID]);

    return pointObject;
  } else {
    return null;
  }
};

export const getCurrentPointerEdit = state => {
  const currentPointer = get(state, 'addedPhoto.currentPointer', {});
  const currentPointerMod = get(currentPointer, 'mod', '');
  const currentPointerID = get(currentPointer, 'ID', '');

  if(currentPointerMod === EDIT_MOD) {
    const pointObject = get(state, ['addedPhoto', 'pointers', currentPointerID]);

    return pointObject;
  } else {
    return null;
  }
};

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
    case EDIT_DATA_POINTER:
      return {
        ...state,
        editPointID: payload.editPointID,
        pointers: {
          ...state.pointers,
          [payload.pointerID]: {
            ...state.pointers[payload.pointerID],
            ...payload.data
          }
        }
      }
    case SET_CURRENT_POINTER:
      return {
        ...state,
        currentPointer: {
          ID: payload.pointerID,
          mod: payload.mod
        }
      }
    case REMOVE_CURRENT_POINTER:
      return {
        ...state,
        currentPointer: {}
      }
    default:
      return state;
  }
};

/* Actions */

export const addPointer = (x, y, pointerID) => {
  return {
    type: ADD_POINTER,
    payload: {
      pointerID,
      coordinates: {
        x,
        y
      }
    }
  }
}

export const editDataPoint = (pointerID, data) => {
  return {
    type: EDIT_DATA_POINTER,
    payload: {
      pointerID,
      data
    }
  }
}

export const setCurrentPointerEdit = pointerID => {
  return {
    type: SET_CURRENT_POINTER,
    payload: {
      pointerID,
      mod: EDIT_MOD
    }
  }
}

export const setCurrentPointerAdd = pointerID => {
  return {
    type: SET_CURRENT_POINTER,
    payload: {
      pointerID,
      mod: ADD_MOD
    }
  }
}

export const removeCurrentPointer = () => {
  return {
    type: REMOVE_CURRENT_POINTER
  }
}

export default addedPhotoReducer;
