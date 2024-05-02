import useApi from "../hooks/use_api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import timeAgo from "../utils/time_ago";

const usePosts = () => {
    const api = useApi();
    const queryClient = useQueryClient();

    const all = async () => {
        const posts = (await api.get("/posts")).posts;
        await Promise.all(posts.map(async (post) => {
            post.createdAt = timeAgo(new Date(post.createdAt));
            const img = new Image();
            await new Promise((resolve, reject) => {
                img.onload = () => {
                    resolve(post);
                }
                img.src = post.image;
            })
        }));
        return posts;
    };

    const usersPosts = async (id) => {
        const posts = (await api.get(`/posts/user/${id}`)).posts;
        await Promise.all(posts.map(async (post) => {
            post.createdAt = timeAgo(new Date(post.createdAt));
            await new Promise((resolve, reject) => {
                const img = new Image();
                img.onload = () => {
                    resolve(post);
                }
                img.src = post.image;
            });
        }));
        return posts;
    };

    const posts = useQuery({
        queryKey: ["posts"],
        queryFn: all,
    });

    return { posts, usersPosts }
}

export default usePosts;