import React from 'react'
import { Switch, Route } from "react-router-dom";
import Header from './components/Header';
import HomePage from './pages/HomePage';
import FavsPage from './pages/FavsPage';

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route path="/favs">
          <FavsPage />
        </Route>
      </Switch>
    </>
  )
}
