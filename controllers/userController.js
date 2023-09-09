const pool = require("../config/database");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
exports.registerUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const query = "select * from users where email = ? ";
  pool.query(query, [email], (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
    if (result.length > 0) {
      return res.status(500).json({
        success: false,
        error: "User already exists!",
      });
    }
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return res.status(500).json({
          success: false,
          error: err,
        });
      }
      const query = "insert into users (name,email,password) values(?,?,?)";
      pool.query(query, [name, email, hash], (err) => {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err,
          });
        }
        return res.status(201).json({
          success: true,
          message: "User successfully created!",
        });
      });
    });
  });
};

exports.loginUser = (req, res, next) => {
  try {
    const { email, password } = req.body;

  const query = "select * from users where email = ?";
  pool.query(query, [email], async (err, result) => {
    if (err) {
      return res.status(500).json({
        success: false,
        error: err,
      });
    }
    if (result.length === 0) {
      return res.status(500).json({
        success: false,
        error: "Incorrect Email or Password",
      });
    }
    result.map((user) => {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          return res.status(500).json({
            success: false,
            error: err,
          });
        }
        if (result) {
          const token = jwt.sign({ email: email }, process.env.JWT_SECRET, {
            expiresIn: "7d",
          });
          console.log(token);
          res.cookie("token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 7,
          });
          return res.status(200).json({
            success: true,
            message: "Login successful",
            token: token,
          });
        } else {
          return res.status(500).json({
            success: false,
            error: "Incorrect Email or Password",
          });
        }
      });
    });
  });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: error,
    });
  }
};