import { useEffect, useState } from 'react';

export function useReader(plyFile, jsonFile) {
  const [arrayBuffer, setArrayBuffer] = useState();
  const [json, setJson] = useState();

  useEffect(() => {
    if (plyFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        if (event.target.result) setArrayBuffer(event.target.result);
      };

      reader.readAsArrayBuffer(plyFile);
    }

    if (jsonFile) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const json = JSON.parse(event.target.result);
        setJson(json);
      };
      reader.readAsText(jsonFile);
    }
  }, [plyFile, jsonFile]);

  return { arrayBuffer: arrayBuffer, json: json };
}
