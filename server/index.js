const express=require("express")
const app=express()
const cors=require("cors")
const pool=require("./db")
app.use(cors())
app.use(express.json())
//search user//
app.get("/students/:name",async(req,res)=>{
    try{
        const {name}=req.params
        const userData=await pool.query("SELECT * FROM student_table WHERE student_name LIKE $1",[`%${name}%`])
        console.log(userData)
        res.json(userData)
    }catch(e){
        console.log(e.message)
    }
})
// get the all student data //
app.get("/students",async(req,res)=>{
    try{
        const allStudents= await pool.query("SELECT * FROM student_table")
        res.json(allStudents.rows)
        console.log(allStudents)
    }catch(e){
        console.error(e.message)
    }
})
// get the single student data //
app.get("/students/:id",async(req,res)=>{
    try{
        const {id}=req.params 
        const single_student=await pool.query("SELECT * FROM student_table WHERE sno=$1",[id])
        console.log(single_student)
        res.send(single_student)
    }catch(e){
        console.error(e.message)
    }
})
//create student data //
app.post("/students",async(req,res)=>{
    try{
        const {student_id,student_name,student_branch,student_class}=req.body 
        // console.log(student_name)
        const new_student= await pool.query("INSERT INTO student_table(student_id,student_name,student_branch,student_class) VALUES($1,$2,$3,$4)",[student_id,student_name,student_branch,student_class])
        console.log("@#", new_student)
        res.json(new_student)

    }catch(e){
        console.error(e.message)
        
    }
})
//delete student data //
app.delete("/students/:id",async(req,res)=>{
    try{
        const {id}=req.params
        const deleted_student=await pool.query("DELETE FROM student_table where sno=$1",[id])
        res.json(deleted_student)
        console.log("deleted success fullly")
    }catch(e){
        console.error(e.message)
    }
})
//edit student data //
app.put("/studentss/:id",async(req,res)=>{
    try{
        const{id}=req.params
        console.log({id})
        const{student_id,student_name,student_branch,student_class}=req.body
        const update_student_data=await pool.query("UPDATE student_table SET student_id=$1,student_name=$2,student_branch=$3,student_class=$4 WHERE sno=$5",[student_id,student_name,student_branch,student_class,id])
        res.send(update_student_data)
        console.log(update_student_data)
    }catch(e){
        console.error(e.message)
    } 
})
app.listen(5002,()=>{
    console.log("serever running sucessfully on 5002")
})