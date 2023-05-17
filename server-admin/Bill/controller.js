const pool = require("../db");

// Get list
const getListBill = async (req, res) => {
  const order_id = req.query.order_id;
  console.log(order_id);
  try {
    if (!order_id) {
      const listBill = await pool.query("SELECT * FROM bills ");
      res.status(200).json(listBill.rows);
    } else {
      const bill = await pool.query("SELECT bills.id, bills.time_update, bills.status, bills.note, bills.order_id, company_persons.display_name FROM bills INNER JOIN company_persons ON bills.worker_id = company_persons.id WHERE order_id=$1", [
        order_id,
      ]);
      if (!bill.rows[0]) {
        res.status(400).json("Chưa lưu đơn hàng vào bill");
      } else {
        res.status(200).json(bill.rows[0]);
      }
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
    getListBill
};
