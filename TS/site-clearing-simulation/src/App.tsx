import React, { useState } from 'react';
import Map from './components/Map';
import { MapLayout } from './interfaces';

export default function App() {
  const [map, setMap] = useState<MapLayout | []>([]);

  let fileReader: any;
  const processLayout = () => {
    const content = fileReader.result;
    const mapString = content.split('\n');
    const mapLayout = mapString.map((row: string) => row.split(''));

    if (mapString?.length) setMap(mapLayout);
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    if (event.currentTarget.files?.length) {
      const file = event.currentTarget.files[0];
      fileReader = new FileReader();
      fileReader.onloadend = processLayout;
      fileReader.readAsText(file)
    }
  };

  console.log(map);

  return (
    <div>
      <label>
        Click Me
        <input
          type='file'
          name='siteMap'
          accept='text/plain'
          onChange={onChange}
        ></input>
      </label>
      {map.length ? (<Map layout={map} width={800} height={600} />) : ('')}
    </div>
  )
}
