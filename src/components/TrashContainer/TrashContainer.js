import NoteCard from "../NoteCard/NoteCard";
import {useEffect,useState } from "react";
import { getAllNotesApiCall } from "../../services/NoteService";

function TrashContainer() {
    const [notesData, setNotesData] = useState([]);
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await getAllNotesApiCall()
        const filteredData = response.data.data.filter(note => note.isTrash);
        setNotesData(filteredData);
    }
    useEffect(() => {
        console.log(notesData)
    }, [notesData])

    const handleUpdateNotesList = (action,data) => {
        // setNotesData([...notesData, data]);
        if(action==="restore"){
            const filteredData = notesData.filter(note => note._id !== data._id)
            setNotesData(filteredData);
        }
        if(action ==="deleteForever"){
            const filteredData = notesData.filter(note => note._id !== data._id)
            setNotesData(filteredData);
        }
    }


    return (
        <>
            <NoteCard updateList={handleUpdateNotesList} notesList={notesData} container={"trashCnt"}/>
        </>
    )
}

export default TrashContainer;