
const pool = require("../db");

// Get list product
const getListProduct = async (req, res) => {
  const portfolios_id = req.query.portfolios_id;
  const category_id = req.query.category_id;
  const keyWord = req.query.key_word;
  try {
    if (portfolios_id) {
      const listProductPortfolios = await pool.query(
        "SELECT  * FROM products WHERE category_id IN (SELECT id FROM categories WHERE  portfolios_id=$1)",
        [portfolios_id]
      );
      res.status(200).json(listProductPortfolios.rows);
    } else if (category_id) {
      const listProductCategory = await pool.query(
        "SELECT  * FROM products WHERE category_id = $1",
        [category_id]
      );
      res.status(200).json(listProductCategory.rows);
    } 
    else if(keyWord) {
      const searchQuery = `SELECT  * FROM products WHERE name_product ILIKE '%' || $1 || '%'`;

      const productsSearch = await pool.query(searchQuery, [
        keyWord.trimStart(),
      ]);

      res.status(200).json(productsSearch.rows);
    }
    else {
      const listProduct = await pool.query("SELECT * FROM products");
      res.status(200).json(listProduct.rows);
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};
// detail product
const getProductDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const productDetail = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );
    res.status(200).json(productDetail.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};



//List product of portfolios
const getListProductPortfolios = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const listProductPortfolios = await pool.query(
      "SELECT  * FROM products WHERE category_id IN (SELECT id FROM categories WHERE  portfolios_id=$1)",
      [id]
    );
    res.status(200).json(listProductPortfolios.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//get other image of product


const getListImageProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const listImage = await pool.query(
      "SELECT products.name_product, other_product_images.id, other_product_images.product_id, other_product_images.code_id, other_product_images.image_product FROM other_product_images INNER JOIN products ON other_product_images.product_id = products.id WHERE product_id = $1",
      [id]
    );
    res.status(200).json(listImage.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};


const getImage = async (req, res) => {
  const { id } = req.params;
  try {
    const image = await pool.query(
      "SELECT * FROM other_product_images WHERE id = $1",
      [id]
    );
    res.status(200).json(image.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

const getImageByCodeID = async (req, res) => {
  const { code_id } = req.params;
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

//Get list product big sale
const getTopProductBigSale = async (req, res) => {
  try {
    const topProductList = await pool.query(
      "SELECT * FROM products WHERE sale > 10 ORDER BY sale DESC LIMIT 20"
    );
    res.status(200).json(topProductList.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

// detail product
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const productDelete = await pool.query(
      "DELETE FROM products WHERE id = $1 RETURNING *",
      [id]
    );

    if(!productDelete.rows[0]) {
       return;
    }
    const listProduct = await pool.query("SELECT * FROM products");
    res
      .status(200)
      .json({
        status: 200,
        message: "Xóa sản phẩm thành công",
        data: listProduct.rows,
      });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Add product

const addProduct = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  try {
    const newProduct = await pool.query(
      "INSERT INTO products(name_product, price_product, sale, image_product, description_product, rate, category_id) values ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
      [
        data.name_product,
        JSON.parse(data.price_product),
        JSON.parse(data.sale),
        req.file ? url + "/public/" + req.file.filename : null,
        data.description_product,
        JSON.parse(data.rate),
        JSON.parse(data.category_id),
      ]
    );
    if (!newProduct.rows[0]) {
      return;
    }

    const listProduct = await pool.query("SELECT * FROM products");

    res
      .status(200)
      .json({
        status: 200,
        message: "Thêm sản phẩm thành công",
        data: listProduct.rows,
      });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//update product

const updateProduct = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  const {id} = req.params;
  try {

    const selectProduct = await pool.query("SELECT * FROM products WHERE id = $1" , [id]);

    if(!selectProduct.rows[0]) {
      return;
    }

    const newProduct = await pool.query(
      "UPDATE products SET name_product= $1, price_product = $2, sale = $3, image_product = $4, description_product = $5, rate = $6, category_id = $7 WHERE id = $8 RETURNING *",
      [
        data.name_product,
        JSON.parse(data.price_product),
        JSON.parse(data.sale),
        req.file ? url + "/public/" + req.file.filename : selectProduct.rows[0].image_product,
        data.description_product,
        JSON.parse(data.rate),
        JSON.parse(data.category_id),
        id
      ]
    );
    if (!newProduct.rows[0]) {
      return;
    }

    const listProduct = await pool.query("SELECT * FROM products");

    res
      .status(200)
      .json({
        status: 200,
        message: "Chỉnh sửa sản phẩm thành công",
        data: listProduct.rows,
      });
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getListProduct,
  getProductDetail,
  getListProductPortfolios,
  getImage,
  getTopProductBigSale,
  getImageByCodeID,
  addProduct,
  updateProduct,
  deleteProduct,
  getListImageProduct
};
