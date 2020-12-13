const { CreditCard } = require('../../models/index');
const BankDeclineError = require('../../errors/BankDeclineError');

module.exports.updateBankBalance = async (data, predicate, transaction) => {
  const [updatedCount, [updatedCreditCard]] = await CreditCard.update(data, {
    where: predicate,
    returning: true,
    transaction,
  });
  if (updatedCount < 2) {
    throw new BankDeclineError('Bank decline transaction');
  }
};
