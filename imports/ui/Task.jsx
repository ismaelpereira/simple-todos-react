import React, { useState } from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const [checked, setChecked] = useState(task.isChecked);
  let item;
  if (checked === true) {
    item = (
      <span>
        <s>{task.text}</s>
      </span>
    );
  } else {
    item = <span> {task.text}</span>;
  }
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        onChange={() => setChecked(!checked)}
      />
      <span>{item}</span>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
