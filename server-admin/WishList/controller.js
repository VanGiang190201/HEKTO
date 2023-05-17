const jwt = require("jsonwebtoken");
const pool = require("../db");

const SECRET_KEY = "123456789";

// Get wish list by user_id
const getWishList = async (req, res) => {
  const product_id = req.query.product_id;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    );
    if (!user) {
      return;
    }
    const userDb = await pool.query("SELECT * FROM users WHERE email = $1", [
      user.email,
    ]);
    if (!userDb) {
      return;
    }

    const wishList = await pool.query(
      "SELECT wishlist.id, wishlist.product_id, wishlist.user_id, products.category_id, products.name_product, products.price_product, products.sale, products.image_product, products.description_product, products.rate FROM wishlist INNER JOIN products ON wishlist.product_id = products.id WHERE user_id=$1",
      [userDb.rows[0]?.id]
    );

    if (product_id) {
      const productInWishList = wishList.rows.filter(
        (item) => item.product_id == product_id
      );
      res
        .status(200)
        .json({
          item: productInWishList,
          isWishList: productInWishList.length > 0,
        });
    } else {
      res.status(200).json(wishList.rows);
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

const getActive = async (req, res) => {
  const product_id = req.query.product_id;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    );
    if (!user) {
      return;
    }
    const userDb = await pool.query("SELECT * FROM users WHERE email = $1", [
      user.email,
    ]);
    if (!userDb) {
      return;
    }

    const wishList = await pool.query(
      "SELECT wishlist.id, wishlist.product_id, wishlist.user_id, products.category_id, products.name_product, products.price_product, products.sale, products.image_product, products.description_product, products.rate FROM wishlist INNER JOIN products ON wishlist.product_id = products.id WHERE user_id=$1",
      [userDb.rows[0]?.id]
    );

    const productInWishList = wishList.rows.filter(
      (item) => item.product_id === product_id
    );

    res.status(200).json(productInWishList.rows[0]);
  } catch (error) {
    res.status(400).json("Error");
  }
};

const updateWishList = async (req, res) => {
  const product_id = req.query.product_id;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    );
    if (!user) {
      return;
    }
    const userDb = await pool.query("SELECT * FROM users WHERE email = $1", [
      user.email,
    ]);
    if (!userDb) {
      return;
    }

    const wishList = await pool.query(
      "SELECT wishlist.id, wishlist.product_id, wishlist.user_id, products.category_id, products.name_product, products.price_product, products.sale, products.image_product, products.description_product, products.rate FROM wishlist INNER JOIN products ON wishlist.product_id = products.id WHERE user_id=$1",
      [userDb.rows[0]?.id]
    );

    const productInWishList = wishList.rows.filter(
      (item) => item.product_id == product_id
    );
    if(productInWishList.length > 0) {
         const deleteWishList = await pool.query("DELETE FROM wishlist WHERE product_id = $1 RETURNING *" , [product_id]);
         const wishList = await pool.query(
            "SELECT wishlist.id, wishlist.product_id, wishlist.user_id, products.category_id, products.name_product, products.price_product, products.sale, products.image_product, products.description_product, products.rate FROM wishlist INNER JOIN products ON wishlist.product_id = products.id WHERE user_id=$1",
            [userDb.rows[0]?.id]
          );
        res.status(200).json({status : 200 , message : "Delete wish list success" , isWishList : false , wish_list : wishList.rows})
    }
    else {
         const addWishList = await pool.query("INSERT INTO wishlist(product_id, user_id) values ($1, $2) RETURNING *", [product_id , userDb.rows[0]?.id]);
         const wishList = await pool.query(
            "SELECT wishlist.id, wishlist.product_id, wishlist.user_id, products.category_id, products.name_product, products.price_product, products.sale, products.image_product, products.description_product, products.rate FROM wishlist INNER JOIN products ON wishlist.product_id = products.id WHERE user_id=$1",
            [userDb.rows[0]?.id]
          );
         res.status(200).json({status : 200 , message : "Add wish list success" , isWishList : true , wish_list : wishList.rows})
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getWishList,
  getActive,
  updateWishList
};
