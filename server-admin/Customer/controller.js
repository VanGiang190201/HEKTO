const pool = require("../db");

// Get list customer
const getListCustomer = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT id, display_name, avatar, user_name, first_name, last_name, email , phone , birthday, address FROM users WHERE user_name ILIKE '%' || $1 || '%' OR address ILIKE '%' || $1 || '%' `;

      const userSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      if (!userSearch.rows[0]) {
        return res.status(200).json({
          message: "Success",
          data: userSearch.rows,
        });
      }
      res.status(200).json({
        message: "Success",
        data: userSearch.rows,
      });
    } else {
      const customer = await pool.query(
        "SELECT id, display_name,  avatar, user_name, first_name, last_name, email , phone , birthday, address FROM users"
      );
      res.status(200).json({
        code: 200,
        message: "Success",
        data: customer.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};
// detail =
const getUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.status(200).json(user.rows[0]);
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getListCustomer,
  getUser,
};
