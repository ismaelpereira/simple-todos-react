import React, { useState } from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const [checked, setChecked] = useState(!!task.isChecked);
  const [button, setButton] = useState(false);
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("items.insert", task._id, value);
  };

  if (checked) {
    btn = (
      <span>
        <s>{task.text}</s>
      </span>
    );
  } else {
    btn = <span>{task.text}</span>;
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
      <div>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          onChange={() => setChecked(!checked)}
        />
        {btn}
        {input}
      </div>
      <div className="panel">{}</div>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
