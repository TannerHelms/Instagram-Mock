import { useLocation, useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { turnOffNavbar, turnOnNavbar } from "../store/navbar_slice";
import useUsers from "../api/use_users";

const noNavbar = ["groups/1"];

const useNavbar = () => {
    const { me } = useUsers();
    const location = useLocation();
    const path = location.pathname.split("/", 2)[1];
    const dispatch = useDispatch();

    useEffect(() => {
        if (me.data) {
            noNavbar.includes(path) ? dispatch(turnOffNavbar()) : dispatch(turnOnNavbar())
        } else {
            dispatch(turnOffNavbar());
        }
    }, [me, location])
}

export default useNavbar;