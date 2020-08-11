import React, { useRef } from 'react';
import { useMap } from '../context/MapProvider';

export default function FileInput(): JSX.Element {
  const { dispatch } = useMap();

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

  const fileInput = useRef<HTMLInputElement>(null);
  const triggerFileInput = (e: React.MouseEvent<HTMLInputElement>) => {
    fileInput?.current?.click();
  }

  return (
    <div >
      <div className="btn" onClick={triggerFileInput}>
        File Input
      </div>
      <input
        type='file'
        name='siteMap'
        accept='text/plain'
        ref={fileInput}
        onChange={onChange}
        hidden
      ></input>
    </div>
  )
}
