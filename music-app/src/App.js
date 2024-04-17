import React, { useState } from "react";
import "./App.css";
import logo from "./logo.svg";

const tempMusicData = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "BINI",
    genre: "Pop",
  },
  {
    id: 2,
    title: "Alam mo ba girl",
    artist: "Hev Abi",
    genre: "Hiphop",
  },
  {
    id: 3,
    title: "Selos",
    artist: "Shaira",
    genre: "Pop",
  },
  {
    id: 4,
    title: "Dahan",
    artist: "December Avenue",
    genre: "Alternative",
  },
  {
    id: 5,
    title: "Buwan",
    artist: "Juan Karlos",
    genre: "Rock",
  },
  {
    id: 6,
    title: "Kathang Isip",
    artist: "Ben&Ben",
    genre: "Indie",
  },
  {
    id: 7,
    title: "Mundo",
    artist: "IV of Spades",
    genre: "Pop",
  },
  {
    id: 8,
    title: "Sa Susunod na Habang Buhay",
    artist: "Ben&Ben",
    genre: "Indie",
  },
  {
    id: 9,
    title: "Paraluman",
    artist: "Adie",
    genre: "Pop",
  },
  {
    id: 10,
    title: "Maybe the Night",
    artist: "Ben&Ben",
    genre: "Indie",
  },
  {
    id: 11,
    title: "Bawat Daan",
    artist: "Ebe Dancel",
    genre: "Pop",
  },
  {
    id: 12,
    title: "Huling Sandali",
    artist: "December Avenue",
    genre: "Alternative",
  },
  {
    id: 13,
    title: "Hanggang Kailan",
    artist: "Orange & Lemons",
    genre: "Pop",
  },
  {
    id: 14,
    title: "YK",
    artist: "Cean Jr.",
    genre: "Pop",
  },
  {
    id: 15,
    title: "Dati",
    artist: "Sam Concepcion, Tippy Dos Santos, and Quest",
    genre: "Pop",
  },
  {
    id: 16,
    title: "Tadhana",
    artist: "Up Dharma Down",
    genre: "Indie",
  },
  {
    id: 17,
    title: "Tingin",
    artist: "Cup of Joe",
    genre: "Pop",
  },
  {
    id: 18,
    title: "Butterflies",
    artist: "Denise Julia",
    genre: "Pop",
  },
  {
    id: 19,
    title: "Leonora",
    artist: "Sugarcane",
    genre: "Alternative",
  },
  {
    id: 20,
    title: "Your Universe",
    artist: "Rico Blanco",
    genre: "Rock",
  },
];

const tempPlaylist = [
  {
    id: 1,
    title: "Pantropiko",
    artist: "BINI",
    genre: "Pop",
    userRating: 5,
  },
];

function App() {
  const [musics, setMusics] = useState(tempMusicData);
  const [playlist, setPlaylist] = useState(tempPlaylist);
  const [query, setQuery] = useState("");
  const [ratings, setRatings] = useState({});

  const addToPlaylist = (music) => {
    if (!playlist.find((item) => item.id === music.id)) {
      setPlaylist([...playlist, music]);
    }
  };

  const handleRatingChange = (id, rating) => {
    setRatings({ ...ratings, [id]: rating });
  };

  const isSongInPlaylist = (musicId) => {
    return playlist.some((music) => music.id === musicId);
  };

  const filteredMusics = musics.filter(
    (music) =>
      music.title.toLowerCase().includes(query.toLowerCase()) ||
      music.artist.toLowerCase().includes(query.toLowerCase())
  );

  const totalSongsInPlaylist = playlist.length;

  return (
    <div>
      <NavBar onSearch={setQuery} />
      <div className="controls">
        <SortButton
          sortSongs={() =>
            setMusics([...musics].sort((a, b) => a.title.localeCompare(b.title)))
          }
        />
        <FilterDropdown
          options={Array.from(new Set(musics.map((music) => music.genre)))}
          filterSongs={(genre) => {
            if (genre === "") {
              setMusics(tempMusicData);
            } else {
              setMusics(tempMusicData.filter((music) => music.genre === genre));
            }
          }}
        />
      </div>
      <Main>
        <Box title="Music List">
          <MusicList
            musics={filteredMusics}
            addToPlaylist={addToPlaylist}
            ratings={ratings}
            handleRatingChange={handleRatingChange}
            isSongInPlaylist={isSongInPlaylist}
          />
        </Box>
        {totalSongsInPlaylist > 0 && (
          <Box title={`Playlist (${totalSongsInPlaylist} song${totalSongsInPlaylist !== 1 ? 's' : ''})`}>
            <PlayList playlist={playlist} ratings={ratings} />
            <Summary totalSongs={totalSongsInPlaylist} />
          </Box>
        )}
      </Main>
    </div>
  );
}

function NavBar({ onSearch }) {
  return (
    <div className="navbar">
      <Logo />
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

function Logo() {
  return <h1 className="logo">Music App</h1>;
}

function SearchBar({ onSearch }) {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <input
      className="search"
      type="text"
      placeholder="Search songs..."
      onChange={handleSearch}
    />
  );
}

function Main({ children }) {
  return <div className="container">{children}</div>;
}

function Box({ children, title }) {
  return (
    <div className="box">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function MusicList({ musics, addToPlaylist, ratings, handleRatingChange, isSongInPlaylist }) {
  return (
    <ul>
      {musics.map((music) => (
        <li key={music.id}>
          <div className="music-info">
            <div>
              <span>{music.title}</span> by <span>{music.artist}</span> ({music.genre})
            </div>
          </div>
          <button
            className={isSongInPlaylist(music.id) ? "addedButton" : "addToPlaylist"}
            onClick={() => addToPlaylist(music)}
            disabled={isSongInPlaylist(music.id)}
          >
            {isSongInPlaylist(music.id) ? "Added" : "Add to Playlist"}
          </button>
        </li>
      ))}
    </ul>
  );
}

function PlayList({ playlist }) {
  const generateRandomRating = () => {
    const rating = Math.floor(Math.random() * 2) + 4; 
    return '⭐'.repeat(rating); 
  };

  return (
    <div>
      <ul>
        {playlist.map((music) => (
          <li key={music.id}>
            {music.title} by {music.artist}
            <div className="user-rating">
              {generateRandomRating()}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Summary({ totalSongs }) {
  return (
    <div className="summary">
      <p>Total Songs in Playlist: {totalSongs}</p>
    </div>
  );
}

function SortButton({ sortSongs }) {
  return <button onClick={sortSongs}>Sort A-Z</button>;
}

function FilterDropdown({ options, filterSongs }) {
  return (
    <select className="filter-dropdown" onChange={(e) => filterSongs(e.target.value)}>
      <option value="">All Genres</option>
      {options.map((genre, index) => (
        <option key={index} value={genre}>
          {genre}
        </option>
      ))}
    </select>
  );
}

export default App;