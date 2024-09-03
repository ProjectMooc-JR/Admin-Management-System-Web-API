const { db } = require("../db/mysqldb.js");

// CRUD operations for chapters
const addChapterAsync = async (chapter) => {
  try {
    const result = await db.query(
      "INSERT INTO coursechapters (CourseID, ChapterTitle, ChapterDescription, VideoURL, isCompleted, ChapterOrder) VALUES (?, ?, ?, ?, ?, ?)",
      [chapter.CourseID, chapter.ChapterTitle, chapter.ChapterDescription, chapter.VideoURL, false, chapter.ChapterOrder]
    );
    return { isSuccess: true, data: result };
  } catch (error) {
    console.error("Error adding chapter:", error);
    return { isSuccess: false, message: error.message };
  }
};

// Get all chapters for a course
const getAllChaptersByCourseIdAsync = async (courseId) => {
  try {
    const result = await db.query(
      "SELECT * FROM coursechapters WHERE CourseID = ? ORDER BY ChapterOrder",
      [courseId]
    );
    return { isSuccess: true, data: result };
  } catch (error) {
    console.error("Error retrieving chapters:", error);
    return { isSuccess: false, message: error.message };
  }
};

// Get a chapter by ID
const getChapterByCourseAndIdAsync = async (courseId, chapterId) => {
    try {
        const result = await db.query(
            "SELECT * FROM coursechapters WHERE CourseID = ? AND ID = ?",
            [courseId, chapterId]
        );

        if (result.length > 0) {
            return { isSuccess: true, data: result[0], message: "Chapter found" };
        } else {
            return { isSuccess: false, data: null, message: "Chapter not found" };
        }
    } catch (error) {
        console.error("Error retrieving chapter:", error);
        return { isSuccess: false, message: error.message };
    }
};


// Update a chapter
const updateChapterAsync = async (chapter) => {
  try {
    const result = await db.query(
      "UPDATE coursechapters SET ChapterTitle = ?, ChapterDescription = ?, VideoURL = ?, isCompleted = ?, ChapterOrder = ? WHERE ID = ?",
      [
        chapter.ChapterTitle,
        chapter.ChapterDescription,
        chapter.VideoURL,
        chapter.isCompleted,
        chapter.ChapterOrder,
        chapter.id,
      ]
    );
    return { isSuccess: true, data: result };
  } catch (error) {
    console.error("Error updating chapter:", error);
    return { isSuccess: false, message: error.message };
  }
};

// Delete a chapter
const deleteChapterByIdAsync = async (chapterId) => {
  try {
    const result = await db.query(
      "DELETE FROM coursechapters WHERE ID = ?",
      [chapterId]
    );
    return { isSuccess: true, data: result };
  } catch (error) {
    console.error("Error deleting chapter:", error);
    return { isSuccess: false, message: error.message };
  }
};

// Progress tracking
const markChapterAsCompletedAsync = async (chapterId) => {
  try {
    const result = await db.query(
      "UPDATE coursechapters SET isCompleted = true WHERE ID = ?",
      [chapterId]
    );
    return { isSuccess: true, data: result };
  } catch (error) {
    console.error("Error marking chapter as completed:", error);
    return { isSuccess: false, message: error.message };
  }
};

module.exports = {
  addChapterAsync,
  getAllChaptersByCourseIdAsync,
  getChapterByCourseAndIdAsync,
  updateChapterAsync,
  deleteChapterByIdAsync,
  markChapterAsCompletedAsync,
};
