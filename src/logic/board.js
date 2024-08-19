import { WINNER_COMBOS } from "../constant";


//Checks all the options from the Winner combos constant positions with the values of the 
//cells in the board state, in case that the 3 fields have the same value there is a winner
export const checkWinnerFrom = (boardToCheck) => {

    for( const combo of WINNER_COMBOS){
      const [a, b, c] = combo;
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

//if all the squares arr different from null, the game ended on draw
export  const checkEndGameFrom = (newBoard) => {
    return newBoard.every((square) => square != null)
}
