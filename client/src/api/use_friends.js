import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";

const useFriends = () => {
  const api = useApi();
  const queryClient = useQueryClient();

  // GET FRIENDS
  const getFriends = async () => {
    const friends = await api.get(`/friends`);
    return friends;
  };

  const removeFriend = async (friendId) => {
    await api.delete(`/friends/${friendId}`);
    queryClient.invalidateQueries("friends");
  };

  const addFriend = async (friendId) => {
    await api.post("/friends", { from: userId, to: friendId });
    queryClient.invalidateQueries("friends");
  };

  const acceptFriendRequest = async (requestId) => {
    await api.post(`/friends/${requestId}`);
    queryClient.invalidateQueries("friends");
  };

  const getFriendRequests = async () => {
    const requests = await api.get("/friends/requests");
    return requests;
  };

  // FETCHES FRIEND DATA
  const { data: friends, isLoading: friendsLoading } = useQuery({
    queryKey: ["friends"],
    queryFn: getFriends,
  });

  // FETCHES FRIEND REQUEST DATA
  const { data: friendRequests, isLoading: requestsLoading } = useQuery({
    queryKey: ["friendrequests"],
    queryFn: getFriendRequests,
  });

  return {
    friends,
    friendsLoading,
    removeFriend,
    addFriend,
    acceptFriendRequest,
    friendRequests,
    requestsLoading,
  };
};

export default useFriends;
