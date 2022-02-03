import axios from "axios";

const baseUrl = "/api/login"

const loginService = async (credentials) => {
   
    console.log(credentials)
    const {data} = await axios.post(baseUrl,credentials)
    return data
} 

export {loginService}