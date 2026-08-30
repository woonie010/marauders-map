'use client';
import React, { useState } from 'react';
import { ModalFooter } from '../ui/animated-modal';

const AddLocationForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // the add location form, use to manage location within buildings / enviroments
  // initialise all state of attributes
  const [floor, setFloor] = useState('');
  const [building, setBuilding] = useState('');

  // handle the submit event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const locationData = {
      building,
      floor,
    };

    // fetch data through the RESTful API and handle different response
    try {
      const response = await fetch('http://127.0.0.1:8000/position/add-position/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(locationData),
      });

      // handle response
      if (response.ok) {
        console.log('Location added successfully!');
        onClose();
      } else {
        console.error('Failed to add location');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 m-1">
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="name">
          Building
        </label>
        <input
          type="text"
          id="building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          className="w-full p-2 text-white rounded border border-neutral-800 bg-neutral-900"
          placeholder="building"
          required
        />
      </div>
      <div className="mb-4 m-1">
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="name">
          Floor
        </label>
        <input
          type="text"
          id="floor"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          className="w-full p-2 text-white rounded border border-neutral-800 bg-neutral-900"
          placeholder="floor"
          required
        />
      </div>
      <ModalFooter className="gap-4">
        <button
          type="button"
          className="px-2 py-1 bg-neutral-700 border-black text-white border rounded-md text-sm w-28"
          onClick={onClose}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-monashBlue text-customBlue_100 text-sm px-2 py-1 rounded-md border border-black w-28"
        >
          Add Location
        </button>
      </ModalFooter>
    </form>
  );
};

export default AddLocationForm;
