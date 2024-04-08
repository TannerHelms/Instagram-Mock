import { Route } from "react-router";
import { useEffect } from "react";
import useInit from "../../hooks/use_init";
import useUsers from "../../api/use_users";

// This route will redirect the user to the home page if logged in

const RedirectRoute = ({ component: Componet, path }) => {
  const { navigate } = useInit();
  const { me } = useUsers();

  useEffect(() => {
    if (me.data) {
      navigate("/home");
    }
  }, [me]);

  if (!me.data && !me.isLoading) return <Componet />;
};

export default RedirectRoute;
