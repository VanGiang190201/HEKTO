const pool = require("../db");

// Get all carousel
const getAllCarousel = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT * FROM sliders WHERE title_carousel ILIKE '%' || $1 || '%'`;

      const slidersSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json(slidersSearch.rows);
    } else {
      const listCarousel = await pool.query("SELECT * FROM sliders");
      res.status(200).json(listCarousel.rows);
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

const getDetailCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    const listCarousel = await pool.query(
      "SELECT * FROM sliders WHERE id = $1",
      [id]
    );
    res.status(200).json(listCarousel.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

const deleteCarousel = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCarousel = await pool.query(
      "DELETE FROM sliders WHERE id = $1 RETURNING *",
      [id]
    );

    if (!deleteCarousel.rows[0]) {
      return;
    }

    const listCarousel = await pool.query("SELECT * FROM sliders");

    res.status(200).json(listCarousel.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

const changeActiveCarousel = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const carousel = await pool.query("SELECT * FROM sliders WHERE id = $1", [
      id,
    ]);

    if (carousel.rows[0].active) {
      const carouselUpdate = await pool.query(
        "UPDATE sliders SET active = false WHERE id = $1 RETURNING *",
        [carousel.rows[0].id]
      );

      if (!carouselUpdate.rows[0]) {
        return;
      }
      const listCarousel = await pool.query("SELECT * FROM sliders");
      res.status(200).json({
        status: 200,
        message: "Thay đổi trạng thái thành công",
        data: listCarousel.rows,
      });
    } else {
      const carouselUpdate = await pool.query(
        "UPDATE sliders SET active = true WHERE id = $1 RETURNING *",
        [carousel.rows[0].id]
      );

      if (!carouselUpdate.rows[0]) {
        return;
      }
      const listCarousel = await pool.query("SELECT * FROM sliders");
      res.status(200).json({
        status: 200,
        message: "Thay đổi trạng thái thành công",
        data: listCarousel.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Add slider

const addSlider = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  try {
    const newCarousel = await pool.query(
      "INSERT INTO sliders(title_carousel, description_carousel, image_carousel , active) values($1, $2 , $3 , $4) RETURNING *",
      [
        data.title_carousel,
        data.description_carousel,
        req.file ? url + "/public/" + req.file.filename : null,
        JSON.parse(data.active),
      ]
    );

    if (!newCarousel.rows[0]) {
      return;
    }

    const listCarousel = await pool.query("SELECT * FROM sliders");

    res.status(200).json(listCarousel.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Update slider

const updateSlider = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  const { id } = req.params;

  try {
    const selectSlider = await pool.query(
      "SELECT * FROM sliders WHERE id = $1",
      [id]
    );

    if (!selectSlider.rows[0]) {
      return;
    }
    const updateProduct = await pool.query(
      "UPDATE sliders SET title_carousel = $1, description_carousel = $2, image_carousel = $3, active = $4 WHERE id = $5 RETURNING *",
      [
        data.title_carousel,
        data.description_carousel,
        req.file
          ? url + "/public/" + req.file.filename
          : selectSlider.rows[0].image_carousel,
        JSON.parse(data.active),
        id,
      ]
    );

    if (!updateProduct.rows[0]) {
      return;
    }

    const listCarousel = await pool.query("SELECT * FROM sliders");

    res.status(200).json(listCarousel.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};
module.exports = {
  getAllCarousel,
  getDetailCarousel,
  changeActiveCarousel,
  addSlider,
  updateSlider,
  deleteCarousel,
};
