// const { addChapter } = require('../service/chapterService');
const chapterService = require('../service/chapterService');

//包含与章节相关的控制器函数
const addChapter = (req, res) => {
  const chapter = req.body;
  const { courseId } = req.params;
  chapter.course_id = courseId;
  chapterService.addChapter(chapter, (err, chapterId) => {
    if (err) {
      return res.sendCommonValue({}, err.message, 500, 500);
    }
    res.sendCommonValue({ id: chapterId, ...chapter }, 'Chapter created successfully', 0, 201);
  });
};



module.exports = {
  addChapter,
  
};