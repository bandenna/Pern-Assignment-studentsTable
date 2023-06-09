const express = require("express")
const app = express()
const cors = require("cors")
const pool = require("./db")
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors())


//sorting function 
app.get("/studentsss", async (req, res) => {
    try {
        const { sortorder } = req.query
        console.log(sortorder)
        const sortData = await pool.query(`SELECT * FROM student_table ORDER BY student_id ${sortorder}`);
        res.json(sortData)
        console.log(sortData)
    } catch (e) {
        console.error(e.message)
    }
})
//search user//
app.get("/students/:name", async (req, res) => {
    try {
        const { name } = req.params
        const userData = await pool.query("SELECT * FROM student_table WHERE student_name LIKE $1", [`%${name}%`])
        console.log(userData)
        res.json(userData)
    } catch (e) {
        console.log(e.message)
    }
})
// get the all student data //
app.get("/students", async (req, res) => {
    try {
        const allStudents = await pool.query("SELECT * FROM student_table")
        res.json(allStudents.rows)
        console.log(allStudents)
    } catch (e) {
        console.error(e.message)
    }
})
// get the single student data //
app.get("/students/:id", async (req, res) => {
    try {
        const { id } = req.params
        const single_student = await pool.query("SELECT * FROM student_table WHERE sno=$1", [id])
        console.log(single_student)
        res.send(single_student)
    } catch (e) {
        console.error(e.message)
    }
})
//create student data //
app.post("/students", async (req, res) => {
    try {
        const { student_id, student_name, student_branch, student_class, student_image } = req.body
        const new_student = await pool.query("INSERT INTO student_table (student_id,student_name,student_branch,student_class,student_image) VALUES($1,$2,$3,$4,$5)", [student_id, student_name, student_branch, student_class, student_image])
        console.log("@#", new_student)
        res.json(new_student)

    } catch (e) {
        console.error(e.message)

    }
})
//delete student data //
app.delete("/students/:id", async (req, res) => {
    try {
        const { id } = req.params
        const deleted_student = await pool.query("DELETE FROM student_table where sno=$1", [id])
        res.json(deleted_student)
        console.log("deleted success fullly")
    } catch (e) {
        console.error(e.message)
    }
})
//edit student data //
app.put("/studentss/:id", async (req, res) => {
    try {
        const { id } = req.params
        console.log({ id })
        const { student_id, student_name, student_branch, student_class, student_image } = req.body
        const update_student_data = await pool.query("UPDATE student_table SET student_id=$1,student_name=$2,student_branch=$3,student_class=$4 ,student_image=$5 WHERE sno=$6 ", [student_id, student_name, student_branch, student_class, student_image, id])
        res.send(update_student_data)
        console.log(update_student_data)
    } catch (e) {
        console.error(e.message)
    }
})
app.listen(5002, () => {
    console.log("serever running sucessfully on 5002")
})