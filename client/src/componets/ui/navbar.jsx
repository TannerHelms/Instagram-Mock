import { useSelector } from "react-redux";
import useUsers from "../../api/use_users";
import useLogout from "../../hooks/use_logout";
import { nav } from "../../redux/navbar_slice";
import { Button, Divider } from "@mantine/core";
import useInit from "../../hooks/use_init";

const pages = [
  { name: "Home", link: "/home" },
  { name: "Profile", link: "/profile" },
];

const Navbar = () => {
  const { me } = useUsers();
  const { logout } = useLogout();
  const navbar = useSelector(nav);
  const { navigate } = useInit();

  if (!navbar) return null;

  return (
    <div className="flex gap-4 p-5">
      {pages.map((page) => (
        <Button
          key={page.name}
          data-link={page.link}
          onClick={() => navigate(page.link)}
        >
          {page.name}
        </Button>
      ))}
      <Button onClick={logout}>Logout</Button>
    </div>
  );
};
export default Navbar;
