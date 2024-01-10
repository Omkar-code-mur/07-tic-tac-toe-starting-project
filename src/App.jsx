/** @format */

import { useState } from "react";
import GameBoard from "./Componants/GameBoard.jsx";
import Player from "./Componants/Player";
import Logs from "./Componants/Logs.jsx";
import { WINNING_COMBINATIONS } from "./assets/WinningCombinations.js";
import GameOver from "./Componants/GameOver.jsx";

/** @format */
function App() {
  const PLAYERS = {
    X: "player1",
    O: "Player2",
  };
  
  const INITIAL_BOARD = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState(PLAYERS);

  const handleGameBoard = (INITIAL_BOARD) => {
    const gameBoard = [...INITIAL_BOARD.map((array) => [...array])];

    for (const turn of gameTurns) {
      let { square, player } = turn;
      let { row, col } = square;
      gameBoard[row][col] = player;
    }
    return gameBoard;
  };

  let gameBoard = handleGameBoard(INITIAL_BOARD);

  const deriveWinner = (gameBoard, WINNING_COMBINATIONS) => {
    let winner = null;
    for (const combination of WINNING_COMBINATIONS) {
      const firstSymbol = gameBoard[combination[0].row][combination[0].column];
      const secondSymbol = gameBoard[combination[1].row][combination[1].column];
      const thirdSymbol = gameBoard[combination[2].row][combination[2].column];
      if (
        firstSymbol &&
        firstSymbol === secondSymbol &&
        firstSymbol === thirdSymbol
      ) {
        console.log(firstSymbol);
        winner = playerNames[firstSymbol];
      }
    }
    return winner;
  };

  let winner = deriveWinner(gameBoard, WINNING_COMBINATIONS);
  let hasDraw = gameTurns.length === 9 && !winner;

  function derivePlayer(gameTurns) {
    let currentPlayer = "X";
    if (gameTurns.length > 0 && gameTurns[0].player === "X") {
      currentPlayer = "O";
    }
    return currentPlayer;
  }
  let activePlayer = derivePlayer(gameTurns);
  function handleRestart() {
    setGameTurns([]);
  }
  function handleNameChange(symbol, name) {
    setPlayerNames((prevNames) => {
      return {
        ...prevNames,
        [symbol]: name,
      };
    });
  }

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurn) => {
      let currentPlayer = derivePlayer(prevTurn);
      let updatedTurn = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurn,
      ];
      return updatedTurn;
    });
  }
  return (
    <>
      <div id='game-container'>
        <ol id='players' className='highlight-player'>
          <Player
            name={"Player 1"}
            symbol={"X"}
            isActive={activePlayer === "X"}
            onNameChange={handleNameChange}
          />
          <Player
            name={"Player 2"}
            symbol={"O"}
            isActive={activePlayer === "O"}
            onNameChange={handleNameChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} onRestart={handleRestart} />
        )}
        <GameBoard onSelect={handleSelectSquare} board={gameBoard} />
      </div>
      <Logs turns={gameTurns} />
    </>
  );
}

export default App;
