import { NavLink, Link } from "react-router-dom";
import { FaStore, FaSearch, FaUser, FaStar } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

export default function BottomTabs() {
  return (
    <nav className="bottom-tabs">
      <NavLink to="/" end className={({isActive}) => "tab-item" + (isActive ? " active" : "")}>
        <FaStore className="tab-icon" />
        <span>Mağaza</span>
      </NavLink>

      <NavLink to="/arama" className={({isActive}) => "tab-item" + (isActive ? " active" : "")}>
        <FaSearch className="tab-icon" />
        <span>Arama</span>
      </NavLink>

      <Link to="/ilan-ver" className="tab-item plus">
        <IoMdAdd className="tab-icon" />
        <span>İlan Ver</span>
      </Link>

      <NavLink to="/bana-ozel" className={({isActive}) => "tab-item" + (isActive ? " active" : "")}>
        <FaStar className="tab-icon" />
        <span>Bana Özel</span>
      </NavLink>

      <NavLink to="/profilim" className={({isActive}) => "tab-item" + (isActive ? " active" : "")}>
        <FaUser className="tab-icon" />
        <span>Profilim</span>
      </NavLink>
    </nav>
  );
}
// eslint-disable-next-line
