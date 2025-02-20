import { useContext } from "react";
import NavLoggedIn from "./NavLoggedIn";
import NavLoggedOut from "./NavLoggedOut";
import GlobalContext from "../GlobalContext";

function Navbar() {
  const globalContext = useContext(GlobalContext);
  return (
    <div className="bg-blue-900 h-24">
      {globalContext.isLoggedIn ? <NavLoggedIn /> : <NavLoggedOut />}
    </div>
  );
}

export default Navbar;
