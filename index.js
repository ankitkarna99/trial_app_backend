//Prepare Env Files
require("dotenv").config();

//Create Connection Pool
const mysql = require("promise-mysql");
mysql
  .createPool({
    connectionLimit: 100,
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASS,
    database: process.env.MYSQLDB,
    charset: "utf8mb4"
  })
  .then(p => {
    pool = p;
  });

//Start the server
const app = require("./app");
app.listen(process.env.PORT, () => {
  console.log("Server listening on port: " + process.env.PORT);
});
