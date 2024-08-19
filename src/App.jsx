import { useState } from "react";
import confetti from "canvas-confetti";
import { Square  } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constant";
import { checkWinnerFrom, checkEndGameFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";



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

    const newWinner = checkWinnerFrom(newBoard)
    
    if(newWinner){
      confetti();
      setWinner(newWinner)
    }
    else if(checkEndGameFrom(newBoard)){
      setWinner(false);
    }
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
      
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
