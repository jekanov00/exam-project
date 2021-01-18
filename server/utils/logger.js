const fs = require('fs');
const { format } = require('date-fns');
const { LOG_FILE_PATH, FILES_PATH } = require('../constants');

exports.logger = (req, res, next) => {
  try {
    fs.readFile(LOG_FILE_PATH, 'utf8', (readErr, data) => {
      if (readErr) {
        next(readErr);
      } else {
        const fileData = JSON.parse(data);

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

          fs.writeFile(
            `${FILES_PATH}errorsBackup/error-log-${format(
              new Date().setDate(new Date().getDate() - 1),
              'y-MM-dd',
            )}.json`,
            JSON.stringify(newFileData),
            { encoding: 'utf8', flag: 'wx' },
            (writeErr) => {
              if (writeErr) {
                next(writeErr);
              } else {
                fs.writeFile(LOG_FILE_PATH, JSON.stringify([]), 'utf8', (writeEmptyErr) => {
                  if (writeEmptyErr) {
                    next(writeEmptyErr);
                  }
                });
              }
            },
          );
        }
      }
    });
    console.log('pass');
    next();
  } catch (err) {
    next(err);
  }
};
