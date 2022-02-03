import axios from "axios"

const baseUrl = "/api/users"

export const getUsers = async() => {

    const {data} = await axios.get(baseUrl)
    return data
}
