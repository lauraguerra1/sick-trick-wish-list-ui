import './App.css';
import React, { useEffect, useState } from 'react';
import { getAllTricks } from '../../apiCalls';
import TricksBox from '../TricksBox/TricksBox';
import Form from '../Form/Form'

function App() {
  const [tricks, setTricks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const callAPI = async () => {
      setLoading(true);
      try {
        setTricks(await getAllTricks());
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    callAPI();
  }, []);

  return (
    <main>
      <div className="App">
        <h1>Sick Trick Wish List</h1>
        {loading && <h2 style={{ color: 'red' }}>Loading...</h2>}
        {error && <h2 style={{ color: 'red' }}>{error.message}</h2>}
      </div>
      <Form />
      <TricksBox tricks={tricks} />
    </main>
  );
}

export default App;
