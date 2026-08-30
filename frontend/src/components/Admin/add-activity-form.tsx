'use client';
import React, { useState } from 'react';
import { ModalFooter } from '../ui/animated-modal';

const AddActivityForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  // the add activity form, use to manage activity
  // initialise all state of attributes
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [status, setStatus] = useState('');
  const [building, setBuilding] = useState('');
  const [floor, setFloor] = useState('');

  // handle the submit event
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const activityData = {
      name,
      description,
      date,
      status,
      building,
      floor,
    };

    // fetch data through the RESTful API and handle different response
    try {
      const response = await fetch('http://127.0.0.1:8000/activity/add-activity/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      });

      // handle response
      if (response.ok) {
        console.log('Activity added successfully!');
        onClose();
      } else {
        console.error('Failed to add activity');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  // The html component for the form
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4 m-1">
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="name">
          Activity Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-[90%] p-2 text-white rounded border border-neutral-800 bg-neutral-900"
          placeholder="name"
          required
        />
      </div>
      <div className="mb-4 m-1">
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-[90%] p-2 rounded border border-neutral-800 bg-neutral-900"
          placeholder="description"
          required
        />
      </div>
      <div className="mb-4 m-1">
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="date">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-[90%] p-2 text-white rounded border border-neutral-800 bg-neutral-900"
          required
        />
      </div>
      <div className="mb-4 m-1">
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="status">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-[90%] p-2 text-white rounded border border-neutral-800 bg-neutral-900"
          required
        >
          <option value="" disabled>
            Select status
          </option>
          <option value="Open">Open</option>
          <option value="Close">Close</option>
        </select>
      </div>
      <div className="mb-4 m-1">
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="building">
          Building
        </label>
        <select
          id="building"
          value={building}
          onChange={(e) => setBuilding(e.target.value)}
          className="w-[50%] p-2 text-white rounded border border-neutral-800 bg-neutral-900"
          required
        >
          <option value="" disabled>
            Select building
          </option>
          <option value="1">Building 1</option>
          <option value="2">Building 2</option>
          <option value="3">Building 3</option>
          <option value="4">Building 4</option>
          <option value="5">Building 5</option>
          <option value="6">Building 6</option>
        </select>
        <label className="block text-lg text-customBlue_300 mb-1" htmlFor="floor">
          Floor
        </label>
        <select
          id="floor"
          value={floor}
          onChange={(e) => setFloor(e.target.value)}
          className="w-[50%] p-2 text-white rounded border border-neutral-800 bg-neutral-900"
          required
        >
          <option value="" disabled>
            Select floor
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
        </select>
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
          Add Activity
        </button>
      </ModalFooter>
    </form>
  );
};

export default AddActivityForm;
