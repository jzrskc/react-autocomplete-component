import React from "react";
import Autocomplete from "./Autocomplete";


const App = () => {
  const options = [
    "Papaya",
    "Persimmon",
    "Paw Paw",
    "Prickly Pear",
    "Peach",
    "Pomegranate",
    "Pineapple"
  ];

  return (
    <div className="App">
      <Autocomplete options={options} />
    </div>
  );
};


export default App;
