import React from 'react';
import Map from './components/Map';
import { useMap } from './context/MapProvider';
import CommandForm from './components/CommandForm';
import SiteReport from './components/SiteReport';

export default function App(): JSX.Element {
  const { state, dispatch } = useMap();

  let fileReader: any;
  const processLayout = () => {
    const content = fileReader.result;
    const mapString = content.split('\n');
    const mapLayout = mapString.map((row: string) => row.split(''));

    if (mapString?.length) {
      dispatch({
        type: 'GENERATE_MAP',
        payload: mapLayout
      });
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.persist();
    if (e.currentTarget.files?.length) {
      const file = e.currentTarget.files[0];
      fileReader = new FileReader();
      fileReader.onloadend = processLayout;
      fileReader.readAsText(file)
    }
  };

  return (
    <div>
      <input
        type='file'
        name='siteMap'
        accept='text/plain'
        onChange={onChange}
      ></input>
      {state.mapSite.length && state.simInProgress ? (
        <>
          <CommandForm />
          <Map width={800} height={400} />
        </>
      ) : (
        <div>
          {state.message}
        </div>
      )}
      <SiteReport />
    </div>
  )
}
