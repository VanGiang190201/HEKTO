const pool = require("../db");

// Get list category
const getListCategory = async (req, res) => {
  const portfoliosId = req.query.portfolios_id;
  const keyWord = req.query.key_word;
  try {
    if (portfoliosId) {
      const listCategory = await pool.query(
        "SELECT * FROM categories WHERE portfolios_id = $1",
        [portfoliosId]
      );
      return res.status(200).json(listCategory.rows);
    } else if (keyWord) {
      const searchQuery = `SELECT * FROM categories WHERE name_categories ILIKE '%' || $1 || '%'`;

      const categorySearch = await pool.query(searchQuery, [
        keyWord.trimStart(),
      ]);

      res.status(200).json(categorySearch.rows);
    } else {
      const listCategory = await pool.query("SELECT * FROM categories");
      res.status(200).json(listCategory.rows);
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Get category by ID
const getCategoryItem = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryItem = await pool.query(
      "SELECT * FROM categories WHERE id=$1",
      [id]
    );
    res.status(200).json(categoryItem.rows[0]);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//delete category by ID
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const categoryItem = await pool.query(
      "DELETE FROM categories WHERE id=$1 RETURNING *",
      [id]
    );

    if (!categoryItem.rows[0]) {
      return;
    }

    const listCategory = await pool.query("SELECT * FROM categories");

    res.status(200).json({
      status: 200,
      message: "Xóa danh mục thành công",
      data: listCategory.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Add category

const addCategory = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  try {
    const newCategory = await pool.query(
      "INSERT INTO categories(name_categories, description_categories, image, portfolios_id) values ($1, $2, $3, $4) RETURNING *",
      [
        data.name_categories,
        data.description_categories,
        req.file ? url + "/public/" + req.file.filename : null,
        JSON.parse(data.portfolios_id),
      ]
    );
    if (!newCategory.rows[0]) {
      return;
    }

    const listCategory = await pool.query("SELECT * FROM categories");

    res.status(200).json({
      status: 200,
      message: "Thêm danh mục thành công",
      data: listCategory.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//update category

const updateCategory = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  const { id } = req.params;
  try {
    const selectCategory = await pool.query(
      "SELECT * FROM categories WHERE id = $1",
      [id]
    );

    if (!selectCategory.rows[0]) {
      return;
    }

    const newCategory = await pool.query(
      "UPDATE categories SET name_categories= $1, description_categories = $2, image = $3, portfolios_id = $4 WHERE id = $5 RETURNING *",
      [
        data.name_categories,
        data.description_categories,
        req.file
          ? url + "/public/" + req.file.filename
          : selectCategory.rows[0].image,
        JSON.parse(data.portfolios_id),
        id,
      ]
    );
    if (!newCategory.rows[0]) {
      return;
    }

    const listCategory = await pool.query("SELECT * FROM categories");

    res.status(200).json({
      status: 200,
      message: "Chỉnh sửa danh mục thành công",
      data: listCategory.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getListCategory,
  getCategoryItem,
  addCategory,
  deleteCategory,
  updateCategory,
};
