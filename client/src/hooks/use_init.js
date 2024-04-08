import { useDispatch } from "react-redux";

import useApi from "./use_api";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const useInit = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const queryClient = useQueryClient();
    const api = useApi();
    return { dispatch, api, navigate, queryClient };
}

export default useInit;