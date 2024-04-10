import useApi from "../hooks/use_api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import timeAgo from "../utils/time_ago";

const usePosts = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    const all = async () => {
        const posts = (await api.get("/posts")).posts;
        posts.map((post) => {
            post.createdAt = timeAgo(new Date(post.createdAt));
            return post;
        });
        return posts;
    };

    const usersPosts = async (id) => {
        const posts = (await api.get(`/posts/user/${id}`)).posts;
        posts.map((post) => {
            post.createdAt = timeAgo(new Date(post.createdAt));
            return post;
        });
        return posts;
    };

    const posts = useQuery({
        queryKey: ["posts"],
        queryFn: all,
    });

    return { posts, usersPosts}
}

export default usePosts;