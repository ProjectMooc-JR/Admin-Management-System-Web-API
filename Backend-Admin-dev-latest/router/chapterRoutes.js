const express = require('express');
const { addChapter } = require('../controller/chapterController');
const { checkAdminOrTeacher } = require('../controller/authcontroller');
const { commonValidate } = require('../middleware/expressValidator');
const router = express.Router();

router.post('/:courseId/chapters', commonValidate(/**/), addChapter);

/**
 * @openapi
 * /api/chapters:
 *   get:
 *     tags:
 *       - Chapter
 *     summary: 获取所有章节
 *     description: 获取章节列表
 *     responses:
 *       200:
 *         description: 成功获取章节列表
 *       500:
 *         description: 服务器错误
 */
// router.get('/', getAllChapters);


module.exports = router;
