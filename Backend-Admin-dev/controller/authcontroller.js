const { bcryptConfig } = require("../appConfig");
const bcrypt = require("bcrypt");
const logger = require("../common/logsetting");
const { jwtConfig } = require("../appConfig");
const jwt = require("jsonwebtoken");
const userservice = require("../service/userservice");

const loginAsync = async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let result = await userservice.getUserbyNameAsync(username);
  if (!result.isSuccess) {
    res.sendCommonValue(null, "login fail username or password not math", 0);
  } else {
    //let salt = await bcrypt.genSalt(bcryptConfig.saltRounds);
    let epassword = await bcrypt.hashSync(password, bcryptConfig.salt);
    console.log(epassword);
    //let isMath = await bcrypt.compare(epassword, result.data.password);
    //isMath=true;
    if (epassword === result.data.password) {
      let user = { id: result.data.id, username: result.data.username };
      let tokenStr = jwt.sign(user, jwtConfig.secret, {
        expiresIn: jwtConfig.expiresIn,
      });
      res.sendCommonValue({
        token: tokenStr,
        id: result.data.id,
        username: username,
        access: result.data.access,
        email: result.data.email,
        address: result.data.address,
        age: result.data.age,
        gender: result.data.gender,
        avatar: result.data.avatar,
      }, "login success", 1);
      //login success
    } else {
      res.sendCommonValue(null, "login fail username or password not math", 0);
    }
  }
};


const logoutAsync = async (req, res) => {
  try {
    // Assume the token is in the Authorization header as a Bearer token
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      // Log the logout action, if logging is set up
      logger.info(`User logged out with token: ${token}`);

      // Respond to the client that the logout was successful
      res.sendCommonValue(null, "logout successful", 1);
    } else {
      // If no token was provided, respond with an error
      res.sendCommonValue(null, "No token provided, logout failed", 0);
    }
  } catch (error) {
    // Log the error if something goes wrong
    logger.error('Logout error: ', error);
    res.sendCommonValue(null, "Logout failed due to server error", 0);
  }
};

module.exports = {
  registerAsync
};
