const express = require("express");
const app = express();
const port = 4500;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
require("../bootstrap/index");
const postRoute = require("../Routes/post");
const userRoute = require("../Routes/user");
const paymentRoute = require("../Routes/payment");
const fileUpload = require("express-fileupload");
const CookieParser = require("cookie-parser");
const chatRoute = require("../Routes/chat");
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my-secret-key",
    resave: true,
    saveUninitialized: true,
  })
);

require("../bootstrap/index");

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(CookieParser());

app.use(bodyParser.json());


//Routes

app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/chat", chatRoute);

app.listen(port, () => {
  console.log(`server listening on ${port} `);
});
