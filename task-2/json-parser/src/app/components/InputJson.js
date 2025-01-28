"use client"

import { useDispatch, useSelector } from 'react-redux';
import { setInputJson, parseJson } from '../redux/jsonSlice';

const InputJsonComponent = () => {
  const dispatch = useDispatch();
  const inputJson = useSelector((state) => state.json.inputJson);

  const handleChange = (e) => {
    dispatch(setInputJson(e.target.value));
  };

  const handleParse = () => {
    dispatch(parseJson());
  };

  return (
    <div className="input-json">
      <textarea
        value={inputJson}
        onChange={handleChange}
        placeholder="Enter stringified JSON here"
      />
      <button onClick={handleParse}>Validate & Parse</button>
    </div>
  );
};

export default InputJsonComponent;