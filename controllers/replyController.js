const Thread = require('../models/Thread');
const Reply = require('../models/Reply');

exports.createReply = async (req, res) => {
  const { thread_id, text, delete_password } = req.body;
  const reply = new Reply({ thread_id, text, delete_password });
  const thread = await Thread.findById(thread_id);
  if (!thread) return res.status(404).send('Thread not found');
  thread.replies.push(reply);
  await reply.save();
  await thread.save();
  res.json(reply);
};

exports.getThreadReplies = async (req, res) => {
  const thread = await Thread.findById(req.query.thread_id).populate('replies');
  if (!thread) return res.status(404).send('Thread not found');
  res.json(thread.replies);
};

exports.deleteReply = async (req, res) => {
  const { reply_id, delete_password } = req.body;
  const reply = await Reply.findById(reply_id);
  if (!reply || reply.delete_password !== delete_password) return res.status(400).send('Incorrect password');
  reply.text = '[deleted]';
  await reply.save();
  res.send('Reply deleted');
};

exports.reportReply = async (req, res) => {
  const { reply_id } = req.body;
  await Reply.findByIdAndUpdate(reply_id, { reported: true });
  res.send('Reply reported');
};
