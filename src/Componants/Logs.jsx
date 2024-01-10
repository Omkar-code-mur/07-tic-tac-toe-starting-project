/** @format */

import React from "react";

export default function Logs({ turns }) {
  return (
    <ul id='log'>
      {
        turns.length>0 && turns.map((item)=>{
          const { square, player } = item;
          const { row, col } = square;
          return(
            <li key = {`${row},${col}`}> {player} played at ({row},{col})</li>
          )
        })
      }
    </ul>
  );
}
