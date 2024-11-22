import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState({});
  const [options, setOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = { data: JSON.parse(input) };
    axios.post('http://localhost:3000/bfhl', payload)
      .then((response) => {
        setResponse(response.data);
        setOptions(['Alphabets', 'Numbers', 'Highest lowercase alphabet']);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleSelect = (event) => {
    const selectedOptions = event.target.value;
    const filteredResponse = {};
    selectedOptions.forEach((option) => {
      if (option === 'Alphabets') {
        filteredResponse.alphabets = response.alphabets;
      } else if (option === 'Numbers') {
        filteredResponse.numbers = response.numbers;
      } else if (option === 'Highest lowercase alphabet') {
        filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
      }
    });
    setResponse(filteredResponse);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={input} onChange={(event) => setInput(event.target.value)} />
        <button type="submit">Submit</button>
      </form>
      <select multiple value={options} onChange={handleSelect}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}

export default App