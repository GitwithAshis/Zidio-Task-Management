import { NavLink } from "react-router-dom";
// import Info from "./Info";
// import Search from "./Search";
import { Search, Info } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-White text-black p-4  mt-8">
      <div className="container mx-auto flex justify-between items-center">
        <img className="w-1/6" src="/image/logo.png" alt="Logo" />
        <nav>
          <ul className="flex space-x-6 bg-blue-50 p-3 rounded-lg">
            <li>
              <NavLink
                exact
                to="/"
                activeClassName="text-blue-50"
                className="hover:text-blue-600 mx-5 grid"
              >
                <b className="mt-3">HOME</b>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                activeClassName="text-blue-50"
                className="hover:text-blue-600 mx-5 grid"
              >
                <b className="mt-3">ABOUT</b>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/services"
                activeClassName="text-blue-50"
                className="hover:text-blue-600 mx-5 grid"
              >
                <b className="mt-3">SERVICES</b>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/careers"
                activeClassName="text-blue-50"
                className="hover:text-blue-600 mx-5 grid"
              >
                <b className="mt-3">CAREERS</b>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                activeClassName="text-blue-50"
                className="hover:text-blue-600 mx-5 grid"
              >
                <b className="mt-3">CONTACT</b>
              </NavLink>
            </li>
            <button
              type="submit"
              className="bg-blue-600 text-white px-10 py-3 rounded w-full hover:bg-blue-500"
            >
              <b>ADD TASK</b>
            </button>
          </ul>
        </nav>
        <ul className="flex space-x-4 rounded-lg">
          <li className="cursor-pointer p-3">
            <Search className="h-6 w-6 text-gray-700" />
          </li>
          <li className="cursor-pointer p-3 bg-blue-600 rounded-3xl hover:bg-blue-500">
            <Info className="h-6 w-6 text-white" />
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
