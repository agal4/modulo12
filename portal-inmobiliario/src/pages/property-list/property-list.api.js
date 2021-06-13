import Axios from 'axios';

const url = `${process.env.BASE_API_URL}/properties`;
const saleTypeListUrl = `${process.env.BASE_API_URL}/saleTypes`;
const provinceListUrl = `${process.env.BASE_API_URL}/provinces`;


export const getPropertyList = (queryParams) => 
Axios.get(`${url}?${queryParams}`).then(response => {
    return response.data;
});

export const getSaleTypeList = () => Axios.get(saleTypeListUrl).then(response => {
    return response.data;
});

export const getProvinceList = () => Axios.get(provinceListUrl).then(response => {
    return response.data;
});