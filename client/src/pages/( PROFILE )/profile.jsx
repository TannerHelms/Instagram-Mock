import { useEffect, useState } from 'react';
import useUsers from "../../api/use_users";
import useFriends from "../../api/use_friends";
import useLogout from "../../hooks/use_logout";
import usePosts from "../../api/use_posts";

const Profile = () => {
  const { me } = useUsers();
  const { usersPosts } = usePosts();
  const { friends, friendsLoading, friendRequests, requestsLoading} = useFriends();
  const { logout } = useLogout();

  const [posts, setPosts] = useState([]);
  useEffect(() => {
    if (me.data.id) {
      usersPosts(me.data.id)
        .then(posts => setPosts(posts))
        .catch(error => console.error('Error fetching user posts:', error));
    }
  }, [me.data.id]);

  if (!friends || friendsLoading || !friendRequests || requestsLoading) {
    return <div className="center flex flex-col gap-2 items-center">Loading...</div>;
  }

  const friendsList = friends.friends
  const sentList = friendRequests.sent
  const receivedList = friendRequests.received

  const handleProfileSettings = () => {
    // Logic to change profile settings
  };

  return (
    <div class="flex flex-col min-h-screen">
      <div class="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div class="flex justify-between items-center px-4 py-2">
          <div class="flex justify-left items-center">
            <img src={me.data.backgroundImage} alt="Profile" class="h-16 rounded-full" />
            <strong class="ml-2">{me.data.firstName} {me.data.lastName}</strong>
          </div>
          <div class="flex justify-right items-center">
            <p class="text-gray-600 mr-4">Posts: {posts.length}</p>
            <p class="text-gray-600 mr-4">Friends: {friendsList.length}</p>
            <p class="text-gray-600 mr-4">Friend Requests: {receivedList.length}</p>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={handleProfileSettings}>Settings</button>
            <button class="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600" onClick={logout}>Logout</button>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-center my-24">
        <div class="mt-4 max-w-screen-lg overflow-y-auto">
          <div class="grid grid-cols-3 gap-2">
            {posts.length > 0 ? posts.map(post => (
              <div key={post.id} class="relative">
                <img src={post.image} alt="Post" class="w-full h-auto" />
              </div>
            )) : <p>No posts yet!</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
