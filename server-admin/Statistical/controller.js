const pool = require("../db");

const getAllDataStatistical = async (req, res) => {
    try {
        const users = await pool.query("SELECT COUNT(*) FROM users");
        const workers = await pool.query("SELECT COUNT(*) FROM company_persons");
        const sliders = await pool.query("SELECT COUNT(*) FROM sliders");
        const ads = await pool.query("SELECT COUNT(*) FROM ads");
        const blogs = await pool.query("SELECT COUNT(*) FROM blogs");
        const features = await pool.query("SELECT COUNT(*) FROM features");
        const portfolios = await pool.query("SELECT COUNT(*) FROM portfolios")
        const categories = await pool.query("SELECT COUNT(*) FROM categories")
        const products = await pool.query("SELECT COUNT(*) FROM products")
        const orders = await pool.query("SELECT COUNT(*) FROM orders WHERE status != 7");
        const meeting = await pool.query("SELECT COUNT(*) FROM meeting_schedule WHERE active = false");

        res.status(200).json({
             status : 200,
             message : "Success",
             data : {
                 users : users.rows[0],
                 workers : workers.rows[0],
                 sliders : sliders.rows[0],
                 ads : ads.rows[0],
                 blogs : blogs.rows[0],
                 features : features.rows[0],
                 portfolios : portfolios.rows[0],
                 categories : categories.rows[0],
                 products : products.rows[0],
                 orders : orders.rows[0],
                 meeting : meeting.rows[0],
             }
        })
    } catch (error) {
      res.status(400).json("Error");
    }
  };
  
  module.exports = {
      getAllDataStatistical
  };