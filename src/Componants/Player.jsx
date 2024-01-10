/** @format */

import React, { useState } from "react";

export default function Player({ name, symbol ,isActive,onNameChange}) {
  const [isEditing, setEditing] = useState(false);
  const [playerName, setplayerName] = useState(name);
  function handleEditClick() {
    setEditing((editing) => !editing);
    onNameChange(symbol,playerName);
  }
  let nameEdit = <span className='player-name'>{playerName}</span>;
  let buttonName = "Edit";
  if (isEditing) {
    nameEdit = (
      <input
        type='text'
        autoSelect
        value={playerName}
        onChange={(e) => {
          setplayerName(e.target.value);
        }}
      />
    );
    buttonName = "Save";
  }

  return (
    <li className= {isActive ? "active":""}>
      <span className='player'>
        {nameEdit}
        <span className='player-symbol'>{symbol}</span>
      </span>
      <button onClick={handleEditClick}>{buttonName}</button>
    </li>
  );
}
