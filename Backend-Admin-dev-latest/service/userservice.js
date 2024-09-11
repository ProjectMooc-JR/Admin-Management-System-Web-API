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

// Get whole set of users without pagination
const getWholeUsersAsync = async () => {
  let sql = "SELECT * FROM user";
  let result = await db.query(sql);

  if (result[0].length > 0) {
    return {
      isSuccess: true,
      message: "Users fetched successfully",
      data: result[0],
    };
  }
  return { isSuccess: false, message: "No users found", data: [] };
};

// add user
const addUserAsync = async (user) => {
  let sql =
    "insert into user (username, password, email, address, age, gender, avatar, nickname, access, active) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
  if (result.affectedRows > 0) {
    return { isSuccess: true, message: "User added successfully" };
  } else {
    return { isSuccess: false, message: "Fail to add user" };
  }
};

//delete user
const deleteUserByIdAsync = async (id) => {
  let sql = "Delete FROM user where id = ?";
  let [result] = await db.query(sql, [id]);
  if (result.affectedRows > 0) {
    return { isSuccess: true, message: "Delete successfully" };
  }

  return { isSuccess: false, message: "Fail to delete" };
};

const deleteUserByIdsAsync = async (ids) => {

  //sql injection, don't recommend
  //let sql = `Delete FROM user where id in (${ids})`;

  // avoid sql injection
  // let idArray = ids.split(",")
  // let idsString = idArray.map((id) => `'${parseInt(id)}'`).join(",");
  // let sql1 = `Delete FROM user where id in (${idsString})`;

  //implement best approach

    let sql = `DELETE FROM user WHERE id IN (?)`;
    let idsArray = ids.split(",").map(id => parseInt(id));
    await db.query(sql, [idsArray], function (error, results) {
      if (results.affectedRows > 0) {
        return { isSuccess: true, message: "Delete successfully" };
      }
      if (error) throw error;
     
    });

  //let [result] = await db.query(sql);
  // if (result.affectedRows > 0) {
  //   return { isSuccess: true, message: "Delete successfully" };
  // }
};

//update
const updateUserByIdAsync = async (user) => {
  // SQL query statement
  let sql = `UPDATE user SET username = ?, email = ?, address = ?, age = ?, gender = ?, avatar = ?, nickname = ?, access = ?,active = ? WHERE id = ?`;
  // Executing the query
  let result = await db.query(sql, [
    user.username,
    user.email,
    user.address,
    user.age,
    user.gender,
    user.avatar,
    user.nickname,
    user.access,
    user.active,
    user.id, // The ID should be at the end to match the WHERE clause
  ]);
  if (result[0].affectedRows > 0) {
    return { isSuccess: true, message: "Update successful" };
  }
  return { isSuccess: false, message: "Fail to update" };
};

var getUserListAsync = async (page, pageSize) => {
  let countSql = "SELECT count(*) total FROM user; ";
  let resultCount = await db.query(countSql);
  let total = resultCount[0][0].total;
  if (total == 0) {
    return { isSuccess: true, message: "", data: { items: [], total: 0 } };
  }
  let sql = "SELECT * FROM user limit ? offset ? ;";
  let resultData = await db.query(sql, [pageSize, (page - 1) * pageSize]);

  let userlist = [];
  if (resultData[0].length > 0) {
    resultData[0].forEach((element) => {
      let user = { id: 0 };
      user.id = element.id;
      user.username = element.username;
      //user.password = element.password;
      user.email = element.email;
      user.address = element.address;
      user.age = element.age;
      user.gender = element.gender;
      user.avatar = element.avatar;
      user.access = element.access;
      userlist.push(user);
    });
  }
  return {
    isSuccess: true,
    message: "",
    data: { items: userlist, total: total },
  };
};

module.exports = {
  getUserListAsync,
  getUserbyNameAsync,
  addUserAsync,
  deleteUserByIdAsync,
  updateUserByIdAsync,
  deleteUserByIdsAsync,
  getWholeUsersAsync,
};
