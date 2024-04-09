import { useSelector } from "react-redux";
import useUsers from "../../api/use_users";
import useLogout from "../../hooks/use_logout";
import { nav } from "../../redux/navbar_slice";
import { Button, Divider } from "@mantine/core";
import useInit from "../../hooks/use_init";
import { FaBeer, FaHome, FaPersonBooth, FaSearch } from "react-icons/fa";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

const iconSize = "30px";
const pages = [
  { icon: <IoHomeOutline size={iconSize} />, link: "/home" },
  { icon: <IoSearch size={iconSize} />, link: "/search" },
  { icon: <AiOutlinePlusSquare size={iconSize} />, link: "/create" },
  { icon: <CgProfile size={iconSize} />, link: "/profile" },
];

const Navbar = () => {
  const { me } = useUsers();
  const { logout } = useLogout();
  const navbar = useSelector(nav);
  const { navigate } = useInit();

  if (!navbar) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white h-20">
      <div className="flex justify-between m-auto w-full center max-w-96">
        {pages.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer hover:bg-slate-400 p-3"
            onClick={() => navigate(item.link)}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};
export default Navbar;
