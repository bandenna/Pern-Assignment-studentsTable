CREATE DATABASE STUDENTINFO 
CREATE table student_table(
    sno SERIAL primary key,
    student_id int,
    student_name varchar(200),
    student_branch varchar(50),
    student_class varchar(100)
)