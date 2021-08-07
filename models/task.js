const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  state: {
    type: String,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  modifiedAt: {
    type: Date,
    required: false,
  },

  // Ref: Category
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: false,
  },
});

module.exports = mongoose.model('Task', taskSchema);
