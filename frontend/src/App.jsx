import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
    const [jsonInput, setJsonInput] = useState('');
    const [response, setResponse] = useState(null);
    const [error, setError] = useState('');
    const [selectedOptions, setSelectedOptions] = useState([]);

    const options = [
        { value: 'alphabets', label: 'Alphabets' },
        { value: 'numbers', label: 'Numbers' },
        { value: 'highest_lowercase_alphabet', label: 'Highest Lowercase Alphabet' }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setResponse(null);

        try {
            const jsonData = JSON.parse(jsonInput);
            if (!jsonData.data || !Array.isArray(jsonData.data)) {
                throw new Error("Invalid structure: 'data' should be an array.");
            }

            const res = await axios.post('http://localhost:5000/bfhl', jsonData);
            setResponse(res.data);
        } catch (err) {
            setError('Invalid JSON format or API call failed. ' + err.message);
        }
    };

    const renderResponse = () => {
        if (!response || selectedOptions.length === 0) return null;

        const filteredResponse = {};
        if (selectedOptions.some(option => option.value === 'alphabets')) {
            filteredResponse.Numbers = response.numbers || [];
        }
        if (selectedOptions.some(option => option.value === 'numbers')) {
            filteredResponse.Alphabets = response.alphabets || [];
        }
        if (selectedOptions.some(option => option.value === 'highest_lowercase_alphabet')) {
            filteredResponse['Highest Lowercase Alphabet'] = response.highest_lowercase_alphabet || [];
        }

        return (
            <div>
                <h3>Filtered Response:</h3>
                {Object.keys(filteredResponse).length > 0 ? (
                    <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
                ) : (
                    <p>No data to display.</p>
                )}
            </div>
        );
    };

    return (
        <div className="container">
            <h1>Your Roll Number</h1>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    rows='5'
                    cols='50'
                    placeholder='Enter JSON here (e.g., {"data": ["A", "C", "z"]})'
                />
                <button type='submit'>Submit</button>
            </form>
            {error && <div className="error">{error}</div>}
            <Select
                isMulti
                options={options}
                onChange={setSelectedOptions}
                placeholder='Select fields to display'
            />
            {response && renderResponse()}
        </div>
    );
};

export default App;
