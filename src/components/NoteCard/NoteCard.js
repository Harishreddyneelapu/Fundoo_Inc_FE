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
import Restore from "../../assests/restore-page-svgrepo-com.svg";
import './NoteCard.css';

import { deleteNoteApiCall, trashNoteApiCall, archiveNoteApiCall, colorNoteApiCall } from "../../services/NoteService";

function NoteCard(props) {
    const { notesList, container, updateList } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [moreAnchorEl, setMoreAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const moreOpen = Boolean(moreAnchorEl);
    const [noteData,setNoteData]=useState({});

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

    const handleIconClick =async (event, data, color) => {
        if (event === 'deleteForever') {
            deleteNoteApiCall(data._id);
            updateList(event,data)
        }
        else if (event === 'restore') {
            trashNoteApiCall(data._id);
            updateList(event,data)
        }
        else if (event === 'unarchive') {
            archiveNoteApiCall(data._id);
            updateList(event, data);
        }
        else if (event === 'archive') {
            archiveNoteApiCall(data._id);
            updateList(event, data);
        }
        else if(event==='trash'){
            handleMoreClose();
            trashNoteApiCall(noteData._id)
            updateList(event,noteData);
        }
        else if(event==='color'){
            await colorNoteApiCall(data._id,{
                "color":color
            })
            updateList(event,{...noteData, color: color})
        }
    };

    const handleMoreClick = (event,obj) => {
        setNoteData(obj);
        setMoreAnchorEl(event.currentTarget);
    };

    const handleMoreClose = () => {
        setMoreAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // const handleColorSelect = (color) => {
    //     console.log("Color selected:", color);
    //     setAnchorEl(null);
    // };

    return (
        <>
            <div className="allNotes-in-cnt">
                {notesList.map(noteObj => {
                    return (
                        <div className="note-cnt" key={noteObj._id}>
                            <div className="note-card" style={{backgroundColor: noteObj?.color}}>
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
                                    {container === "trashCnt" ? <><Tooltip title="Delete Forever">
                                        <div className="note-card-footer-image">
                                            <img src={Delete_Forever} alt="Delete Forever" className="icon" onClick={() => handleIconClick('deleteForever', noteObj)} />
                                        </div>
                                    </Tooltip><Tooltip title="Restore">
                                        <div className="note-card-footer-image">
                                            <img src={Restore} alt="Restore" className="icon" onClick={() => handleIconClick('restore', noteObj)} />
                                        </div>
                                    </Tooltip></>
                                        : <>
                                            <Tooltip title="Remind me">
                                                <div className="note-card-footer-image">
                                                    <img src={Reminder} alt="Reminder" className="icon" />
                                                </div>
                                            </Tooltip><Tooltip title="Collaborator">
                                                <div className="note-card-footer-image">
                                                    <img src={Collaborator} alt="Collaborator" className="icon" onClick={() => handleIconClick('collab')} />
                                                </div>
                                            </Tooltip><Tooltip title="Background color">
                                                <div className="note-card-footer-image">
                                                    <img src={Background_color} alt="Background Color" className="icon cursor-pointer" 
                                                    onClick={(e) => {
                                                        setNoteData(noteObj)
                                                        setAnchorEl(e.currentTarget)
                                                    }}
                                                    />
                                                </div>
                                            </Tooltip>
                                            <Tooltip title="Add Image">
                                                <div className="note-card-footer-image">
                                                    <img src={File_Image} alt="Add_Image" className="icon cursor-pointer" />
                                                </div>
                                            </Tooltip>
                                            {container === "archiveCnt" ? <Tooltip title="Unarchive">
                                                <div className="note-card-footer-image">
                                                    <img src={UnArchive} alt="Unarchive" className="icon" onClick={() => handleIconClick('unarchive', noteObj)} />
                                                </div>
                                            </Tooltip> :
                                                <Tooltip title="Archive">
                                                    <div className="note-card-footer-image">
                                                        <img src={Archive} alt="Archive" className="icon" onClick={() => handleIconClick('archive', noteObj)} />
                                                    </div>
                                                </Tooltip>
                                            }
                                            <Tooltip title="More options">
                                                <div className="note-card-footer-image">
                                                    <img src={More} alt="More options" className="icon cursor-pointer" onClick={(e)=>handleMoreClick(e,noteObj)} />
                                                </div>
                                            </Tooltip>
                                        </>
                                    }
                                </div>
                            </div>
                            <Menu
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={handleClose}>
                                    <div className="color-palette-container">
                                        {colors.map(color => (
                                            <Tooltip title={color.name} key={color.class}>
                                                <div
                                                    className="color"
                                                    style={{ backgroundColor: color.hex }}
                                                    onClick={() => handleIconClick('color',noteData,color.hex)}
                                                ></div>
                                            </Tooltip>
                                        ))}
                                    </div>
                                </MenuItem>
                            </Menu>
                            <Menu
                                anchorEl={moreAnchorEl}
                                open={moreOpen}
                                onClose={handleMoreClose}
                            >
                                <MenuItem onClick={() => handleIconClick('trash',noteObj)}>Delete note</MenuItem>
                                <MenuItem >Duplicate note</MenuItem>
                                <MenuItem >Copy link</MenuItem>
                            </Menu>
                        </div>
                    )
                })}
            </div>
        </>
    );
}

export default NoteCard;
