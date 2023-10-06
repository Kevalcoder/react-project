import React, { useState, useEffect } from 'react';

type PartDescriptorProps = {
  name: string;
  amount: number;
  notes: string;
  setNotes: (notes: string) => void; // Add setNotes function prop
};

const PartDescriptor = ({ name, amount, notes, setNotes }: PartDescriptorProps) => {
  const [inputNotes, setInputNotes] = useState(notes);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputNotes(e.target.value);
    setNotes(e.target.value); // Update notes state when input changes
  };

  useEffect(() => {
    setInputNotes(notes);
  }, [notes]);

  return (
    <div>
      <h3>Name: {name}</h3>
      <h3>Amount: {amount}</h3>
      <h3>Description: Lorem Ipsum dolor sit amet</h3>
      <h4>
        Notes: <input value={inputNotes} onChange={handleInputChange} />
      </h4>
    </div>
  );
};

export default PartDescriptor;
