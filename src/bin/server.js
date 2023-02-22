const express = require("express");
const app = express();
const port = 4500;
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const route = require("../Routes/user");
const routePayment = require("../Routes/payment");
const bodyParser = require("body-parser");

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

app.use(route);
app.use(routePayment);

app.use(cors());

app.listen(port, () => {
  console.log(`server listening on ${port} `);
});
