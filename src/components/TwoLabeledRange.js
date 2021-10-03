import React, { useState } from "react";
// import ReactDOM from "react-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const TwoLabeledRange = ({ setMaxMin }) => {
  const [state, setState] = useState({ value: { min: 0, max: 500 } });

  return (
    <InputRange
      formatLabel={(value) => `${value}€`}
      maxValue={500}
      minValue={0}
      value={state.value}
      onChange={(value) => setState({ value })}
      onChangeComplete={(value) => {
        setMaxMin(state.value);
      }}
    />
  );
};

export default TwoLabeledRange;
