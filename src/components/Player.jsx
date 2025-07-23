import { useState } from 'react'

export function Player({ name, symbol }) {
  const [isEditing, setIsEditing] = useState()

  function handleEditClick() {
    setIsEditing((prev) => !prev)
  }

  let playerName = isEditing ? <input type="text" required/> : <span className="player-name">{name}</span>

  return (
    <li>
      <span>
        {playerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>Edit</button>
    </li>
  )
}