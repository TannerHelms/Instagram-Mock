import { AiOutlinePlusSquare } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";
import { IoHomeOutline, IoSearch } from "react-icons/io5";
import { MdChatBubbleOutline } from "react-icons/md";
import { useSelector } from "react-redux";
import useInit from "../../hooks/use_init";
import { nav } from "../../redux/navbar_slice";

const iconSize = "30px";
const pages = [
  { icon: <IoHomeOutline size={iconSize} />, link: "/home" },
  { icon: <IoSearch size={iconSize} />, link: "/search" },
  { icon: <AiOutlinePlusSquare size={iconSize} />, link: "/create" },
  { icon: <MdChatBubbleOutline size={iconSize} />, link: "/groups" },
  { icon: <CgProfile size={iconSize} />, link: "/profile" },
];

const Navbar = () => {
  const navbar = useSelector(nav);
  const { navigate } = useInit();

  if (!navbar) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white h-20">
      <div className="flex justify-between m-auto w-full center max-w-96">
        {pages.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer hover:bg-blue-300 rounded-lg p-3"
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
