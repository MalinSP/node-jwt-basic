const jwt = require("jsonwebtoken");
const { BadRequest } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;

  //mongoose validation

  if (!username || !password) {
    throw new BadRequest("Please provide e-mail and password");
  }

  const id = new Date().getDate();
  // more complex in production!
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "user created", token });

  res.send("Fake Login/Register/SignUp Route");
};
const dashboard = async (req, res) => {
  console.log(req.user);
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, you lucky number is ${luckyNumber}`,
  });
};
module.exports = { login, dashboard };
