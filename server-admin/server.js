const bodyParser = require("body-parser");
const jsonServer = require("json-server");
const jwt = require("jsonwebtoken");
const carouselRoutes = require("./Carousel/router");
const blogRoutes = require("./Blog/router");
const adRoutes = require("./Ads/router");
const portfoliosRoutes = require("./Portfolios/router");
const productRoutes = require("./Products/router");
const cartRoutes = require("./Cart/router");
const imageRoutes = require("./ImageProduct/router");
const categoryRouter = require("./Category/router");
const wishListRouter = require("./WishList/router");
const customersRouter = require("./Customer/router");
const workersRouter = require("./Worker/router");
const featuresRouter = require("./Feature/router");
const ordersRouter = require("./Order/router");
const billsRouter = require("./Bill/router");
const meetingRouter = require("./Meeting/router");
const statisticalRouter = require("./Statistical/router");
const notificationRouter = require("./Notification/router");
const commentRouter = require("./Comment/router");
const videoRouter = require("./Video/router");

const express = require("express");
const server = express();

const cors = require("cors");
const pool = require("./db");

//Middleware
server.use(cors());
server.use(express.json());

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(jsonServer.defaults());

const SECRET_KEY = "123456789";

// const expiresIn = "1s";


// Create a token from a payload
function createToken(payload) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn : 60 * 60 * 24 });
}

// Verify the token
function verifyToken(token) {
  return jwt.verify(token, SECRET_KEY, (err, decode) =>
    decode !== undefined ? decode : err
  );
}

// Check if the user exists in database
async function isAuthenticated({ email, password }) {
  const userDB = await pool.query(
    "SELECT * FROM company_persons WHERE email = $1 AND password=$2",
    [email, password]
  );
  if (userDB.rows[0] !== false) {
    return userDB.rows[0];
  } else {
    return null;
  }
}

// Login to one of the users
server.post("/auth/login", async (req, res) => {
  console.log("login endpoint called; request body:");
  console.log(req.body);
  const { email, password } = req.body;
  const currentUser = await isAuthenticated({ email, password });
  if (currentUser == undefined) {
    const status = 401;
    const message = "Incorrect email or password";
    res.status(status).json({ status, message });
    return;
  } else {
    const access_token = createToken({ email, password });
    console.log("Access Token:" + access_token);
    res.status(200).json({
      access_token,
      user_name: currentUser.user_name,
      display_name: currentUser.display_name,
      email: currentUser.email,
      id: currentUser.id,
      role : currentUser.role,
      avatar : currentUser.avatar,
    });
  }
});

server.use(
  /^(?!\/auth|\/public).*$/,
  (req, res, next) => {
    if (
      req.headers.authorization === undefined ||
      req.headers.authorization.split(" ")[0] !== "Bearer"
    ) {
      const status = 401;
      const message = "Error in authorization format";
      res.status(status).json({ status, message });
      return;
    }
    try {
      let verifyTokenResult;
      verifyTokenResult = verifyToken(req.headers.authorization.split(" ")[1]);

      if (verifyTokenResult instanceof Error) {
        const status = 401;
        const message = "Access token not provided";
        res.status(status).json({ status, message });
        return;
      }
      next();
    } catch (err) {
      const status = 401;
      const message = "Error access_token is revoked";
      res.status(status).json({ status, message });
    }
  }
);

//carousel
server.use("/sliders", carouselRoutes);

// blog
server.use("/blogs", blogRoutes);

// Ads
server.use("/advetisements", adRoutes);

//portfolios
server.use("/portfolios", portfoliosRoutes);

//Product
server.use("/products", productRoutes);

//Cart
server.use("/cart", cartRoutes);

//Image

server.use("/images", imageRoutes);

//Category

server.use("/category", categoryRouter);

//wishlist

server.use("/wishlist", wishListRouter);

//Customers

server.use("/customer" , customersRouter);

//worker

server.use("/worker", workersRouter);

//features

server.use("/features" , featuresRouter);

//orders
server.use("/order", ordersRouter);

//bills

server.use("/bill", billsRouter);

//meeting 

server.use('/meeting', meetingRouter);


//Statistical

server.use('/statistical' , statisticalRouter);

//Notification 

server.use('/notification' , notificationRouter);

//Comment

server.use('/comments', commentRouter);

//video

server.use("/videos", videoRouter);

server.use('/public', express.static('public'));


// server.use(router)

server.listen(3001, () => {
  console.log("Run Auth API Server");
});
