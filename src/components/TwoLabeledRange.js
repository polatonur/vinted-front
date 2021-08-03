import React, { useState } from "react";
// import ReactDOM from "react-dom";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

const TwoLabeledRange = ({ setMaxMin, handlerMAxMin }) => {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     value: { min: 0, max: 500 },
  //   };
  //   this.props.setMaxMin(this.state.value);
  //   this.props.handlerSearch;
  // }

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
        handlerMAxMin(state.value);
      }}
    />
  );
};
// class TwoLabeledRange extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       value: { min: 0, max: 500 },
//     };
//     this.props.setMaxMin(this.state.value);
//     this.props.handlerSearch;
//   }

//   render() {
//     return (
//       <InputRange
//         formatLabel={(value) => `${value}€`}
//         maxValue={500}
//         minValue={0}
//         value={this.state.value}
//         onChange={(value) => this.setState({ value })}
//         onChangeComplete={(value) => {
//           this.props.setMaxMin(this.state.value);
//           this.props.handlerSearch();
//         }}
//       />
//     );
//   }
// }

export default TwoLabeledRange;
