import { useQuery, useQueryClient } from "@tanstack/react-query";
import useApi from "../hooks/use_api";
import useUsers from "./use_users";

const useFriends = (userId) => {
  const api = useApi();
  const queryClient = useQueryClient();
  const { me } = useUsers();

  // GET FRIENDS
  const getFriends = async (id) => {
    const friends = await api.get(`/friends/user/${id}}`);
    return friends;
  };

  const myFriends = async () => {
    return (await api.get(`/friends/user/${me.data.id}`)).friends;
  }

  const removeFriend = async (friendId) => {
    await api.del(`/friends/${friendId}`);
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

  const myFriendRequests = async () => {
    const req = await api.get(`/friends/user/${parseInt(me.data.id)}/requests`);
    return req;
  }

  const cancel = async (toId) => {
    await api.del(`/friends/request/${toId}`);
    queryClient.invalidateQueries("requests");
  }

  const friends = useQuery({
    queryKey: ["friends"],
    queryFn: myFriends,
  });

  const requests = useQuery({
    queryKey: ["requests"],
    queryFn: myFriendRequests,
  });


  return {
    getFriends,
    getFriendRequests,
    removeFriend,
    addFriend,
    acceptFriendRequest,
    friends,
    requests,
    cancel,
  };
};

export default useFriends;
