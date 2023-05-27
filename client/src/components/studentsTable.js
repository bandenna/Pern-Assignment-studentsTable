import * as React from "react";
import { useEffect, useState } from "react";
import "./inputs.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./inputs.css";
import DriveFileRenameOutlineIcon from "@mui/icons-material/DriveFileRenameOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import BasicModal from "./edit";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Studenttable() {
  const [searchValue, setSearch] = useState('')
  const [stuId, setId] = useState("");
  const [stuImage, setImage] = useState('')
  const [name, setName] = useState("");
  const [stuBranch, setBranch] = useState("");
  const [stuClass, setClass] = useState("");
  const [studentsData, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);
  const [defau, setSor] = useState('ASC')

  const stdentImage = async (event) => {
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

  const userData = async (event) => {
    const val = event.target.value
    if (val === "") {
      getData()
    } else {
      const filterData = await fetch(`http://localhost:5002/students/${val}`)
      const jsonData = await filterData.json();
      console.log(jsonData.rows)
      setData(jsonData.rows)

    }

  }

  const deleteButton = async (id) => {
    console.log(id)
    const deletedData = await fetch(`http://localhost:5002/students/${id}`, {
      method: "DELETE",
    });
    console.log(deletedData);
    const filterData = studentsData.filter((each) => each.sno !== id);
    setData(filterData);
  };

  const updateEditData = (each) => {
    const { sno, student_id, student_name, student_branch, student_class, student_image } = each
    setId(sno)
    setName(student_name)
    setBranch(student_branch)
    setClass(student_class)
    setImage(student_image)
  }

  const editButton = async (id) => {
    console.log("sjbjkddkjblj", stuImage)
    const obj = {
      student_id: stuId,
      student_name: name,
      student_branch: stuBranch,
      student_class: stuClass,
      student_image: stuImage
    };

    const editData = await fetch(`http://localhost:5002/studentss/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });
  };
  const getData = async () => {
    try {
      const response = await fetch("http://localhost:5002/students");
      const data = await response.json();
      setData(data);
    } catch (e) {
      console.error(e.message);
    }
  };
  useEffect(() => {
    getData();
    //sortTheItems()
    // userData();
    kk();
  }, []);

  const kk = async () => {
    const response = await fetch('http://localhost:5002/studentsss?sortorder=ASC')
    const sordata = await response.json()
    setData(sordata.rows)
  }

  const sortTheItems = async (event) => {
    console.log(";;;;;;")
    try {
      if (event.target.value === "ASC") {
        console.log("ASC")
        setSor(event.target.value)

        const response = await fetch('http://localhost:5002/studentsss?sortorder=ASC')
        const sordata = await response.json()
        setData(sordata.rows)
      } else if (event.target.value === "DESC") {
        console.log("DESC")
        setSor(event.target.value)

        const response = await fetch(`http://localhost:5002/studentsss?sortorder=DESC`)
        const sordata = await response.json()
        setData(sordata.rows)

      }

    } catch (e) {
      console.error(e.message)
    }

  }
  console.log(`data:image/jpeg;base64,${stuImage}`)
  return (
    <div>
      <div className="d-flex flex-row">
        <input className="kk for-search form-control" placeholder="type to search" type="search" onChange={(event) => { userData(event) }} />
        <select className='kk form-control' onChange={sortTheItems}>
          <option value="ASC">Assending order</option>
          <option value="DESC">Desending order</option>
        </select>

      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minwidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className="style-name">serial_number</TableCell>
              <TableCell className="style-name">student_image</TableCell>
              <TableCell align="right">student_id</TableCell>
              <TableCell align="right">student_name</TableCell>
              <TableCell align="right">student_branch</TableCell>
              <TableCell align="right">student_class</TableCell>
              <TableCell align="right">Delete</TableCell>
              <TableCell align="right">Edit</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {studentsData && studentsData.map((each) => (
              <TableRow
                key={each.sno}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {each.sno}
                </TableCell>
                <TableCell align="right"><img className="for-image" src={each.student_image} alt="image" /></TableCell>
                <TableCell align="right">{each.student_id}</TableCell>
                <TableCell align="right">{each.student_name}</TableCell>
                <TableCell align="right">{each.student_branch}</TableCell>
                <TableCell align="right">{each.student_class}</TableCell>
                <TableCell align="right">
                  <button
                    onClick={() => deleteButton(each.sno)}
                    className="btu"
                  >
                    <RemoveCircleOutlineIcon className="deletes" />
                  </button>
                </TableCell>
                <TableCell align="right">
                  <button className="btu">
                    <DriveFileRenameOutlineIcon
                      onClick={() => { setOpen(true); updateEditData(each) }}
                      className="edits"
                    />
                  </button>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        className="mb-3"
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                      >
                        Edit the Details
                      </Typography>
                      <form>
                        <div>
                          <label>Student Id</label>
                          <input
                            value={stuId}
                            type="text"
                            onChange={(event) => setId(event.target.value)}
                            className="form-control"
                          />
                        </div>


                        <div>
                          <label>Student Image</label>
                          <img className="from" src={stuImage} alt="img" />

                          <input
                            type="file"
                            className="form-control"
                            onChange={stdentImage}
                          />
                        </div>

                        <div>
                          <label>Student name</label>
                          <input
                            value={name}
                            type="text"
                            onChange={(event) => setName(event.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div>
                          <label>Student Branch</label>
                          <input
                            type="text"
                            value={stuBranch}
                            onChange={(event) => setBranch(event.target.value)}
                            className="form-control"
                          />
                        </div>
                        <div>
                          <label>Student Class</label>
                          <input
                            type="text"
                            value={stuClass}
                            onChange={(event) => setClass(event.target.value)}
                            className="form-control"
                          />
                        </div>
                        {/* debuggingggg */}
                        <button
                          onClick={() => { editButton(stuId) }}
                          className="btn btn-primary mt-3"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() => setOpen(false)}
                          className="btn btn-primary ml-3 mt-3"
                        >
                          Close
                        </button>
                      </form>
                    </Box>
                  </Modal>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
