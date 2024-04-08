import { useMutation } from "@tanstack/react-query";
import useInit from "./use_init";
import { setToken } from "../redux/token_slice";


const useLogin = () => {
    const { api, dispatch, queryClient } = useInit();

    const login = ({ email, password }) => {
        return api.post("/sessions", { email, password })
    };

    const { mutateAsync: loginMutation, error } = useMutation({
        queryKey: ["user"],
        mutationFn: login,
        onSuccess: async ({ token }) => {
            await dispatch(setToken({ token }))
            queryClient.invalidateQueries(["me"]);
        },
    });

    return { login: loginMutation, error };
}

export default useLogin;