import React, { useState } from "react";
import { ItensCollection } from "../db/ItensCollection";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const [checked, setChecked] = useState(!!task.isChecked);
  const [button, setButton] = useState(false);
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("items.insert", task._id, value);
  };

  let itens;
  ItensCollection.find().map((item) => {
    if (item.taskId === task._id) {
      itens = <span>{item.text}</span>;
    }
  });

  if (checked) {
    btn = (
      <span>
        <s>{task.text}</s>
      </span>
    );
  } else {
    btn = (
      <div>
        <span>{task.text}</span>
      </div>
    );
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
      <div className="panel">{itens}</div>
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
