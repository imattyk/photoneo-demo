import './App.scss';
import Inputs from './Components/Inputs';
import Canvas from './Components/Canvas';
import { useState } from 'react';

function App() {
  const [plyFile, setPlyFile] = useState();
  const [jsonFile, setJsonFile] = useState();

  return (
    <>
      <p style={{ paddingLeft: '1rem' }}>
        Please first select the .ply file and then the .json config file to
        display the scene.
      </p>
      <Inputs setPlyFile={setPlyFile} setJsonFile={setJsonFile} />
      <Canvas plyFile={plyFile} jsonFile={jsonFile} />
    </>
  );
}

export default App;
