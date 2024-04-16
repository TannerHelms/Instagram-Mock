import React from 'react';

const RemoveFriendsModal = ({ onClose, onRemove, friendsList }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-4">Friends List</h2>
        <ul className="space-y-2">
          {friendsList.map(friend => (
            <li key={friend.id} className="flex justify-between items-center">
              <span>{friend.firstName} {friend.lastName}</span>
              <button onClick={() => onRemove(friend.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
            </li>
          ))}
        </ul>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Close</button>
      </div>
    </div>
  );
};

export default RemoveFriendsModal;
