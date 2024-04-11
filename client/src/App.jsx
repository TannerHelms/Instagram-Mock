import { Outlet } from "react-router-dom";
import Navbar from "./componets/ui/navbar";
import "@mantine/core/styles.css";

const App = () => {
  return (
    <div className="bg">
      <div className="w-fit m-auto pb-24">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
