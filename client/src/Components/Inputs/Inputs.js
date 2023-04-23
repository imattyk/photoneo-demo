import React from 'react'
import PropTypes from 'prop-types'

function Inputs({ setPlyFile, setJsonFile }) {
  const onPlyFileChange = (event) => {
    const file = event.target.files[0];
    setPlyFile(file);
  };

  const onJsonFileChange = (event) => {
    const file = event.target.files[0];
    setJsonFile(file);
  };

  return (
    <div>
      <div className="input-container">
        <label>PLY file</label>
        <input type="file" onChange={onPlyFileChange} />
      </div>

      <div className="input-container">
        <label>JSON config</label>
        <input type="file" onChange={onJsonFileChange} />
      </div>
    </div>
  );
}

Inputs.propTypes = {
  setPlyFile: PropTypes.func,
  setJsonFile: PropTypes.func,
};

export default Inputs
