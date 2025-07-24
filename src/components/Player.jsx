import { useState } from 'react'

export function Player({ initialName, symbol, isActive }) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false)

  function handleEditClick() {
    setIsEditing((editing) => !editing)
  }

  function handleChange(event) {
    setPlayerName(event.target.value)
  }

  let editablePlayerName = isEditing
    ? <input className="player-name" type="text" required value={playerName} onChange={handleChange}/>
    : <span className="player-name">{playerName}</span>

  return (
    <li className={isActive ? 'active' : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{isEditing ? 'Save' : 'Edit'}</button>
    </li>
  )
}