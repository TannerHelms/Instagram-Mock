import { useEffect, useState } from "react";
import useUsers from "../../api/use_users";
import useFriends from "../../api/use_friends";
import usePosts from "../../api/use_posts";
import { useParams } from "react-router-dom";
import { Avatar } from "@mantine/core";

const otherProfile = () => {
  const { id } = useParams();
  const { me, user } = useUsers(id);
  const { usersPosts } = usePosts();
  const { getFriends, addFriend, removeFriend, getFriendRequests } =
    useFriends();

  const [posts, setPosts] = useState([]);
  const [friends, setFriends] = useState(undefined);
  const [status, setStatus] = useState("Insert Text");

  const fetchData = async () => {
    if (id) {
      try {
        const posts = await usersPosts(id);
        setPosts(posts);

        const userFriends = await getFriends(id);
        setFriends(userFriends.friends);

        const requests = await getFriendRequests(id);

        if (userFriends.friends.length !== 0) {
          for (const friend of userFriends.friends) {
            if (friend.toId === me.data.id || friend.fromId === me.data.id) {
              setStatus("Unfollow");
              break;
            } else {
              setStatus("Follow");
            }
          }
        } else {
          for (const req of requests.received) {
            if (req.toId === me.data.id || req.fromId == me.data.id) {
              setStatus("Requested");
              break;
            } else {
              setStatus("Follow");
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBtn = () => {
    if (status == "Unfollow") {
      for (let friend of friends) {
        if (
          friend.fromId == me.data.id ||
          (friend.toId == me.data.id && friend.accepted)
        ) {
          removeFriend(friend.id);
        }
      }
      setStatus("Follow");
    } else if (status == "Follow") {
      addFriend(user.data.id, me.data.id);
      setStatus("Requested");
    } else {
      // nothing
    }
    fetchData();
  };

  if (!user.data || !friends) {
    return (
      <div className="center flex flex-col gap-2 items-center">Loading...</div>
    );
  }

  const friendsList = friends;

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
        <div className="flex justify-between items-center px-4 py-2">
          <div className="flex justify-left items-center">
            <Avatar src={user.data.backgroundImage} alt="Profile" size={"lg"} />
            <strong className="ml-2">
              {user.data.firstName} {user.data.lastName}
            </strong>
          </div>
          <div className="flex justify-right items-center">
            <p className="text-gray-600 mr-4">Posts: {posts.length}</p>
            <p className="text-gray-600 mr-4">Friends: {friendsList.length}</p>
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2"
              onClick={() => handleBtn()}
            >
              {status}
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center my-24">
        <div className="mt-4 max-w-screen-lg overflow-y-auto">
          <div className="grid grid-cols-3 gap-2 p-2">
            {posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.id} className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt="Post"
                    className="w-full h-auto aspect-square object-cover cursor-pointer hover:scale-125 transition-all duration-500"
                  />
                </div>
              ))
            ) : (
              <p>No posts yet!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default otherProfile;
