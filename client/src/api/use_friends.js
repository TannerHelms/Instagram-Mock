import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";

const useFriends = (id) => {
  const api = useApi();
  const queryClient = useQueryClient();

  // GET FRIENDS
  const getFriends = async (id) => {
    const friends = await api.get(`/friends/user/${id}`);
    return friends;
  };

  const removeFriend = async (friendId) => {
    await api.delete(`/friends/${friendId}`);
    queryClient.invalidateQueries("friends");
  };

  const addFriend = async (friendId, userId) => {
    await api.post("/friends", { from: userId, to: friendId });
    queryClient.invalidateQueries("friends");
  };

  const acceptFriendRequest = async (requestId) => {
    await api.post(`/friends/${requestId}`);
    queryClient.invalidateQueries("friends");
  };

  const getFriendRequests = async (id) => {
    const requests = await api.get(`/friends/user/${id}/requests`);
    return requests;
  };

  return {
    getFriends,
    getFriendRequests,
    removeFriend,
    addFriend,
    acceptFriendRequest,
  };
};

export default useFriends;
