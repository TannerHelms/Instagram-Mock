import { useEffect } from "react";
import useUsers from "../../api/use_users";
import useInit from "../../hooks/use_init";
import useNavbar from "../../hooks/use_navbar";

// Protected Route that will redirect to the given route

const ProtectedRoute = ({ component: Componet, path = "/login" }) => {
  useNavbar();
  const { me } = useUsers();
  const { navigate } = useInit();

  useEffect(() => {
    if (me.error || (!me.isLoading && !me.data)) {
      navigate(path);
    }
  }, [me]);

  if (me?.data) return <Componet />;
};
export default ProtectedRoute;
