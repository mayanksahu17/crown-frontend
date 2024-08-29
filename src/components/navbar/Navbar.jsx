import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
// eslint-disable-next-line react/prop-types
const Navbar = ({ mobileMenu, setMobileMenu, color }) => {
  const [mobileSubMenu, setMobileSubMenu] = useState("");
  const [mobileSubMenuSub, setMobileSubMenuSub] = useState("");
  const [menuTitle, setMenuTitle] = useState("");

  const handleMenu = () => {
    setMobileMenu(false);
    setMobileSubMenu("");
    setMobileSubMenuSub("");
  };

  const handleSubMenu = (e, id) => {
    e.preventDefault();
    setMobileSubMenu(id);

    if (e.target.tagName === "A") {
      const content = e.target.firstChild.textContent;
      setMenuTitle(content);
    } else {
      const content = e.target.parentElement.textContent;
      setMenuTitle(content);
    }
  };

  const handleSubMenuSub = (e, id) => {
    e.preventDefault();
    setMobileSubMenuSub(id);
    if (e.target.tagName === "A") {
      const content = e.target.firstChild.textContent;
      setMenuTitle(content);
    } else {
      const content = e.target.parentElement.textContent;
      setMenuTitle(content);
    }
  };

  const handleGoBack = () => {
    if (mobileSubMenuSub) {
      setMobileSubMenuSub("");
      return;
    }
    if (mobileSubMenu) {
      setMobileSubMenu("");
      return;
    }
  };

  return (
    <div className="menu-block-wrapper">
      <div
        onClick={handleMenu}
        className={`menu-overlay ${mobileMenu && "active"}`}
      />
      <nav
        className={`menu-block ${mobileMenu && "active"}`}
        id="append-menu-header"
      >
        <div className={`mobile-menu-head ${mobileSubMenu && "active"}`}>
          <div onClick={handleGoBack} className="go-back">
            <img
              className="dropdown-icon"
              src="assets/img/icon-black-long-arrow-right.svg"
              alt="cheveron-right"
              width={16}
              height={16}
            />
          </div>
          <div className="current-menu-title">{menuTitle}</div>
          <div onClick={handleMenu} className="mobile-menu-close">
            ×
          </div>
        </div>
        <ul className={`site-menu-main ${color}`}>
          {/* Global navbar */}
          <li
            onClick={(e) => handleSubMenu(e, 1)}
            className="nav-item nav-item-has-children"
          >
            <Link to="/" className="nav-link-item drop-trigger">
              Home
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/about" className="nav-link-item">
              About
            </Link>
          </li> */}
          <li
            onClick={(e) => handleSubMenu(e, 2)}
            className="nav-item nav-item-has-children"
          >
            <Link to="#" className="nav-link-item drop-trigger">
              Services
              <FaChevronRight className="dropdown-icon" size={16} />
            </Link>
            <ul
              className={`sub-menu ${mobileSubMenu === 2 && "active"}`}
              id="submenu-2"
            >
              <li className="sub-menu--item">
                <Link to="/services">Services</Link>
              </li>
              <li className="sub-menu--item">
                <Link to="/service-details">Service Details</Link>
              </li>
            </ul>
          </li>
          <li
            onClick={(e) => handleSubMenu(e, 3)}
            className="nav-item nav-item-has-children"
          >
            <Link to="#" className="nav-link-item drop-trigger">
              Pages
              <FaChevronRight className="dropdown-icon" size={16} />
            </Link>
            <ul
              className={`sub-menu ${mobileSubMenu === 3 && "active"}`}
              id="submenu-3"
            >
              {/* <li
                onClick={(e) => handleSubMenuSub(e, 2)}
                className="sub-menu--item nav-item-has-children"
              >
                <Link to="#" data-menu-get="h3" className="drop-trigger">
                  Team
                  <FaChevronRight className="dropdown-icon" size={16} />
                </Link>
                <ul
                  className={`sub-menu shape-none ${
                    mobileSubMenuSub === 2 && "active"
                  } bg-black`}
                  id="submenu-5"
                >
                  <li className="sub-menu--item">
                    <Link to="/team">Team</Link>
                  </li>
                   <li className="sub-menu--item">
                    <Link to="/media">Team Photos</Link>
                  </li> 
                </ul>
              </li> */}

              <li className="sub-menu--item"></li>
              <li
                onClick={(e) => handleSubMenuSub(e, 5)}
                className="sub-menu--item nav-item-has-children"
              >
                <Link to="/team" data-menu-get="h3" className="drop-trigger">
                  Team
                </Link>
              </li>
              <li
                onClick={(e) => handleSubMenuSub(e, 5)}
                className="sub-menu--item nav-item-has-children"
              >
                <Link
                  to="/business-plan"
                  data-menu-get="h3"
                  className="drop-trigger"
                >
                  Business Plan
                </Link>
              </li>
              <li
                onClick={(e) => handleSubMenuSub(e, 5)}
                className="sub-menu--item nav-item-has-children"
              >
                <Link to="/map" data-menu-get="h3" className="drop-trigger">
                  Legal
                </Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link-item">
              Contact
            </Link>
          </li>
          <li className="md:hidden">
            <Link to="/login" className="nav-link-item">
              Login
            </Link>
          </li>
          <li className="md:hidden">
            <Link to="/signup" className="nav-link-item">
              Sign up
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
