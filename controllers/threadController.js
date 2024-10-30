const Thread = require('../models/Thread');
const Reply = require('../models/Reply');

exports.createThread = async (req, res) => {
  const { text, delete_password } = req.body;
  const board = req.params.board;
  const thread = new Thread({ text, delete_password, board });
  await thread.save();
  res.json(thread);
};

exports.getThreads = async (req, res) => {
  const board = req.params.board;
  const threads = await Thread.find({ board })
    .sort({ bumped_on: -1 })
    .limit(10)
    .populate({ path: 'replies', options: { limit: 3, sort: { created_on: -1 } } });
  res.json(threads);
};

exports.deleteThread = async (req, res) => {
  const { thread_id, delete_password } = req.body;
  const thread = await Thread.findById(thread_id);
  if (!thread || thread.delete_password !== delete_password) return res.status(400).send('Incorrect password');
  await Thread.findByIdAndDelete(thread_id);
  res.send('Thread deleted');
};

exports.reportThread = async (req, res) => {
  const { thread_id } = req.body;
  await Thread.findByIdAndUpdate(thread_id, { reported: true });
  res.send('Thread reported');
};

