import { Dispatch } from 'redux';

export const INCREMENT_PART = 'local/INCREMENT_PART';
export const DECREMENT_PART = 'local/DECREMENT_PART';
export const ADD_NEW_PART = 'local/ADD_NEW_PART'; // Add a new action type for adding a new part

export const incrementPart = (partName: string) => (dispatch: Dispatch<any>) =>
  dispatch({
    type: INCREMENT_PART,
    partName,
  });

export const decrementPart = (partName: string) => (dispatch: Dispatch<any>) =>
  dispatch({
    type: DECREMENT_PART,
    partName,
  });

// Action creator for adding a new part
export const addNewPart = (name: string) => (dispatch: Dispatch<any>) =>
  dispatch({
    type: ADD_NEW_PART,
    name,
  });
