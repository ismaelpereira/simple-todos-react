import { check } from "meteor/check";
import { ItensCollection } from "../db/ItensCollection";
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
    ItensCollection.find().forEach((item) => {
      if (item.taskId === taskId) {
        ItensCollection.remove(item._id);
      }
    });
    if (!task) {
      throw new Meteor.error("Acess denied.");
    }
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
  "items.insert"(taskId, text) {
    check(taskId, String);
    check(text, String);

    if (!this.userId) {
      throw new Meteor.error("Not authorized.");
    }
    const task = TasksCollection.findOne({
      _id: taskId,
      userId: this.userId,
    });

    if (!task) {
      throw new Meteor.error("Acess Denied.");
    }

    ItensCollection.insert({
      text,
      taskId: taskId,
      userId: this.userId,
      createdAt: new Date(),
    });
  },
  "items.setItemChecked"(itemId, isChecked) {
    check(itemId, String);
    check(isChecked, Boolean);

    if (!this.userId) {
      throw new Meteor.error("Not authorized");
    }

    ItensCollection.update(itemId, {
      $set: {
        isChecked,
      },
    });
  },
  "items.remove"(itemId) {
    check(itemId, String);

    const item = ItensCollection.findOne({ _id: itemId, userId: this.userId });
    if (!item) {
      throw new Meteor.error("Acess denied.");
    }
    ItensCollection.remove(itemId);
  },
});
