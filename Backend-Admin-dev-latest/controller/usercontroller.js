const userservice = require("../service/userservice");
const { bcryptConfig } = require("../appConfig");
const bcrypt = require("bcrypt");
const fs = require("fs");

const addUserAsync = async (req, res) => {
  //check username not in db
  let dbResult = await userservice.getUserbyNameAsync(req.body.username);
  if (dbResult.isSuccess && dbResult.data.id > 0) {
    res.sendCommonValue({}, "Username already exists", 0, 400);
    return;
  }
  let avatarLocation = null;

  if (req.body.avatar) {
    // If an avatar is uploaded, save the avatar to the local directory public/images/avatars
    const buffer = Buffer.from(req.body.avatar, "binary");
    const fileName = `avatar-${req.body.username}.jpg`; // Use the username as the filename
    const filePath = `public/images/avatar/${fileName}`; // File save path

    // Write the image to the file system
    fs.writeFileSync(filePath, buffer);
    avatarLocation = filePath;
  }
  let user = {};
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.address = req.body.address;
  user.age = req.body.age;
  user.gender = req.body.gender;
  user.avatar = avatarLocation;
  user.access = req.body.access;

  let password = req.body.password;
  //encryption password
  //let salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
  //console.log(salt);
  let encrypPassword = await bcrypt.hashSync(user.password, bcryptConfig.salt);
  user.password = encrypPassword;
  let result = await userservice.addUserAsync(user);
  if (result.isSuccess) {
    user.password = password;
    res.sendCommonValue(user, "success", 1);
  } else {
    res.sendCommonValue({}, "", 0);
  }
};

// const getUserAsync = (req, res) => {
//   let username = req.query.username;
//   let result = userservice.getUserbyNameAsync(username);
//   console.log(`getUserAsync: ${result.data}`);
//   if (result.isSuccess) {
//     res.sendCommonValue(result.data, "success", 1);
//   } else {
//     res.sendCommonValue({}, "failed", 1);
//   }
// };

const getUserAsync = async (req, res) => {
  let username = req.query.username;
  try {
    let result = await userservice.getUserbyNameAsync(username);
    console.log(`getUserAsync: ${JSON.stringify(result.data)}`); // Ensure to convert object to string for proper logging
    if (result.isSuccess) {
      res.sendCommonValue(result.data, "success", 1);
    } else {
      res.sendCommonValue({}, "failed", 0); // Assuming 0 is the correct status for fail
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.sendCommonValue({}, "Error in fetching user", 0);
  }
};

const getUserListByAccessAsync = async (req, res) => {
  const access = req.params.access;
  const result = await userservice.getUserListByAccessAsync(access);
  return (result.isSuccess) ? res.sendCommonValue(result.data, result.message, 1)
    : res.sendCommonValue(result.data, result.message, 0);
}

const getUserListAsync = async (req, res) => {
  let page = parseInt(req.params.page);
  let pageSize = parseInt(req.params.pageSize);
  let result = await userservice.getUserListAsync(page, pageSize);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "failed", 0);
  }
};

const deUserByIdAsync = async (req, res) => {
  let ids = req.params.ids;
  let result = await userservice.delUserByIdAsync(ids);
  if (result.isSuccess) {
    res.sendCommonValue({}, "success", 1);
  } else {
    res.sendCommonValue({}, "failed", 0);
  }
};

const updateUserAsync = async (req, res) => {
  //check username not in db
  let user = {};
  user.id = parseInt(req.params.id);
  user.username = req.body.username;
  user.email = req.body.email;
  user.address = req.body.address;
  user.age = req.body.age;
  user.gender = req.body.gender;
  user.avatar = req.body.avatar;
  user.access = req.body.access;

  // let checkUserResult = await userservice.checkUserNameAsync(
  //   // user.username,
  //   user.id
  // );
  // if (!checkUserResult.isSuccess) {
  //   res.sendCommonValue({}, "Username and User ID do not exists", 400, 400);
  //   return;
  // }
  if (!Number.isInteger(user.id)) {
    res.status(400).send({ message: "Invalid user ID" });
    return;
  }
  let dbResult = await userservice.uptUserByIdAsync(user);
  if (dbResult.isSuccess) {
    res.sendCommonValue(user, "Updated user succeed", 1);
    return;
  } else {
    res.sendCommonValue({}, "", 0);
  }
};

const updatePasswordAsync = async (req, res) => {
  const userId = parseInt(req.params.id);
  const password = req.body.password;



  // Hash the new password before storing it
  let encrypPassword = await bcrypt.hashSync(password, bcryptConfig.salt);

  // Update the password in the database
  let dbResult = await userservice.updatePasswordByIdAsync(userId, encrypPassword);
  if (dbResult.isSuccess) {
    res.sendCommonValue({}, "Password updated successfully", 1);
  } else {
    res.sendCommonValue({}, "Failed to update password", 0);
  }
};

const getUserByIdAsync = async (req, res) => {
  let id = parseInt(req.query.id);
  let result = await userservice.getUserbyIdAsync(id);
  if (result.isSuccess) {
    res.sendCommonValue(result.data, "success", 1);
  } else {
    res.sendCommonValue([], "failed", 0);
  }
};

module.exports = {
  addUserAsync,
  getUserAsync,
  getUserListAsync,
  deUserByIdAsync,
  updateUserAsync,
  getUserByIdAsync,
  getUserListByAccessAsync,
  updatePasswordAsync
};
