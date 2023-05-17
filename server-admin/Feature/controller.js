const pool = require("../db");

// Get all feature active
const getAllFeature = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT * FROM features WHERE name_feature ILIKE '%' || $1 || '%'`;

      const featuresSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json(featuresSearch.rows);
    } else {
      const listFeature = await pool.query("SELECT * FROM features");
      res.status(200).json(listFeature.rows);
    }
   
  } catch (error) {
    res.status(400).json("Error");
  }
};

const getDetailFeature = async (req, res) => {
  const { id } = req.params;
  try {
    const feature = await pool.query("SELECT * FROM features WHERE id = $1", [
      id,
    ]);
    res.status(200).json(feature.rows[0]);
  } catch (error) {
    res.status(400).json("Error");
  }
};

//delete feature

const deleteFeature = async (req, res) => {

   const { id } = req.params;

   console.log(id);
   try {
     const feature = await pool.query("DELETE FROM features WHERE id = $1 RETURNING *", [
       id,
     ]);

     console.log(feature.rows);
     if(!feature.rows[0]) {
       return;
     }
     const features = await pool.query("SELECT * FROM features");
      res.status(200).json({
        status: 200,
        message: "Xóa tính năng thành công",
        data: features.rows,
      });
   } catch (error) {
     res.status(400).json("Error");
   }
 };
 
//change active

const changeActive = async (req, res) => {
  const { id } = req.params;
  try {
    const feature = await pool.query("SELECT * FROM features WHERE id = $1", [
      id,
    ]);

    if (feature.rows[0].active) {
      const featureUpdate = await pool.query(
        "UPDATE features SET active = false WHERE id = $1",
        [feature.rows[0].id]
      );
      const features = await pool.query("SELECT * FROM features");
      res.status(200).json({
        status: 200,
        message: "Thay đổi trạng thái thành công",
        data: features.rows,
      });
    } else {
      const featureUpdate = await pool.query(
        "UPDATE features SET active = true WHERE id = $1",
        [feature.rows[0].id]
      );
      const features = await pool.query("SELECT * FROM features");
      res.status(200).json({
        status: 200,
        message: "Thay đổi trạng thái thành công",
        data: features.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

//Add feature

const addFeature = async (req, res) => {
  const url = req.protocol + "://" + req.get("host");
  const data = req.body;

  try {
    const newFeature = await pool.query(
      "INSERT INTO features(name_feature, description_feature, image_feature , active) values($1, $2 , $3 , $4) RETURNING *",
      [
        data.name_feature,
        data.description_feature,
        req.file ? url + "/public/" + req.file.filename : null,
        JSON.parse(data.active),
      ]
    );

    if (!newFeature.rows[0]) {
      return;
    }

    const features = await pool.query("SELECT * FROM features");

    res.status(200).json({
      status: 200,
      message: "Thêm tính năng thành công",
      data: features.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

//update feature

const updateFeature = async (req, res) => {
   const url = req.protocol + "://" + req.get("host");
   const data = req.body;
   const {id} = req.params; 
 
   try {

      const selectFeature = await pool.query("SELECT * FROM features WHERE id = $1" , [id]);

      if(!selectFeature.rows[0]) {
        return;
      }

     const updateFeature = await pool.query(
       "UPDATE features SET name_feature= $1, description_feature = $2, image_feature = $3, active = $4 WHERE id = $5 RETURNING *",
       [
         data.name_feature,
         data.description_feature,
         req.file ? url + "/public/" + req.file.filename : selectFeature.rows[0].image_feature,
         JSON.parse(data.active),
         id
       ]
     );
 
     if (!updateFeature.rows[0]) {
       return;
     }
 
     const features = await pool.query("SELECT * FROM features");
 
     res.status(200).json({
       status: 200,
       message: "Chỉnh sửa tính năng thành công",
       data: features.rows,
     });
   } catch (error) {
     res.status(400).json("Error");
   }
 };
 

module.exports = {
  getAllFeature,
  getDetailFeature,
  changeActive,
  addFeature,
  updateFeature,
  deleteFeature
};
