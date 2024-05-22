import NoteCard from "../NoteCard/NoteCard";
import {useEffect,useState } from "react";
import { getAllNotesApiCall } from "../../services/NoteService";

function ArchiveContainer(){
    const [notesData, setNotesData] = useState([]);
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await getAllNotesApiCall()
        const filteredData = response.data.data.filter(note => note.isArchive);
        setNotesData(filteredData);
    }
    useEffect(() => {
        console.log(notesData)
    }, [notesData])

    const handleUpdateNotesList = (action,data) => {
        // setNotesData([...notesData, data]);

        if(action==="unarchive"){
            const filteredData = notesData.filter(note => note._id !== data._id);
            setNotesData(filteredData);
        }
    }


    return(<>
    <NoteCard updateList={handleUpdateNotesList} notesList={notesData} container={"archiveCnt"}/></>)
}

export default ArchiveContainer;