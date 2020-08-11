import React from 'react';
import Map from './components/Map';
import { useMap } from './context/MapProvider';
import Header from './components/Header';
import CommandForm from './components/CommandForm';
import FileInput from './components/FileInput';
import SiteReport from './components/SiteReport';
import CommandList from './components/CommandList';

export default function App(): JSX.Element {
  const { state } = useMap();

  return (
    <div className="appParent">
      <Header />
      <div className="canvasParent">
        <Map width={800} height={400} />
        <div className="appInputContainer">
          {state.simInProgress ? (
            <CommandForm />
          ) : (
            <FileInput />
          )}
        </div>
      </div>
      
      {state.message}
      <div className="reportContainer">
        <SiteReport />
        <CommandList />
      </div>
    </div>
  )
}
