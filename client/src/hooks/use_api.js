import { useContext } from "react";
import { ApiContext } from "../utils/api";


const useApi = () => {
  return useContext(ApiContext);
}

export default useApi;
