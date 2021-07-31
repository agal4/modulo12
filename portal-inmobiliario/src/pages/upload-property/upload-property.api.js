import Axios from "axios";

const propertiesUrl = `${process.env.BASE_API_URL}/properties`;

export const insertProperty = property => Axios.post(`${propertiesUrl}`, property).then(response => {
    return response.data;
});