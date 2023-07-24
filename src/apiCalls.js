const parseError = (response) => {
  if(!response.ok) {
    throw new Error(`Error ${response.status}: Please try again`)
  } else {
    return response.json()
  }
}

const getAllTricks = async() => {
  const response = await fetch('http://localhost:3001/api/v1/tricks');
  const data = await parseError(response)
  return data
}

export {getAllTricks}