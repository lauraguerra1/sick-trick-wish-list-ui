import './App.css';
import React, { useEffect, useState } from 'react';
import { getAllTricks, postTrick } from '../../apiCalls';
import TricksBox from '../TricksBox/TricksBox';
import Form from '../Form/Form'

function App() {
  const [tricks, setTricks] = useState([]);
  const [newTrick, setNewTrick] = useState('');
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

  useEffect(() => {
    const callAPI = async (newTrick) => {
      setLoading(true);
      try {
        const additionalTrick = await postTrick(newTrick)
        setTricks(prevTricks => [...prevTricks, additionalTrick]);
        setLoading(false);
        setNewTrick('');
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (newTrick) {
      callAPI(newTrick)
    }
  }, [newTrick])

  const addTrick = (newTrick) => {
    setNewTrick(newTrick)
  }

  return (
    <main>
      <div className="App">
        <h1>Sick Trick Wish List</h1>
        {loading && <h2 style={{ color: 'red' }}>Loading...</h2>}
        {error && <h2 style={{ color: 'red' }}>{error.message}</h2>}
      </div>
      <Form addTrick={addTrick}/>
      <TricksBox tricks={tricks} />
    </main>
  );
}

export default App;
