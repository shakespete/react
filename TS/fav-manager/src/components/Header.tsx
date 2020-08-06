import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { Store } from '../store';

export default function Header() {
  const { state } = useContext(Store);

  return (
    <header className="header">
      <div>
        <h1>Rick and Morty</h1>
        <p>Pick your favourite episode!</p>  
      </div>
      <div>
        <div>
          <Link to="/">Home</Link>&nbsp;&nbsp;
          <Link to="/favs">Favourites</Link>
        </div>
        Favourite(s): {state.favourites.length}
      </div>
    </header>
  )
}
