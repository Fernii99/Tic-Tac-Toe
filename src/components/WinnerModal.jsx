import { Square } from "./Square"

export function WinnerModal( {winner, resetGame}) {
  if (winner === null ) return null

  return (
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