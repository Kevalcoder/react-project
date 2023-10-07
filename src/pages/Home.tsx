import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addNewPart, decrementPart, incrementPart } from '../actions/parts';
import PartDescriptor from '../components/PartDescriptor';
import { partsSelector } from '../selectors/local';

import './Home.sass';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState<string>(null);
  const [notes, setNotes] = useState<string>('');
  const [newPartName, setNewPartName] = useState<string>('');
  const parts = useSelector(partsSelector);
  const dispatch = useDispatch();

  const handlePartClick = (partName: string) => {
    if (selectedPart !== partName) {
      setSelectedPart(partName);
      setNotes('');
      setNewPartName('');
    }
  };

  const handleIncrement = (partName: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedPart === partName) {
      dispatch(incrementPart(partName));
    }
  };

  const handleDecrement = (partName: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (selectedPart === partName) {
      dispatch(decrementPart(partName));
    }
  };

  const handleNewPartSubmit = () => {
    if (newPartName.trim() !== '') {
      const existingPart = parts.find((part) => part.name === newPartName);
      if (!existingPart) {
        dispatch(addNewPart(newPartName));
        setNewPartName('');
      } else {
        // Prompt the user that the part name already exists
        window.alert('Part with the same name already exists!');
      }
    }
  };

  return (
    <div>
      <h1>Parts Counter</h1>
      <hr />
      <h3>Add New Part</h3>
      <input type="text" value={newPartName} onChange={(e) => setNewPartName(e.target.value)} />
      <button onClick={handleNewPartSubmit}>Add Part</button>
      <hr />
      <ul className="partsList">
        {parts.map((part) => (
          <li
            key={part.name}
            onClick={() => handlePartClick(part.name)}
            className={selectedPart === part.name ? 'selected' : ''}
          >
            {part.name} {part.amount}
            <div className="increment-decrement">
              <button className={selectedPart === part.name ? 'selected' : ''} onClick={(e) => handleIncrement(part.name, e)}>+</button>
              <button className={selectedPart === part.name ? 'selected' : ''} onClick={(e) => handleDecrement(part.name, e)}>-</button>
            </div>
          </li>
        ))}
      </ul>
      {selectedPart && (
        <>
          <hr />
          <h2>Part Info</h2>
          <PartDescriptor
            name={selectedPart}
            amount={parts.find((part) => part.name === selectedPart).amount}
            notes={notes}
            setNotes={setNotes}
          />
        </>
      )}
    </div>
  );
};

export default Home;
