const pool = require("./database");

const dbconnection = () => {
  pool.getConnection((err) => {
    if (err) {
      console.log("Database connection was unsuccessful");
      console.log(err);
    } else {
      console.log("Database connection was successful");
    }
  });
};
module.exports = dbconnection;