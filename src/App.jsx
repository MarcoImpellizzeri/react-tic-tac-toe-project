import { useState } from 'react'
import { WINNING_COMBINATIONS } from './data.js'
import Player from './components/Player.jsx'
import GameBoard from './components/GameBoard.jsx'
import Log from './components/Log.jsx'
import GameOver from './components/GameOver.jsx'

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

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

  let gameBoard = [...initialGameBoard.map(array => [...array])]

  for (const turn of gameTurns) {
    const { square, player } = turn
    const { row, col } = square

    gameBoard[row][col] = player
  }

  let winner

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column]

    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      secondSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol
    }
  }

  const hadDraw = gameTurns.length === 9 && !winner

  function handleActivePlayerChange(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPLayer = deriveActivePlayer(prevTurns)

      return [
        { square: { row: rowIndex, col: colIndex }, player: currentPLayer },
        ...prevTurns
      ]
    })
  }

  function handleRematch() {
    setGameTurns([])
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
        { (winner || hadDraw) && <GameOver winner={winner} onReset={handleRematch} />}
        <GameBoard
          onSelectSquare={handleActivePlayerChange}
          board={gameBoard}
        />
      </div>
      <Log turns={gameTurns} />
    </main>
  )
}

export default App
