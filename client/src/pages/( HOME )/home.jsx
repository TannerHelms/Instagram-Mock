import usePosts from "../../api/use_posts";
import {
  Avatar,
  Button,
  Card,
  Image,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { HiDotsHorizontal } from "react-icons/hi";
import { FaRegHeart, FaThumbsUp } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import useUsers from "../../api/use_users";
import { useDisclosure } from "@mantine/hooks";
import useInit from "../../hooks/use_init";
import useFriends from "../../api/use_friends";
import { useEffect, useState } from "react";

const iconSize = "30px";

const Home = () => {
  const { me, getProfile, updateProfile } = useUsers();
  const { posts } = usePosts();
  const [visible, { toggle }] = useDisclosure(true);
  const { navigate } = useInit();
  const { addFriend, friends, requests, cancel } = useFriends();
  const [likedPosts, setLikedPosts] = useState([]);
  if (posts.isLoading || requests.isLoading)
    return (
      <LoadingOverlay
        visible={posts.isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />
    );

  if (posts.error) return <div>Error: {posts.error.message}</div>;

  const handleAddFriend = (id) => {
    addFriend(id, me.data.id);
  };

  const handleLike = async (id) => {
    const temp = await getProfile(me.data.id);
    console.log(temp);

    if (likedPosts.includes(id)) {
      setLikedPosts(likedPosts.filter((postId) => postId !== id));
    } else {
      setLikedPosts([...likedPosts, id]);
      const data = me.data;
      data.likedPosts = [...likedPosts];
      const update = await updateProfile(me.data.id, data);
    }
  }

  const state = (id) => {
    if (!friends.data) return "Follow";
    if (friends.data.some((e) => e.toId === id || e.fromId === id)) {
      return { text: "Unfollow", color: "green" };
    } else if (requests.data.sent.some((e) => e.toId === id)) {
      return { text: "Cancel", color: "red", click: () => cancel(id) };
    } else {
      return {
        text: "Follow",
        color: "blue",
        click: () => handleAddFriend(id),
      };
    }
  };

  const FollowButton = (id) => {
    const btnState = state(id);
    return (
      <Button onClick={btnState.click} color={btnState.color}>
        {btnState.text}
      </Button>
    );
  };

  return (
    <div className="overflow-y-auto">
      <div className="flex flex-col gap-4 justify-center p-3">
        {posts.data.map((post) => (
          <Card
            key={post.id}
            className="bg-white p-4 rounded-lg flex flex-col gap-3"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            {/* TOP CONTAINER */}
            <div className="flex justify-between">
              <div className="flex gap-3 items-center">
                <Avatar src={post.author.backgroundImage} size={"40px"} />
                <Text
                  className="hover:underline cursor-pointer"
                  onClick={() => navigate(`/otherprofile/${post.author.id}`)}
                >
                  {post.author.user.firstName} {post.author.user.lastName}
                </Text>
              </div>
              <div className="flex gap-3 items-center">
                {FollowButton(post.author.id)}
                <span className="cursor-pointer">
                  <HiDotsHorizontal
                    onClick={() => navigate(`/otherprofile/${post.author.id}`)}
                  />
                </span>
              </div>
            </div>
            {/* POST PICTURE */}
            <Image src={post.image} alt={post.title} />

            {/* LIKE BUTTON & LIKES */}
            {likedPosts.includes(post.id) ? (
                <FaHeart
                  size={iconSize}
                  className="cursor-pointer"
                  onClick={() => handleLike(post.id)}
                />
              ) : (
                <FaRegHeart
                  size={iconSize}
                  className="cursor-pointer"
                  onClick={() => handleLike(post.id)}
                />
            )}
            {/* POST DESCRIPTION */}
            <Text>{post.body}</Text>

            {/* Date OF POST */}
            <p>{post.createdAt}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
