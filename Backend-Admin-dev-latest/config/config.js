const appConfig = require("../appConfig");

module.exports = {
  development: {
    username: "root",
    password: appConfig.mysqlConfig.password,
    database: "adminmanagementsystemdb",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
