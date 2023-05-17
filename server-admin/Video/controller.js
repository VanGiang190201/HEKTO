const pool = require("../db");

//Get list video

const getListVideo = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT video_consultation.id, products.name_product, video_consultation.title, video_consultation.media FROM video_consultation INNER JOIN products ON video_consultation.product_id = products.id WHERE products.name_product ILIKE '%' || $1 || '%'`;

      const videosSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json({
        code: 200,
        message: "Success",
        data: videosSearch.rows,
      });
    } else {
      const videosItem = await pool.query(
        "SELECT video_consultation.id, products.name_product, video_consultation.title, video_consultation.media FROM video_consultation INNER JOIN products ON video_consultation.product_id = products.id"
      );
      res.status(200).json({
        code: 200,
        message: "Success",
        data: videosItem.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

const addVideo = async (req, res) => {
  const data = req.body;
  try {

    if (!data.product_id) {
      return res.status(400).json({
        code: 400,
        message: "Cần chọn sản phẩm cho video",
      });
    }

    const add = await pool.query(
      "INSERT INTO video_consultation(media, title, product_id) VALUES ($1, $2, $3) RETURNING *",
      [data.media, data.title, data.product_id]
    );

  
    if (!add.rows[0]) {
      return;
    }
    const videosItem = await pool.query(
      "SELECT video_consultation.id, products.name_product, video_consultation.title, video_consultation.media FROM video_consultation INNER JOIN products ON video_consultation.product_id = products.id"
    );
    res.status(200).json({
      code: 200,
      message: "Thêm video thành công",
      data: videosItem.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Xoa video san pham
const deleteVideo = async (req, res) => {
  const {id}  = req.params;
  try {
    const videoItem = await pool.query(
      "DELETE FROM video_consultation WHERE id = $1 RETURNING *",
      [id]
    );

    if (!videoItem.rows[0]) {
      return;
    }

    const videosItem = await pool.query(
      "SELECT video_consultation.id, products.name_product, video_consultation.title, video_consultation.media FROM video_consultation INNER JOIN products ON video_consultation.product_id = products.id"
    );

    res
      .status(200)
      .json({
        status: 200,
        message: "Xóa video sản phẩm thành công",
        data: videosItem.rows,
      });
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getListVideo,
  addVideo,
  deleteVideo
};
