import { useState } from "react";
import confetti from "canvas-confetti";
import { Square  } from "./components/Square";
import { TURNS, WINNER_COMBOS } from "./constant";
import { checkWinnerFrom, checkEndGameFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";



function App() {
  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    if(boardFromStorage) return JSON.parse(boardFromStorage)
    return  Array(9).fill(null)
  });
  const [turn, setTurn] = useState(() => {
    const turnFromStorage = window.localStorage.getItem('turn');
    if(turnFromStorage) return JSON.parse(turnFromStorage)
    return  TURNS.X
  })
  const [winner, setWinner] = useState(null);

  

//Function that gets called on the click of a Square component
  const updateBoard = (index) => {
    //check if there is something on the square or there is a winner not allow to click
    if( board[index] || winner ) return

    //Update the board: 
    //1. generate a copy of the prop board ( the 9 cells of the tictactoe game)
    //2. on the position of the cell click set the players turn icon
    //3. set the board state with the new one
    //! NEVER mutate the values of the props, states allways need to be inmutable
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)

    //Change the turn and set it on the useState
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)

    //Save the data to the LocalStorage
    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', JSON.stringify(newTurn))

    //check if there is new Winner
    const newWinner = checkWinnerFrom(newBoard)

    //check if one of the players won or there is a draw
    if(newWinner){
      confetti();
      setWinner(newWinner)
    }
    else if(checkEndGameFrom(newBoard)){
      setWinner(false);
    }
  }

  //Reset the game function, it resets all the useState to the default values
  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null);
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('item')
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
