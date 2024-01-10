


export default function GameBoard({onSelect,board}) {
  let x = null;
  

  return (
    <ol id='game-board'>
      {board.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((playerSymbol, colIndex) => (
              <li key={colIndex}>
                <button
                  disabled = {playerSymbol!=null}
                  onClick={() => {
                    
                    onSelect(rowIndex, colIndex);
                  }}>
                    
                  {playerSymbol}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))}
    </ol>
  );
}
