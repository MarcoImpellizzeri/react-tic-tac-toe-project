import { Player } from './components/Player.jsx'
import { GameBoard } from './components/GameBoard.jsx'
import { useState } from 'react'
import { Log } from './components/Log.jsx'

function deriveActivePlayer(gameTurns) {
  let currentPLayer = 'X'
  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPLayer = 'O'
  }
  return currentPLayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([])

  const activePlayer = deriveActivePlayer(gameTurns)
  function handleActivePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPLayer = deriveActivePlayer(prevTurns)

      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPLayer },
        ...prevTurns
      ]
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol
          id="players"
          className="highlight-player"
        >
          <Player
            initialName="Player 1"
            symbol="X"
            isActive={activePlayer === 'X'}
          />
          <Player
            initialName="Player 2"
            symbol="O"
            isActive={activePlayer === 'O'}
          />
        </ol>
        <GameBoard
          onSelectSquare={handleActivePlayerChange}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
