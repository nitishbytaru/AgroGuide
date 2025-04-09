import { Outlet } from "react-router-dom";
import NavBar from "./Components/NavBar/NavBar.jsx";
import Footer from "./Components/NavBar/Footer.jsx";

function Layout() {
  return (
    <>
      <NavBar />
      <div className="content-container pt-0">
        <div className="container">
          <Outlet />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Layout;
