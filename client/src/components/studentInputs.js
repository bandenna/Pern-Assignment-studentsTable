import "./inputs.css";
import { useState } from "react";
import Button from "@mui/material/Button";

const StudentInfo = () => {
  const [id, forId] = useState("");
  const [name, forName] = useState("");
  const [branch, forBranch] = useState("");
  const [stuClass, forClass] = useState("");
  const [stuImage, setImage] = useState('')

  const forImage = async (event) => {
    const file = event.target.files[0]
    const base64 = await baseconvert64(file)
    setImage(base64)
  }

  const baseconvert64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        resolve(reader.result)
      }
      reader.onerror = () => {
        reject(reader.error)
      }
    })

  }

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const newobject = {
      student_id: id,
      student_name: name,
      student_branch: branch,
      student_class: stuClass,
      student_image: stuImage
    };


    try {
      if (newobject.student_name === "" || newobject.id === "" || newobject.student_branch === "" || newobject.student_class === "") {
        alert("Enter the Inputs")

      } else {
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
          <div>
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
            <div className="for-control">
              <label className="for-label">Student image</label>
              <input

                // value={stuImage}
                onChange={forImage}
                type="file"
              />
            </div>
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
