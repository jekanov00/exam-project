const bd = require('../models/index');
const CONSTANTS = require('../constants');

const types = [
  '',
  'name,tagline,logo',
  'name',
  'tagline',
  'logo',
  'name,tagline',
  'logo,tagline',
  'name,logo',
];

function getPredicateTypes(index) {
  return { [bd.Sequelize.Op.or]: [types[index].split(',')] };
}

module.exports.createWhereForAllContests = (
  typeIndex,
  contestId,
  industry,
  awardSort,
) => {
  const object = {
    where: {},
    order: [],
  };
  if (typeIndex) Object.assign(object.where, { contestType: getPredicateTypes(typeIndex) });
  if (contestId) Object.assign(object.where, { id: contestId });
  if (industry) Object.assign(object.where, { industry });
  if (awardSort) object.order.push(['prize', awardSort]);
  Object.assign(object.where, {
    status: {
      [bd.Sequelize.Op.or]: [
        CONSTANTS.CONTEST_STATUS_FINISHED,
        CONSTANTS.CONTEST_STATUS_ACTIVE,
      ],
    },
  });
  object.order.push(['id', 'desc']);
  return object;
};
