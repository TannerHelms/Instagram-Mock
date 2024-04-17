import { useMutation } from "@tanstack/react-query";
import axios from "axios";

const useSignUp = () => {

    const signup = ({ data, backgroundImage, profileImage }) => {
        const fd = new FormData();
        for (const key in data) {
            fd.append(key, data[key]);
        }

        fd.append("background", backgroundImage, backgroundImage.name);
        fd.append("profile", profileImage, profileImage.name);

        return axios.post("http://localhost:3000/users", fd, {
            headers: {
                'content-type': 'multipart/form-data'
            },
        })
    }

    const signupMutation = useMutation({
        queryKey: ["user"],
        mutationFn: signup,
    });

    return { signup: signupMutation };
}

export default useSignUp;