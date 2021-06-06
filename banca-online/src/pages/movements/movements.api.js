import Axios from "axios";

const url = `${process.env.BASE_API_URL}/movements`;

export const getMovements = account => Axios.get(url).then(response => {
    return response.data;
});