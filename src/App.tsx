import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import { Store } from "./Store";
import { Episodes, IAction } from "./Interface";

function App() {
    const { state, dispatch } = useContext(Store);
    const URL: string =
        "http://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes";

    useEffect(() => {
        state.episodes.length === 0 && fetchData();
    }, []);

    const fetchData = async () => {
        const data = await fetch(URL);
        const dataJSON = await data.json();
        return dispatch({
            type: "FETCH_DATA",
            payload: dataJSON._embedded.episodes
        });
    };

    const toggleFavorite = (episode: Episodes): IAction => {
        const favEpisodes = state.favorites.includes(episode);
        const favEpisodesRemoved = state.favorites.filter(
            (fav: Episodes) => fav.id !== episode.id
        );
        return favEpisodes
            ? dispatch({ type: "REMOVE_FAV", payload: favEpisodesRemoved })
            : dispatch({
                  type: "ADD_FAV",
                  payload: episode
              });
    };
    console.log(state);
    return (
        <div>
            <header className="header">
                <div>
                    <h1>Rick and Morty</h1>
                    <p>Choose your favorite episodes</p>
                </div>
                <div>
                    <p>Number of Favorites: {state.favorites.length}</p>
                </div>
            </header>
            <section className="episodes">
                {state.episodes.map((episode: Episodes) => {
                    return (
                        <section key={episode.id} className="episode">
                            <img
                                src={episode.image.medium}
                                alt={`Rick and Morty ${episode.name}`}
                            />
                            <p>Episode name: {episode.name}</p>
                            <p>
                                Season: {episode.season} Episode:{" "}
                                {episode.number}
                            </p>
                            <button
                                type="button"
                                onClick={() => toggleFavorite(episode)}
                            >
                                {state.favorites.find(
                                    (fav: Episodes) => fav.id === episode.id
                                )
                                    ? "Unfav"
                                    : "Fav"}
                            </button>
                        </section>
                    );
                })}
            </section>
        </div>
    );
}

export default App;
