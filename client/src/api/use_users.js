import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import useApi from "../hooks/use_api";

import { flattenObject } from "../utils/flatten";
import { token as tk } from "../redux/token_slice";

const useUsers = (id) => {
    const api = useApi();
    const queryClient = useQueryClient();
    const token = useSelector(tk)

    const getProfile = async (userId) => {
        userId = parseInt(userId, 10)
        const me = (await api.get(`/users/${userId}/profile`))
        return flattenObject(me)
    }

    // GET ME
    const getMe = async () => {
        const me = (await api.get("/users/me")).user
        return flattenObject(me)
    };

    const me = useQuery({
        queryKey: ["me"],
        queryFn: getMe,
        enabled: token != null,
    })

    // CRUD FUNCATIONALITY
    const all = async () => {
        const users = (await api.get('/users')).users;
        return users.map((user) => {
            const flat = flattenObject(user);
            queryClient.setQueryData(["user", user.id], flat);
            return flat;
        });
    };

    const get = async () => {
        const user = await api.get(`/users/${id}`)
        return flattenObject(user)
    };

    const update = async (userId, data) => {
        const updatedUser = await api.put(`/users/${userId}/profile`, data);
        return flattenObject(updatedUser);
    };


    // ALL USERS
    const users = useQuery({
        queryKey: ["users"],
        queryFn: all,
        enabled: token != null,
    });

    // SINGLE USER
    const user = useQuery({
        queryKey: ["user", id],
        queryFn: get,
        enabled: !!id,
    });


    return { me, user, users, getProfile, updateProfile: update}
}

export default useUsers