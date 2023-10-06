import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PartDescriptor from '../components/PartDescriptor';
import { decrementPart, incrementPart, addNewPart } from '../actions/parts'; // Import the action for adding a new part
import { partsSelector } from '../selectors/local';

import './Home.sass';

const Home = () => {
  const [selectedPart, setSelectedPart] = useState<string>(null);
  const [notes, setNotes] = useState<string>(''); // Add state for notes field
  const [newPartName, setNewPartName] = useState<string>(''); // State for new part name
  const parts = useSelector(partsSelector);
  const dispatch = useDispatch();

  const handlePartClick = (partName: string) => {
    setSelectedPart(partName);
  };

  useEffect(() => {
    setNotes(''); // Reset notes field when a different part is selected
  }, [selectedPart]);

  const handleNewPartSubmit = () => {
    if (newPartName.trim() !== '') {
      dispatch(addNewPart(newPartName)); // Dispatch the action to add a new part
      setNewPartName(''); // Reset the input field
    }
  };

  return (
    <div>
      <h1>Parts Counter</h1>
      <hr />
      <ul className="partsList">
        {parts.map(part => (
          <li key={part.name} onClick={() => handlePartClick(part.name)}>
            {part.name} {part.amount}
            <button
              onClick={e => {
                dispatch(incrementPart(part.name));
              }}
            >
              +
            </button>
            <button
              onClick={e => {
                dispatch(decrementPart(part.name));
              }}
            >
              -
            </button>
          </li>
        ))}
      </ul>
      <hr />
      <h2>Part Info</h2>
      {selectedPart && (
        <>
          <PartDescriptor
            name={selectedPart}
            amount={parts.find(part => part.name === selectedPart).amount}
            notes={notes}
            setNotes={setNotes} // Pass setNotes function as prop
          />
        </>
      )}

      {/* Input field for new part */}
      <input
        type="text"
        placeholder="New Part Name"
        value={newPartName}
        onChange={e => setNewPartName(e.target.value)}
        onKeyPress={e => {
          if (e.key === 'Enter') {
            handleNewPartSubmit();
          }
        }}
      />
      <button onClick={handleNewPartSubmit}>Add New Part</button>
    </div>
  );
};

export default Home;
