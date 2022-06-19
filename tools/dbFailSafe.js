/*
 * This function is designed as a database FailSafe. If the database isn't
 * working, the API will return something in 'err', and then this function will be
 * called and return a 500.
 */
const query = require("../tools/queryDatabase");

function failSafe(err, res) {
  console.log(("##### dbFailSafe Error Start #####\n" + err + "\n##### dbFailSafe Error End #####"))
  return res.status(500).send(err)
}

function transactionSafe(error, res) {
  query("ROLLBACK;", [], (err, result) => {
    console.log(("##### dbtransactionSafe Error Start ##### ROLLING BACK\n" + error + "\n##### dbtransactionSafe Error End #####"))
    return res.status(500).send(error)

  })
  
}

module.exports = { failSafe,  transactionSafe}