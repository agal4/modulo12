import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/properties`;
const equipmentListUrl = `${process.env.BASE_API_URL}/equipments`;
const contactUrl = `${process.env.BASE_API_URL}/contact`;

export const getPropertyDetail = (id) => Axios.get(`${url}?id=${id}`).then(response => {
    return response.data;
});

export const getEquipmentList = () => Axios.get(equipmentListUrl).then(response => {
    return response.data;
});

export const insertContact = contact => Axios.post(`${contactUrl}`, contact).then(response => {
    return response.data;
});