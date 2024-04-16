import { useEffect, useState } from 'react';
import useUsers from "../../api/use_users";
import useFriends from "../../api/use_friends";
import usePosts from "../../api/use_posts";
import { useParams } from 'react-router-dom';

const otherProfile = () => {
  const { id } = useParams();
  const { user } = useUsers(id);
  const { usersPosts } = usePosts();
  const { getFriends} = useFriends();

  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState(undefined);

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
    } 
  }, [user]);

  if (!user.data || !friends) {
    return <div className="center flex flex-col gap-2 items-center">Loading...</div>;
  }

  const friendsList = friends.friends

  const handleFollow = () => {
    // Logic to follow user
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex justify-left items-center">
            <img src={user.data.backgroundImage} alt="Profile" className="h-16 rounded-full" />
            <strong className="ml-2">{user.data.firstName} {user.data.lastName}</strong>
          </div>
          <div className="flex justify-right items-center">
            <p className="text-gray-600 mr-4">Posts: {posts.length}</p>
            <p className="text-gray-600 mr-4">Friends: {friendsList.length}</p>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2" onClick={handleFollow}>Follow</button>
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
    </div>
  );
};

export default otherProfile;
