
import { NavLink, useNavigate } from "react-router-dom";
import {
    FaMusic,
    FaSearch,
    FaHome,
    FaHeart,
} from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <header className="navbar">
            {/* Logo */}
            <div
                className="navbar-logo"
                onClick={() => navigate("/")}
            >
                <FaMusic />
                <span>SoundWave</span>
            </div>

            {/* Navigation */}
            <nav className="navbar-links">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaHome />
                    <span>Home</span>
                </NavLink>

                <NavLink
                    to="/search"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaSearch />
                    <span>Search</span>
                </NavLink>

                <NavLink
                    to="/library"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <span>Library</span>
                </NavLink>

                <NavLink
                    to="/favorites"
                    className={({ isActive }) =>
                        isActive ? "active" : ""
                    }
                >
                    <FaHeart />
                    <span>Favorites</span>
                </NavLink>
            </nav>

            {/* Search Button */}
            <button
                className="navbar-search"
                onClick={() => navigate("/search")}
                aria-label="Search"
            >
                <FaSearch />
            </button>
        </header>
    );
};

export default Navbar;
