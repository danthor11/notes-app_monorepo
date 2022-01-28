import axios from "axios";

const baseUrl = "/api/notes"

let token = null

export const setToken = (newToken) => {
    token=`Bearer ${newToken}`
}

const getAll = () => {
    return axios.get(`${baseUrl}`)
          .then(response => {
            const {data} = response
            return data
          })
}

const create = (newObject) => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "Authorization" : token
        }
    }
    
    console.log(config)

    return axios
        .post(`${baseUrl}`,newObject,config)
        .then( response => {
            const {data} = response
            return data
        })
}
 
const update = (id, newObject) => {
    const config = {
        headers:{
            "Content-Type": "application/json",
            "Authorization" : token
        }
    }
    return axios
        .put(`${baseUrl}/${id}`,newObject,config)
        .then( response => {
            const {data} = response
            return data
        }) 
}


export {getAll , create , update}