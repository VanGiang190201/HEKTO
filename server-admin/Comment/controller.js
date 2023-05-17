
const pool = require("../db");

const getComments = async (req, res) => {
  const product_id = req.query.product_id;
  try {
    if (product_id) {
      const comments = await pool.query(
        "SELECT reviews.user_id, users.avatar, users.display_name, reviews.product_id, reviews.time_comment, reviews.id, reviews.comment FROM reviews INNER JOIN users ON reviews.user_id = users.id WHERE product_id = $1",
        [product_id]
      );
      res.status(200).json({
        code: 200,
        message: "Success",
        data: comments.rows,
      });
    } else {
      const comments = await pool.query(
        "SELECT reviews.user_id, users.avatar, users.display_name, reviews.product_id, reviews.time_comment, reviews.id, reviews.comment FROM reviews INNER JOIN users ON reviews.user_id = users.id"
      );
      res.status(200).json({
        code: 200,
        message: "Success",
        data: comments.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};


const deleteComment = async (req, res) => {
    const {id} = req.params;
    try {
      
      const deleteComment = await pool.query(
        "DELETE FROM reviews WHERE id = $1 RETURNING *",
        [id]
      );
  
      if (!deleteComment.rows[0]) {
        return;
      }
  
      const comments = await pool.query(
        "SELECT reviews.user_id, users.avatar, users.display_name, reviews.product_id, reviews.time_comment, reviews.id, reviews.comment FROM reviews INNER JOIN users ON reviews.user_id = users.id"
      );
  
      res.status(200).json({
        code: 200,
        message: "Xóa bình luận thành công",
        data: comments.rows,
      });
    } catch (error) {
      res.status(400).json("Error");
    }
  };

module.exports = {
  getComments,
  deleteComment
};
