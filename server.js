const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const fs = require("fs");
const events = require("./db/events.json");

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

app.get("/dashboard", verifyToken, (req, res) => {
  jwt.verify(req.token, "the_secret_key", (err) => {
    if (err) {
      res.sendStatus(401);
    } else {
      res.json({
        events,
      });
    }
  });
});

app.post("/register", (req, res) => {
  if (req.body) {
    const user = {
      ...req.body,
    };
    const data = JSON.stringify(user, null, 2);
    let dbUserEmail = require("./db/user.json").email;

    if (req.body.email === dbUserEmail) {
      res.sendStatus(400);
    } else {
      fs.writeFile("./db/user.json", data, (err) => {
        if (err) {
          console.log(err + data);
        } else {
          const token = jwt.sign({ user }, "the_secret_key");
          res.json({
            token,
            email: user.email,
            name: user.name,
          });
        }
      });
    }
  } else {
    res.sendStatus(400);
  }
});

app.post("/login", (req, res) => {
  const userDB = fs.readFileSync("./db/user.json");
  const userInfo = JSON.parse(userDB);
  if (
    req.body &&
    req.body.email === userInfo.email &&
    req.body.password === userInfo.password
  ) {
    const token = jwt.sign({ userInfo }, "the_secret_key");
    // In a production app, you'll want the secret key to be an environment variable
    res.json({
      token,
      email: userInfo.email,
      name: userInfo.name,
    });
  } else {
    res.sendStatus(400);
  }
});

// MIDDLEWARE
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(401);
  }
}

app.get("/test", (req, res) => {
  res.status(200).send({message: "Error"})
})

app.listen(3000, () => {
  console.log("Server listen on 3000");
});
