import React, { useState } from "react";

export const Task = ({ task, onCheckboxClick, onDeleteClick }) => {
  const [checked, setChecked] = useState(!!task.isChecked);
  const [button, setButton] = useState(false);
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    Meteor.call("item.insert", task._id, value);
  };
  console.log(task);
  let itens;
  if (task.values !== undefined) {
    itens = Object.values(task.values).map((itens) => (
      <ul>
        <li>{itens.text}</li>
      </ul>
    ));
  }

  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var panel = this.nextElementSibling;
      if (panel.style.display === "block") {
        panel.style.display = "none";
      } else {
        panel.style.display = "block";
      }
    });
  }

  let btn;
  if (checked) {
    btn = (
      <div>
        <button className="accordion">
          <s>{task.text}</s>
        </button>
        <div className="panel">{itens}</div>
      </div>
    );
  } else {
    btn = (
      <div>
        <button className="accordion">{task.text}</button>
        <div className="panel">{itens}</div>
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
      <input
        type="checkbox"
        checked={!!task.isChecked}
        onClick={() => onCheckboxClick(task)}
        onChange={() => setChecked(!checked)}
      />
      {btn}
      {input}

      <button onClick={() => onDeleteClick(task)}>&times;</button>
    </li>
  );
};
