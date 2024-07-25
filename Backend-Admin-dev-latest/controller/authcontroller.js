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


module.exports = {
  loginAsync
};
