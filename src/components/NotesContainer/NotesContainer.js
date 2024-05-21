import { useEffect, useState } from "react";
import NoteCnt from "../Note/NoteCnt";
import NoteCard from "../NoteCard/NoteCard";
import { getAllNotesApiCall } from "../../services/NoteService";

function NotesContainer() {
    const [notesData, setNotesData] = useState([]);
    useEffect(() => {
        fetchData()
    }, [])
    const fetchData = async () => {
        const response = await getAllNotesApiCall()
        const filteredData = response.data.data.filter(note => !note.isArchive && !note.isTrash);
        setNotesData(filteredData);
    }
    useEffect(() => {
        console.log(notesData)
    }, [notesData])

    const handleUpdateNotesList = (data) => {
        setNotesData([...notesData, data]);
    }

    return (
        <>
            <NoteCnt updateList={handleUpdateNotesList} />
            <NoteCard notesList={notesData} container={"notesCnt"} />
        </>)
}

export default NotesContainer;