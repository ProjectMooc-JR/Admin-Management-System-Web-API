
const { db } = require("../db/mysqldb.js");

//get user by name
var getUserbyNameAsync = async (name) => {
  let sql = "SELECT * FROM user where username=? ";
  let result = await db.query(sql, [name]);
  let user = { id: 0 };
  if (result[0].length > 0) {
    user.id = result[0][0].id;
    user.username = result[0][0].username;
    user.password = result[0][0].password;
    user.email = result[0][0].email;
    user.age = result[0][0].age;
    user.gender = result[0][0].gender;
    user.avatar = result[0][0].avatar;
    user.nickname = result[0][0].nickname;
    user.access = result[0][0].access;
    user.active = result[0][0].active;
  }
  return { isSuccess: true, message: "", data: user };
};

// add user
const addUserAsync = async (user) => {
  let sql =
    "insert into users (username, password, email, address, age, gender, avatar, nickname, access, active) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  let [result] = await db.query(sql, [
    user.username,
    user.password,
    user.email,
    user.address,
    user.age,
    user.gender,
    user.avatar,
    user.nickname,
    user.access,
    user.active,
  ]);
  return { isSuccess: true, message: "add user successfully" };
};


// var getUserListAsync = async (page, pageSize) => {
//   let countSql = "SELECT count(*) total FROM user; ";
//   let resultCount = await db.query(countSql);
//   let total = resultCount[0][0].total;
//   if (total == 0) {
//     return { isSuccess: true, message: "", data: { items: [], total: 0 } };
//   }
//   let sql = "SELECT * FROM user limit ? offset ? ;";
//   let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);

//   let userlist = [];
//   if (resultData[0].length > 0) {
//     resultData[0].forEach((element) => {
//       let user = { id: 0 };
//       user.id = element.id;
//       user.username = element.username;
//       //user.password = element.password;
//       user.email = element.email;
//       user.address = element.address;
//       user.age = element.age;
//       user.gender = element.gender;
//       user.avatar = element.avatar;
//       user.access = element.access;
//       userlist.push(user);
//     });
//   }
//   return {
//     isSuccess: true,
//     message: "",
//     data: { items: userlist, total: total },
//   };
// };



module.exports = {
  //getUserListAsync,
  getUserbyNameAsync,
  addUserAsync
};
