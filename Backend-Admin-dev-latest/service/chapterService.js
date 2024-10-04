const { db } = require("../db/mysqldb.js");

// Add a new chapter
const addChapterAsync = async (chapter) => {
    const query = `
        INSERT INTO coursechapters 
        (CourseID, ChapterTitle, ChapterDescription, VideoURL, ChapterOrder) 
        VALUES (?, ?, ?, ?, ?)
    `;
    try {
        const [result] = await db.query(query, [
            chapter.CourseID,
            chapter.ChapterTitle,
            chapter.ChapterDescription,
            chapter.VideoURL,
            chapter.ChapterOrder,
        ]);
        return { isSuccess: true, data: result };
    } catch (error) {
        console.error('Error adding chapter:', error);
        return { isSuccess: false, message: error.message };
    }
};


// Get all chapters for a course
const getAllChaptersByCourseIdAsync = async (courseId) => {
    const query = `
        SELECT * FROM coursechapters 
        WHERE CourseID = ? 
        ORDER BY ChapterOrder
    `;

    try {
        const [result] = await db.query(query, [courseId]);
        return { isSuccess: true, data: result };
    } catch (error) {
        console.error('Error retrieving chapters:', error);
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

// Get a chapter by ID
const getChapterByIdAsync = async ( chapterId) => {
    try {
        const result = await db.query(
            "SELECT * FROM coursechapters WHERE ID = ?",
            [chapterId]
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



// Update a chapter by CourseAndOrder
const updateChapterByCourseAndOrderAsync = async (courseId, chapterOrder, chapter) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    console.log(`Updating chapter with CourseID: ${courseId} and ChapterOrder: ${chapterOrder}`);

    const result = await connection.query(
      "UPDATE coursechapters SET ChapterTitle = ?, ChapterDescription = ?, VideoURL = ?, isCompleted = ?, ChapterOrder = ? WHERE CourseID = ? AND ChapterOrder = ?",
      [
        chapter.ChapterTitle,
        chapter.ChapterDescription,
        chapter.VideoURL,
        chapter.isCompleted,
        chapter.ChapterOrder,
        courseId,
        chapterOrder
      ]
    );

    console.log("Update result:", result);

    if (result.affectedRows === 0) {
      throw new Error('Chapter not found or nothing was updated');
    }

    await connection.commit();
    return { isSuccess: true };
  } catch (error) {
    await connection.rollback();
    console.error("Error during update:", error);
    return { isSuccess: false, message: error.message };
  } finally {
    connection.release();
  }
};


// Delete a chapter by CourseAndOrder
const deleteChapterByCourseAndOrderAsync = async (courseId, chapterOrder) => {
    const connection = await db.getConnection(); // 从连接池中获取连接
    try {
        // 开启一个新事务
        await connection.beginTransaction();

        // 删除指定的章节，根据 courseId 和 chapterOrder 定位
        const result = await connection.query(
            'DELETE FROM coursechapters WHERE CourseID = ? AND ChapterOrder = ?', 
            [courseId, chapterOrder]
        );

        // 如果没有找到要删除的章节，抛出错误
        if (result.affectedRows === 0) {
            throw new Error('Chapter not found');
        }

        // 提交事务
        await connection.commit();
        return { isSuccess: true };
    } catch (error) {
        // 如果是外键约束导致的错误
        if (error.code === 'ER_ROW_IS_REFERENCED_2') { // MySQL 外键约束错误码
            await connection.rollback(); // 回滚事务
            return { isSuccess: false, message: 'Cannot delete chapter due to foreign key constraints' };
        } else {
            // 对于其他错误，同样回滚事务
            await connection.rollback();
            return { isSuccess: false, message: error.message };
        }
    } finally {
        // 释放连接回连接池
        connection.release();
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

const getAllChaptersByPaginationAsync = async (courseId, page = 1, pageSize = 10) => {
    // Query to count the total number of chapters for the course
    const countSql = "SELECT count(*) as total FROM coursechapters WHERE CourseID = ?;";
    let [resultCount] = await db.query(countSql, [courseId]);

    let total = resultCount[0].total;

    if (total === 0) {
        return { isSuccess: true, message: "", data: { items: [], total: 0 } };
    }

    // Query to retrieve chapters with pagination
    const query = `
        SELECT * FROM coursechapters 
        WHERE CourseID = ? 
        ORDER BY ChapterOrder 
        LIMIT ? OFFSET ?;
    `;

    try {
        const [rows] = await db.query(query, [courseId, pageSize, (page - 1) * pageSize]);
        const chapterList = rows.map(chapter => ({
            id: chapter.ID,
            chapterName: chapter.ChapterTitle,
            description: chapter.ChapterDescription,
            course: chapter.CourseID,
            teacher: chapter.TeacherID,
            publishedAt: chapter.PublishedAt
        }));

        return {
            isSuccess: true,
            message: "successful",
            data: { items: chapterList, total: total }
        };
    } catch (error) {
        throw new Error(`Error fetching chapters with pagination: ${error.message}`);
    }
};


module.exports = {
  addChapterAsync,
  getAllChaptersByCourseIdAsync,
  getChapterByCourseAndIdAsync,
  updateChapterByCourseAndOrderAsync,
  deleteChapterByCourseAndOrderAsync,
  markChapterAsCompletedAsync,
  getAllChaptersByPaginationAsync,
  getChapterByIdAsync
};
