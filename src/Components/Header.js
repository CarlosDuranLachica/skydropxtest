import { useLocation } from "react-router-dom";

// icons
import Logo from "../Icons/skydropx_logo.svg";

const Header = () => {
  const pathname = useLocation().pathname.split("/").pop();

  return (
    <>
      <header
        className="Header shadow"
        style={pathname === "VoucherPDF" ? { marginBottom: "0" } : null}
      >
        <img className="skydropx-Logo" src={Logo} alt="Logo" />
      </header>
    </>
  );
};

export default Header;
