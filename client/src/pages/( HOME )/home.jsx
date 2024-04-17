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
import { FaRegComment } from "react-icons/fa";
import useUsers from "../../api/use_users";
import { useDisclosure } from "@mantine/hooks";

const iconSize = "30px";

const Home = () => {
  const { me } = useUsers();
  const { posts } = usePosts();
  const [visible, { toggle }] = useDisclosure(true);

  if (posts.isLoading)
    return (
      <LoadingOverlay
        visible={posts.isLoading}
        zIndex={1000}
        overlayProps={{ radius: "sm", blur: 2 }}
        loaderProps={{ color: "pink", type: "bars" }}
      />
    );

  if (posts.error) return <div>Error: {posts.error.message}</div>;

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
                <Text>
                  {post.author.user.firstName} {post.author.user.lastName}
                </Text>
              </div>
              <div className="flex gap-3 items-center">
                <Button>Follow</Button>
                <span className="cursor-pointer">
                  <HiDotsHorizontal />
                </span>
              </div>
            </div>
            {/* POST PICTURE */}
            <Image src={post.image} alt={post.title} />

            {/* LIKE BUTTON & LIKES */}
            <div className="flex gap-5">
              <FaRegHeart size={iconSize} className="cursor-pointer" />
              <FaRegComment size={iconSize} className="cursor-pointer" />
            </div>
            {/* POST DESCRIPTION */}
            <Text>{post.body}</Text>

            {/* DATE POSTED */}
            <div className="flex flex-row gap-4 items-center">
              <Avatar src={me.data.backgroundImage} size={"40px"} />
              <p className="label">Add a comment...</p>
            </div>

            {/* Date OF POST */}
            <p>{post.createdAt}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
