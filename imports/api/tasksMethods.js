import { check } from "meteor/check";
import { TasksCollection } from "../db/TasksCollection";

Meteor.methods({
  "tasks.insert"(text) {
    check(text, String);

    if (!this.userId) {
      throw new Meteor.error("Not authorized.");
    }

    TasksCollection.insert({
      text,
      createdAt: new Date(),
      userId: this.userId,
    });
  },

  "tasks.remove"(taskId) {
    check(taskId, String);
    if (!this.userId) {
      throw new Meteor.error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.error("Acess denied.");
    }
    TasksCollection.remove(taskId);
  },

  "tasks.setIsChecked"(taskId, isChecked) {
    check(taskId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.error("Not authorized.");
    }

    const task = TasksCollection.findOne({ _id: taskId, userId: this.userId });
    if (!task) {
      throw new Meteor.error("Acess Denied.");
    }

    TasksCollection.update(taskId, {
      $set: {
        isChecked,
      },
    });
  },
});
