import { useState } from "react";
import confetti from "canvas-confetti";

const TURNS =  {
  X: 'x',
  O: 'o'
}


const Square = ({children, isSelected, updateBoard, index }) => {

  const className = `square ${isSelected ? 'is-selected' : ''}`;

  const handleClick = () => {
    updateBoard(index)
  }

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}

const WINNER_COMBOS = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));

  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null);

  const updateBoard = (index) => {

    //check if there is something on the square or there is a winner not allow to click
    if( board[index] || winner ) return

    //UPdate the board
    //! NEVER mutate the values of the props, states allways need to be inmutable
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti();
      setWinner(newWinner)
    }
    else if(checkEndGame(newBoard)){
      setWinner(false);
    }
  }

  const checkEndGame = (newBoard) => {
    return newBoard.every((square) => square != null)
  }

  const checkWinner = (boardToCheck) => {

    //Check all the options to see if there is a winner
    for( const combo of WINNER_COMBOS){
      const [a,b,c] = combo;
      if(
        boardToCheck[a] && 
        boardToCheck[a] == boardToCheck[b] && 
        boardToCheck[a] == boardToCheck[c]
      ){
        return boardToCheck[a] 
      }
    }
    return null
  }
  
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null);
  }

  return (
    <main className="board">
      <h1> TIC TAC TOE</h1>
      <button onClick={resetGame}> Restart Game</button>
      <section className="game">
        {board.map( (square, index) =>{
          return ( 
            <Square key={index} index={index} updateBoard={updateBoard}>
              {square}
            </Square>
          )
        } )}
      </section>

      <section className="turn">
        <Square isSelected={turn === TURNS.X} >
          {TURNS.X}
        </Square>
        <Square isSelected={turn === TURNS.O} >
          {TURNS.O}
        </Square>
      </section>
      
      {
        winner != null && (
          <section className="winner">
            <div className="text">
              <h2>
                { winner === false ? 'Empate' : 'Winner is: ' + winner}
              </h2>

              <header className="">
                {winner && <Square>{winner}</Square>}
              </header>

              <footer>
                <button onClick={resetGame}> Start Again</button>
              </footer>
            </div>

          </section>
        )
      }
    </main>
  )
}

export default App
