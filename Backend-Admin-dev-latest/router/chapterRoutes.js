const express = require("express");
const chapterController = require("../controller/chapterController");
const router = express.Router();
const { check } = require("express-validator");
const { commonValidate } = require("../middleware/expressValidator");

const { body, query, param } = require("express-validator");

const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage })

const chapterValidationRules = [
  check("ChapterTitle").notEmpty().withMessage("Chapter Title is required"),
  //   check("ChapterDescription")
  //     .notEmpty()
  //     .withMessage("Chapter Description is required"),
  //   check("VideoURL").isURL().withMessage("A valid Video URL is required"),
  check("ChapterOrder").isInt().withMessage("Chapter Order must be an integer"),
];

// Add a new chapter
/**
 * @openapi
 * /api/courses/{courseId}/chapters:
 *   post:
 *     tags:
 *       - Chapter Controller
 *     summary: Add a new chapter
 *     description: Create a new chapter for a specific course
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: The ID of the course to add the chapter to
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       description: Chapter data to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ChapterTitle
 *               - ChapterDescription
 *               - VideoURL
 *               - ChapterOrder
 *             properties:
 *               ChapterTitle:
 *                 type: string
 *                 example: "Introduction to Python"
 *               ChapterDescription:
 *                 type: string
 *                 example: "This chapter introduces the basics of Python programming."
 *               VideoURL:
 *                 type: string
 *                 example: "https://example.com/python-intro.mp4"
 *               isCompleted:
 *                 type: boolean
 *                 default: false
 *               ChapterOrder:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Chapter created successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server Error
 */

router.post(
  "/",
  upload.single("file"),
  chapterValidationRules,
  chapterController.addChapterAsync
);

// Get all chapters for a course
/**
 * @openapi
 * /api/courses/{courseId}/chapters:
 *   get:
 *     tags:
 *       - Chapter Controller
 *     summary: Get all chapters for a course
 *     description: Retrieve a list of all chapters for a specific course
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: courseId
 *         in: path
 *         description: The ID of the course to get chapters for
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of chapters for the course
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ChapterTitle:
 *                     type: string
 *                     example: "Introduction to Python"
 *                   ChapterDescription:
 *                     type: string
 *                     example: "This chapter introduces the basics of Python programming."
 *                   VideoURL:
 *                     type: string
 *                     example: "https://example.com/python-intro.mp4"
 *                   isCompleted:
 *                     type: boolean
 *                     example: false
 *                   ChapterOrder:
 *                     type: integer
 *                     example: 1
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server Error
 */
router.get(
  "/:courseId/chapters",
  chapterController.getAllChaptersByCourseIdAsync
);

router.get(
  "/:id",
  commonValidate([
    param("id")
      .notEmpty()
      .isInt({ allow_leading_zeroes: false })
      .withMessage("Invalid chapter ID"),
  ]),
  chapterController.getAllChaptersByChapterIdAsync
);

// get chapter by id
/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterId}:
 *   get:
 *     tags:
 *       - Chapter Controller
 *     summary: Get a chapter by ID
 *     description: Retrieve a specific chapter by its ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course
 *       - in: path
 *         name: chapterId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the chapter
 *     responses:
 *       200:
 *         description: Chapter found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 chapterTitle:
 *                   type: string
 *                   example: Introduction to Python
 *                 chapterDescription:
 *                   type: string
 *                   example: This chapter introduces the basics of Python programming.
 *                 videoURL:
 *                   type: string
 *                   example: https://example.com/python-intro.mp4
 *                 isCompleted:
 *                   type: boolean
 *                   example: false
 *                 chapterOrder:
 *                   type: integer
 *                   example: 1
 *       404:
 *         description: Chapter not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:courseId/chapters/:chapterId",
  chapterController.getChapterByIdAsync
);

// update chapter by id
/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterOrder}:
 *   put:
 *     tags:
 *       - Chapter Controller
 *     summary: Update a chapter by course ID and chapter order
 *     description: Updates a specific chapter using the course ID and the chapter's order within the course.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 16
 *         description: The ID of the course
 *       - in: path
 *         name: chapterOrder
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: The order of the chapter within the course
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ChapterTitle:
 *                 type: string
 *                 example: Updated Introduction to Python
 *               ChapterDescription:
 *                 type: string
 *                 example: This updated chapter covers the basics of Python programming.
 *               VideoURL:
 *                 type: string
 *                 example: https://example.com/updated-python-intro.mp4
 *               isCompleted:
 *                 type: boolean
 *                 example: true
 *               ChapterOrder:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Chapter updated successfully
 *       400:
 *         description: Invalid course ID or chapter order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid course ID or chapter order
 *       404:
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Chapter not found
 */

