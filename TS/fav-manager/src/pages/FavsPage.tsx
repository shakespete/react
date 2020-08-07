import React, { useContext } from 'react';
import { Store } from '../store';
import { toggleFav } from '../actions';
const EpList = React.lazy<any>(() => import('../components/EpisodesList'));

export default function FavsPage() {
  const { state, dispatch } = useContext(Store);

  return (
    <React.Suspense fallback={<div>loading...</div>}>
      <section className="episode-layout">
        <EpList
          episodes={state.favourites}
          toggleFav={toggleFav}
          state={state}
          dispatch={dispatch}
          favourites={state.favourites}
        />
      </section>
    </React.Suspense>
  )
}
