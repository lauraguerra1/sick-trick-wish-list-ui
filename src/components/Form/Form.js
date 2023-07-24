import { useState } from "react"

const Form = () => {
  const [stance, setStance] = useState('')
  const [trickName, setTrickName] = useState('')
  const [obstacle, setObstacle] = useState('')
  const [tutorial, setTutorial] = useState('')

  const handleChange = (value, setter) => {
    setter(value)
  }
  
  return (
    <form>
      <select onChange={(e) => handleChange(e.target.value, setStance)}>
        <option value='regular'>Regular</option>
        <option value='switch'>Switch</option>
      </select>
    </form>
  )
}

export default Form 