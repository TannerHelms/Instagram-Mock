import React from 'react';
import { Avatar } from "@mantine/core";

const AcceptFriendsModal = ({ onClose, onAccept, friendRequests }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-lg font-semibold mb-4">Friend Requests</h2>
        {friendRequests.length === 0 ? (
          <p className="text-gray-600 mb-4">There are no pending friend requests.</p>
        ) : (
          <ul className="space-y-3">
            {friendRequests.map(request => (
              <li key={request.id} className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <Avatar src={request.from.backgroundImage} size={"40px"} />
                  <span className="text-base">{request.from.user.firstName} {request.from.user.lastName}</span>
                </div>
                <button onClick={() => onAccept(request.id)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Accept</button>
              </li>
            ))}
          </ul>
        )}
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">Close</button>
      </div>
    </div>
  );
};

export default AcceptFriendsModal;
