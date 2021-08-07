const ObjectId = require('mongodb').ObjectId;
const getDb = require('../util/database').getDb;

class Task {
  constructor(title, description, state, priority) {
    this.title = title;
    this.description = description;
    this.state = state;
    this.priority = priority;
  }

  save() {
    const db = getDb();
    return db
      .collection('task')
      .insertOne(this)
      .then((result) => {
        return this;
      })
      .catch((error) => {
        return error;
      });
  }

  static getAll() {
    const db = getDb();
    return db
      .collection('task')
      .find()
      .toArray()
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  static getOneTask(id) {
    const db = getDb();
    return db
      .collection('task')
      .findOne(ObjectId(id))
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }

  static deleteTasks(ids) {
    const db = getDb();
    return db
      .collection('task')
      .deleteMany({ _id: { $in: ids.map((id) => ObjectId(id)) } })
      .then((result) => {
        return result;
      })
      .catch((error) => {
        return error;
      });
  }
}

module.exports = Task;
