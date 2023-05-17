const pool = require("../db");


const getImages = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT other_product_images.id, products.name_product, other_product_images.code_id, other_product_images.image_product FROM other_product_images INNER JOIN products ON other_product_images.product_id = products.id WHERE products.name_product ILIKE '%' || $1 || '%' OR other_product_images.code_id ILIKE '%' || $1 || '%'`;

      const imagesSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json(imagesSearch.rows);
    } else {
      const imageItem = await pool.query(
        "SELECT other_product_images.id, products.name_product, other_product_images.code_id, other_product_images.image_product FROM other_product_images INNER JOIN products ON other_product_images.product_id = products.id",
      );
      res.status(200).json(imageItem.rows);
    }
    
  } catch (error) {
    res.status(400).json("Error");
  }
};


const getImageByCodeID = async (req, res) => {
  const  code_id  = req.query.code_id;
  try {
    const imageItem = await pool.query(
      "SELECT * FROM other_product_images WHERE code_id = $1",
      [code_id]
    );
    res.status(200).json(imageItem.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Add category

const addImage = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;

  try {
    if(data.product_id == 0) {
      return res.status(400)
      .json({
        status: 400,
        message: "Vui lòng chọn một sản phẩm",
      });
    }
    const newImage = await pool.query(
      "INSERT INTO other_product_images(code_id, product_id, image_product) values ($1, $2, $3) RETURNING *",
      [
        data.code_id,
        JSON.parse(data.product_id),
        req.file ? url + "/public/" + req.file.filename : null,
      ]
    );
    if (!newImage.rows[0]) {
      return;
    }

    const listImage = await pool.query("SELECT * FROM other_product_images");

    res
      .status(200)
      .json({
        status: 200,
        message: "Thêm hình ảnh cho sản phẩm thành công",
        data: listImage.rows,
      });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Xoa hinh anh san pham
const deleteImage = async (req, res) => {
  const {id}  = req.params;
  try {
    const imageItem = await pool.query(
      "DELETE FROM other_product_images WHERE id = $1 RETURNING *",
      [id]
    );

    if (!imageItem.rows[0]) {
      return;
    }

    const listImage = await pool.query("SELECT * FROM other_product_images");

    res
      .status(200)
      .json({
        status: 200,
        message: "Xóa hình ảnh sản phẩm thành công",
        data: listImage.rows,
      });
  } catch (error) {
    res.status(400).json("Error");
  }
};



module.exports = {
  getImageByCodeID,
  getImages,
  addImage,
  deleteImage
};
