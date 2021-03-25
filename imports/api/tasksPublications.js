import { Meteor } from "meteor/meteor";
import { TasksCollection } from "../db/TasksCollection";
import { ItensCollection } from "../db/ItensCollection";

Meteor.publish("tasks", function publishTasks() {
  return TasksCollection.find({ userId: this.userId });
});

Meteor.publish("items", function publishItems() {
  return ItensCollection.find({ userId: this.userId });
});
