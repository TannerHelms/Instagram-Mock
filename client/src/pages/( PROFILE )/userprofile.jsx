import React, { useEffect, useState, useRef } from 'react';
import useUsers from "../../api/use_users";
import useFriends from "../../api/use_friends";
import useLogout from "../../hooks/use_logout";
import usePosts from "../../api/use_posts";
import ProfileEditModal from '../../componets/ui/profileEditModal';
import AcceptFriendsModal from '../../componets/ui/acceptFriendsModal';
import RemoveFriendsModal from '../../componets/ui/removeFriends.Modal';

const UserProfile = () => {
  const { me, updateProfile } = useUsers();
  const { usersPosts } = usePosts();
  const { getFriends, getFriendRequests, acceptFriendRequest, removeFriend } = useFriends();
  const { logout } = useLogout();

  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState(undefined);
  const [requests, setRequests] = useState(undefined);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isAcceptingFriends, setIsAcceptingFriends] = useState(false);
  const [isRemovingFriends, setIsRemovingFriends] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      if (me.data.id) {
        try {
          const userPosts = await usersPosts(me.data.id);
          setPosts(userPosts);
          
          const userFriends = await getFriends(me.data.id);
          setFriends(userFriends);

          const frequests = await getFriendRequests(me.data.id);
          setRequests(frequests)
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }
    };
    fetchData();
  }, [me.data.id]);


  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!friends || !requests) {
    return <div className="center flex flex-col gap-2 items-center">Loading...</div>;
  }

  const friendsList = friends.friends
  const receivedList = requests.received

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const openEditProfileModal = () => {
    setIsEditingProfile(true);
  };

  const closeEditProfileModal = () => {
    setIsEditingProfile(false);
  };

  const handleProfileUpdate = (updatedProfileData) => {
    updateProfile(me.data.id, updatedProfileData)
      .then(() => {
        closeEditProfileModal();
      })
      .catch(error => console.error('Error updating profile:', error));
      closeEditProfileModal
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex justify-left items-center">
            <img src={me.data.backgroundImage} alt="Profile" className="h-16 rounded-full" />
            <strong className="ml-2">{me.data.firstName} {me.data.lastName}</strong>
          </div>
          <div className="flex justify-right items-center relative">
            <p className="text-gray-600 mr-4">Posts: {posts.length}</p>
            <p className="text-gray-600 mr-4">Friends: {friendsList.length}</p>
            <p className="text-gray-600 mr-4">Friend Requests: {receivedList.length}</p>
            <div ref={dropdownRef} className="relative">
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={toggleDropdown}>Settings</button>
              {isDropdownOpen && (
                <div className="absolute top-full w-full right-0 mt-2 mr-2 bg-white border border-gray-200 shadow-lg rounded-md z-10" style={{ width: 'max-content' }}>
                  {/* Dropdown content */}
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={openEditProfileModal}>Edit User</button>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={() => setIsAcceptingFriends(true)}>Accept Friends</button>
                  <button className="block px-4 py-2 w-full text-left hover:bg-gray-100" onClick={() => setIsRemovingFriends(true)}>Remove Friends</button>
                </div>
              )}
            </div>
            <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-24">
        <div className="mt-4 max-w-screen-lg overflow-y-auto">
          <div className="grid grid-cols-3 gap-2">
            {posts.length > 0 ? posts.map(post => (
              <div key={post.id} className="relative">
                <img src={post.image} alt="Post" className="w-full h-auto" />
              </div>
            )) : <p>No posts yet!</p>}
          </div>
        </div>
      </div>

      {/* Render Edit Profile Modal */}
      {isEditingProfile && (
        <ProfileEditModal
          onClose={closeEditProfileModal}
          onUpdate={handleProfileUpdate}
          initialProfileData={me.data} // Optionally, pass initial profile data to the modal
        />
      )}

      {/* Render Accept Friends Modal */}
      {isAcceptingFriends && (
        <AcceptFriendsModal
          onClose={() => setIsAcceptingFriends(false)}
          onAccept={acceptFriendRequest}
          friendRequests={receivedList}
        />
      )}

      {/* Render Remove Friends Modal */}
      {isRemovingFriends && (
        <RemoveFriendsModal
          onClose={() => setIsRemovingFriends(false)}
          onRemove={removeFriend}
          friendsList={friendsList}
        />
      )}
    </div>
  );
};

export default UserProfile;
