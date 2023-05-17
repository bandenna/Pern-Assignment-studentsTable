import "./inputs.css";
import { useState } from "react";
import Button from "@mui/material/Button";

const StudentInfo = () => {
  const [id, forId] = useState("");
  const [name, forName] = useState("");
  const [branch, forBranch] = useState("");
  const [stuClass, forClass] = useState("");

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const newobject = {
      student_id: id,
      student_name: name,
      student_branch: branch,
      student_class: stuClass,
    };

    try {
      if(newobject.student_name==="" || newobject.id==="" || newobject.student_branch==="" || newobject.student_class===""){
        alert("Enter the Inputs")

      }else{
        const response = await fetch("http://localhost:5002/students", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newobject),
      });
      window.location = "/";
      }
      
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <>
      <div className="tables">
        <form onSubmit={onSubmitForm} className="for-inputs mt-5">
          <div className="for-control">
            <label className="for-label">Student Id</label>
            <input
              placeholder="Id"
              className="kk form-control"
              value={id}
              type="text"
              onChange={(event) => forId(event.target.value)}
            />
          </div>
          <div className="for-control">
            <label className="for-label">Student Name</label>
            <input
              placeholder="Name"
              className="kk form-control"
              value={name}
              onChange={(event) => forName(event.target.value)}
              type="text"
            />
          </div>
          <div className="for-control">
            <label className="for-label">Student Branch</label>
            <input
              placeholder="Branch"
              className="kk form-control"
              value={branch}
              onChange={(event) => forBranch(event.target.value)}
              type="text"
            />
          </div>
          <div className="for-control">
            <label className="for-label">Student class</label>
            <input
              placeholder="Class"
              className="kk form-control"
              value={stuClass}
              onChange={(event) => forClass(event.target.value)}
              type="text"
            />
          </div>
          <Button
            className="for-button"
            variant="contained"
            onClick={onSubmitForm}
          >
            Add
          </Button>
        </form>
      </div>
    </>
  );
};
export default StudentInfo;
