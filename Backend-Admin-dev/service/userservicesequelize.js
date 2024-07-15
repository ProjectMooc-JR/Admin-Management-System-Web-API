const userModel = require("../model/user");

var getUserbyNameAsync = async (name) => {
  let queryUser = await userModel.findAll({ where: { username: name } });

  let user = { id: 0 };
  if (queryUser != null&&queryUser.length>0) {
    let oneUser=queryUser[0]
    user.id = oneUser.id;
    user.username = oneUser.username;
    user.password = oneUser.password;
    user.email = oneUser.email;
    user.age = oneUser.age;
    user.gender = oneUser.gender;
  }

  return { isSuccess: true, message: "", data: user };
};

module.exports = { getUserbyNameAsync };
