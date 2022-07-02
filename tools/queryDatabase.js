/* Copyright (c) 2018-2020, Inventu Research, Inc. & Ergonomyx Technologies Canada,
 * Inc.  ALL RIGHTS RESERVED.
 *
 * This copyright notice is Copyright Management Information and is included to
 * protect this work and deter copyright infringement. This code contains the
 * confidential information of, and is the sole property of, Inventu Research,
 * Inc.  ("IR"), Ergonomyx Technologies Canada, Inc. (“ETC”) and its licensors
 * and shall not be used, reproduced, copied, disclosed, published,
 * distributed, sold, leased, lent, altered, transmitted in any form or by any
 * means, or otherwise exploited for any purpose other than the limited
 * purpose(s) for which it is furnished except with the written permission of
 * IR or ETC. This notice may not be removed without the written permission of
 * IR or ETC, and must be reproduced, without alteration, on each authorized
 * copy hereof. Any such unauthorized removal, reproduction or alteration is a
 * violation of federal law.
 *
 */

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

if(process.env.NODE_ENV == "production"){
  ssl_value = {
    rejectUnauthorized: false
  }
}
else{
  ssl_value = false
}
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: ssl_value

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
