import React, { useState } from 'react';

const ProfileEditModal = ({ onClose, onUpdate, initialProfileData }) => {
  const [formData, setFormData] = useState({
    firstName: initialProfileData.firstName || '',
    lastName: initialProfileData.lastName || '',
    age: parseInt(initialProfileData.age || 0),
    backgroundImage: initialProfileData.backgroundImage || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.age = parseInt(formData.age)
    onUpdate(formData);
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-md">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-bold mb-1">First Name:</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block font-bold mb-1">Last Name:</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border rounded-md px-2 py-1 w-full"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="age" className="block font-bold mb-1">Age:</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="border rounded-md px-2 py-1 w-full"
            />
          </div>
          {/* <div className="mb-4">
            <label htmlFor="backgroundImage" className="block font-bold mb-1">Background Image:</label>
            <input
              type="text"
              id="backgroundImage"
              name="backgroundImage"
              value={formData.backgroundImage}
              onChange={handleChange}
              className="border rounded-md px-2 py-1 w-full"
            />
          </div> */}
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button>
            <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
