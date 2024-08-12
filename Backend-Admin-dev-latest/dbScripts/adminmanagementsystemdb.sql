/*
 Navicat Premium Dump SQL

 Source Server         : test
 Source Server Type    : MySQL
 Source Server Version : 80019 (8.0.19)
 Source Host           : localhost:3306
 Source Schema         : adminmanagementsystemdb

 Target Server Type    : MySQL
 Target Server Version : 80019 (8.0.19)
 File Encoding         : 65001

 Date: 13/08/2024 00:31:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for coursecategories
-- ----------------------------
DROP TABLE IF EXISTS `coursecategories`;
CREATE TABLE `coursecategories`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CategoryName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Level` int NULL DEFAULT NULL,
  `ParentID` int NULL DEFAULT NULL,
  `Notes` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coursecategories
-- ----------------------------
INSERT INTO `coursecategories` VALUES (1, 'Programming', 1, NULL, 'Courses related to programming');

-- ----------------------------
-- Table structure for coursechapters
-- ----------------------------
DROP TABLE IF EXISTS `coursechapters`;
CREATE TABLE `coursechapters`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ChapterTitle` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ChapterDescription` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `CourseID` int NULL DEFAULT NULL,
  `VideoURL` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `ChapterNumber` int NULL DEFAULT 0,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `CourseID`(`CourseID` ASC) USING BTREE,
  CONSTRAINT `coursechapters_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coursechapters
-- ----------------------------

-- ----------------------------
-- Table structure for coursecomments
-- ----------------------------
DROP TABLE IF EXISTS `coursecomments`;
CREATE TABLE `coursecomments`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CourseID` int NOT NULL,
  `CommentContent` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `CommentTime` datetime NULL DEFAULT NULL,
  `UserID` int NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `CourseID`(`CourseID` ASC) USING BTREE,
  INDEX `UserID`(`UserID` ASC) USING BTREE,
  CONSTRAINT `coursecomments_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of coursecomments
-- ----------------------------

-- ----------------------------
-- Table structure for courses
-- ----------------------------
DROP TABLE IF EXISTS `courses`;
CREATE TABLE `courses`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `CourseName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `CategoryID` int NULL DEFAULT NULL,
  `Cover` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `TeacherID` int NULL DEFAULT NULL,
  `PublishedAt` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `CategoryID`(`CategoryID` ASC) USING BTREE,
  INDEX `TeacherID`(`TeacherID` ASC) USING BTREE,
  CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`CategoryID`) REFERENCES `coursecategories` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `courses_ibfk_2` FOREIGN KEY (`TeacherID`) REFERENCES `teachers` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courses
-- ----------------------------
INSERT INTO `courses` VALUES (2, 'Introduction to JavaScript', 'A beginner\'s guide to JavaScript.', 1, 'https://example.com/course-cover.jpg', 1, '2024-08-10 12:00:00');

-- ----------------------------
-- Table structure for courseschedule
-- ----------------------------
DROP TABLE IF EXISTS `courseschedule`;
CREATE TABLE `courseschedule`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `StartDate` datetime NOT NULL,
  `EndDate` datetime NOT NULL,
  `CourseID` int NULL DEFAULT NULL,
  `IsPublished` tinyint(1) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `CourseID`(`CourseID` ASC) USING BTREE,
  CONSTRAINT `courseschedule_ibfk_1` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of courseschedule
-- ----------------------------

-- ----------------------------
-- Table structure for student_progress
-- ----------------------------
DROP TABLE IF EXISTS `student_progress`;
CREATE TABLE `student_progress`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `UserID` int NOT NULL,
  `CourseID` int NOT NULL,
  `ChapterID` int NULL DEFAULT NULL,
  `Progress` tinyint NOT NULL,
  `Status` enum('not started','in progress','completed') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `LastAccessed` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `UserID`(`UserID` ASC) USING BTREE,
  INDEX `CourseID`(`CourseID` ASC) USING BTREE,
  INDEX `ChapterID`(`ChapterID` ASC) USING BTREE,
  CONSTRAINT `student_progress_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `student_progress_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `student_progress_ibfk_3` FOREIGN KEY (`ChapterID`) REFERENCES `coursechapters` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of student_progress
-- ----------------------------

-- ----------------------------
-- Table structure for teachercourserelations
-- ----------------------------
DROP TABLE IF EXISTS `teachercourserelations`;
CREATE TABLE `teachercourserelations`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TeacherID` int NOT NULL,
  `CourseID` int NOT NULL,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `TeacherID`(`TeacherID` ASC) USING BTREE,
  INDEX `CourseID`(`CourseID` ASC) USING BTREE,
  CONSTRAINT `teachercourserelations_ibfk_1` FOREIGN KEY (`TeacherID`) REFERENCES `teachers` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `teachercourserelations_ibfk_2` FOREIGN KEY (`CourseID`) REFERENCES `courses` (`ID`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teachercourserelations
-- ----------------------------

-- ----------------------------
-- Table structure for teachers
-- ----------------------------
DROP TABLE IF EXISTS `teachers`;
CREATE TABLE `teachers`  (
  `ID` int NOT NULL AUTO_INCREMENT,
  `User_id` int NOT NULL,
  `Specialization` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Description` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `HireDate` date NULL DEFAULT NULL,
  `HireStatus` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`ID`) USING BTREE,
  INDEX `fk_user_teacher`(`User_id` ASC) USING BTREE,
  CONSTRAINT `fk_user_teacher` FOREIGN KEY (`User_id`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of teachers
-- ----------------------------
INSERT INTO `teachers` VALUES (1, 1, 'Computer Science', 'Expert in JavaScript', '2022-01-01', 1);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `age` int NULL DEFAULT NULL,
  `gender` int NULL DEFAULT NULL,
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `nickname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `access` enum('teacher','student','admin') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `active` tinyint(1) NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES (1, 'default user', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'defaultuser@example.com', '1234 Main St, Anytown, USA 12345', 30, 1, 'https://res.cloudinary.com/dvaeob3pw/image/upload/v1716991037/Mooc/useAvatar/userId_1_avatar/istockphoto-1161841968-612x612_wfxncl.jpg', 'Default User', 'admin', 1);
INSERT INTO `user` VALUES (2, 'admin', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'admin@example.com', '456 Avenue, City', 35, 1, 'default.jpg', 'Admin', 'admin', 1);
INSERT INTO `user` VALUES (5, 'Patrick', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'pwarren@gmail.com', '1234 Main St, Anytown, USA 12345', 23, 0, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (6, 'James', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'lisa36@cox-peterson.com', '1234 Main St, Anytown, USA 12345', 52, 0, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (7, 'Anthony', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'timothy95@mendoza-anderson.net', '1234 Main St, Anytown, USA 12345', 50, 1, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (8, 'Stephanie', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'davistami@potter.com', '1234 Main St, Anytown, USA 12345', 56, 0, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (9, 'Katherine', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'stephanieromero@taylor.com', '1234 Main St, Anytown, USA 12345', 42, 1, 'default.jpg', NULL, 'student', NULL);
INSERT INTO `user` VALUES (10, 'Colin', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'robert77@garcia.net', '1234 Main St, Anytown, USA 12345', 49, 0, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (11, 'Shane', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'angelabridges@hotmail.com', '1234 Main St, Anytown, USA 12345', 18, 1, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (12, 'Robin', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'thomaswilliams@walker.info', '1234 Main St, Anytown, USA 12345', 24, 1, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (13, 'Jason', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'cannonabigail@yoder.com', '1234 Main St, Anytown, USA 12345', 22, 1, 'default.jpg', NULL, 'student', NULL);
INSERT INTO `user` VALUES (14, 'Steve', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'stephen83@hotmail.com', '1234 Main St, Anytown, USA 12345', 19, 0, 'default.jpg', NULL, 'teacher', NULL);
INSERT INTO `user` VALUES (15, 'Kevin', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'iramirez@yahoo.com', '1234 Main St, Anytown, USA 12345', 25, 0, 'default.jpg', NULL, 'student', NULL);
INSERT INTO `user` VALUES (16, 'Alex', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'operry@mora.info', '1234 Main St, Anytown, USA 12345', 36, 0, 'default.jpg', NULL, 'student', NULL);
INSERT INTO `user` VALUES (17, 'Beverly', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'nicolefox@hotmail.com', '1234 Main St, Anytown, USA 12345', 18, 0, 'default.jpg', NULL, 'student', NULL);
INSERT INTO `user` VALUES (18, 'Colleen', '$2b$10$ig9HBJNu6OgmwSnbPn/jWupbPPq1LC4Ee5uptADcG/Ho3M1e3VM1S', 'williamsdalton@hendrix-russell.com', '1234 Main St, Anytown, USA 12345', 52, 0, 'default.jpg', NULL, 'student', NULL);

-- ----------------------------
-- Table structure for users_backup
-- ----------------------------
DROP TABLE IF EXISTS `users_backup`;
CREATE TABLE `users_backup`  (
  `ID` int NOT NULL DEFAULT 0,
  `PeferName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `RearName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Gender` enum('Male','Female','Other') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `BirthDate` date NULL DEFAULT NULL,
  `Address` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL,
  `UserType` enum('Admin','Teacher','Student') CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `Status` tinyint(1) NULL DEFAULT NULL
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of users_backup
-- ----------------------------

SET FOREIGN_KEY_CHECKS = 1;
