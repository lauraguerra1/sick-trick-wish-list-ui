import { useState } from "react";
import { nanoid } from "nanoid";
import './Form.css';

const Form = ({updateTricks}) => {
  const [stance, setStance] = useState('');
  const [trickName, setTrickName] = useState('');
  const [obstacle, setObstacle] = useState('');
  const [tutorial, setTutorial] = useState('');

  const handleChange = (value, setter) => {
    setter(value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    updateTricks({id: nanoid(), stance, name: trickName, obstacle, tutorial})
  }

  return (
    <form onSubmit={handleSubmit}>
      <select value={stance} className='form-piece' onChange={(e) => handleChange(e.target.value, setStance)} required>
        <option value=''>Choose your Stance </option>
        <option value='regular'>Regular</option>
        <option value='switch'>Switch</option>
      </select>
      <input className='form-piece form-input' type='text' onChange={(e) => handleChange(e.target.value, setTrickName)} value={trickName} placeholder='Name of trick' required/>
      <select value={obstacle} className='form-piece' onChange={(e) => handleChange(e.target.value, setObstacle)} required>
        <option value=''>Choose your Obstacle </option>
        <option value='flat ground'>Flat ground</option>
        <option value='ledge'>Ledge</option>
        <option value='rail'>Rail</option>
        <option value='stairs'>Stairs</option>
        <option value='pool'>Pool</option>
      </select>
      <input className='form-piece form-input' type='text' onChange={(e) => handleChange(e.target.value, setTutorial)} value={tutorial} placeholder='Link to Tutorial' required/>
      <button className='form-piece'>Send it!</button>
    </form>
  )
}

export default Form 