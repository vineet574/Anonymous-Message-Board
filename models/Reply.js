const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReplySchema = new Schema({
  thread_id: { type: Schema.Types.ObjectId, ref: 'Thread', required: true },
  text: { type: String, required: true },
  delete_password: { type: String, required: true },
  reported: { type: Boolean, default: false },
  created_on: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reply', ReplySchema);
