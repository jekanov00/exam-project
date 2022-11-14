const Messages = require('../models/mongoModels/Message');

module.exports.countMessagesByWord = async (word) => {
  const countArray = await Messages.aggregate([
    { $match: { body: { $regex: word.toString(), $options: 'gim' } } },
    { $group: { _id: null, count: { $sum: 1 } } },
  ]);
  console.log('COUNT:', countArray[0]?.count);
  return countArray[0]?.count;
};
