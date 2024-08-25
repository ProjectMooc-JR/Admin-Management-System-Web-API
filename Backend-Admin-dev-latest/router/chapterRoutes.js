const express = require("express");
const chapterController = require("../controller/chapterController");
const router = express.Router();


// Define routes for chapters
router.post("/courses/:courseId/chapters", chapterController.addChapterAsync);

// get chapters by course id
router.get("/courses/:courseId/chapters", chapterController.getAllChaptersByCourseIdAsync);

// get chapter by id
router.get("/courses/:courseId/chapters/:chapterId", chapterController.getChapterByIdAsync);

// update chapter by id
router.put("/courses/:courseId/chapters/:chapterId", chapterController.updateChapterAsync);

// delete chapter by id
router.delete("/courses/:courseId/chapters/:chapterId", chapterController.deleteChapterByIdAsync);


// Progress tracking
router.put("/courses/:courseId/chapters/:chapterId/complete", chapterController.markChapterAsCompletedAsync);


module.exports = router;

