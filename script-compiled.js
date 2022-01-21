"use strict";

var _db = _interopRequireDefault(require("./utils/db"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const waitConnection = () => {
  return new Promise((resolve, reject) => {
    let i = 0;

    const repeatFct = async () => {
      await setTimeout(() => {
        i += 1;

        if (i >= 10) {
          reject();
        } else if (!_db.default.isAlive()) {
          repeatFct();
        } else {
          resolve();
        }
      }, 1000);
    };

    repeatFct();
  });
};

(async () => {
  console.log(_db.default.isAlive());
  await waitConnection();
  console.log(_db.default.isAlive());
  console.log(await _db.default.nbUsers());
  console.log(await _db.default.nbFiles());
})();
