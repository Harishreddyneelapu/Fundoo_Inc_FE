import React, { useState } from "react";
import PIN_ICON from "../../assests/pin-svgrepo-com.svg"
import New_List from "../../assests/checklist-svgrepo-com.svg"
import Paint_Brush from "../../assests/paint-brush-svgrepo-com.svg"
import File_Image from "../../assests/file-image-svgrepo-com.svg"
import Reminder from "../../assests/reminder-svgrepo-com.svg"
import Collaborator from "../../assests/add-friend-svgrepo-com.svg"
import Background_color from "../../assests/paint-tray-paint-pallette-paint-artist-tool-svgrepo-com.svg"
import Archive from "../../assests/archive-box-bold-svgrepo-com.svg"
import More from "../../assests/three-dots-vertical-svgrepo-com.svg"
import Undo from "../../assests/undo-svgrepo-com.svg"
import Redo from "../../assests/redo-svgrepo-com.svg"
import Tooltip from '@mui/material/Tooltip';
import './NoteCnt.css';
import { createNoteApiCall } from "../../services/NoteService";


function NoteCnt(props) {
    const{updateList}=props;

    const [createNote, setCreateNote] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    
    
    const handleCreateNote =async (action = 'close') => {
        if(action === 'open') {
            setCreateNote(!createNote)
            return
        }
        let isValid = true;
        if (title.trim() === "") {
            isValid = false;
        } 
        if (description.trim() === "") {
            isValid = false;
        } 
        if (isValid) {
            console.log("title :", title);
            console.log("description :", description);
            setCreateNote(!createNote);
            const res = await createNoteApiCall({
                "title": title,
                "description": description
            });
            updateList(res.data.data)
        }
        setCreateNote(!createNote);
        console.log(createNote);
    }

    return (
        <>
            {!createNote ?
                <div className="taking-note" onClick={() => handleCreateNote('open')}>
                    <span className="taking-note-text-container">
                        <input type="text" id="taking-note-text-field" placeholder="Take a note.." className="input-field" />
                    </span>
                    <Tooltip title="New List">
                        <div className="taking-note-new-list">
                            <img src={New_List} alt="New List" id="taking-note-new-list-field" className="icon" />
                        </div>
                    </Tooltip>
                    <Tooltip title="New Note with Drawing">
                        <div className="taking-note-new-note-with-drawing">
                            <img src={Paint_Brush} alt="New Note with Drawing" id="taking-note-paint-brush-field" className="icon" />
                        </div>
                    </Tooltip>
                    <Tooltip title="New Note with Image">
                        <div className="taking-note-new-note-with-image">
                            <img src={File_Image} alt="" id="taking-note-new-note-image-field" className="icon" />
                        </div>
                    </Tooltip>
                </div>
                :
                <div className="taking-full-note">
                    <div className="taking-full-note-title-container">
                        <input type="text" id="taking-full-note-title-field" placeholder="Title" onChange={(e)=>setTitle(e.target.value)} className="title-field" />
                        <Tooltip title="Pin">
                            <span className="taking-full-note-pin-field">
                                <img src={PIN_ICON} id="pin-field" alt="Pin" className="icon" />
                            </span>
                        </Tooltip>
                    </div>
                    <span className="taking-full-note-text-container">
                        <input type="text" id="taking-full-note-text-field" placeholder="Take a note.." onChange={(e)=>setDescription(e.target.value)} className="text-field" />
                    </span>
                    <div className="taking-full-note-footer">
                        <div className="taking-full-note-footer-images">
                            <Tooltip title="Reminder">
                                <div className="taking-full-note-footer-image">
                                    <img src={Reminder} alt="" className="icon" />
                                </div>
                            </Tooltip>
                            <Tooltip title="Collaborator">
                                <div className="taking-full-note-footer-image">
                                    <img src={Collaborator} alt="" className="icon" />
                                </div>
                            </Tooltip>
                            <Tooltip title="Background Color">
                                <div className="taking-full-note-footer-image">
                                    <img src={Background_color} alt="" className="icon" />
                                </div>
                            </Tooltip>
                            <Tooltip title="File Image">
                                <div className="taking-full-note-footer-image">
                                    <img src={File_Image} alt="" className="icon" />
                                </div>
                            </Tooltip>
                            <Tooltip title="Archive">
                                <div className="taking-full-note-footer-image">
                                    <img src={Archive} alt="" className="icon" />
                                </div>
                            </Tooltip>
                            <Tooltip title="More Options">
                                <div className="taking-full-note-footer-image">
                                    <img src={More} alt="" className="icon" />
                                </div>
                            </Tooltip>
                            <Tooltip title="Undo">
                                <div className="taking-full-note-footer-image">
                                    <img src={Undo} alt="" className="icon" />
                                </div>
                            </Tooltip>
                            <Tooltip title="Redo">
                                <div className="taking-full-note-footer-image">
                                    <img src={Redo} alt="" className="icon" />
                                </div>
                            </Tooltip>
                        </div>
                        <div className="taking-full-note-footer-close-button">
                            <button id="close-button" onClick={handleCreateNote} className="close-button">Close</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
export default NoteCnt;
