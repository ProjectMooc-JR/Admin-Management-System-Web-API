// const mysql2 = require("mysql2/promise"); //support await/async
// const { mysqlConfig } = require("../appConfig");

// const db = mysql2.createPool({
//   host: dbConfig.host,
//   user: dbConfig.user,
//   password: dbConfig.password,
//   database: dbConfig.database,
// });

// module.exports = {
//   db,
// };

// // db/mysqldb.js
const mysql2 = require("mysql2/promise"); // support await/async
const { dbConfig } = require("../appConfig"); // 确保引用正确的配置

const db = mysql2.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
});

module.exports = {
  db,
};
