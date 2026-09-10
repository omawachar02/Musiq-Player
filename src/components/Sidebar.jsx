import { NavLink } from "react-router-dom";
import {
    FaHome,
    FaSearch,
    FaBook,
    FaHeart,
    FaMusic,
} from "react-icons/fa";

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                {/* <FaMusic /> */}
                <span> 🎵 MUSIQ</span>
            </div>

            <nav className="sidebar-nav">
                <NavLink to="/" end>
                    <FaHome />
                    <span>Home</span>
                </NavLink>

                <NavLink to="/search">
                    <FaSearch />
                    <span>Search</span>
                </NavLink>

                <NavLink to="/library">
                    <FaBook />
                    <span>Library</span>
                </NavLink>

                <NavLink to="/favorites">
                    <FaHeart />
                    <span>Favorites</span>
                </NavLink>

                <NavLink to="/playlists">
                    <FaMusic />
                    <span>Playlists</span>
                </NavLink>
            </nav>
        </aside>
    );
};

export default Sidebar;