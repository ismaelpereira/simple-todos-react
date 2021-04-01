import { Meteor } from "meteor/meteor";
import React, { useState } from "react";

export const TaskForm = () => {
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return alert("O texto nao pode estar em branco!!");
    Meteor.call("tasks.insert", text);
    setText("");
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Type to add new tasks"
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add List</button>
    </form>
  );
};
