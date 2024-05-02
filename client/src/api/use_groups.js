import useApi from "../hooks/use_api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import timeAgo from "../utils/time_ago";

const useGroups = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();

    const all = async () => {
        const groups = (await api.get("/groups")).groups;

        groups.map((group) => {
            group.lastMessageAt = timeAgo(new Date(group.lastMessageAt));
            return group;
        });
        return groups;
    };

    const get = async () => {
        const group = (await api.get(`/groups/${id}`)).group;
        group.lastMessageAt = timeAgo(new Date(group.lastMessageAt));
        group.messages.map((message) => {
            message.createdAt = timeAgo(new Date(message.createdAt));
            return message;
        });
        return group;
    }

    const groups = useQuery({
        queryKey: ["groups"],
        queryFn: all,
    });

    const group = useQuery({
        queryKey: ["group", id],
        queryFn: get,
        enabled: !!id,
    });

    return { group, groups }
}

export default useGroups;