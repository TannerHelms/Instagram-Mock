import useApi from "../hooks/use_api";
import useInit from "../hooks/use_init";
import { useMutation } from "@tanstack/react-query";
const useMessages = (id) => {
    const api = useApi();
    const { queryClient } = useInit();
    const send = ({ body, image, senderId, groupId }) => {
        return api.post("/messages", {
            body,
            image,
            senderId,
            groupId,
        });
    };

    const sendMutate = useMutation({
        mutationFn: send,
        onSuccess: () => {
            queryClient.invalidateQueries(["group", id]);
        },
        enabled: !!id,
    });

    return { send: sendMutate }
}

export default useMessages;