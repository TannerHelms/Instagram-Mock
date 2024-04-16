import React from 'react';
import { Avatar } from "@mantine/core";

const RemoveFriendsModal = ({ onClose, onRemove, friendsList }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Friends List</h2>
        {friendsList.length === 0 ? (
          <p className="text-gray-600 mb-4">You have no friends.</p>
        ) : (
          <ul className="space-y-3">
            {friendsList.map(friend => (
              <li key={friend.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar src={friend.from.backgroundImage} size={"40px"} />
                  <span className="text-base">{friend.from.user.firstName} {friend.from.user.lastName}</span>
                </div>
                <button onClick={() => onRemove(friend.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Remove</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Close</button>
      </div>
    </div>
  );
};

export default RemoveFriendsModal;
