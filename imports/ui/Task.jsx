import React, { useState } from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const [checked, setChecked] = useState(task.isChecked);
  const [button, setButton] = useState(false);
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("insert.item", task._id, value);
    console.log(task);
  };

  let btn;
  if (checked) {
    btn = (
      <span>
        <s>{task.text}</s>
      </span>
    );
  } else {
    btn = <span> {task.text}</span>;
  }

  let input;
  if (!button) {
    input = (
      <button className="btn-add" onClick={() => setButton(!button)}>
        +
      </button>
    );
  } else {
    input = (
      <form onSubmit={submit}>
        <input
          type="text"
          placeholder="Add new item"
          onChange={(e) => setValue(e.target.value)}
        ></input>
        <button className="btn-add" type="submit">
          Add
        </button>
        <button className="btn-cancel" onClick={() => setButton(!button)}>
          Cancel
        </button>
      </form>
    );
  }
  return (
    <li>
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        onChange={() => setChecked(!checked)}
      />
      <span>{btn}</span>
      {input}
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
