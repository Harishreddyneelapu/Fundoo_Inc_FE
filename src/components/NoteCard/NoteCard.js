import React, { useState } from "react";
import PIN_ICON from "../../assests/pin-svgrepo-com.svg";
import File_Image from "../../assests/file-image-svgrepo-com.svg";
import Reminder from "../../assests/reminder-svgrepo-com.svg";
import Collaborator from "../../assests/add-friend-svgrepo-com.svg";
import Background_color from "../../assests/paint-tray-paint-pallette-paint-artist-tool-svgrepo-com.svg";
import Archive from "../../assests/archive-box-bold-svgrepo-com.svg";
import More from "../../assests/three-dots-vertical-svgrepo-com.svg";
import Delete_Forever from "../../assests/delete-forever-svgrepo-com.svg";
import UnArchive from "../../assests/unarchive-svgrepo-com.svg";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
// import Trash from "../../assests/trash-plus-svgrepo-com.svg";
import Restore from "../../assests/restore-page-svgrepo-com.svg"
import './NoteCard.css';
import { deleteNoteApiCall,trashNoteApiCall,archiveNoteApiCall } from "../../services/NoteService";


function NoteCard(props) {
    const { notesList, container } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const colors = [
        { hex: "#FFFFFF", name: "Default", class: "col1" },
        { hex: "#FAAFA8", name: "Coral", class: "col2" },
        { hex: "#F39F76", name: "Peach", class: "col3" },
        { hex: "#FFF8B8", name: "Sand", class: "col4" },
        { hex: "#E2F6D3", name: "Mint", class: "col5" },
        { hex: "#B4DDD3", name: "Sage", class: "col6" },
        { hex: "#D4E4ED", name: "Fog", class: "col7" },
        { hex: "#AECCDC", name: "Storm", class: "col8" },
        { hex: "#D3BFDB", name: "Dusk", class: "col9" },
        { hex: "#F6E2DD", name: "Blossom", class: "col10" },
        { hex: "#E9E3D4", name: "Clay", class: "col11" },
        { hex: "#EFEFF1", name: "Chalk", class: "col12" }
    ];



    const handleIconClick = (event, data) => {
        if (event === 'deleteForever') {
            deleteNoteApiCall(data._id);
        }
        if(event ==='restore'){
            trashNoteApiCall(data._id);
        }
        if(event ==='unarchive'){
            archiveNoteApiCall(data._id);
        }
        if(event ==='archive'){
            archiveNoteApiCall(data._id);
        }
        // setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleColorSelect = (color) => {
        console.log("Color selected:", color);
        setAnchorEl(null);
    };
    // const handleDeleteNote = (noteId) => {
    //     deleteNoteApiCall();
    // }
    return (
        <>
            {notesList.map(noteObj => {
                return (
                    <div className="note-cnt" key={noteObj._id}>
                        <div className="note-card">
                            <div className="note-card-title-container">
                                <span className="note-card-title">{noteObj.title}</span>
                                <Tooltip title="Pin">
                                    <span className="note-card-pin-field">
                                        <img src={PIN_ICON} alt="Pin" className="icon" />
                                    </span>
                                </Tooltip>
                            </div>
                            <span className="note-card-description">{noteObj.description}</span>
                            <div className="note-card-footer">
                                {container === "trashCnt" ? <><Tooltip title="Delete_Forever">
                                    <div className="note-card-footer-image">
                                        <img src={Delete_Forever} alt="Reminder" className="icon" onClick={() => handleIconClick('deleteForever')} />
                                    </div>
                                </Tooltip><Tooltip title="Restore">
                                        <div className="note-card-footer-image">
                                            <img src={Restore} alt="Restore" className="icon" onClick={() => handleIconClick('restore')} />
                                        </div>
                                    </Tooltip></>
                                    : <>
                                        <Tooltip title="Remind me">
                                            <div className="note-card-footer-image">
                                                <img src={Reminder} alt="File" className="icon" />
                                            </div>
                                        </Tooltip><Tooltip title="Collaborator">
                                            <div className="note-card-footer-image">
                                                <img src={Collaborator} alt="File" className="icon" onClick={() => handleIconClick('collab')} />
                                            </div>
                                        </Tooltip><Tooltip title="Background_color">
                                            <div className="note-card-footer-image">
                                                <img src={Background_color} alt="Background Color" className="icon cursor-pointer" onClick={handleIconClick} />
                                            </div>
                                        </Tooltip>
                                        <Tooltip title="Add Image">
                                            <div className="note-card-footer-image">
                                                <img src={File_Image} alt="Background Color" className="icon cursor-pointer" onClick={handleIconClick} />
                                            </div>
                                        </Tooltip>
                                        {container === "archiveCnt" ? <Tooltip title="Unarchive">
                                            <div className="note-card-footer-image">
                                                <img src={UnArchive} alt="File" className="icon" onClick={() => handleIconClick('unarchive')} />
                                            </div>
                                        </Tooltip> :
                                            <Tooltip title="Archive">
                                                <div className="note-card-footer-image">
                                                    <img src={Archive} alt="File" className="icon" onClick={() => handleIconClick('archive')} />
                                                </div>
                                            </Tooltip>
                                        }
                                        <Tooltip title="More options">
                                            <div className="note-card-footer-image">
                                                <img src={More} alt="More options" className="icon cursor-pointer" />
                                            </div>
                                        </Tooltip></>
                                }
                                
                            </div>
                        </div>
                        <Menu id="color-menu" anchorEl={anchorEl} open={open} onClose={handleClose}>
                            <MenuItem onClick={handleClose}>
                                <div className="color-palette-container">
                                    {colors.map(color => (
                                        <Tooltip title={color.name} key={color.class}>
                                            <div
                                                className="color"
                                                style={{ backgroundColor: color.hex }}
                                                onClick={() => handleColorSelect(color.hex)}
                                            ></div>
                                        </Tooltip>
                                    ))}
                                </div>
                            </MenuItem>
                        </Menu>
                    </div>
                )
            })}
        </>
    );
}

export default NoteCard;
