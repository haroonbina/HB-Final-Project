import React from 'react';
import { Link } from 'react-router-dom';
import { MdModeEdit } from 'react-icons/md';
import { FaRegTrashAlt } from 'react-icons/fa';
import { AiOutlineSetting } from 'react-icons/ai';
import { FiBell, FiBellOff } from 'react-icons/fi';



const RoomsList = ({rooms, setDeleteId}) =>{
    const roomsList = rooms ? (
        rooms.map(room =>{
            const lightColor = room.connected ? ("bg-success") : ("bg-danger"); 
            return (
                <div className="col-12 col-sm-6 col-lg-4 col-xl-3 mb-5" key={room.id}>
                    <div className="card">
                        <div className="card-header">
                            <div>{room.name}</div>
                            <div className={`light ${lightColor}`}></div>
                        </div>
                        <div className="card-body">
                            <p className="room-info">Device S_N: {room.device_sn}</p>
                            <p className="room-info">Max People Number: {room.max_people_number}</p>
                            <p className="room-info">Current People Number: {room.current_people_number}</p>
                            <div className="d-flex align-items-center">
                                <div className="mr-3">
                                    Alarm:
                                </div>
                                <label className="switch">
                                    <input className="switch-input" type="checkbox" />
                                    <span className="switch-label" data-on="On" data-off="Off"></span> <span className="switch-handle"></span>
                                </label> 
                            </div>
                            <div className="mt-4 d-flex justify-content-between">
                                <div>
                                    <Link to={`/editRoom/${room.id}`}><MdModeEdit className="room-control-icon room-edit" /></Link>
                                    <FaRegTrashAlt id={room.id} className="room-control-icon room-delete" onClick={(e) =>{setDeleteId(e.target.id || e.target.parentNode.id)}} />
                                    <AiOutlineSetting id={room.id} className="room-control-icon room-setting" />
                                </div>
                                <FiBell className="room-control-icon text-success" />
                                <FiBellOff className="room-control-icon text-danger" />
                            </div>            
                        </div>
                    </div>
                </div>
            )
        })
    ) : (
        null
    ) 

    return (
        <div className="row">
            {roomsList}
        </div>
    )
}

export default RoomsList;