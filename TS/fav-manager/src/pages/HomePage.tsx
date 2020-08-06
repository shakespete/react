import React, { useContext, useEffect } from 'react';
import { IEpisode, IAction } from '../interfaces';
import { Store } from '../store';
const EpList = React.lazy<any>(() => import('../components/EpisodesList'));

export default function HomePage() {
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

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <section className="episode-layout">
        <EpList
          episodes={state.episodes}
          toggleFav={toggleFav}
          favourites={state.favourites}
        />
      </section>
    </React.Suspense>
  )
}
