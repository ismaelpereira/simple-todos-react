import { Meteor } from "meteor/meteor";
import React, { Fragment, useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { TasksCollection } from "../db/TasksCollection";
import { Task } from "./Task";
import { TaskForm } from "./TaskForm";
import { LoginForm } from "./LoginForm";
import { ItensCollection } from "../db/ItensCollection";

const toggleChecked = ({ _id, isChecked }) => {
  Meteor.call("tasks.setIsChecked", _id, !isChecked);
};

const toggleItemChecked = ({ _id, isChecked }) => {
  Meteor.call("items.setItemChecked", _id, !isChecked);
};

const deleteTask = ({ _id }) => Meteor.call("tasks.remove", _id);

const deleteItem = ({ _id }) => Meteor.call("items.remove", _id);

export const App = () => {
  const user = useTracker(() => Meteor.user());
  const [hideCompleted, setHideCompleted] = useState(false);
  const hideCompletedFilter = { isChecked: { $ne: true } };
  const userFilter = user ? { userId: user._id } : {};
  const pendingOnlyFilter = { ...hideCompletedFilter, ...userFilter };
  const { items, tasks, pendingTaskCount, isLoading } = useTracker(() => {
    const noDataAvailable = { tasks: [], pendingTaskCount: 0 };
    if (!Meteor.user()) {
      return noDataAvailable;
    }
    const handler = Meteor.subscribe("tasks");
    const itensHandler = Meteor.subscribe("items");

    if (!handler.ready() || !itensHandler.ready()) {
      return { ...noDataAvailable, isLoading: true };
    }
    const tasks = TasksCollection.find(
      hideCompleted ? pendingOnlyFilter : userFilter,
      {
        sort: { createdAt: -1 },
      }
    ).fetch();
    const items = ItensCollection.find().fetch();
    const pendingTaskCount = TasksCollection.find(pendingOnlyFilter).count();

    return { items, tasks, pendingTaskCount };
  });

  const pendingTaskTitle = `${
    pendingTaskCount ? ` (${pendingTaskCount})` : ""
  }`;

  const logout = () => Meteor.logout();

  return (
    <div className="app">
      <header>
        <div className="app-bar">
          <div className="app-header">
            <h1>
              ??????? To-Do Lists
              {pendingTaskTitle}
            </h1>
          </div>
        </div>
      </header>
      <div className="main">
        {user ? (
          <Fragment>
            <div className="user" onClick={logout}>
              Logout????
            </div>
            <TaskForm user={user} />
            <div className="filter">
              <button onClick={() => setHideCompleted(!hideCompleted)}>
                {hideCompleted ? "Show All" : "Hide Completed"}
              </button>
            </div>

            {isLoading && <div className="loading">loading...</div>}

            <ul className="tasks">
              {tasks.map((task) => (
                <Task
                  key={task._id}
                  task={task}
                  items={items}
                  onCheckboxClick={toggleChecked}
                  onDeleteClick={deleteTask}
                  toggleItemChecked={toggleItemChecked}
                  onDeleteItemClick={deleteItem}
                />
              ))}
            </ul>
          </Fragment>
        ) : (
          <LoginForm />
        )}
      </div>
    </div>
  );
};
