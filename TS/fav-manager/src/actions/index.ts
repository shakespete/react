import { IEpisode, IAction, IState } from '../interfaces';

export const fetchData = async (dispatch: any) => {
  const URL = 'https://api.tvmaze.com/singlesearch/shows?q=rick-&-morty&embed=episodes';
  const data = await fetch(URL);
  const dataJSON = await data.json();
  return dispatch({
    type: 'FETCH_DATA',
    payload: dataJSON._embedded.episodes
  });
}

export const toggleFav = (episode: IEpisode, state: IState, dispatch: any): IAction => {
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