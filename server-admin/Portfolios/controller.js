const pool = require("../db");

// Get list portfolios
const getListPortfolios = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT * FROM portfolios WHERE name_portfolios ILIKE '%' || $1 || '%'`;

      const portfoliosSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json({
        message: "Success",
        data: portfoliosSearch.rows,
      });
    } 
    else {
      const listPortfolios = await pool.query("SELECT * FROM portfolios");
      res.status(200).json({
        message: "Success",
        data: listPortfolios.rows,
      });
    }

  } catch (error) {
    res.status(400).json("Error");
  }
};

// Get portfolio
const getPortfolio = async (req, res) => {
  const { id } = req.params;

  try {
    const portfolio = await pool.query(
      "SELECT * FROM portfolios WHERE id = $1",
      [id]
    );
    res.status(200).json(portfolio.rows[0]);
  } catch (error) {
    res.status(400).json("Error");
  }
};

// delete portfolio
const deletePortfolio = async (req, res) => {
  const { id } = req.params;
  try {
    const portfolio = await pool.query(
      "DELETE FROM portfolios WHERE id = $1 RETURNING *",
      [id]
    );

    if (!portfolio.rows[0]) {
      return;
    }
    const portfolios = await pool.query("SELECT * FROM portfolios");
    res.status(200).json({
      status: 200,
      message: "Xóa thể loại thành công",
      data: portfolios.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

// add portfolio
const addPortfolio = async (req, res) => {
  const data = req.body;
  try {
    const newPortfolio = await pool.query(
      "INSERT INTO portfolios(name_portfolios, description_portfolios) VALUES ($1, $2) RETURNING *",
      [data.name_portfolios, data.description_portfolios]
    );

    if (!newPortfolio.rows[0]) {
      return;
    }

    const portfolios = await pool.query("SELECT * FROM portfolios");
    res.status(200).json({
      status: 200,
      message: "Thêm thể loại thành công",
      data: portfolios.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

// update portfolio
const updatePortfolio = async (req, res) => {
  const data = req.body;
  console.log(data);
  const { id } = req.params;
  try {
    const updatePortfolio = await pool.query(
      "UPDATE portfolios SET name_portfolios = $1, description_portfolios = $2 WHERE id = $3 RETURNING *",
      [data.name_portfolios, data.description_portfolios, id]
    );

    if (!updatePortfolio.rows[0]) {
      return;
    }

    const portfolios = await pool.query("SELECT * FROM portfolios");
    res.status(200).json({
      status: 200,
      message: "Chỉnh sửa thể loại thành công",
      data: portfolios.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getListPortfolios,
  getPortfolio,
  addPortfolio,
  updatePortfolio,
  deletePortfolio,
};
