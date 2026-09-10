import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar"
import BottomPlayer from "./components/BottomPlayer";

import Home from "./pages/Home";
import Search from "./pages/Search";
import Library from "./pages/Library";
import Favorites from "./pages/Favorites";
import Playlists from "./pages/Playlists";
import PlaylistDetails from "./pages/PlaylistDetails"
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import NowPlaying from "./pages/NowPlaying";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />
        <Navbar />

        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<Search />} />
            <Route path="/library" element={<Library />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/playlists" element={<Playlists />} />
            <Route path="/album/:id" element={<Album />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/now-playing" element={<NowPlaying />} />
            <Route
              path="/playlists/:id"
              element={<PlaylistDetails />}
            />
          </Routes>
        </main>

        <BottomPlayer />
      </div>
    </BrowserRouter>
  );
};

export default App;