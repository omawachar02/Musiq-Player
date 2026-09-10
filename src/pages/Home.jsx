import { songs } from "../data/songs";
import SongList from "../components/SongList";
import SongCard from "../components/SongCard";
import "./Home.css";

const Home = () => {
    const recentlyPlayed =
        JSON.parse(
            localStorage.getItem("recentlyPlayed")
        ) || [];

    return (
        <div>
            <section className="hero">
                <p>WELCOME TO MUSIQ</p>
                <h1>
                    Music for every
                    <span> moment.</span>
                </h1>
                <p>
                    Discover new sounds, create playlists,
                    and enjoy your favorite music.
                </p>
            </section>

            {recentlyPlayed.length > 0 && (
                <section>
                    <h2>Recently Played</h2>

                    <SongList songs={recentlyPlayed} />
                </section>
            )}

            <section>
                <h2>Popular Songs</h2>

                <SongList songs={songs} />
            </section>
        </div>
    );
};

export default Home;