const fs = require('fs');
const { format } = require('date-fns');
const { LOG_FILE_PATH, FILES_PATH } = require('../constants');

exports.logger = () => {
  try {
    if (fs.readFileSync(LOG_FILE_PATH, { encoding: 'utf8' }) === '') {
      fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([]));
    } else {
      const fileData = JSON.parse(fs.readFileSync(LOG_FILE_PATH, { encoding: 'utf8' }));

      if (
        fileData.length > 0 &&
        !fs.existsSync(
          `${FILES_PATH}errorsBackup/error-log-${format(
            new Date().setDate(new Date().getDate() - 1),
            'y-MM-dd',
          )}.json`,
        )
      ) {
        const newFileData = [];

        fileData.forEach((e) => {
          newFileData.push({ message: e.message, code: e.code, time: e.time });
        });

        fs.writeFileSync(
          `${FILES_PATH}errorsBackup/error-log-${format(
            new Date().setDate(new Date().getDate() - 1),
            'y-MM-dd',
          )}.json`,
          JSON.stringify(newFileData),
          { flag: 'wx' },
        );

        fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([]));
      }
    }
  } catch (err) {
    throw new Error(err);
  }
};
