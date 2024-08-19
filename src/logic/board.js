import { WINNER_COMBOS } from "../constant";

export const checkWinnerFrom = (boardToCheck) => {

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


export  const checkEndGameFrom = (newBoard) => {
    return newBoard.every((square) => square != null)
  }
