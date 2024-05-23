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

    const handleUpdateNotesList = (action, data) => {
        if(action === "add") {
            setNotesData([...notesData, data]);
        }


        else if (action === 'archive') {
            const filteredData = notesData.filter(note => note._id !== data._id);
            setNotesData(filteredData);
        }
        else if(action ==='trash'){
            const filteredData = notesData.filter(note => note._id !== data._id)
            setNotesData(filteredData);
        }
        else if(action ==='color'){
            const updatedList = notesData.map((note)=>{
                if(note._id === data._id){
                    return data;
                }
                return note;
            })
            setNotesData(updatedList)
        }
    }

    return (
        <>
            <NoteCnt updateList={handleUpdateNotesList} />
            <NoteCard updateList={handleUpdateNotesList} notesList={notesData} container={"notesCnt"} />
        </>)
}

export default NotesContainer;