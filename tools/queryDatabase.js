/* queryDatabase.js
 *
 * Import this module and use the exported function to make queries to the
 * database. This module initializes the connection pool as well. By using
 * this, all queries can be made using one singular connection pool. NOTE:
 * using this module means you don't have to open connection pools yourself
 */

// Import postgres pool module and connection pool
require('dotenv').config()
const Pool = require('pg').Pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // ssl: process.env.REQUIRE_SSL.toLowerCase() == "true"
  
  // ssl : false

  // ssl: {
  //   rejectUnauthorized: false
  // }

  ssl: false

})

// queryDatabase(text, values, cb(err, result)) {
module.exports = async (text, values, cb) => {
  const client = await pool.connect()
  .catch((err) => {
    console.log("#*#*#*#*#*#*#*#*#")
    console.log("Failure to connect to pool error msg below: " + "\n" + err)
    console.log("#*#*#*#*#*#*#*#*#")
  });

  await client.query(text, values, (err, result) => {
    client.release()
    return cb(err, result)
  })
}
