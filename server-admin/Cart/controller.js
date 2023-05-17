const jwt = require("jsonwebtoken");
const pool = require("../db");

const SECRET_KEY = "123456789";
// Get list cart by user_id
const getListCart = async (req, res) => {
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
    const listCart = await pool.query(
      "SELECT cart.id, cart.selected_code_product,cart.number, cart.product_id, cart.user_id, products.category_id, products.name_product, products.price_product, products.sale, products.image_product, products.description_product, products.rate FROM cart INNER JOIN products ON cart.product_id = products.id WHERE user_id=$1",
      [userDb.rows[0]?.id]
    );
    if (!listCart) {
      return;
    }
    let total_pay = listCart?.rows.reduce((total, item) => {
      return total + parseFloat((item.price_product - (item.price_product * item.sale/100 )) * item.number);
    }, 0);

    console.log(total_pay);
    res.status(200).json({ list_cart: listCart.rows, total_pay });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//add cart

const addCart = async (req, res) => {
  try {
    const { selected_code_product, number, product_id } = req.body;
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

    const existCartItem = await pool.query(
      "SELECT * FROM cart WHERE product_id = $1 AND selected_code_product = $2 AND user_id = $3",
      [product_id, selected_code_product,  userDb.rows[0].id]
    );
    console.log(existCartItem.rows[0]);
    if (existCartItem.rows[0]) {
      const updateNumber = await pool.query(
        "UPDATE cart SET number = $1 WHERE product_id = $2",
        [existCartItem.rows[0].number + number, product_id]
      );
      console.log('product' , product_id);

    } else {
      const newCart = await pool.query(
        "INSERT INTO cart (selected_code_product, number, product_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [selected_code_product, number, product_id, userDb.rows[0].id]
      );
    }

    const listCart = await pool.query(
      "SELECT * FROM cart INNER JOIN products ON cart.product_id = products.id WHERE user_id=$1",
      [userDb.rows[0]?.id]
    );

    res
      .status(200)
      .json({ status: 200, message: "Add cart success", data: listCart.rows });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Update change quantity

const updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { number } = req.body;
    const cartExist = await pool.query("SELECT * FROM cart WHERE id = $1", [
      id,
    ]);
    if (!cartExist.rows[0]) {
      return;
    }

    const updateCart = await pool.query(
      "UPDATE cart SET number = $1 WHERE id = $2 RETURNING *",
      [number, id]
    );

    if (!updateCart.rows[0]) {
      return;
    }

    const listCart = await pool.query("SELECT * FROM cart");

    res
      .status(200)
      .json({ status: 200, message: "Update cart success", data: listCart.rows });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//delete cart 

const deleteCart = async (req, res) => {
  try {
    const { id } = req.params;
    const cartExist = await pool.query("SELECT * FROM cart WHERE id = $1", [
      id,
    ]);
    if (!cartExist.rows[0]) {
      return res.status(400).json({status : 400 , message : 'No exist cart'})
    }

    const deleteCart = await pool.query(
      "DELETE FROM cart WHERE id = $1 RETURNING *",
      [cartExist.rows[0].id]
    );  
    const listCart = await pool.query("SELECT * FROM cart");

    res
      .status(200)
      .json({ status: 200, message: "Delete cart success", data: listCart.rows });
  } catch (error) {
    res.status(400).json("Error");
  }
};
module.exports = {
  getListCart,
  addCart,
  updateCart,
  deleteCart
};
