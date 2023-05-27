const Pool = require("pg").Pool
const pool = new Pool({
    user: "bandenna",
    password: "root",
    host: "localhost",
    port: 5432,
    database: "studentinfo"
});
module.exports = pool