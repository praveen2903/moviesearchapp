import Result from "./components/Result";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

function App() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");

  const changeTheSearch = (event) => {
    // console.log(event.target.value);
    setSearch(event.target.value);
  }

  const getAllMovies = () => {
    axios.get(APIURL)
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => {
          console.log(error)
        }
      )
  }

  const getSearchedMovies = () => {
    // console.log(SEARCHAPI + search)
    axios.get(
      SEARCHAPI + search
    )
      .then(
        (response) => {
          console.log(response.data.results)
          setMovies(response.data.results);
        }
      )
      .catch(
        (error) => { 
          console.log(error);
        }
      )
  }

  useEffect(
    () => {
      setMovies([]);
      // console.log("Hello");
      if (search === "") {
        getAllMovies();
      } else {
        getSearchedMovies();
      }
    },
    [search]
  )

  return (
    <div className="bg-[#334155]">
      <div className="max-w-[1240px] shadow-xl min-h-[400px] mx-auto p-3">
        <input type="search" value={search} onChange={changeTheSearch} className="bg-[#0284c7] w-full border border-black rounded font-bold p-4 text-[#991b1b] text-3xl" />
        {
          movies.length === 0
            ?
            <div className="text-3xl text-center mt-2"> Loading... </div>
            :
            <Result movies={movies} />

        }
      </div>
    </div>
  );
}

export default App;