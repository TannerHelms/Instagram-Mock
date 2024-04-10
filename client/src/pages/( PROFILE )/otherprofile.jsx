import { useEffect, useState } from 'react';
import useUsers from "../../api/use_users";
import useFriends from "../../api/use_friends";
import usePosts from "../../api/use_posts";
import { useParams } from 'react-router-dom';

const otherProfile = () => {
  const { id } = useParams();
  const { user } = useUsers(id);
  const { usersPosts } = usePosts();
  const { getFriends, getFriendRequests} = useFriends();

  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState(undefined);
  const [requests, setRequests] = useState(undefined);

  useEffect(() => {
    if(id){
      usersPosts(id)
        .then(posts => setPosts(posts))
        .catch(error => console.error('Error fetching user posts:', error));
  
      getFriends(id)
        .then(friends => {
          setFriends(friends);
        })
        .catch(error => console.error('Error fetching friends:', error));
  
      getFriendRequests(id)
        .then(requests => setRequests(requests))
        .catch(error => console.error('Error fetching friend requests:', error));
    } 
  }, [user]);

  if (!user.data || !friends || !requests) {
    return <div className="center flex flex-col gap-2 items-center">Loading...</div>;
  }

  const friendsList = friends.friends
  const sentList = requests.sent
  const receivedList = requests.received

  const handleProfileSettings = () => {
    // Logic to change profile settings
  };

  return (
    <div class="flex flex-col min-h-screen">
      <div class="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div class="flex justify-between items-center px-4 py-2">
          <div class="flex justify-left items-center">
            <img src={user.data.backgroundImage} alt="Profile" class="h-16 rounded-full" />
            <strong class="ml-2">{user.data.firstName} {user.data.lastName}</strong>
          </div>
          <div class="flex justify-right items-center">
            <p class="text-gray-600 mr-4">Posts: {posts.length}</p>
            <p class="text-gray-600 mr-4">Friends: {friendsList.length}</p>
            <p class="text-gray-600 mr-4">Friend Requests: {receivedList.length}</p>
            <button class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={handleProfileSettings}>Follow</button>
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

export default otherProfile;
