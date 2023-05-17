const pool = require("../db");

// Get all Ads
const getListAd = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT * FROM ads WHERE heading ILIKE '%' || $1 || '%' OR title ILIKE '%' || $1 || '%'`;

      const adsSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json(adsSearch.rows);
    } else {
      const listAd = await pool.query("SELECT * FROM ads");
      res.status(200).json(listAd.rows);
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};
//Get Ads is used
const getAdIsUsed = async (req, res) => {
  console.log("Check", req);
  try {
    const ad = await pool.query("SELECT * FROM ads WHERE is_used = $1 ", [
      true,
    ]);
    res.status(200).json(ad.rows);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Get Ad
const getAd = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await pool.query("SELECT * FROM ads WHERE id= $1 ", [id]);
    res.status(200).json(ad.rows[0]);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//delete ad

//Get Ad
const deleteAd = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await pool.query("DELETE FROM ads WHERE id= $1 RETURNING *", [
      id,
    ]);
    if (!ad.rows[0]) {
      return;
    }
    const ads = await pool.query("SELECT * FROM ads");
    res.status(200).json({
      status: 200,
      message: "Xóa trạng thái thành công",
      data: ads.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Change active Advertisement
const changeActive = async (req, res) => {
  const { id } = req.params;
  try {
    const ad = await pool.query("SELECT * FROM ads WHERE id = $1", [id]);
    if (ad.rows[0].is_used) {
      const adUpdate = await pool.query(
        "UPDATE ads SET is_used = false WHERE id = $1",
        [ad.rows[0].id]
      );
      const ads = await pool.query("SELECT * FROM ads");
      res.status(200).json({
        status: 200,
        message: "Thay đổi trạng thái thành công",
        data: ads.rows,
      });
    } else {
      const adUpdate = await pool.query(
        "UPDATE ads SET is_used = true WHERE id = $1 RETURNING *",
        [ad.rows[0].id]
      );

      if (!adUpdate.rows[0]) {
        return;
      }

      const offActiveOtherAds = await pool.query(
        "UPDATE ads SET is_used = false WHERE id != $1 RETURNING *",
        [ad.rows[0].id]
      );

      if (!offActiveOtherAds.rows[0]) {
        return;
      }
      const ads = await pool.query("SELECT * FROM ads");
      res.status(200).json({
        status: 200,
        message: "Thay đổi trạng thái thành công",
        data: ads.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Add Ad

const addAd = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;

  try {
    const newAd = await pool.query(
      "INSERT INTO Ads(heading, title, description, image_first, image_second, is_used) values ($1, $2, $3, $4, $5, $6) RETURNING *",
      [
        data.heading,
        data.title,
        data.description,
        req.files.image_first
          ? url + "/public/" + req.files.image_first[0].filename
          : null,
        req.files.image_second
          ? url + "/public/" + req.files.image_second[0].filename
          : null,
        JSON.parse(data.is_used),
      ]
    );
    if (!newAd.rows[0]) {
      return;
    }

    console.log(newAd.rows[0]);

    if (newAd.rows[0].is_used) {
      const offActiveOtherAds = await pool.query(
        "UPDATE ads SET is_used = false WHERE id != $1 RETURNING *",
        [newAd.rows[0].id]
      );
    }

    const ads = await pool.query("SELECT * FROM ads");

    res.status(200).json({
      status: 200,
      message: "Thêm quảng cáo thành công",
      data: ads.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Update Ad

const updateAd = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;
  const { id } = req.params;

  try {
    const ad = await pool.query("SELECT * FROM Ads WHERE id= $1 ", [id]);
    if (!ad.rows[0]) {
      return;
    }

    const updateAd = await pool.query(
      "UPDATE ads SET heading = $1, title = $2, description = $3, image_first = $4, image_second = $5, is_used = $6 WHERE id = $7 RETURNING *",
      [
        data.heading,
        data.title,
        data.description,
        req.files.image_first
          ? url + "/public/" + req.files.image_first[0].filename
          : ad.rows[0].image_first,
        req.files.image_second
          ? url + "/public/" + req.files.image_second[0].filename
          : ad.rows[0].image_second,
        JSON.parse(data.is_used),
        id,
      ]
    );

    if (!updateAd.rows[0]) {
      return;
    }

    if (updateAd.rows[0].is_used) {
      const offActiveOtherAds = await pool.query(
        "UPDATE ads SET is_used = false WHERE id != $1 RETURNING *",
        [updateAd.rows[0].id]
      );
    }
    const ads = await pool.query("SELECT * FROM ads");

    res.status(200).json({
      status: 200,
      message: "Thay đổi quảng cáo thành công",
      data: ads.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

module.exports = {
  getListAd,
  getAdIsUsed,
  changeActive,
  getAd,
  addAd,
  updateAd,
  deleteAd,
};
