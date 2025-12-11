import "./newRoom.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { roomInputs } from "../../formSource";
import { useFetch } from "../../hooks/useFetch";
import axios from 'axios'

const NewRoom = () => {
  const [files, setFiles] = useState("");
  const [hotelId, setHotelId] = useState(undefined)
  const [rooms, setRooms] = useState([])
  const [info, setInfo] = useState(null)
  const navigate = useNavigate()

  const {data, loading, error} = useFetch("/hotels")

  useEffect(() => {
    console.log('data', data)
  },[data])


  const handleChange = (e) => {
    setInfo(prev => ({...prev, [e.target.id]: e.target.value}))
  }
  const handleClick = async (e) => {
    e.preventDefault()
    const roomNumbers = rooms.split(",").map(room => ({number: room}))
    try {
      const res = await axios.post(`/rooms/hotels/${hotelId}`, {...info, roomNumbers})
      if(res.status === 200){
        navigate('/rooms')
      }


    } catch (error) {
      
    }

  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Room</h1>
        </div>
        <div className="bottom">
          {/* <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div> */}
          <div className="right">
            <form>
              {/* <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div> */}

              {roomInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder}
                  onChange={handleChange} />
                </div>
              ))}
                <div className="formInput">
                  <label>Rooms</label>
                  <textarea onChange={e => setRooms(e.target.value)} placeholder="give comma between room numbers"/>
                </div>
                <div className="formInput">
                  <label>Choose a Hotel</label>
                  <select id="hotelId" onChange={e => setHotelId(e.target.value)}>
                    {loading ? "Loading": data && data.map(hotel => (
                      <option value={hotel._id}>{hotel.name} </option>

                    ))}
                  </select>
                </div>

                <button onClick={handleClick} >Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRoom;
