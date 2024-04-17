import useApi from "../hooks/use_api";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import timeAgo from "../utils/time_ago";

const useGroups = () => {
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

    const groups = useQuery({
        queryKey: ["groups"],
        queryFn: all,
    });

    return { groups }
}

export default useGroups;