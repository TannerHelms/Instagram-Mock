import { Outlet } from "react-router-dom";
import Navbar from "./componets/ui/navbar";
import "@mantine/core/styles.css";

const App = () => {
  return (
    <div className="bg h-svh">
      <div className="w-fit m-auto">
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
