const jwt = require("jsonwebtoken");
const pool = require("../db");
const mailer = require("../Util/mailer");

const SECRET_KEY = "123456789";

const bookings = async (req, res) => {
  const keyWord = req.query.key_word;
  try {
    if (keyWord) {
      const searchQuery = `SELECT meeting_schedule.id, meeting_schedule.user_id, users.display_name, users.phone, meeting_schedule.time_start, meeting_schedule.time_end, meeting_schedule.active, meeting_schedule.worker_id, company_persons.display_name as worker_name FROM meeting_schedule INNER JOIN users ON meeting_schedule.user_id = users.id INNER JOIN company_persons ON meeting_schedule.worker_id= company_persons.id WHERE company_persons.display_name ILIKE '%' || $1 || '%' OR users.display_name ILIKE '%' || $1 || '%'`;

      const meetingsSearch = await pool.query(searchQuery, [keyWord.trimStart()]);

      res.status(200).json({
        code: 200,
        message: "Success",
        data: meetingsSearch.rows,
      });
    } else {
      const bookings = await pool.query(
        "SELECT meeting_schedule.id, meeting_schedule.user_id, users.display_name, users.phone, meeting_schedule.time_start, meeting_schedule.time_end, meeting_schedule.active, meeting_schedule.worker_id, company_persons.display_name as worker_name FROM meeting_schedule INNER JOIN users ON meeting_schedule.user_id = users.id INNER JOIN company_persons ON meeting_schedule.worker_id= company_persons.id"
      );

      console.log(bookings.rows);
      res.status(200).json({
        code: 200,
        message: "Success",
        data: bookings.rows,
      });
    }
  } catch (error) {
    res.status(400).json("Error");
  }
};

const booking = async (req, res) => {
  const { id } = req.params;
  try {
    const bookings = await pool.query(
      "SELECT meeting_schedule.id, meeting_schedule.user_id, users.display_name, users.phone, meeting_schedule.time_start, meeting_schedule.time_end, meeting_schedule.active, meeting_schedule.worker_id, company_persons.display_name as worker_name FROM meeting_schedule INNER JOIN users ON meeting_schedule.user_id = users.id INNER JOIN company_persons ON meeting_schedule.worker_id= company_persons.id WHERE meeting_schedule.id = $1",
      [id]
    );

    res.status(200).json({
      code: 200,
      message: "Success",
      data: bookings.rows[0],
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

const confirmMeeting = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    const confirmMeeting = await pool.query(
      "UPDATE meeting_schedule SET worker_id = $1, active = true WHERE id = $2 RETURNING *",
      [data.worker_id, id]
    );

    if (!confirmMeeting.rows[0]) {
      return;
    }

    const user = await pool.query("SELECT * FROM users WHERE id = $1", [
      confirmMeeting.rows[0].user_id,
    ]);

    if (!user.rows[0]) {
      return;
    }

    mailer.sendMail(
      user.rows[0].email,
      "Thông báo xác nhận tư vấn",
      `Bạn có một cuộc hẹn tư vấn vào ${confirmMeeting.rows[0].time_start}`,
      `<p>Bạn có một cuộc hẹn tư vấn vào ${confirmMeeting.rows[0].time_start}! Hãy trả lời chúng tôi nếu bạn có việc đột xuất không thể tham gia</p>`
    );
    const bookings = await pool.query(
      "SELECT meeting_schedule.id, meeting_schedule.user_id, users.display_name, users.phone, meeting_schedule.time_start, meeting_schedule.time_end, meeting_schedule.active FROM meeting_schedule INNER JOIN users ON meeting_schedule.user_id = users.id"
    );
    res.status(200).json({
      code: 200,
      message: "Xác nhận lịch gặp tư vấn",
      data: bookings.rows,
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

const addMeeting = async (req, res) => {
  const data = req.body;
  try {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, SECRET_KEY, (err, decode) =>
      decode !== undefined ? decode : err
    );
    if (!user) {
      return;
    }
    const userDb = await pool.query("SELECT * FROM users WHERE email = $1", [
      user.email,
    ]);
    if (!userDb) {
      return;
    }

    const check = await pool.query(
      "SELECT * FROM meeting_schedule WHERE user_id= $1",
      [userDb.rows[0].id]
    );

    if (check.rows[0]) {
      return res.status(400).json({
        code: 400,
        message: "Bạn chỉ có thể tạo một cuộc gặp",
      });
    }

    const newMeeting = await pool.query(
      "INSERT INTO meeting_schedule (user_id, time_start, time_end, active) values ($1, $2, $3 ,$4) RETURNING *",
      [userDb.rows[0].id, data.time_start, data.time_end, data.active]
    );
    if (!newMeeting.rows[0].id) {
      return;
    }

    const uploadDetail = await pool.query(
      "INSERT INTO product_booking(product_id, meeting_id) SELECT wishlist.product_id, meeting_schedule.id  FROM wishlist INNER JOIN meeting_schedule ON wishlist.user_id = meeting_schedule.user_id WHERE wishlist.user_id = $1 AND meeting_schedule.id=$2 RETURNING *",
      [userDb.rows[0].id, newMeeting.rows[0].id]
    );
    if (!uploadDetail.rows) {
      return;
    }

    const yourBooking = await pool.query(
      "SELECT * FROM meeting_schedule WHERE user_id= $1",
      [userDb.rows[0].id]
    );
    res.status(200).json({
      code: 200,
      message: "Booking meeting successful ✔ You can track ",
      data: yourBooking.rows[0],
    });
  } catch (error) {
    res.status(400).json("Error");
  }
};

const productMeeting = async (req, res) => {
  const { id } = req.params;
  try {
    const productsMeeting = await pool.query(
      "SELECT product_booking.id, product_booking.product_id , products.name_product, products.price_product, products.sale, products.image_product FROM product_booking INNER JOIN products ON product_booking.product_id = products.id WHERE meeting_id=$1",
      [id]
    );
    res.status(200).json({
      status: 200,
      message: "Success",
      data: productsMeeting.rows,
    });
  } catch (error) {
    res.status(400).json("Error check");
  }
};

module.exports = {
  bookings,
  confirmMeeting,
  productMeeting,
  booking,
};
