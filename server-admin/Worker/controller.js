const pool = require("../db");

// Get list worker
const getListWorker = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT id, avatar, user_name, first_name, last_name, email , phone , birthday, address ,role FROM company_persons WHERE user_name ILIKE '%' || $1 || '%' OR address ILIKE '%' || $1 || '%' `;

      const workerSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json({
        message: "Success",
        data: workerSearch.rows,
      });
    } else {
      const workers = await pool.query(
        "SELECT id, avatar, user_name, first_name, last_name, email , phone , birthday, address ,role FROM company_persons"
      );
      res.status(200).json({
        code: 200,
        message: "Success",
        data: workers.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};
// detail product
const getWorker = async (req, res) => {
  const { id } = req.params;
  try {
    const worker = await pool.query(
      "SELECT * FROM company_persons WHERE id = $1",
      [id]
    );
    res.status(200).json(worker.rows[0]);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//add worker

const addWorker = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;

  try {
    const newWorker = await pool.query(
      "INSERT INTO company_persons(user_name, display_name, email, password, role, avatar, first_name, last_name, phone, birthday, address) values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *",
      [
        data.user_name,
        data.display_name,
        data.email,
        data.password,
        JSON.parse(data.role),
        req.file ? url + "/public/" + req.file.filename : null,
        data.first_name,
        data.last_name,
        data.phone,
        data.birthday,
        data.address,
      ]
    );

    console.log(newWorker.rows[0]);

    if (!newWorker.rows[0]) {
      return;
    }

    const listWorker = await pool.query("SELECT * FROM company_persons");

    res.status(200).json({
      status: 200,
      message: "Thêm nhân viên thành công",
      data: listWorker.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//update worker

const updateWorker = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  const { id } = req.params;

  try {
    const selectedWorker = await pool.query(
      "SELECT * FROM company_persons WHERE id = $1",
      [id]
    );

    if (!selectedWorker.rows[0]) {
      return;
    }

    const updateWorker = await pool.query(
      "UPDATE company_persons SET user_name = $1, display_name = $2, email = $3, password = $4, role = $5, avatar = $6, first_name = $7, last_name = $8, phone = $9, birthday = $10, address = $11 WHERE id = $12 RETURNING *",
      [
        data.user_name,
        data.display_name,
        data.email,
        data.password,
        JSON.parse(data.role),
        req.file
          ? url + "/public/" + req.file.filename
          : selectedWorker.rows[0].avatar,
        data.first_name,
        data.last_name,
        data.phone,
        data.birthday,
        data.address,
        id,
      ]
    );

    if (!updateWorker.rows[0]) {
      return;
    }

    const listWorker = await pool.query("SELECT * FROM company_persons");

    res.status(200).json({
      status: 200,
      message: "Chỉnh sửa nhân viên thành công",
      data: listWorker.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

// delete worker
const deleteWorker = async (req, res) => {
  const { id } = req.params;
  try {
    const worker = await pool.query(
      "DELETE FROM company_persons WHERE id = $1 RETURNING *",
      [id]
    );
    if (!worker.rows[0]) {
      return;
    }
    const listWorker = await pool.query("SELECT * FROM company_persons");

    res.status(200).json({
      status: 200,
      message: "Xóa nhân viên thành công",
      data: listWorker.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getListWorker,
  getWorker,
  addWorker,
  updateWorker,
  deleteWorker,
};
