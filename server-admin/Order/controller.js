const jwt = require("jsonwebtoken");
const pool = require("../db");

const SECRET_KEY = "123456789";

const getAllOrder = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT * FROM orders WHERE first_name ILIKE '%' || $1 || '%' OR last_name ILIKE '%' || $1 || '%' OR address ILIKE '%' || $1 || '%'`;

      const ordersSearch = await pool.query(searchQuery, [
        keyWord.trimStart(),
      ]);

      res.status(200).json({
        message: "Success",
        data: ordersSearch.rows,
      });
    } else {
      const listOrder = await pool.query("SELECT * FROM orders ");
      res.status(200).json({
        status: 200,
        message: "Success",
        data: listOrder.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error check");
  }
};

const getDetail = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await pool.query("SELECT * FROM orders  WHERE id = $1", [id]);
    res.status(200).json({
      status: 200,
      message: "Success",
      data: order.rows[0],
    });
  } catch (error) {
    res.status(400).json("Error check");
  }
};

const getProductsOrder = async (req, res) => {
  const { id } = req.params;
  try {
    const productsOrder = await pool.query(
      "SELECT order_detail.id, order_detail.selected_code_product,order_detail.number, order_detail.product_id, order_detail.user_id, products.category_id, products.name_product, products.price_product, products.sale, products.image_product, products.description_product, products.rate FROM order_detail INNER JOIN products ON order_detail.product_id = products.id WHERE order_id=$1",
      [id]
    );
    res.status(200).json({
      status: 200,
      message: "Success",
      data: productsOrder.rows,
    });
  } catch (error) {
    res.status(400).json("Error check");
  }
};

const changeStatusOrder = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const findOrder = await pool.query("SELECT * FROM orders  WHERE id = $1", [
      id,
    ]);

    if (!findOrder.rows[0]) {
      return res.status(400).json("Không tìm thấy đơn hàng");
    }
    const updateOrder = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [data.status, id]
    );

    if (!updateOrder.rows[0]) {
      return;
    }
    const listOrder = await pool.query("SELECT * FROM orders ");
    res.status(200).json({
      status: 200,
      message: "Thay đổi trạng thái đơn hàng thành công",
      data: listOrder.rows,
    });
  } catch (error) {
    res.status(400).json("Lỗi");
  }
};

const saveBill = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    );
    if (!user) {
      return;
    }

    const userDb = await pool.query(
      "SELECT * FROM company_persons WHERE email = $1",
      [user.email]
    );
    if (!userDb) {
      return;
    }

    const findOrder = await pool.query("SELECT * FROM orders  WHERE id = $1", [
      id,
    ]);

    if (!findOrder.rows[0]) {
      return res.status(400).json("Không tìm thấy đơn hàng");
    }

    const addBill = await pool.query(
      "INSERT INTO bills(time_update, status, note, order_id, worker_id) VALUES ($1, $2, $3, $4 , $5) RETURNING *",
      [req._startTime, data.status, data.note, id, userDb.rows[0].id]
    );

    if (!addBill.rows[0]) {
      return;
    }
    res.status(200).json({
      status: 200,
      message: "Hoàn thành đơn hàng ",
      data: addBill.rows[0],
    });
  } catch (error) {
    res.status(400).json("Lỗi");
  }
};

const cancelBill = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    );
    if (!user) {
      return;
    }

    const userDb = await pool.query(
      "SELECT * FROM company_persons WHERE email = $1",
      [user.email]
    );
    if (!userDb) {
      return;
    }

    const findOrder = await pool.query("SELECT * FROM orders  WHERE id = $1", [
      id,
    ]);

    if (!findOrder.rows[0]) {
      return res.status(400).json("Không tìm thấy đơn hàng");
    }

    const addBill = await pool.query(
      "INSERT INTO bills(time_update, status, note, order_id, worker_id) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req._startTime, data.status, data.note, id, userDb.rows[0].id]
    );

    if (!addBill.rows[0]) {
      return;
    }
    res.status(200).json({
      status: 200,
      message: "Hủy đơn hàng thành công",
      data: addBill.rows[0],
    });
  } catch (error) {
    res.status(400).json("Lỗi");
  }
};

module.exports = {
  getAllOrder,
  getDetail,
  getProductsOrder,
  changeStatusOrder,
  cancelBill,
  saveBill,
};
