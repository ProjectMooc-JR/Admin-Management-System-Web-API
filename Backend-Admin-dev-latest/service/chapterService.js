const pool = require('../db/mysqldb.js');

//包含与章节相关的数据库操作函数
const addChapter = (chapter, callback) => {
  const { title, description, course_id, video_url } = chapter;
  pool.query(
    'INSERT INTO chapters (title, description, course_id, video_url) VALUES (?, ?, ?, ?)',
    [title, description, course_id, video_url],
    (error, results) => {
      if (error) {
        return callback(error);
      }
      callback(null, results.insertId);
    }
  );
};



module.exports = {
  addChapter,
  
};