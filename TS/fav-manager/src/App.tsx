import React, { useContext, useEffect } from 'react'
import { Store } from './store';
import { IEpisode, IAction } from './interfaces';

export default function App(): JSX.Element {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchData();
  });

  const fetchData = async () => {
    const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
    const data = await fetch(URL);
    const dataJSON = await data.json();
    return dispatch({
      type: 'FETCH_DATA',
      payload: dataJSON._embedded.episodes
    });
  }

  const toggleFav = (episode: IEpisode): IAction => {
    const epsInFav = state.favourites.includes(episode);

    let dispatchObj = {
      type: 'ADD_FAV',
      payload: episode
    }

    if (epsInFav) {
      dispatchObj = {
        type: 'REM_FAV',
        payload: episode
      }
    }
    return dispatch(dispatchObj);
  }

  console.log(state);

  return (
    <>
      <header className="header">
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episode!</p>
      </header>
      <section className="episode-layout">
        {state.episodes.map((episode: IEpisode) => {
          return (
            <section key={episode.id} className="episode-box">
              <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
              <div>{episode.name}</div>
              <section>
                <div>Season: {episode.season} Number: {episode.number}</div>
                <button type='button' onClick={() => toggleFav(episode)}>
                  {state.favourites.find((fav: IEpisode) => fav.id === episode.id) ? 'UNFAV' : 'FAV'}
                </button>
              </section>
            </section>
          );
        })}
      </section>
    </>
  )
}
