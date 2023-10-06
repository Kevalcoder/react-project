import { AnyAction } from 'redux';
import { DECREMENT_PART, INCREMENT_PART, ADD_NEW_PART } from '../../actions/parts'; // Import the new action type
import { useState } from 'react';

const initialState = [
  {
    name: 'Wheel',
    amount: 0,
  },
  {
    name: 'Chasis',
    amount: 0,
  },
  {
    name: 'Engine',
    amount: 0,
  },
  {
    name: 'Windshield',
    amount: 0,
  },
];

const PartsList = () => {
  const [state, setState] = useState(initialState);
  const [selectedPart, setSelectedPart] = useState(null);

  const incrementPart = (partName) => {
    const idx = state.findIndex(part => part.name === partName);
    const newState = [...state];
    newState[idx].amount += 1;
    setState(newState);
  };

  const decrementPart = (partName) => {
    const idx = state.findIndex(part => part.name === partName);
    const newState = [...state];
    newState[idx].amount -= 1;
    setState(newState);
  };

  const parts = state.map((part) => {
    return `${part.name} - ${part.amount}`;
  });

  return { parts, incrementPart, decrementPart };
};

const partsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case INCREMENT_PART: {
      const idx = state.findIndex(part => part.name === action.partName);
      const newState = [...state];
      newState[idx].amount += 1;
      return newState;
    }
    case DECREMENT_PART: {
      const idx = state.findIndex(part => part.name === action.partName);
      const newState = [...state];
      newState[idx].amount -= 1;
      return newState;
    }
    case ADD_NEW_PART: { // Handle the new action type for adding a new part
      const { name } = action;
      const newPart = {
        name,
        amount: 0,
      };
      return [...state, newPart];
    }

    default:
      return state;
  }
};

export default partsReducer;
