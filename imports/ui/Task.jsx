import React, { useState } from "react";
import { ItensCollection } from "../db/ItensCollection";

export const Task = ({
  task,
  onCheckboxClick,
  onDeleteClick,
  onItemCheckboxClick,
}) => {
  const [checked, setChecked] = useState(!!task.isChecked);
  const [button, setButton] = useState(false);
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("items.insert", task._id, value);
  };

  const items = ItensCollection.find().fetch();
  const itemRows = Object.values(items).map((item) => (
    <div>
      <input
        type="checkbox"
        checked={!!item.isChecked}
        onClick={() => toggleChecked(item)}
        onChange={() => setItemChecked(!itemChecked)}
      />
      {item.text}
    </div>
  ));
  console.log(items);
  const [itemChecked, setItemChecked] = useState(!!items.isChecked);

  const toggleChecked = ({ _id, isChecked }) => {
    console.log(typeof _id);
    console.log(typeof isChecked);

    Meteor.call("items.setIsChecked", _id, !isChecked);
  };

  if (checked) {
    btn = (
      <span>
        <s>{task.text}</s>
        {itemRows}
      </span>
    );
  } else {
    btn = (
      <span>
        {task.text}
        {itemRows}
      </span>
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
      </div>
      {input}
      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
