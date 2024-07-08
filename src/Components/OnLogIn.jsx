import AddIcon from "@mui/icons-material/Add";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import FolderCopyOutlinedIcon from "@mui/icons-material/FolderCopyOutlined";
import ComputerIcon from "@mui/icons-material/Computer";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import ReportGmailerrorredOutlinedIcon from "@mui/icons-material/ReportGmailerrorredOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import CloudOutlinedIcon from "@mui/icons-material/CloudOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import { Modal } from "@mui/material";

import { useEffect, useState } from "react";
import firebase from "firebase";
import { storage } from "../firebase";
import { db } from "../firebase";
import InsertDriveFileTwoToneIcon from "@mui/icons-material/InsertDriveFileTwoTone";
import { InboxOutlined } from "@mui/icons-material";

function OnLogIn({ photoURL, user }) {
  // const classes = useStyles();

  // const [modalStyle] = useState(getModalStyle);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(true);
  const [files, setFiles] = useState([]);
  const [action, setAction] = useState(false);
  const [view, setView] = useState(true);
  const [ins, setIns] = useState(false);
  const [idx , setIdx] = useState(0);
  const [theme,setTheme] = useState(false)
  const [newTheme,setNewTheme] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleActionOpen = (id) => {
    setAction(true);
    console.log(id);
    setIdx(id);
   
  };

  const handleActionOpenView = () => {
    setAction(true);

  };

  const handleAction = () => {
    setAction(false);
  };
 
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  const handleIns = () => {
    setIns(true);
  };

  const handleInsClose = () => {
    setIns(false);
  };
  const handleView1 = () => {
    setView(false);
  };

  const handleView2 = () => {
    setView(true);
  };

  const handleThemeClose = () => {
    setTheme(false)
  }

  const handleTheme = () => {
    setTheme(true)
  }

//  function newTheme(color) {
//    if (color === "Light")
//     setNowTheme(0)
//   else
//   setNowTheme(1)

//  }
const changeThemeDark = () => {
setNewTheme(true)
}

const changeThemeLight = () => {
  setNewTheme(false)
  }

 const handleDelete = () =>{
  console.log(idx)
  setFiles((prev)=>prev.filter((file,index)=>
    index!==idx
  ))
  console.log(files);
 }

  // const handleOpenFile = () => {
  //   <a href={files[0].data.fileUrl} target="_blank"></a>
  // }

  const handleUpload = (e) => {
    e.preventDefault();
    setUploading(false);
    storage
      .ref(`files/${file.name}`)
      .put(file)
      .then((snapshot) => {
        storage
          .ref("files")
          .child(file.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("myFiles").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              filename: file.name,
              fileURL: url,
              size: snapshot._delegate.bytesTransferred,
            });

            setUploading(true);
            setFile(null);
            setOpen(false);
          });
      });
  };

  useEffect(() => {
  
    db.collection("myFiles").onSnapshot((snapshot) => {
      setFiles(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  console.log(files);

  function changeBytes(bytes, decimals = 2) {
    if (bytes === 0) {
      return "0 Bytes";
    }

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="modalPopUp bg-white top-[40%] left-[40%] relative w-[500px] p-4 px-5 border-none outline-none rounded-lg">
          <form className="">
            <div className="modalHeading m-2 text-center">
              <p className="font-semibold text-lg">Upload File</p>
            </div>
            <div className="modalBody text-left">
              <div className="border-2 m-5 bg-white">
                <input
                  type="file"
                  className="block outline-none border-none font-semibold bg-white"
                  onChange={handleChange}
                ></input>
              </div>
              <div className="flex justify-between">
                <button
                  type="submit"
                  onClick={handleUpload}
                  className="bg-black text-white p-1 px-3 rounded-lg ml-4"
                >
                  {uploading ? <p>upload</p> : <p>Uploading...</p>}
                </button>
                <button onClick={handleClose}>close</button>
              </div>
            </div>
          </form>
        </div>
      </Modal>

      <Modal
        open={action}
        onClose={handleAction}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className="bg-white relative top-[40%] left-[45%] w-44 h-24 rounded-lg text-center  p-3">
          {files.length>0 && <a href={files[idx].data.fileURL} target="_blank">
         
          <p className="text-green-600">Open</p>
  
          </a>}
          <p className="text-red-500 hover:cursor-pointer" onClick={handleDelete}>Delete</p>
          <p>Copy Link</p>
        </div>
      </Modal>

      <Modal
        open={ins}
        onClose={handleInsClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <div className="w-[500px] relative rounded-lg left-[35%] top-[10%] bg-white p-4 px-8 grid gap-4 ">
          <p className="font-semibold text-xl">App Guide</p>
          <img src="./src/assets/ins.jpeg" className="h-[450px]"></img>
          <p className="pb-4 font-semibold text-gray-500">
            Upload Your Files Using New Button
          </p>
        </div>
      </Modal>

      <Modal 
      open={theme}
      onClose={handleThemeClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      > 
      <div className="relative top-[9%] left-[85%] w-[120px] h-[150px] bg-white rounded-lg p-2">
        <p className="font-semibold mb-2">Theme</p>
        <p className="hover:bg-sky-50 hover:cursor-pointer  hover:rounded hover:p-1" onClick={handleOpen}>Upload a File</p>
        <p className="hover:bg-sky-50 hover:cursor-pointer hover:rounded hover:p-1" onClick={changeThemeLight} >Light</p>
        <p className="hover:bg-sky-50 hover:cursor-pointer hover:rounded hover:p-1" onClick={changeThemeDark}>Dark</p>
        <p className="hover:bg-sky-50 hover:cursor-pointer hover:rounded hover:p-1">System</p>
      </div>
      </Modal>
        
      <div className={newTheme ? "OnLogIn flex bg-gray-700 w-[100%] text-white" : "OnLogIn flex bg-gray-100 w-[100%]"}>
        <section className={ newTheme ? "L-sidebar w-[17%] grid gap-8 bg-gray-700 p-5 text-white" : "L-sidebar w-[17%] grid gap-8 bg-gray-100 p-5"}>
          <div className="flex gap-2">
            <img className="h-12" src="./src/assets/GD-logo.png"></img>
            <p className={newTheme ? "flex items-center font-normal text-2xl text-white" : "flex items-center font-normal text-2xl text-gray-600"}>
              Disk
            </p>
          </div>
          <div
            className= {newTheme ? "flex shadow-xl p-4 w-28 hover:bg-sky-100 rounded-xl bg-gray-700 text-white hover:text-black" : "flex shadow-xl p-4 w-28 hover:bg-sky-100 rounded-xl bg-white"}
            onClick={handleOpen}
          >
            <button className="flex gap-2 ">
              <AddIcon />
              <p className = {newTheme ? "hover:text-black hover:font-semibold" : ""}>New</p>
            </button>
          </div>
          <div className=" grid gap-3">
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <HomeOutlinedIcon fontSize="medium" />
              <p>Home</p>
            </div>
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <FolderCopyOutlinedIcon />
              <p>My Drive</p>
            </div>
            <div  className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <ComputerIcon />
              <p>Computers</p>
            </div>
          </div>
          <div className="grid gap-3">
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <PeopleAltOutlinedIcon />
              <p>Shared with me</p>
            </div>
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <ScheduleOutlinedIcon />
              <p>Recent</p>
            </div>
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <StarBorderOutlinedIcon />
              <p>Starred</p>
            </div>
          </div>
          <div className="grid gap-3">
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <ReportGmailerrorredOutlinedIcon />
              <p>Spam</p>
            </div>
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <DeleteOutlinedIcon />
              <p>Trash</p>
            </div>
            <div className={newTheme ? "flex gap-2 hover:bg-sky-100 hover:rounded hover:text-black hover:p-2 hover:font-semibold" : "hover:bg-sky-100 flex gap-2"}>
              <CloudOutlinedIcon />
              <p>Storage</p>
            </div>
          </div>
          <div>
            <progress
              className="accent-cyan-800 bg-red-800"
              max={100}
              min={0}
              value={10}
            ></progress>
            <p>0 Bytes of 100MB</p>
          </div>
        </section>
        <section className="R-sidebar p-3 w-[85%] m-0 grid gap-4">
          <div className="flex justify-between">
            <div className={newTheme ? "bg-gray-200 p-3 rounded-full" : "bg-gray-200 rounded-full p-3"}>
              <SearchOutlinedIcon className ={newTheme ? "bg-black rounded" : ""}/>
              <input
                type="text"
                placeholder="Search in Disk"
                className= {newTheme ? "w-[550px] bg-gray-200 ml-3 h-[25px] border-none outline-none text-lg  text-black font-semibold" : "w-[550px] bg-gray-200 ml-3 h-[25px] border-none outline-none text-lg font-semibold"}
              ></input>
              <TuneOutlinedIcon />
            </div>
            <div className=" flex gap-4 items-center mr-4">
              <HelpOutlineOutlinedIcon
                className="hover:p-1"
                onClick={handleIns}
              />
              <SettingsOutlinedIcon className="hover:p-1" onClick={handleTheme} />
              {user ? (
                <img
                  className="rounded-full h-10 border-red-400 border-2"
                  src={photoURL}
                ></img>
              ) : (
                <AccountCircleOutlinedIcon
                  src={photoURL}
                  className="hover:p-1"
                />
              )}
            </div>
          </div>
          <div className="flex justify-between p-2">
            <div>
              <p className="text-2xl">HOME</p>
            </div>
            <div className="flex gap-4">
              <MenuOutlinedIcon
                onClick={handleView1}
                fontSize="large"
                className="hover:bg-sky-100 hover:border-2 hover:p-1"
              />
              <hr></hr>
              <WidgetsOutlinedIcon
                onClick={handleView2}
                fontSize="large"
                className="hover:bg-sky-100 hover:border-2 hover:p-1 "
              />
            </div>
          </div>
          {view ? (
            <div className={newTheme ? "bg-gray-600 h-[86vh] w-[100%] rounded-xl p-3" :"bg-white h-[86vh] w-[100%] rounded-xl p-3"}>
              {/* DYNAMIC DATA */}

              <div className="flex flex-wrap gap-16 m-2">
                {files.map((file, index) => {
                  return (
                    <div
                      key={index}
                      onClick={()=>handleActionOpen(index)}
                      className={newTheme ? "w-[250px] bg-slate-500 h-[220px] p-2 rounded-lg hover:bg-sky-100 hover:text-black" : "w-[250px] bg-slate-100 h-[220px] p-2 rounded-lg hover:bg-sky-100"}
                    >
                      {/* <a href={file.data.fileURL} target="_blank"> */}
                      <p className="font-semibold">{file.data.filename}</p>
                      <div className="bg-white w-[80%] m-auto mt-2 rounded-lg h-[50%] flex items-center justify-center">
                        <InsertDriveFileTwoToneIcon fontSize="large" />
                      </div>
                      <div className="p-2 text-sm ">
                        <p>
                          <span className="font-semibold">Size . </span>
                          {changeBytes(file.data.size)}
                        </p>
                        <p>
                          <span className="font-semibold">Modified .</span>{" "}
                          {new Date(
                            file.data.timestamp?.toDate()
                          ).toLocaleDateString()}
                        </p>
                      </div>
                      {/* </a> */}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className={newTheme ? "bg-gray-500 text-black font-bold  h-[86vh] w-[100%] rounded-xl p-3" : "bg-white h-[86vh] w-[100%] rounded-xl p-3" }>
              <div className="flex justify-between p-4 text-lg">
                <p>File Name</p>
                <p>Size</p>
                <p>Last Modified</p>
              </div>
              {files.map((file, index) => {
                return (
                  <div
                    key={index}
                    className={newTheme ? "flex m-4 bg-gray-500 p-2 rounded-lg hover:bg-sky-50 hover:p-4" : "flex m-4 bg-sky-50 p-2 rounded-lg"}
                    onClick={handleActionOpenView}
                  >
                    <p className="font-semibold w-[48%]">
                      {file.data.filename}
                    </p>
                    <p className="font-semibold w-[50%]">
                      {changeBytes(file.data.size)}
                    </p>
                    <p className="font-semibold">
                      {new Date(
                        file.data.timestamp?.toDate()
                      ).toLocaleDateString()}
                    </p>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </>
  );
}

export default OnLogIn;
