import { clearToken } from "../redux/token_slice";
import { turnOffNavbar } from "../store/navbar_slice";
import useInit from "./use_init";

const useLogout = () => {
    const { dispatch, queryClient } = useInit();
    const logout = () => {
        dispatch(turnOffNavbar());
        dispatch(clearToken());
        queryClient.clear();
    }
    return { logout }
}

export default useLogout;