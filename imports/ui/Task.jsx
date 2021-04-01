import React, { useState } from "react";

export const Task = ({
  task,
  items,
  onCheckboxClick,
  onDeleteClick,
  toggleItemChecked,
  onDeleteItemClick,
}) => {
  const [checked, setChecked] = useState(!!task.isChecked);
  const [button, setButton] = useState(false);
  const [value, setValue] = useState("");
  const [itemChecked, setItemChecked] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("items.insert", task._id, value);
    setValue("");
  };

  const itemRows = Object.values(items).map((item) => {
    if (task._id === item.taskId) {
      if (item.isChecked) {
        return (
          <div key={item._id}>
            <ul>
              <input
                className="item-checkbox"
                type="checkbox"
                checked={!!item.isChecked}
                onClick={() => toggleItemChecked(item)}
                onChange={() => setItemChecked(!itemChecked)}
              />
              <span>
                <s>{item.text}</s>
              </span>
              <button
                className="btn-delete-item"
                onClick={() => onDeleteItemClick(item)}
              >
                &times;
              </button>
            </ul>
          </div>
        );
      } else {
        return (
          <div key={item._id}>
            <ul>
              <input
                className="item-checkbox"
                type="checkbox"
                checked={!!item.isChecked}
                onClick={() => toggleItemChecked(item)}
                onChange={() => setItemChecked(!itemChecked)}
              />
              <span>{item.text}</span>
              <button
                className="btn-delete-item"
                onClick={() => onDeleteItemClick(item)}
              >
                &times;
              </button>
            </ul>
          </div>
        );
      }
    }
  });

  if (checked) {
    btn = (
      <div>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          onChange={() => setChecked(!checked)}
        />
        <span>
          <s> {task.text}</s>
        </span>
        <span>
          <s>{itemRows}</s>
        </span>
      </div>
    );
    Object.values(items).map((item) => {
      if (task._id === item.taskId) {
        Meteor.call("items.setItemChecked", item._id, (item.isChecked = true));
      }
    });
  } else {
    btn = (
      <div>
        <input
          type="checkbox"
          checked={!!task.isChecked}
          onClick={() => onCheckboxClick(task)}
          onChange={() => setChecked(!checked)}
        />
        <span>{task.text}</span>
        <span>{itemRows}</span>
      </div>
    );
  }

  let formItem;
  if (!button) {
    formItem = (
      <div className="buttons-task">
        <button className="btn-add" onClick={() => setButton(!button)}>
          +
        </button>
        <button className="btn-remove" onClick={() => onDeleteClick(task)}>
          &times;
        </button>
      </div>
    );
  } else {
    formItem = (
      <div className="form-add-item">
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
        <button className="btn-remove" onClick={() => onDeleteClick(task)}>
          &times;
        </button>
      </div>
    );
  }

  return (
    <li>
      {btn}
      {formItem}
    </li>
  );
};
