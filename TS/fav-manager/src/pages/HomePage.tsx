import React, { useContext, useEffect } from 'react';
import { Store } from '../store';
import { fetchData, toggleFav } from '../actions';
const EpList = React.lazy<any>(() => import('../components/EpisodesList'));

export default function HomePage() {
  const { state, dispatch } = useContext(Store);

  useEffect(() => {
    state.episodes.length === 0 && fetchData(dispatch);
  });

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <section className="episode-layout">
        <EpList
          episodes={state.episodes}
          toggleFav={toggleFav}
          state={state}
          dispatch={dispatch}
          favourites={state.favourites}
        />
      </section>
    </React.Suspense>
  )
}
