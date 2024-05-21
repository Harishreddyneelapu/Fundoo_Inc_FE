import axios from 'axios';


export const loginApiCall = async (data) => {
  let prom = await axios.post("http://localhost:3000/api/users/login", data)
  return prom;
}


export const signUpApiCall = async (data) => {
  let res = await axios.post("http://localhost:3000/api/users", data)
  return res;
}



 