import { Outlet } from "react-router-dom";
import Navbar from "./componets/ui/navbar";
import "@mantine/core/styles.css";

const App = () => {
  return (
    <div className="bg">
      <div className="pb-24 w-full m-auto" style={{ maxWidth: "600px" }}>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default App;
