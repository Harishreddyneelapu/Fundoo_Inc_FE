import axios from 'axios';

const config = {
  'Authorization': `Bearer ${localStorage.getItem('AuthToken')}`,
}

export const createNoteApiCall = async (data) => {

  let prom = await axios.post("http://localhost:3000/api/notes", data, { headers: config })
  return prom;
}

export const deleteNoteApiCall = async (_id) => {

  let prom = await axios.delete(`http://localhost:3000/api/notes/${_id}`, { headers: config })
  return prom
}


export const getAllNotesApiCall = async () => {
  const res = await axios.get("http://localhost:3000/api/notes", { headers: config })
  return res;
}

export const trashNoteApiCall = async (_id) => {
  const res = await axios.put(`http://localhost:3000/api/notes/${_id}/isTrash`,"",{headers:config})
  return res;
}
export const archiveNoteApiCall = async (_id)=>{
  const res = await axios.put(`http://localhost:3000/api/notes/${_id}/isArchive`,"",{headers:config})
  return res;
}

export const colorNoteApiCall = async (_id,data)=>{
  const res = await axios.put(`http://localhost:3000/api/notes/${_id}/color`,data,{headers:config})
  return res;
}