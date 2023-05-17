const { default: axios } = require("axios");
const pool = require("../db");

// Get all feature active
const sendNotification = async (req, res) => {
    const url = req.protocol + "://" + req.get("host");
    const data = req.body;

  try {

    const users = await pool.query("SELECT * FROM users");
    
    const tokenDevices = users.rows.map((item) => item.device_token);

    const imageNoti = req.file ? url + "/public/" + req.file.filename : null ;

    const fcmApiKey =
      "AAAAY9o9B8s:APA91bFeVpLNwBMPNwtKc0fZjuK9Pd39XaBRBwiwV2W7f1qxuSURc7JpNnzfXpVsX_eEtMeRV4mkZQHpqP5_amuktUyTTli2CYqnoIo04KVIGsqURFXTjoHct3vIii8pYf0WlNjRWB3H";
    const fcmEndpoint = "https://fcm.googleapis.com/fcm/send";
    const notificationPayload = {
      notification: {
        title: data.title,
        body: data.message,
        image : req.file ? url + "/public/" + req.file.filename : null      
      },
      registration_ids: tokenDevices
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${fcmApiKey}`,
      },
    };

    const response = await axios.post(fcmEndpoint, notificationPayload, config);
    if(!response.data.success == 1) {
        return; 
    }

    const queryValues = users.rows.map((record) => `('${data.title}', '${data.message}','false' ,'${imageNoti}', '${record.id}')`).join(',');

    const query = await pool.query(`INSERT INTO notification(title, message , is_read, image, user_id) VALUES ${queryValues} RETURNING *`);

    if(!query.rows[0]){
        return;
    }

    res.status(200).send({
         code : 200,
         message : 'Gửi thông báo thành công'
    });
  } catch (error) {
    res.status(400).json("Thất bại");
  }
};

module.exports = {
  sendNotification,
};
