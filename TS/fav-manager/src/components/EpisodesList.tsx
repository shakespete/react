import React from 'react'
import { IEpisode, IEpisodesListProps } from '../interfaces';

export default function EpisodesList({ episodes, toggleFav, favourites }: IEpisodesListProps): Array<JSX.Element> {

  return episodes.map((episode: IEpisode) => {
    return (
      <section key={episode.id} className="episode-box">
        <img src={episode.image.medium} alt={`Rick and Morty ${episode.name}`} />
        <div>{episode.name}</div>
        <section style={{ display: 'flex', justifyContent: 'space-between'}}>
          <div>Season: {episode.season} Number: {episode.number}</div>
          <button type='button' onClick={() => toggleFav(episode)}>
            {favourites.find((fav: IEpisode) => fav.id === episode.id) ? 'UNFAV' : 'FAV'}
          </button>
        </section>
      </section>
    );
  })
}
