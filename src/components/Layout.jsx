import { Outlet } from "react-router-dom";
import NavBar from "./NavBar";

const Layout = () => {
  return (
    <>
      <NavBar />
      <main style={{ padding: "40px 20px" }}>
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
