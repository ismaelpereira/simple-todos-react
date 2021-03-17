import { Meteor } from "meteor/meteor";
import React, { useReducer, useState } from "react";
import { TasksCollection } from "../db/TasksCollection";

export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return alert("O texto nao pode estar em branco!!");
    setText("");
    Meteor.call("tasks.insert", text);
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};