router.put(
  "/:courseId/chapters/:chapterOrder",
  chapterController.updateChapterByCourseAndOrderAsync
);

// delete chapter by course ID and chapter order
/**
 * @swagger
 * /api/courses/{courseId}/chapters/{chapterOrder}:
 *   delete:
 *     tags:
 *       - Chapter Controller
 *     summary: Delete a chapter by course ID and chapter order
 *     description: Deletes a specific chapter using the course ID and the chapter's order within the course.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 16
 *         description: The ID of the course
 *       - in: path
 *         name: chapterOrder
 *         required: true
 *         schema:
 *           type: integer
 *           example: 2
 *         description: The order of the chapter within the course
 *     responses:
 *       200:
 *         description: Chapter deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Chapter deleted successfully
 *       400:
 *         description: Invalid course ID or chapter order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid course ID or chapter order
 *       404:
 *         description: Chapter not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Chapter not found
 */

router.delete(
  ":courseId/chapters/:chapterOrder",
  chapterController.deleteChapterByCourseAndOrderAsync
);

// Get chapters with pagination
/**
 * @swagger
 * /api/courses/{courseId}/chapters:
 *   get:
 *     tags:
 *       - Chapter Controller
 *     summary: Get chapters with pagination
 *     description: Retrieve chapters of a course with pagination
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the course to get chapters for
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number for pagination
 *       - in: query
 *         name: pageSize
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Number of chapters per page
 *     responses:
 *       200:
 *         description: Successfully retrieved chapters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 isSuccess:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Successful"
 *                 data:
 *                   type: object
 *                   properties:
 *                     items:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: integer
 *                             example: 1
 *                           ChapterTitle:
 *                             type: string
 *                             example: "Introduction to Python"
 *                           ChapterDescription:
 *                             type: string
 *                             example: "This chapter introduces the basics of Python programming."
 *                           CourseID:
 *                             type: integer
 *                             example: 14
 *                           VideoURL:
 *                             type: string
 *                             example: "https://example.com/python-intro.mp4"
 *                           isCompleted:
 *                             type: boolean
 *                             example: false
 *                           ChapterOrder:
 *                             type: integer
 *                             example: 1
 *                     total:
 *                       type: integer
 *                       example: 12
 *                       description: The total number of chapters
 *                     currentPage:
 *                       type: integer
 *                       example: 1
 *                     totalPages:
 *                       type: integer
 *                       example: 2
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Course not found
 *       500:
 *         description: Server error
 */
router.get(
  "/:courseId/chapters",
  chapterController.getChaptersByCourseIdWithPaginationAsync
);

// router.get(
//   '/:courseId/chapters',
//   commonValidate([
//     query('page')
//       .optional()
//       .isInt({ min: 1 })
//       .withMessage('Not a valid page'),
//     query('pageSize')
//       .optional()
//       .isInt({ min: 1 })
//       .withMessage('Not a valid page size'),
//   ]),
//   chapterController.getChaptersByCourseIdWithPaginationAsync
// );

module.exports = router;

/**
 * @swagger
 * /api/chapters/{chapterId}:
 *   put:
 *     tags:
 *       - Chapter Controller
 *     summary: Update a chapter by chapter ID
 *     description: Updates a specific chapter using the chapter's ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: chapterId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 16
 *         description: The ID of the chapter
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ChapterTitle:
 *                 type: string
 *                 example: Updated Introduction to Python
 *               ChapterDescription:
 *                 type: string
 *                 example: This updated chapter covers the basics of Python programming.
 *               CourseID:
 *                 type: integer
 *                 example: 14
 *               VideoURL:
 *                 type: string
 *                 example: https://example.com/updated-python-intro.mp4
 *               isCompleted:
 *                 type: integer
 *                 example: 1
 *               ChapterOrder:
 *                 type: integer
 *                 example: 8
 *               
 *     responses:
 *       200:
 *         description: Chapter updated successfully
 *        
 *       400:
 *         description: Invalid chapter ID or missing required fields
 *        
 *       404:
 *         description: Chapter not found
 *         
 *       500:
 *         description: Internal server error
 *        
 */
router.put('/:chapterId', chapterController.updateChapterAsync);

// Progress tracking
router.put(
  "/courses/:courseId/chapters/:chapterId/complete",
  chapterController.markChapterAsCompletedAsync
);

module.exports = router;
