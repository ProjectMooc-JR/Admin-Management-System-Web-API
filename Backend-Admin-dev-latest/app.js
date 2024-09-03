const express = require("express");

const app = express();

const morgan = require("morgan")

app.use(morgan("dev"))

const bcrypt = require("bcrypt");

bcrypt.genSalt(10).then((data) => {
  console.log(data);
});

// // 设置静态文件目录
// app.use(express.static("public"));
//setup static file directory
// const path=require("path")
// app.use(express.static(path.join(__dirname,'public')))

app.get("/health", (req, res) => {
  res.status(200).json({ status: "success", message: "backend run success" });
});
//config cors
const cors = require("cors");
app.use(cors());

//config commonresult
const returnvalue = require("./middleware/returnvalue");
app.use(returnvalue.returnvalue);

//config josn body
app.use(express.json({ limit: "5mb" }));
app.use(express.urlencoded({ extended: false, limit: "5mb" }));

// config Swagger
const swaggerDocument = require("./common/swagger");
const swaggerUi = require("swagger-ui-express");
// config'/api-docs'  Path to access Swagger UI
const swaggerUiOptions = {
  explorer: true,
};
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerUiOptions)
);

//config jwt
const { jwtConfig } = require("./appConfig");
let { expressjwt: jwt } = require("express-jwt");
// app.use(
//   jwt({ secret: jwtConfig.secret, algorithms: jwtConfig.algorithms }).unless({
//     path: ["/", "/api-docs", "/api/auth/login", "/api/auth/loginOut", "/api/auth/register"],
//   })
// );

app.get("/", (req, res) => {
  res.send("server running " + new Date().toLocaleString());
});

//config authrouter
const authrouter = require("./router/authrouter");
app.use("/api/auth", authrouter);

//config userrouter
const userrouter = require("./router/userrouter");
app.use("/api/users", userrouter);

//config teacherrouter
const teacherRouter = require("./router/teacherrouter");
app.use("/api/teachers", teacherRouter);

//config courserouter
const courseRoutes = require('./router/courseRoutes');
app.use('/api/courses', courseRoutes);

//config chapterrouter
const chapterRoutes = require('./router/chapterRoutes');
app.use('/api/chapters', chapterRoutes);

const courseScheduleRouter = require("./router/courseScheduleRouter");
app.use("/api/courseSchedule", courseScheduleRouter);

//config courseCategoryRouter
const courseCategoryRouter =require("./router/courseCategoryRouter");
app.use("/api/courseCategory",courseCategoryRouter)

//config erorhandle
const erorhandle = require("./middleware/errorhandling");
app.use(erorhandle.errorhandling);

let port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`Server is running on port ${port},http://localhost:${port}`);
});
