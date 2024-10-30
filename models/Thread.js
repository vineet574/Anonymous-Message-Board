const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ThreadSchema = new Schema({
  board: { type: String, required: true },
  text: { type: String, required: true },
  delete_password: { type: String, required: true },
  reported: { type: Boolean, default: false },
  created_on: { type: Date, default: Date.now },
  bumped_on: { type: Date, default: Date.now },
  replies: [{ type: Schema.Types.ObjectId, ref: 'Reply' }]
});

ThreadSchema.pre('save', function (next) {
  this.bumped_on = Date.now();
  next();
});

module.exports = mongoose.model('Thread', ThreadSchema);
